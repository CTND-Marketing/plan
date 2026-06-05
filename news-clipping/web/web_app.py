"""
뉴스클리핑 웹 서버 — Flask
실행: python app.py
접속: http://localhost:5000
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask import Flask, render_template, request, jsonify, redirect, url_for
import json, threading, time
from datetime import datetime

from core import (
    _read_json, _build_company_profile, load_config, save_config,
    get_naver_news, ask_gemini_bulk_refine, send_email_with_summary,
    send_slack_notification, remove_duplicates_advanced,
    CONFIG_COMPANY, CONFIG_CATEGORIES, CONFIG_AI_FILTER,
    CONFIG_SETTINGS, CONFIG_DEVELOPER,
    GEMINI_API_KEYS
)

app = Flask(__name__)

# 실행 상태 관리
_run_status = {"running": False, "progress": "", "done": False, "error": ""}

# ── 페이지 라우팅 ─────────────────────────────────────
@app.route("/")
def index():
    return redirect(url_for("category"))

@app.route("/company")
def company():
    data = _read_json(CONFIG_COMPANY, {})
    return render_template("company.html", data=data, page="company")

@app.route("/category")
def category():
    cats = _read_json(CONFIG_CATEGORIES, {})
    aif  = _read_json(CONFIG_AI_FILTER, {})
    return render_template("category.html", cats=cats, aif=aif, page="category")

@app.route("/settings")
def settings():
    sett = _read_json(CONFIG_SETTINGS, {})
    return render_template("settings.html", sett=sett, page="settings")

@app.route("/developer")
def developer():
    dev = _read_json(CONFIG_DEVELOPER, {})
    # API 키 마스킹
    masked = dict(dev)
    if "gemini_api_keys" in masked:
        masked["gemini_api_keys"] = [k[:8]+"..." if k else "" for k in masked["gemini_api_keys"]]
    if "smtp" in masked:
        masked["smtp"] = dict(masked["smtp"])
        if masked["smtp"].get("sender_password"):
            masked["smtp"]["sender_password"] = "••••••••••••••••"
    return render_template("developer.html", dev=masked, page="developer")

@app.route("/test")
def test():
    cfg = load_config()
    cats = list(cfg.get("keywords", {}).keys())
    return render_template("test.html", cats=cats, page="test")

# ── API 엔드포인트 ────────────────────────────────────
@app.route("/api/save/company", methods=["POST"])
def api_save_company():
    data = request.json
    data["_comment"] = "기업 기본 정보 — AI 프롬프트에 자동 주입됩니다."
    with open(CONFIG_COMPANY, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    return jsonify({"ok": True})

@app.route("/api/save/category", methods=["POST"])
def api_save_category():
    data = request.json
    cats_data = _read_json(CONFIG_CATEGORIES, {})
    for cat, val in data.get("categories", {}).items():
        cats_data[cat] = val
    with open(CONFIG_CATEGORIES, "w", encoding="utf-8") as f:
        json.dump(cats_data, f, ensure_ascii=False, indent=2)
    aif = _read_json(CONFIG_AI_FILTER, {})
    aif["global"]      = data.get("global_filter", [])
    aif["by_category"] = data.get("ai_by_cat", {})
    with open(CONFIG_AI_FILTER, "w", encoding="utf-8") as f:
        json.dump(aif, f, ensure_ascii=False, indent=2)
    return jsonify({"ok": True})

@app.route("/api/save/settings", methods=["POST"])
def api_save_settings():
    data = request.json
    sett = _read_json(CONFIG_SETTINGS, {})
    sett.update(data)
    with open(CONFIG_SETTINGS, "w", encoding="utf-8") as f:
        json.dump(sett, f, ensure_ascii=False, indent=2)
    return jsonify({"ok": True})

@app.route("/api/save/developer", methods=["POST"])
def api_save_developer():
    data = request.json
    dev = _read_json(CONFIG_DEVELOPER, {})
    # 마스킹된 값은 기존값 유지
    if data.get("naver_api"):
        dev["naver_api"] = data["naver_api"]
    if data.get("gemini_api_keys"):
        keys = [k for k in data["gemini_api_keys"] if k and "..." not in k]
        if keys: dev["gemini_api_keys"] = keys
    if data.get("smtp"):
        smtp = data["smtp"]
        if smtp.get("sender_password") and "••" not in smtp["sender_password"]:
            dev.setdefault("smtp", {}).update(smtp)
        else:
            dev.setdefault("smtp", {}).update({k:v for k,v in smtp.items() if k != "sender_password"})
    with open(CONFIG_DEVELOPER, "w", encoding="utf-8") as f:
        json.dump(dev, f, ensure_ascii=False, indent=2)
    return jsonify({"ok": True})

@app.route("/api/test/category", methods=["POST"])
def api_test_category():
    cat = request.json.get("category", "")
    cfg = load_config()
    keywords = cfg.get("keywords", {}).get(cat, [])
    sett = _read_json(CONFIG_SETTINGS, {})
    days = sett.get("days_limit", 2)
    results = []
    for kw in keywords[:3]:
        items = get_naver_news(kw, days, cat)
        results.extend(items)
    seen, deduped = set(), []
    for item in results:
        t = item.get("기사제목", "")
        if t not in seen:
            seen.add(t)
            deduped.append(item)
    preview = deduped[:3]
    return jsonify({
        "total": len(deduped),
        "estimated": max(1, int(len(deduped) * 0.6)),
        "preview": [{"title": i.get("기사제목",""), "link": i.get("링크",""),
                     "media": i.get("언론사",""), "date": i.get("배포일자","")}
                    for i in preview]
    })

@app.route("/api/run", methods=["POST"])
def api_run():
    global _run_status
    if _run_status["running"]:
        return jsonify({"ok": False, "msg": "이미 실행 중입니다."})
    _run_status = {"running": True, "progress": "시작 중...", "done": False, "error": ""}
    threading.Thread(target=_run_monitoring, daemon=True).start()
    return jsonify({"ok": True})

@app.route("/api/status")
def api_status():
    return jsonify(_run_status)

def _run_monitoring():
    global _run_status
    try:
        cfg  = load_config()
        sett = _read_json(CONFIG_SETTINGS, {})
        days = sett.get("days_limit", 2)
        keywords_map = cfg.get("keywords", {})
        notes_map    = cfg.get("notes", {})

        # AI 필터 컨텍스트 구성
        aif = _read_json(CONFIG_AI_FILTER, {})
        ai_by_cat   = aif.get("by_category", {})
        global_rules = aif.get("global", [])
        notes_ctx_list = []
        for cat, note in notes_map.items():
            ai_rule = ai_by_cat.get(cat, "")
            combined = note + (f"\n\n[AI 필터]\n{ai_rule}" if ai_rule else "")
            notes_ctx_list.append(f"■ [{cat}] 주의사항:\n{combined}")
        if global_rules:
            notes_ctx_list.insert(0, f"■ 전체 공통 AI 필터:\n" + "\n".join(global_rules))
        all_notes_context = "\n\n".join(notes_ctx_list)

        _run_status["progress"] = "뉴스 수집 중..."
        raw_results = []
        for cat, kws in keywords_map.items():
            for kw in kws:
                items = get_naver_news(kw, days, cat)
                raw_results.extend(items)

        _run_status["progress"] = f"AI 필터링 중... ({len(raw_results)}건)"
        errors = []
        import pandas as pd
        df = pd.DataFrame(raw_results)
        if df.empty:
            _run_status.update({"running": False, "done": True, "progress": "수집된 기사가 없습니다."})
            return

        filtered = ask_gemini_bulk_refine(
            df.to_dict("records"), all_notes_context, errors)

        _run_status["progress"] = "발송 중..."
        channel = sett.get("send_channel", "email")

        # HTML 요약 생성 (간단 버전)
        summary_html = f"<h2>뉴스클리핑 리포트 — {datetime.now().strftime('%Y-%m-%d')}</h2>"
        summary_html += f"<p>총 {len(filtered)}건 수집</p>"

        if channel in ("email", "email_slack"):
            send_email_with_summary("", "report.xlsx", summary_html, days)
        if channel in ("slack", "email_slack"):
            send_slack_notification(summary_html, days)

        _run_status.update({
            "running": False, "done": True,
            "progress": f"완료! {len(filtered)}건 발송됨 ({channel})"
        })
    except Exception as e:
        import traceback
        _run_status.update({
            "running": False, "done": True, "error": str(e),
            "progress": "오류 발생"
        })

if __name__ == "__main__":
    print("뉴스클리핑 서버 시작 → http://localhost:5000")
    app.run(debug=True, port=5000, use_reloader=False)
