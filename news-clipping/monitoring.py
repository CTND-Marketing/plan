import os
import sys
import logging
from logging.handlers import RotatingFileHandler
import requests
import pandas as pd
from datetime import datetime, timedelta
import re
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from email.header import Header
import tkinter as tk
from tkinter import messagebox, ttk, scrolledtext
import threading 
import time 
import json 
from concurrent.futures import ThreadPoolExecutor, as_completed

try:
    import pystray
    from pystray import MenuItem as TrayItem
    from PIL import Image, ImageDraw
    TRAY_AVAILABLE = True
except ImportError:
    TRAY_AVAILABLE = False

# ==========================================
# [중요] 구글 제미나이 AI 라이브러리 로드
# ==========================================
try:
    from google import genai
    from google.genai import types
    HAS_GENAI = True
except ImportError:
    pass
    HAS_GENAI = False

# ==========================================
# 1. API 설정 및 이메일 계정 인증 정보
# ==========================================
# ── API 키·SMTP : developer.json 에서 로드 ─────────────────
def _load_developer_config():
    import json as _j, os as _o
    _p = _o.path.join(_o.path.dirname(_o.path.abspath(__file__)), "config", "developer.json")
    try:
        if _o.path.exists(_p):
            return _j.load(open(_p, encoding="utf-8"))
    except Exception:
        pass
    return {}

_dev = _load_developer_config()

NAVER_CLIENT_ID     = _dev.get("naver_api", {}).get("client_id",     "YqxdGzEi7cXNbbblQFmS")
NAVER_CLIENT_SECRET = _dev.get("naver_api", {}).get("client_secret", "C_udMHPLCW")

GEMINI_API_KEYS = _dev.get("gemini_api_keys", [
    "AIzaSyCRu-DYw6IxGBkK8ZYAiYJ7ERNVb55kd1o",
    "AIzaSyA8pNgcYmmO7AsMT3gRirsn4R0v8NwiPWQ",
    "AIzaSyAOtMM536D87o3XyVYBV7OdusIt9dSzeM4",
    "AIzaSyCznSVRGcst0DPq5FieIrn2xmEysSlyPIg",
    "AIzaSyBva-IhfjvwCfVeJmSHUOpXZyv7fNkm7eU",
])
_gemini_key_index = 0

_smtp           = _dev.get("smtp", {})
SENDER_EMAIL    = _smtp.get("sender_email",    "kse@catenoid.net")
SENDER_PASSWORD = _smtp.get("sender_password", "")
SMTP_SERVER     = _smtp.get("server",          "smtp.gmail.com")
SMTP_PORT       = int(_smtp.get("port",        587))
RECEIVER_EMAIL  = SENDER_EMAIL  # settings.json 로드 후 갱신


# 설정 파일 경로 — monitoring.py 기준 config/ 폴더
CONFIG_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "config")
CONFIG_COMPANY    = os.path.join(CONFIG_DIR, "company.json")
CONFIG_CATEGORIES = os.path.join(CONFIG_DIR, "categories.json")
CONFIG_AI_FILTER  = os.path.join(CONFIG_DIR, "ai_filter.json")
CONFIG_SETTINGS   = os.path.join(CONFIG_DIR, "settings.json")
CONFIG_DEVELOPER  = os.path.join(CONFIG_DIR, "developer.json")

# 🛠️ [실행창 주의사항 마스터 갱신]: 자사 서비스명을 RoomX에서 Loomex로 전사 동기화 정정했습니다.
DEFAULT_CONFIG = {
    "days_limit": 2,
    "auto_hour": 9,
    "auto_min": 0,
    "keywords": {
        "Catenoid": ["카테노이드", "콜러스", "룸엑스", "Charlla", "Loomex", "카테노이드 NHN", "카테노이드 투자", "히스플레이어", "HISPlayer"],
        "Industry Trends": ["비메오", "브라이트코브", "KINX", "미디버스", "칼투라", "유스트림", "파놉토", "시냅스엠", "위캔디오", "티젠소프트", "위안소프트", "씨디네트웍스", "아쿠아n플레이어", "JW플레이어", "스타플레이어", "존플레이어", "샵라이브", "그립컴퍼니", "그립클라우드", "모비두", "소스라이브", "소스클립", "에이지알소프트", "라이브24", "스쿼드엑스", "브릭스플러스", "브릭스허브", "인덴트코퍼레이션", "브이리뷰", "제머나이소프트", "SJ테크놀로지", "클라우드플렉스 미디어", "디지베이스", "SaaS", "SW업계", "공공SW", "클라우드", "MSP", "CSP", "CSAP", "AI서비스", "AI배속", "AI음성", "AI자막"],
        "Partners": ["AWS", "MS클라우드", "메가존클라우드", "NHN클라우드", "네이버클라우드", "CJ올리브네트웍스", "아카마이", "에지오(구 라임라이트)", "메디오피아테크", "맑은소프트", "네오사피엔스", "GS ITM", "카페24", "NHN커머스", "메이크샵", "라라스테이션", "잉카엔트웍스", "테르텐", "마크애니", "리디안랩스", "지니프릭스", "퍼브(Firb)", "윌라", "인플루엔셜", "바이트플러스"],
        "Customers": ["메가스터디", "에스티유니타스", "이투스", "대교", "야나두", "데이원컴퍼니", "용감한컴퍼니", "시대인재", "하이컨시", "디쉐어", "윤도영에듀", "이브로드캐스팅", "탈잉", "아리랑TV(국제방송교류재단)", "공영홈쇼핑", "NS홈쇼핑(라이브 커머스 관련 키워드)", "롯데홈쇼핑", "현대홈쇼핑", "순이엔티", "순샵", "밀리의 서재"],
        "E-Learning": ["온라인교육", "온라인강의", "에듀테크", "LMS", "학습관리시스템", "이러닝", "디지털교과서", "디지털교육", "모바일 러닝"],
        "Commerce": ["이커머스 플랫폼", "대형 이커머스 플랫폼", "이커머스 이슈", "이커머스 솔루션", "라이브 커머스", "숏폼 솔루션", "숏폼 플랫폼", "숏폼 커머스", "숏폼 콘텐츠", "쇼퍼블 비디오", "비디오 커머스", "미디어 커머스", "T커머스", "홈쇼핑", "패션앱", "패션플랫폼"],
        "Media & Contents": ["영상 보안", "동영상 스트리밍", "비디오 스트리밍", "라이브 스트리밍", "라이브 방송", "동영상 서비스", "비디오 서비스", "OTT", "동영상 플레이어", "비디오 플레이어", "CDN"],
        "Others": ["AI 미디어", "AI 동영상", "인공지능 비디오", "AI MSP"],
    },
    "notes": {
        "Catenoid": "-검색 키워드 100% 들어가 있을 시, 모두 수집\n(가능할 경우, 뉴스 내용에서도 검색 키워드 들어가면 수집)\n\n[1차 키워드 매칭]\n🔧 카테노이드·콜러스·Charlla·Loomex 등 고유 브랜드명: 네이버 검색 결과 그대로 수집\n🔧 찰나·룸엑스 등 일반 명사: 제목 또는 요약에 키워드 포함된 기사만 수집 (오탐 방지)\n\n[3차 카테고리 세부 차단]\n🔧 '찰나/Charlla': 제목 또는 본문에 '숏폼' 또는 '카테노이드'가 없으면 제외",
        "Industry Trends": "-문화, 건강, 연예, 스포츠 카테고리 수집 제외\n-제목에 검색 키워드 100% 있을 시, 수집\n\n[3차 카테고리 세부 차단]\n🔧 '클라우드' 키워드: 맥주 브랜드(Kloud)·롯데칠성 주류 판촉 기사 제외",
        "Partners": "📋 파트너사 언급 기사라도 거시적 SaaS 트렌드 기사는 Industry Trends로 이관",
        "Customers": "📋 중요도 순으로 정렬 (단순 언급건은 최하단 배치)\n📋 현대·롯데·NS·공영 4대 홈쇼핑 소식 중심 분류\n\n[3차 카테고리 세부 차단]\n🔧 '대교': OO대교(교량/지명)·교가·다리 관련 기사 제외 (교육기업 소식만 승인)\n🔧 단독 판매·특가 판매·할인 행사·완판 등 B2C 판촉 패턴 제외",
        "E-Learning": "📋 '디지털 교과서' 관련 기사 최상단 배치 / 에듀테크 트렌드 중간 배치\n📋 아이스크림에듀·비상교육 등 일반 교육업계 단순 기업 소식은 최하단 배치",
        "Commerce": "📋 라이브 커머스 기술·플랫폼 기사 상단 배치 (단순 배송 기사 제외)\n📋 숏폼 중 '숏핑' 등 커머스 연계 건만 배치\n일반 소비자 대상 상품 판촉·이벤트·완판·홈쇼핑 방송 홍보 기사 제외\n\n[3차 카테고리 세부 차단]\n🔧 쇼호스트·완판·홈쇼핑 론칭·방송 진행 등 B2C 방송 판촉 패턴 제외\n🔧 댄스·커버댄스·챌린지·뮤직비디오·신곡 등 엔터 콘텐츠 제외",
        "Media & Contents": "📋 방송통신 정책·인프라 규제 기사 최상단 배치\n📋 SOOP(숲) 플랫폼 기술 기사 적극 반영\n\n[3차 카테고리 세부 차단]\n🔧 드라마·예능·영화·시청률·캐스팅·개봉·독점공개 등 콘텐츠 가십 제외",
        "Others": "📋 글로벌 AI 서비스·플랫폼 국제 정세/트렌드 뉴스 위주 배치",
    }
}

def clean_html(text):
    if not text: return ""
    clean = re.sub(r'<[^>]+>', '', text)
    clean = clean.replace('&quot;', '"').replace('&apos;', "'").replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
    return clean

def extract_media_name(link, description=""):
    if not link or not isinstance(link, str): return "언론사 확인 필요"
    domain_map = {
        "etnews.com": "전자신문", "ddaily.co.kr": "디지털데일리", "inews24.com": "아이뉴스24",
        "mk.co.kr": "매일경제", "hankyung.com": "한국경제", "yna.co.kr": "연합뉴스",
        "newsis.com": "뉴시스", "news1.kr": "뉴스1", "mt.co.kr": "머니투데이",
        "edaily.co.kr": "이데일리", "chosun.com": "조선일보", "joongang.co.kr": "중앙일보",
        "donga.com": "동아일보", "bloter.net": "블로터", "zdnet.co.kr": "ZDNet Korea",
        "digitaltoday.co.kr": "디지털투데이", "techm.kr": "테크M"
    }
    for domain, name in domain_map.items():
        if domain in link: return name
    if "naver.com" in link:
        major = ["조선", "중앙", "동아", "매일경제", "한국경제", "연합뉴스", "뉴시스", "뉴스1", "머니투데이", "이데일리", "전자신문", "디지털데일리", "아이뉴스"]
        for m in major:
            if m in description: return m
        return "네이버뉴스"
    try:
        match = re.search(r'https?://(?:www\.)?([^/]+)', link)
        if match and match.group(1):
            return match.group(1).replace('.co.kr', '').replace('.com', '').replace('.net', '')
    except Exception: pass
    return "언론사 확인 필요"

# 🚀 100% 정확한 단어 매칭 및 한글 조사/접미사 처리 최적화 함수
def is_exact_match(text, keyword):
    if not text or not keyword:
        return False
    text_lower    = text.lower()
    keyword_lower = keyword.lower()

    # ✅ 복합 키워드(띄어쓰기 포함) 처리
    # "라이브 커머스", "이커머스 솔루션" 등 → 각 단어가 본문에 순서대로 있으면 매칭
    if " " in keyword_lower:
        parts = keyword_lower.split()
        return all(p in text_lower for p in parts)

    # 영어/숫자로만 이루어진 단일 키워드
    if re.match(r'^[a-zA-Z0-9\-]+$', keyword_lower):
        pattern = r'(?<![a-zA-Z0-9]){}(?![a-zA-Z0-9])'.format(re.escape(keyword_lower))
    else:
        # 한글 키워드: 앞 명사 붙음 방지 + 뒤 조사/접미사 허용
        pattern = r'(?<![가-힣a-zA-Z0-9]){}(?:은|는|이|가|을|를|의|에|로|으로|와|과|도|에서|에게|만|뿐|이랑|이나|이며|이고|이다|이라|처럼|만큼|보다|마저|조차|까지|부터|요|그룹|사|코리아|재단|홀딩스|벤처스)?(?![가-힣a-zA-Z0-9])'.format(re.escape(keyword_lower))

    return bool(re.search(pattern, text_lower))

def _read_json(path, fallback):
    """JSON 파일 읽기 — 실패 시 fallback 반환"""
    try:
        if os.path.exists(path):
            with open(path, "r", encoding="utf-8") as f:
                return json.load(f)
    except Exception:
        pass
    return fallback

def _build_company_profile(company: dict) -> str:
    """company.json → 제미나이 프롬프트용 기업 프로필 텍스트로 변환"""
    name    = company.get("name",    "")
    name_en = company.get("name_en", "")
    identity = company.get("identity", "")
    services = company.get("services", [])
    interests = company.get("interests", [])

    lines = [
        f"[{name}({name_en}) 기업 프로필 및 핵심 관심사]",
        f"1. 비즈니스 정체성: {identity}",
        "2. 주력 제품 및 서비스:",
    ]
    for svc in services:
        lines.append(f"   - {svc.get('name_en','')} ({svc.get('name','')}): {svc.get('desc','')}")
    lines.append("3. 핵심 관심 영역:")
    for interest in interests:
        lines.append(f"   - {interest}")

    return "\n        ".join(lines)



def load_config():
    """5개 JSON 파일에서 설정 로드 → 기존 구조와 동일한 dict 반환"""
    # categories.json — 키워드·notes
    cats_data  = _read_json(CONFIG_CATEGORIES, {})
    # settings.json  — 수집기간·발송시간 등
    sett_data  = _read_json(CONFIG_SETTINGS,   {})

    # keywords / notes 추출
    keywords, notes = {}, {}
    for cat, val in cats_data.items():
        if cat.startswith("_"): continue          # _comment 등 메타키 무시
        if isinstance(val, dict):
            keywords[cat] = val.get("keywords", DEFAULT_CONFIG["keywords"].get(cat, []))
            notes[cat]    = val.get("notes",    DEFAULT_CONFIG["notes"].get(cat, ""))

    # 누락된 카테고리는 DEFAULT_CONFIG로 보완
    for cat in DEFAULT_CONFIG["keywords"]:
        if cat not in keywords:
            keywords[cat] = DEFAULT_CONFIG["keywords"][cat]
        if cat not in notes:
            notes[cat] = DEFAULT_CONFIG["notes"][cat]

    return {
        "keywords":   keywords,
        "notes":      notes,
        "days_limit": sett_data.get("days_limit", DEFAULT_CONFIG["days_limit"]),
        "auto_hour":  sett_data.get("auto_hour",  9),
        "auto_min":   sett_data.get("auto_min",   0),
    }

def save_config(days_limit, keywords_map, notes_map, auto_hour=9, auto_min=0):
    """변경된 설정을 해당 JSON 파일에만 저장 — 나머지 파일 불변"""
    try:
        os.makedirs(CONFIG_DIR, exist_ok=True)

        # categories.json — 키워드·notes 저장
        cats_data = _read_json(CONFIG_CATEGORIES, {})
        for cat, kws in keywords_map.items():
            if cat not in cats_data:
                cats_data[cat] = {}
            cats_data[cat]["keywords"] = kws
            cats_data[cat]["notes"]    = notes_map.get(cat, "")
        with open(CONFIG_CATEGORIES, "w", encoding="utf-8") as f:
            json.dump(cats_data, f, ensure_ascii=False, indent=2)

        # settings.json — 수집기간·발송시간 저장
        sett_data = _read_json(CONFIG_SETTINGS, {})
        sett_data["days_limit"] = days_limit
        sett_data["auto_hour"]  = auto_hour
        sett_data["auto_min"]   = auto_min
        with open(CONFIG_SETTINGS, "w", encoding="utf-8") as f:
            json.dump(sett_data, f, ensure_ascii=False, indent=2)

    except Exception as e:
        print(f"[설정 저장 오류] {e}")

def make_hyperlink(row):
    link = row.get('링크', '')
    title = str(row.get('기사제목', '')).replace('"', '""').replace('\n', ' ')
    if link: return '=HYPERLINK("{}", "{}")'.format(link, title)
    return title

# ==========================================
# 3. 제미나이 AI 기반 '통합 벌크 배치' 필터 엔진 (수집 도메인 다각화 반영)
# ==========================================

def ask_gemini_bulk_refine(news_items_list, all_notes_context, _errors=None):
    global _gemini_key_index
    if not news_items_list:
        return {}

    valid_keys = [k for k in GEMINI_API_KEYS if k.strip()]
    if not valid_keys:
        print("[Gemini 경고] 유효한 API 키가 없습니다. 폴백으로 진행합니다.")
        return {str(i): "KEEP" for i, item in enumerate(news_items_list)}

    def call_chunk(chunk_items, id_offset):
        """청크 단위 호출 — 429 시 다음 키로 로테이션, 최대 키 수만큼 순환"""
        global _gemini_key_index
        input_package = [
            {
                "id": str(id_offset + local_idx),
                "keyword": item["검색키워드"],
                "category": item["구분"],
                "title": item["기사제목"],
                "summary": item.get("본문요약", "")
            }
            for local_idx, item in enumerate(chunk_items)
        ]

        # company.json 에서 기업 프로필 동적 로드
        _company = _read_json(CONFIG_COMPANY, {})
        _company_profile = _build_company_profile(_company)
        _company_name    = _company.get("name", "카테노이드")
        _company_name_en = _company.get("name_en", "Catenoid")

        prompt = f"""
        너는 동영상 테크 솔루션 기업 '{_company_name}({_company_name_en})'의 PR 전문 수석 검수관이다.
        기사 필터링(KEEP 또는 FILTERED_OUT) 여부를 판정하기 전, 아래의 기업 정체성과 서비스 특징, 핵심 관심사를 반드시 숙지하여 검수 기준으로 삼아라.

        ==================================================
        {_company_profile}
        ==================================================

        입력된 JSON 리스트 안의 뉴스 기사들이 수집된 카테고리(category)의 주의사항 및 수집 지침에 부합하는지 정밀 검수하고, 각 기사의 수집 유지 여부(KEEP 또는 FILTERED_OUT)를 판단하여 JSON 형태로 반환하라.

        [★ 실시간 실행창 주의사항 및 검수 지침 ★]
        {all_notes_context}

        [🚨 기사 처리 절대 원칙 - 매우 중요 🚨]
        1. 너는 기사의 카테고리(category)를 절대 임의로 변경할 수 없다. 오직 입력된 카테고리 기준 하에서 이 기사를 살려둘지(KEEP), 아니면 필터링하여 제외할지(FILTERED_OUT)만 결정하라.
        2. 기사 본문이나 제목에 자사 키워드(카테노이드, 콜러스 등)가 없음에도 "Catenoid" 카테고리로 변경하는 행위는 절대 엄금하며, 주어진 카테고리 상태 그대로 검증하라.

        [🚨 Industry Trends 및 Partners 카테고리 독점 필터 지침 - 매우 중요 🚨]
        1. 'Industry Trends' 및 'Partners' 카테고리는 오직 IT, 과학, 통신, 컴퓨팅, 미디어 분야에 직접 연계된 기술 도입, 디지털 혁신, SaaS/클라우드/MSP 시스템 고도화, B2B 제휴 및 인프라 구축 소식만 승인(KEEP)해야 한다.
        2. 단순 사회공헌 활동, 주식 시황 및 금융 주가 찌라시, 테크가 없는 일반 상거래 프로모션 입점 소식 등은 PR 가치가 없으므로 무조건 FILTERED_OUT 처리하라.

        [🚨 Commerce 카테고리 필터 지침 - 매우 중요 🚨]
        1. 'Commerce' 카테고리는 이커머스·라이브커머스·숏폼 커머스 관련 기사를 수집한다.
           아래 기사 유형은 모두 KEEP(승인) 처리하라:
           - 이커머스/라이브커머스/숏폼 커머스 시장 동향·트렌드 기사
           - 플랫폼·솔루션·기술 관련 기사
           - B2B 기술 도입·제휴·시장 분석 기사
           - AI 쇼호스트·가상 진행자 등 AI 기술 접목 기사
        2. 아래 유형만 FILTERED_OUT 처리하라:
           - 연예인·쇼호스트가 출연해 단순 상품을 판매·완판했다는 B2C 방송 홍보 기사
           - 농수산물·패션·뷰티 등 소비재 상품의 단순 판매·입점 광고 기사
           - 커머스와 전혀 무관한 일반 사건·사고·정치 기사

        [🚨 Media & Contents 카테고리 독점 필터 지침 - 매우 중요 🚨]
        1. 'Media & Contents' 카테고리는 동영상 스트리밍, OTT, CDN, 미디어자산관리(MAM), CMS 등 미디어 비즈니스 및 송출 기술/인프라/규제 정책 관련 기사만 승인(KEEP)해야 한다.
        2. 기사 제목이나 본문 요약에 연예인(가수, 배우, 아이돌, 그룹명, 셀럽 등 구체적인 인물명)이 언급되거나 이들의 컴백, 방송 출연, 신곡 출시, 개인 신상(열애, 사건사고) 등 단순 연예계 가십 뉴스인 경우 무조건 FILTERED_OUT 처리하라. (B2B 비디오 플랫폼 기술이나 CDN 솔루션 관점의 순수 기사만 통과시켜라.)
        3. 넷플릭스, 티빙, 웨이브 등 OTT 플랫폼 및 비디오 채널에서 특정 예능, 드라마, 영화, 다큐멘터리 시리즈 등 개별 콘텐츠가 새로 "론칭(런칭)", "공개", "독점 공개", "개봉", "방영"된다는 식의 단순 콘텐츠 마케팅/작품 홍보 기사는 미디어 인프라 전송 기술과 전혀 무관하므로 무조건 FILTERED_OUT 처리하라.

        [🚨 1순위 핵심 수집 도메인 원칙 - IT/과학, 통신/미디어, 컴퓨팅, 방송 분야 한정]
        기본적으로 모든 뉴스 기사는 각 언론 매체사의 'IT/과학', '통신/미디어', '컴퓨팅', '방송', '디지털/테크 하드웨어' 섹션 성격에 완벽히 부합해야 한다.
        망 이용료, 방송 기술/인프라, 컴퓨팅 서버 시스템, OTT 및 미디어 플랫폼 정책 소식은 적극 반영하되, 단순 사회 일반 사건 사고, 정치 공방, 일반 유통 가십은 무조건 탈락 시켜라.
        ※ 단, 'E-Learning' 카테고리는 IT 도메인 조건을 적용하지 않는다. 온라인교육·에듀테크·디지털교과서·LMS 등 교육 분야 기사는 사회/교육 섹션에 실리더라도 무조건 통과시켜라.

        [· AI 2차 정밀 검수 기준]
        ※ 코드 1차(키워드 매칭)·2차(공통 차단)·3차(카테고리 차단)를 통과한 기사에 적용
        ※ 아래 기준 중 하나라도 해당하면 "FILTERED_OUT"

        [전 카테고리 공통]
        1. IT/과학·통신/미디어·컴퓨팅·방송 분야와 전혀 무관한 기사
        2. 소속사가 있는 연예인(가수·배우·아이돌) 주어의 가십성 기사
           단, 해당 엔터사가 IT/테크 B2B 파트너로 언급된 기사는 예외 통과
        3. 단순 증시·주가 변동 금융 기사
        4. 식재료·농수산물·소비재 상품 광고성 기사
        5. 일반 소비자 대상 상품 판촉·이벤트·완판·홈쇼핑 방송 홍보 기사

        [Catenoid]
        6. 카테노이드 비즈니스(OVP·CDN·숏폼 테크·SaaS)와 실질적으로 무관한 단순 언급 기사

        [Industry Trends / Partners]
        7. 기업명이 단순 나열 수준으로만 등장하는 기사 (공식 경영·기술 소식이 아닌 것)
        8. 맥주 브랜드 '클라우드(Kloud)'·롯데칠성 주류 판촉 기사

        [Customers]
        9. 단독 판매·특가·할인 행사·팝업스토어 등 B2C 마케팅·프로모션 기사
        10. 경영 성과·사업 제휴·신기술 도입과 무관한 단순 상품 홍보 기사

        [E-Learning]
        11. E-Learning 카테고리는 IT 도메인 조건 미적용 — 교육 분야 기사는 섹션 무관하게 통과

        [Commerce]
        12. 연예인·쇼호스트 출연 단순 완판 홍보 기사, 소비재 상품 판매·입점 광고 기사만 제외
            시장 동향·트렌드·플랫폼·기술 기사는 모두 통과

        [Media & Contents]
        12. 드라마·예능·영화·OTT 콘텐츠의 론칭·시청률·캐스팅·개봉 등 콘텐츠 소비 기사

        [Others]
        13. AI 기술 접목 동영상 서비스·글로벌 스트리밍 산업과 무관한 단순 AI 칩셋·하드웨어 기사

        [출력 양식]
        오직 각 id에 대응하는 결과(KEEP 또는 FILTERED_OUT)를 담은 순수 JSON 맵 구조로만 반환하라. 설명 금지.
        예시: {{"0": "KEEP", "1": "FILTERED_OUT", "2": "KEEP"}}

        [분석할 뉴스 데이터]
        {json.dumps(input_package, ensure_ascii=False, indent=2)}
        """

        for _ in range(len(valid_keys)):
            current_key = valid_keys[_gemini_key_index % len(valid_keys)]
            key_label = f"키{(_gemini_key_index % len(valid_keys)) + 1}"
            
            is_quota_error = False
            raw_text = ""
            
            try:
                # 📡 [보안 폴백 결합]: google-genai 라이브러리가 없는 사내 PC 배포용 자동 HTTP 우회 통신망 연동
                if HAS_GENAI:
                    client = genai.Client(api_key=current_key)
                    response = client.models.generate_content(
                        model='gemini-2.5-flash-lite',
                        contents=prompt,
                        config=types.GenerateContentConfig(response_mime_type="application/json")
                    )
                    raw_text = response.text.strip()
                else:
                    raise ImportError("google-genai Library is missing. Falling back to HTTP Direct request.")
            except Exception as e:
                err_str = str(e)
                if '429' in err_str or 'RESOURCE_EXHAUSTED' in err_str:
                    is_quota_error = True
                else:
                    # 📡 Direct HTTP Post 통신 폴백 구동 (429가 아닐 때만 보조 가동)
                    try:
                        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={current_key}"
                        payload = {
                            "contents": [{"parts": [{"text": prompt}]}],
                            "generationConfig": {
                                "responseMimeType": "application/json"
                            }
                        }
                        headers = {"Content-Type": "application/json"}
                        response = requests.post(url, json=payload, headers=headers, timeout=20)
                        if response.status_code == 200:
                            raw_text = response.json()['candidates'][0]['content']['parts'][0]['text'].strip()
                        elif response.status_code == 429:
                            is_quota_error = True
                        else:
                            raise Exception(f"HTTP Direct Call Failed: {response.status_code}")
                    except Exception as http_err:
                        if '429' in str(http_err):
                            is_quota_error = True
                        else:
                            print(f"[Gemini 오류] {key_label}: {http_err}")
                            break

            # [429 핵심 우회 최적화]: 한도 소진 감지 시 즉각 타임아웃 지연 없이 다음 키 인덱스로 전환 처리
            if is_quota_error:
                print(f"[Gemini] {key_label} 한도 소진 → 즉시 다음 키로 로테이션 전환...")
                _gemini_key_index += 1
                time.sleep(1.5)
                continue

            if raw_text:
                # 🚀 백틱의 마크다운 렌더링 충돌로 인한 코드 잘림 방지를 위해 \x60{3} 사용
                raw_text = re.sub(r'^\x60{3}(?:json)?\s*', '', raw_text)
                raw_text = re.sub(r'\s*\x60{3}$', '', raw_text)
                try:
                    return json.loads(raw_text)
                except Exception:
                    pass

        print("[Gemini] 모든 키 소진 또는 오류 — 해당 청크 원래 구분으로 통과")
        return {str(id_offset + idx): "KEEP" for idx, item in enumerate(chunk_items)}

    # 청크 크기를 20으로 늘려 API 요청 횟수를 줄입니다 (15 RPM 최적화 보강)
    CHUNK_SIZE = 20
    merged = {}
    chunks = [news_items_list[i:i+CHUNK_SIZE] for i in range(0, len(news_items_list), CHUNK_SIZE)]
    for chunk_idx, chunk in enumerate(chunks):
        merged.update(call_chunk(chunk, chunk_idx * CHUNK_SIZE))
        if chunk_idx < len(chunks) - 1:
            # 대기 시간을 5초로 늘려 분당 12회 이하로 완벽히 요청 속도를 제어합니다.
            time.sleep(5)
    return merged

def is_duplicate_by_rules(title1, title2):
    """규칙 기반 중복 판정 — 단어 2개 이상 or 음절 10개 이상 중복"""
    t1_words = [w for w in re.sub(r'[^가-힣a-zA-Z0-9 ]', '', title1).split() if len(w) >= 2]
    t2_clean = re.sub(r'[^가-힣a-zA-Z0-9 ]', '', title2)
    # 단어 2개 이상 중복 (기존 3개 → 2개로 강화)
    match_count = sum(1 for word in t1_words if word in t2_clean)
    if match_count >= 2: return True
    # 음절 10개 이상 연속 중복
    t1_pure = re.sub(r'[^가-힣a-zA-Z0-9]', '', title1)
    t2_pure = re.sub(r'[^가-힣a-zA-Z0-9]', '', title2)
    if len(t1_pure) >= 10 and len(t2_pure) >= 10:
        for i in range(len(t1_pure) - 9):
            if t1_pure[i:i+10] in t2_pure: return True
    return False

def _cosine_sim_fallback(titles: list) -> list:
    """scikit-learn 없을 때 간단한 자카드 유사도로 클러스터링"""
    def jaccard(s1, s2):
        w1 = set(re.sub(r'[^가-힣a-zA-Z0-9 ]','',s1).split())
        w2 = set(re.sub(r'[^가-힣a-zA-Z0-9 ]','',s2).split())
        if not w1 or not w2: return 0.0
        return len(w1 & w2) / len(w1 | w2)
    keep, dropped = [], set()
    for i in range(len(titles)):
        if i in dropped: continue
        keep.append(i)
        for j in range(i+1, len(titles)):
            if is_duplicate_by_rules(titles[i], titles[j]) or jaccard(titles[i], titles[j]) >= 0.7:
                dropped.add(j)
    return keep

def remove_duplicates_advanced(df_group):
    """중복 제거 — TF-IDF 70% or 코사인 85% or 규칙 기반"""
    if df_group.empty or len(df_group) <= 1: return df_group
    df_group = df_group.sort_values(by='인기점수', ascending=True).reset_index(drop=True)
    titles = df_group['기사제목'].tolist()

    try:
        from sklearn.feature_extraction.text import TfidfVectorizer
        from sklearn.metrics.pairwise import cosine_similarity

        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(titles)
        sim_matrix   = cosine_similarity(tfidf_matrix, tfidf_matrix)

        keep, dropped = [], set()
        for i in range(len(titles)):
            if i in dropped: continue
            keep.append(i)
            for j in range(i+1, len(titles)):
                # TF-IDF 70% 이상 or 코사인 85% 이상 or 규칙 기반
                if (sim_matrix[i][j] >= 0.85 or
                    sim_matrix[i][j] >= 0.70 or
                    is_duplicate_by_rules(titles[i], titles[j])):
                    dropped.add(j)
        return df_group.iloc[keep].reset_index(drop=True)

    except ImportError:
        keep = _cosine_sim_fallback(titles)
        return df_group.iloc[keep].reset_index(drop=True)

def send_email_with_summary(file_path, file_name, summary_html, days_limit):
    msg = MIMEMultipart('alternative')
    # 수신자 목록 — settings.json 우선, 없으면 SENDER_EMAIL 폴백
    _sett = _read_json(CONFIG_SETTINGS, {})
    _receivers = _sett.get("receiver_emails", [SENDER_EMAIL])
    if not _receivers:
        _receivers = [SENDER_EMAIL]

    _smtp_cfg = _read_json(CONFIG_DEVELOPER, {}).get("smtp", {})
    _from = _smtp_cfg.get("sender_email", SENDER_EMAIL) or SENDER_EMAIL

    msg['From'] = _from
    msg['To']   = ", ".join(_receivers)
    
    today_str = datetime.now().strftime('%Y-%m-%d')
    # ✉️ [이메일 제목 형식 최종 정정 업데이트]
    msg['Subject'] = f"[자동발송] 카테노이드 뉴스 모니터링 리포트 ({today_str})"
    time_text = "오늘" if days_limit <= 1 else f"최근 {days_limit}일간"
    
    html_body = f"""
    <html>
    <body style="font-family: '맑은 고딕', sans-serif; line-height: 1.6; color: #333333;">
        <h2>📊 {time_text} 주요 뉴스 모니터링 요약 (구분별 Top 15)</h2>
        <p>안녕하세요, PR 담당자님. {time_text} 포털에서 주목도가 가장 높았던 각 카테고리별<br>
        핵심 뉴스 리포트 요약입니다.<br>
        (기사 제목을 클릭하시면 해당 언론사 원문 페이지로 즉시 연결됩니다.)</p>
        <br>
        {summary_html}
        <br>
        <hr style="border: 0; border-top: 1px solid #eeeeee;">
        <p style="font-size: 13px; color: #888888;">※ 전체 데이터 리포트는 첨부된 엑셀 파일을 참조해 주세요.</p>
    </body>
    </html>
    """
    msg.attach(MIMEText(html_body, 'html', 'utf-8'))
    try:
        receiver_list = [email.strip() for email in RECEIVER_EMAIL.split(',') if email.strip()]
        if os.path.exists(file_path):
            with open(file_path, "rb") as attachment:
                part = MIMEBase('application', 'octet-stream')
                part.set_payload(attachment.read())
                encoders.encode_base64(part)
                part.add_header('Content-Disposition', 'attachment', filename=(Header(file_name, 'utf-8').encode()))
                msg.attach(part)
        _d = _read_json(CONFIG_DEVELOPER, {}).get("smtp", {})
        _srv  = _d.get("server",   SMTP_SERVER)
        _port = int(_d.get("port", SMTP_PORT))
        _pw   = _d.get("sender_password", SENDER_PASSWORD)
        server = smtplib.SMTP(_srv, _port)
        server.starttls()
        server.login(_from, _pw)
        _final_receivers = _sett.get("receiver_emails", [SENDER_EMAIL]) or [SENDER_EMAIL]
        server.sendmail(_from, _final_receivers, msg.as_string())
        return True
    except Exception: return False

def send_slack_notification(summary_html, days_limit):
    """슬랙 웹훅으로 뉴스 요약 발송"""
    sett = _read_json(CONFIG_SETTINGS, {})
    webhook_url = sett.get("slack_webhook_url", "").strip()
    if not webhook_url:
        return False
    try:
        import requests as _req, json as _json, re as _re
        today_str = datetime.now().strftime("%Y-%m-%d")
        text_body = _re.sub(r'<[^>]+>', '', summary_html)
        for o, n in [('&lt;','<'),('&gt;','>'),('&amp;','&'),('&nbsp;',' ')]:
            text_body = text_body.replace(o, n)
        text_body = _re.sub(r"\n{3,}", "\n\n", text_body).strip()
        payload = {
            "blocks": [
                {"type": "header",
                 "text": {"type": "plain_text",
                          "text": f"PR 뉴스 모니터링 리포트 — {today_str}"}},
                {"type": "section",
                 "text": {"type": "mrkdwn",
                          "text": f"최근 {days_limit}일 뉴스 클리핑 결과입니다."}},
                {"type": "divider"},
                {"type": "section",
                 "text": {"type": "mrkdwn",
                          "text": text_body[:2800]}}
            ]
        }
        resp = _req.post(webhook_url,
                         data=_json.dumps(payload),
                         headers={"Content-Type": "application/json"},
                         timeout=10)
        return resp.status_code == 200
    except Exception as e:
        print(f"[슬랙 발송 실패]: {e}")
        return False

# ==========================================
# 4. 네이버 오리지널 통신 규격 모듈
# ==========================================

def get_naver_news(keyword, days_limit, category):
    from email.utils import parsedate_to_datetime
    url = "https://openapi.naver.com/v1/search/news.json"
    headers = {"X-Naver-Client-Id": NAVER_CLIENT_ID, "X-Naver-Client-Secret": NAVER_CLIENT_SECRET}
    news_list = []
    limit_date = datetime.now() - timedelta(days=days_limit)

    # 정확도순으로 최대 100건씩 페이지 순회 — 기간 내 기사가 없을 때까지 수집
    start = 1
    while start <= 1000:  # 네이버 API 최대 1000건 제한
        params = {"query": keyword, "display": 100, "start": start, "sort": "sim"}
        try:
            response = requests.get(url, headers=headers, params=params, timeout=10)
            if response.status_code != 200:
                break
            items = response.json().get('items', [])
            if not items:
                break  # 더 이상 결과 없음

            found_in_range = False  # 이번 페이지에서 기간 내 기사가 하나라도 있었는지

            for idx, item in enumerate(items):
                try:
                    pub_date = parsedate_to_datetime(item['pubDate']).replace(tzinfo=None)
                except Exception:
                    try:
                        pub_date = datetime.strptime(item['pubDate'][:-6].strip(), "%a, %d %b %Y %H:%M:%S")
                    except Exception:
                        continue

                if pub_date < limit_date:
                    continue
                found_in_range = True  # 기간 내 기사 발견

                title       = clean_html(item['title'])
                description = clean_html(item['description'])
                final_link  = item.get('originallink') or item.get('link', '')

                if any(domain in final_link for domain in INVALID_DOMAINS):
                    continue

                title_lower   = title.lower()
                desc_lower    = description.lower()
                keyword_lower = keyword.lower()

                # ══════════════════════════════════════════════════
                # 1차 필터: 키워드 매칭
                # ══════════════════════════════════════════════════

                # [Catenoid] 제목 OR 내용에 키워드 100% 포함 시 즉시 수집
                #   → 이후 모든 필터(2차·3차) 적용하지 않음
                #   → 제미나이 AI가 무관 기사 걸러냄
                # [Catenoid 예외] 찰나·룸엑스 등 일반 명사는 추가 조건 필요
                # [그 외 전체] 제목에 키워드 있어야 수집 → 2차·3차 필터 적용
                CATENOID_GENERAL_NOUNS = ["찰나", "룸엑스"]

                if category == "Catenoid":
                    # 일반 명사 키워드 — 제목 OR description 매칭 + 추가 조건
                    if keyword_lower in [k.lower() for k in CATENOID_GENERAL_NOUNS]:
                        if not (is_exact_match(title, keyword) or is_exact_match(description, keyword)):
                            continue
                        # 찰나 — 숏폼 or 카테노이드 문맥 없으면 차단
                        if keyword_lower == "찰나":
                            if not ("숏폼" in title_lower or "숏폼" in desc_lower or
                                    "카테노이드" in title_lower or "카테노이드" in desc_lower):
                                continue
                        # Charlla(charlla) 는 브랜드명이지만 소문자 룸엑스처럼 처리
                    else:
                        # 브랜드명 키워드 — 제목 OR 내용에 있으면 즉시 수집, 필터 건너뜀
                        if not (is_exact_match(title, keyword) or is_exact_match(description, keyword)):
                            continue
                        # ✅ 필터 없이 바로 수집
                        news_list.append({
                            "구분": category,
                            "검색키워드": keyword,
                            "기사제목": title,
                            "본문요약": description,
                            "배포일자": pub_date.strftime("%Y-%m-%d %H:%M"),
                            "언론사": extract_media_name(final_link, description),
                            "링크": final_link,
                            "검색포털": "네이버",
                            "인기점수": idx
                        })
                        continue  # 2차·3차 필터 건너뜀
                else:
                    # 그 외 카테고리 — 제목에 키워드 있어야 수집
                    if not is_exact_match(title, keyword):
                        continue

                # ══════════════════════════════════════════════════
                # 2차 필터: 전 카테고리 공통 차단 (Catenoid 일반명사만 적용)
                # ══════════════════════════════════════════════════

                # 공통 하드 차단어 (채용, 증시, 연예, 식재료 등)
                if any(w in title or w in description for w in EXCLUDE_WORDS):
                    continue

                # 연예인/엔터테인먼트 차단
                if any(w in title or w in description for w in CELEBRITY_FILTER_WORDS):
                    continue

                # ══════════════════════════════════════════════════
                # 3차 필터: 카테고리별 세부 차단
                # ══════════════════════════════════════════════════

                # [Customers] 대교 — 교량/교가/지명 차단
                if keyword_lower == "대교":
                    combined = title + " " + description
                    if any(re.search(p, combined) for p in DAEGYO_BLOCK_PATTERNS):
                        continue

                # [Customers] 순수 B2C 상품 판촉/완판 차단
                if category == "Customers":
                    b2c_promo = [
                        "단독 판매", "특가 판매", "할인 행사", "세일 행사",
                        "사은품 증정", "기획전 오픈", "팝업스토어",
                        "홈쇼핑 특가", "방송 특가", "최저가", "조기 완판", "완판"
                    ]
                    if any(p in title or p in description for p in b2c_promo):
                        continue

                # [Commerce] 순수 B2C 방송/쇼호스트/완판 차단
                if category == "Commerce":
                    b2c_blocks = [
                        "쇼호스트", "쇼핑호스트", "완판", "조기 완판",
                        "홈쇼핑 론칭", "홈쇼핑선봬", "홈쇼핑 선봬",
                        "방송 진행", "방송진행", "라방 진행", "라방진행"
                    ]
                    if any(cb in title or cb in description for cb in b2c_blocks):
                        continue

                # [Media & Contents] 연예/드라마/영화 콘텐츠 가십 차단
                if category == "Media & Contents":
                    media_blocks = [
                        "드라마", "예능", "영화", "시리즈", "시청률", "캐스팅",
                        "방영", "독점 공개", "독점공개", "개봉", "상영",
                        "열애", "결별", "콘서트", "팬미팅", "앨범"
                    ]
                    if any(mb in title or mb in description for mb in media_blocks):
                        continue

                news_list.append({
                    "구분": category,
                    "검색키워드": keyword,
                    "기사제목": title,
                    "본문요약": description,
                    "배포일자": pub_date.strftime("%Y-%m-%d %H:%M"),
                    "언론사": extract_media_name(final_link, description),
                    "링크": final_link,
                    "검색포털": "네이버",
                    "인기점수": idx
                })
            if not found_in_range:
                break  # 이번 페이지 전체가 기간 밖 → 더 수집할 필요 없음

            start += 100  # 다음 페이지

        except Exception as e:
            print(f"[네이버 API 오류] {keyword}: {e}")
            break

    return news_list

# ==========================================
# 5. 대시보드 UI 및 프로그램 제어 클래스
# ==========================================

class ModernMonitoringApp:
    # ── 색상 팔레트 ──────────────────────────────────────────
    # ── 라이트 테마 색상 ────────────────────────────────────
    C_BG        = "#f4f6f9"   # 앱 배경 (연한 회색)
    C_PANEL     = "#ffffff"   # 패널 배경 (흰색)
    C_CARD      = "#ffffff"   # 카드 배경
    C_BORDER    = "#e2e8f0"   # 테두리 (연한 회색)
    C_ACCENT    = "#2563eb"   # 포인트 블루
    C_ACCENT2   = "#0d9488"   # 틸 그린
    C_DANGER    = "#dc2626"   # 삭제/위험
    C_TEXT      = "#1e293b"   # 기본 텍스트 (딥 네이비)
    C_TEXT_SUB  = "#64748b"   # 서브 텍스트 (중간 회색)
    C_KW_BG     = "#f8fafc"   # 입력창 배경 (아주 연한 회색)
    C_NOTE_BG   = "#fefce8"   # 주의사항 배경 (연한 노랑)
    C_NOTE_ACC  = "#fef3c7"   # 주의사항 강조

    # ── 폰트 시스템 (완전 통일 — 11pt 기준) ─────────────
    F_H1    = ("맑은 고딕", 13, "bold")   # 앱 제목
    F_H2    = ("맑은 고딕", 11, "bold")   # 섹션 제목
    F_BODY  = ("맑은 고딕", 11)           # 일반 텍스트·입력창
    F_SMALL = ("맑은 고딕", 10)           # 보조 설명
    F_BTN   = ("맑은 고딕", 11, "bold")   # 버튼
    # ─────────────────────────────────────────────────────

    def __init__(self, root):
        self.root = root
        self.root.title("뉴스클리핑 — 카테노이드 PR 모니터링")
        self.root.geometry("1400x960")
        self.root.configure(bg=self.C_BG)
        self.root.minsize(1200, 700)

        self.style = ttk.Style()
        self.style.theme_use("clam")
        self.style.configure("TProgressbar",
            thickness=4, troughcolor=self.C_BORDER,
            background=self.C_ACCENT, bordercolor=self.C_PANEL)
        self.style.configure("Vertical.TScrollbar",
            background=self.C_BORDER, troughcolor=self.C_BG,
            bordercolor=self.C_BG, arrowcolor=self.C_TEXT_SUB,
            width=10)
        self.style.configure("Tab.TNotebook",
            background=self.C_PANEL, borderwidth=0, tabmargins=[0,0,0,0])
        self.style.configure("Tab.TNotebook.Tab",
            font=("맑은 고딕", 11), padding=(20, 10),
            background=self.C_PANEL, foreground=self.C_TEXT_SUB,
            borderwidth=0)
        self.style.map("Tab.TNotebook.Tab",
            background=[("selected", self.C_PANEL)],
            foreground=[("selected", self.C_ACCENT)],
            relief=[("selected", "flat"), ("!selected", "flat")])
        self.style.configure("TCombobox",
            fieldbackground=self.C_CARD, background=self.C_CARD,
            foreground=self.C_TEXT, arrowcolor=self.C_TEXT_SUB,
            bordercolor=self.C_BORDER)

        self.app_config = load_config()
        self.is_running  = False
        self.tray_icon   = None
        self._auto_run_job = None
        self.row_entries = []

        self._build_header()
        self._build_tabs()

    # ── 공통 버튼 헬퍼 ──────────────────────────────────────
    def _save_bar(self, parent, save_cmd, extra_btns=None):
        """탭 하단 저장 바 — 각 탭 공통"""
        bar = tk.Frame(parent, bg=self.C_BG)
        bar.pack(fill="x", padx=20, pady=(8, 16))
        tk.Frame(bar, bg=self.C_BORDER, height=1).pack(fill="x", pady=(0, 10))
        btn_row = tk.Frame(bar, bg=self.C_BG)
        btn_row.pack(fill="x")
        if extra_btns:
            for label, bg_c, hover_c, cmd in extra_btns:
                self._btn(btn_row, label, bg_c, hover_c, cmd,
                          fg_color="#ffffff").pack(side="right", padx=(6, 0))
        self._btn(btn_row, "저장", self.C_ACCENT, "#2563eb",
                  save_cmd, fg_color="#ffffff").pack(side="right")
        return bar

    def _btn(self, parent, text, bg, hover_bg, cmd, bold=True, fg_color="#ffffff"):
        btn = tk.Button(parent, text=text, bg=bg, fg=fg_color,
                        font=("맑은 고딕", 11, "bold" if bold else "normal"),
                        bd=0, cursor="hand2", padx=14, pady=7,
                        activebackground=hover_bg, activeforeground=fg_color,
                        relief="flat", command=cmd)
        btn.bind("<Enter>", lambda e: btn.config(bg=hover_bg))
        btn.bind("<Leave>", lambda e: btn.config(bg=bg))
        return btn

    # ── 헤더 ─────────────────────────────────────────────────
    def _build_header(self):
        hdr = tk.Frame(self.root, bg=self.C_PANEL, height=64)
        hdr.pack(fill="x")
        hdr.pack_propagate(False)
        tk.Frame(hdr, bg=self.C_BORDER, height=1).pack(side="bottom", fill="x")

        left = tk.Frame(hdr, bg=self.C_PANEL)
        left.pack(side="left", padx=20, fill="y")
        logo_row = tk.Frame(left, bg=self.C_PANEL)
        logo_row.pack(anchor="w", pady=14)

        logo_box = tk.Frame(logo_row, bg=self.C_ACCENT, width=32, height=32)
        logo_box.pack(side="left", padx=(0, 10))
        logo_box.pack_propagate(False)
        tk.Label(logo_box, text="N", font=("맑은 고딕", 14, "bold"),
                 fg="#ffffff", bg=self.C_ACCENT).pack(expand=True)

        title_col = tk.Frame(logo_row, bg=self.C_PANEL)
        title_col.pack(side="left")
        tk.Label(title_col, text="PR 뉴스 모니터링",
                 font=("맑은 고딕", 12, "bold"),
                 fg=self.C_TEXT, bg=self.C_PANEL).pack(anchor="w")
        tk.Label(title_col, text="카테노이드",
                 font=("맑은 고딕", 10),
                 fg=self.C_TEXT_SUB, bg=self.C_PANEL).pack(anchor="w")

        right = tk.Frame(hdr, bg=self.C_PANEL)
        right.pack(side="right", padx=20, fill="y")
        btn_row = tk.Frame(right, bg=self.C_PANEL)
        btn_row.pack(side="right", fill="y")

        # 완전히 종료 (맨 오른쪽)
        self._btn(btn_row, "완전히 종료", "#64748b", "#475569",
                  self._quit_app, bold=False,
                  fg_color="#ffffff").pack(side="right", padx=(6, 0), pady=16)

        # 모니터링 실행
        self._btn(btn_row, "모니터링 실행", self.C_ACCENT, "#2563eb",
                  self.start_thread, bold=True,
                  fg_color="#ffffff").pack(side="right", padx=(6, 0), pady=16)

        # 전체 저장 (맨 왼쪽)
        self._btn(btn_row, "전체 저장", self.C_ACCENT2, "#0b7a6a",
                  self._save_all, bold=False,
                  fg_color="#ffffff").pack(side="right", padx=(0, 0), pady=16)
    def _build_tabs(self):
        """6개 탭 생성 — 각 탭은 독립된 프레임"""
        self.notebook = ttk.Notebook(self.root, style="Tab.TNotebook")
        self.notebook.pack(fill="both", expand=True, padx=0, pady=0)

        # 탭 프레임 생성
        self.tab_company  = tk.Frame(self.notebook, bg=self.C_BG)   # 탭1
        self.tab_category = tk.Frame(self.notebook, bg=self.C_BG)   # 탭2
        self.tab_ai       = tk.Frame(self.notebook, bg=self.C_BG)   # 탭3
        self.tab_settings = tk.Frame(self.notebook, bg=self.C_BG)   # 탭4
        self.tab_dev      = tk.Frame(self.notebook, bg=self.C_BG)   # 탭5
        self.tab_test     = tk.Frame(self.notebook, bg=self.C_BG)   # 탭6

        self.notebook.add(self.tab_company,  text="기업·서비스 정보")
        self.notebook.add(self.tab_category, text="카테고리·키워드")
        self.notebook.add(self.tab_ai,       text="·  AI 필터 기준")
        self.notebook.add(self.tab_settings, text=" 운영 설정")
        self.notebook.add(self.tab_dev,      text="·  개발자 설정")
        self.notebook.add(self.tab_test,     text="테스트")

        # 각 탭 내용 구성
        self._build_tab1_company(self.tab_company)
        self._build_tab2_category(self.tab_category)
        self._build_tab3_ai(self.tab_ai)
        self._build_tab4_settings(self.tab_settings)
        self._build_tab5_dev(self.tab_dev)
        self._build_tab6_test(self.tab_test)

        # 기본 탭: 카테고리·키워드 (탭2)
        self.notebook.select(1)
        # 마우스 휠 — 전체 창에 바인딩
        self.root.bind_all("<MouseWheel>", self._on_mouse_wheel)

    # ── 탭1: 기업·서비스 정보 (입력 폼) ─────────────────────
    def _build_tab1_company(self, parent):
        """탭1: 기업정보 — 기업명·정체성·서비스·관심영역 → AI 프롬프트 주입"""
        company = _read_json(CONFIG_COMPANY, {})

        container = tk.Frame(parent, bg=self.C_BG)
        container.pack(fill="both", expand=True)
        cv = tk.Canvas(container, bg=self.C_BG, bd=0, highlightthickness=0)
        sb2 = ttk.Scrollbar(container, orient="vertical", command=cv.yview,
                            style="Vertical.TScrollbar")
        sf2 = tk.Frame(cv, bg=self.C_BG)
        sf2.bind("<Configure>", lambda e: cv.configure(scrollregion=cv.bbox("all")))
        cv.create_window((0, 0), window=sf2, anchor="nw")
        cv.configure(yscrollcommand=sb2.set)
        cv.pack(side="left", fill="both", expand=True)
        sb2.pack(side="right", fill="y")
        wrap = tk.Frame(sf2, bg=self.C_BG)
        wrap.pack(fill="x", padx=20, pady=16)

        def section(title, icon, note=""):
            f = tk.Frame(wrap, bg=self.C_PANEL,
                         highlightthickness=1, highlightbackground=self.C_BORDER)
            f.pack(fill="x", pady=(0, 10))
            hdr = tk.Frame(f, bg=self.C_PANEL)
            hdr.pack(fill="x", padx=14, pady=(10, 2))
            tk.Label(hdr, text=f"{icon}  {title}",
                     font=("맑은 고딕", 11, "bold"),
                     fg=self.C_ACCENT, bg=self.C_PANEL).pack(side="left")
            if note:
                tk.Label(hdr, text=f"  {note}",
                         font=("맑은 고딕", 11), fg=self.C_TEXT_SUB,
                         bg=self.C_PANEL).pack(side="left")
            body = tk.Frame(f, bg=self.C_PANEL)
            body.pack(fill="x", padx=14, pady=(4, 12))
            return body

        # ── 기업 기본 정보 ──
        b1 = section("기업 기본 정보", "[기업]")
        row1 = tk.Frame(b1, bg=self.C_PANEL)
        row1.pack(fill="x")
        tk.Label(row1, text="기업명", width=8, anchor="w",
                 font=("맑은 고딕", 11), fg=self.C_TEXT_SUB,
                 bg=self.C_PANEL).pack(side="left")
        self._co_name = tk.Entry(row1, font=("맑은 고딕", 11), fg=self.C_TEXT,
                                 bg=self.C_KW_BG, bd=0,
                                 insertbackground=self.C_ACCENT, width=16)
        self._co_name.insert(0, company.get("name", ""))
        self._co_name.pack(side="left", ipady=4, padx=(0, 16))
        tk.Label(row1, text="영문명", width=8, anchor="w",
                 font=("맑은 고딕", 11), fg=self.C_TEXT_SUB,
                 bg=self.C_PANEL).pack(side="left")
        self._co_name_en = tk.Entry(row1, font=("맑은 고딕", 11), fg=self.C_TEXT,
                                    bg=self.C_KW_BG, bd=0,
                                    insertbackground=self.C_ACCENT, width=16)
        self._co_name_en.insert(0, company.get("name_en", ""))
        self._co_name_en.pack(side="left", ipady=4)

        # ── 비즈니스 정체성 ──
        b2 = section("비즈니스 정체성", "💼",
                     "AI가 B2C 기사를 거를 때 이 내용을 기준으로 판단합니다")
        tk.Label(b2, text="한두 문장으로 사업 성격과 하지 않는 비즈니스를 명확히 적어주세요.",
                 font=("맑은 고딕", 11), fg=self.C_TEXT_SUB,
                 bg=self.C_PANEL).pack(anchor="w", pady=(0, 4))
        self._co_identity = tk.Text(b2, height=3,
            font=("맑은 고딕", 11), fg=self.C_TEXT,
            bg=self.C_KW_BG, bd=0, wrap="word",
            padx=8, pady=6, insertbackground=self.C_ACCENT)
        self._co_identity.insert("1.0", company.get("identity", ""))
        self._co_identity.pack(fill="x")

        # ── 주력 서비스 ──
        b3 = section("주력 서비스", "[서비스]",
                     "AI가 자사 관련 기사를 판단할 때 기준으로 씁니다")
        self._services_frame = tk.Frame(b3, bg=self.C_PANEL)
        self._services_frame.pack(fill="x")
        for svc in company.get("services", []):
            self._add_service_row(svc.get("name_en",""), svc.get("name",""), svc.get("desc",""))
        self._btn(b3, "＋ 서비스 추가", self.C_ACCENT2, "#0b7a6a",
                  lambda: self._add_service_row()).pack(anchor="w", pady=(6, 0))

        # ── 핵심 관심 영역 ──
        b4 = section("핵심 관심 영역", "[관심영역]",
                     "AI가 경계선 기사의 관련성을 판단할 때 기준으로 씁니다")
        self._interests_frame = tk.Frame(b4, bg=self.C_PANEL)
        self._interests_frame.pack(fill="x")
        for interest in company.get("interests", []):
            self._add_interest_row(interest)
        self._btn(b4, "＋ 항목 추가", self.C_ACCENT2, "#0b7a6a",
                  lambda: self._add_interest_row()).pack(anchor="w", pady=(6, 0))

        # ── 저장 버튼 ──
        self._save_bar(wrap, self._save_company_tab)

    def _add_service_row(self, name_en="", name="", desc=""):
        row = tk.Frame(self._services_frame, bg=self.C_PANEL)
        row.pack(fill="x", pady=2)
        e_en = tk.Entry(row, width=14, font=("맑은 고딕", 11), fg=self.C_ACCENT,
                        bg=self.C_KW_BG, bd=0, insertbackground=self.C_ACCENT)
        e_en.insert(0, name_en)
        e_en.pack(side="left", ipady=3, padx=(0, 4))
        tk.Label(row, text="(", fg=self.C_TEXT_SUB, bg=self.C_PANEL,
                 font=("맑은 고딕", 11)).pack(side="left")
        e_ko = tk.Entry(row, width=8, font=("맑은 고딕", 11), fg=self.C_TEXT,
                        bg=self.C_KW_BG, bd=0, insertbackground=self.C_ACCENT)
        e_ko.insert(0, name)
        e_ko.pack(side="left", ipady=3)
        tk.Label(row, text=")", fg=self.C_TEXT_SUB, bg=self.C_PANEL,
                 font=("맑은 고딕", 11)).pack(side="left", padx=(0, 6))
        e_desc = tk.Entry(row, width=38, font=("맑은 고딕", 11), fg=self.C_TEXT,
                          bg=self.C_KW_BG, bd=0, insertbackground=self.C_ACCENT)
        e_desc.insert(0, desc)
        e_desc.pack(side="left", ipady=3, padx=(0, 6))
        tk.Button(row, text="✕", fg=self.C_DANGER, bg=self.C_PANEL,
                  font=("맑은 고딕", 11), bd=0, cursor="hand2",
                  command=row.destroy).pack(side="left")

    def _add_interest_row(self, text=""):
        row = tk.Frame(self._interests_frame, bg=self.C_PANEL)
        row.pack(fill="x", pady=2)
        e = tk.Entry(row, width=60, font=("맑은 고딕", 11), fg=self.C_TEXT,
                     bg=self.C_KW_BG, bd=0, insertbackground=self.C_ACCENT)
        e.insert(0, text)
        e.pack(side="left", ipady=3, padx=(0, 6))
        tk.Button(row, text="✕", fg=self.C_DANGER, bg=self.C_PANEL,
                  font=("맑은 고딕", 11), bd=0, cursor="hand2",
                  command=row.destroy).pack(side="left")

    def _save_company_tab(self):
        services = []
        for row in self._services_frame.winfo_children():
            entries = [w for w in row.winfo_children() if isinstance(w, tk.Entry)]
            if len(entries) >= 3:
                en, ko, desc = entries[0].get(), entries[1].get(), entries[2].get()
                if en or ko:
                    services.append({"name_en": en, "name": ko, "desc": desc})
        interests = []
        for row in self._interests_frame.winfo_children():
            for w in row.winfo_children():
                if isinstance(w, tk.Entry) and w.get().strip():
                    interests.append(w.get().strip())
        company = {
            "_comment": "기업 기본 정보 — AI 프롬프트에 자동 주입됩니다.",
            "name":      self._co_name.get().strip(),
            "name_en":   self._co_name_en.get().strip(),
            "identity":  self._co_identity.get("1.0", "end").strip(),
            "services":  services,
            "interests": interests,
        }
        import json as _j
        with open(CONFIG_COMPANY, "w", encoding="utf-8") as f:
            _j.dump(company, f, ensure_ascii=False, indent=2)
        self.root.title("PR 뉴스 모니터링  ✓ 저장됨")
        self.root.after(2000, lambda: self.root.title("PR 뉴스 모니터링"))
    # ── 탭2: 카테고리·키워드 ─────────────────────────────────
    def _build_tab2_category(self, parent):
        """탭2: 전체 공통 AI 필터 + 카테고리별 카드 (편집/저장/삭제)"""
        # ── 전체 공통 AI 필터 ──
        ai_filter_data = _read_json(CONFIG_AI_FILTER, {})
        global_rules = ai_filter_data.get("global", [])
        global_text  = "\n".join(global_rules) if global_rules else ""

        top_frame = tk.Frame(parent, bg=self.C_PANEL,
                             highlightthickness=1, highlightbackground=self.C_BORDER)
        top_frame.pack(fill="x", padx=12, pady=(10, 4))
        hdr = tk.Frame(top_frame, bg=self.C_PANEL)
        hdr.pack(fill="x", padx=12, pady=(8, 4))
        tk.Label(hdr, text="전체 공통 AI 필터",
                 font=("맑은 고딕", 11, "bold"),
                 fg=self.C_ACCENT, bg=self.C_PANEL).pack(side="left")
        tk.Label(hdr, text="  모든 카테고리에 공통 적용",
                 font=("맑은 고딕", 11),
                 fg=self.C_TEXT_SUB, bg=self.C_PANEL).pack(side="left")
        self._global_ai_text = tk.Text(top_frame, height=4,
            font=("맑은 고딕", 11), fg=self.C_TEXT, bg="#f0f8ff",
            bd=0, wrap="word", padx=8, pady=6,
            insertbackground=self.C_ACCENT)
        self._global_ai_text.insert("1.0", global_text)
        self._global_ai_text.pack(fill="x", padx=12, pady=(0, 8))

        # ── 카테고리 추가 버튼 ──
        btn_bar = tk.Frame(parent, bg=self.C_BG)
        btn_bar.pack(fill="x", padx=12, pady=(4, 4))
        self._btn(btn_bar, "＋  카테고리 추가", self.C_ACCENT2, "#0b7a6a",
                  lambda: self._add_category_card("", "", "")).pack(side="right")

        # ── 스크롤 영역 ──
        container = tk.Frame(parent, bg=self.C_BG)
        container.pack(fill="both", expand=True, padx=12, pady=(0, 8))
        self.canvas = tk.Canvas(container, bg=self.C_BG,
                                borderwidth=0, highlightthickness=0)
        self.scrollbar = ttk.Scrollbar(container, orient="vertical",
                                       command=self.canvas.yview,
                                       style="Vertical.TScrollbar")
        self.scrollable_frame = tk.Frame(self.canvas, bg=self.C_BG)
        self.scrollable_frame.bind(
            "<Configure>",
            lambda e: self.canvas.configure(scrollregion=self.canvas.bbox("all"))
        )
        self.canvas.create_window((0, 0), window=self.scrollable_frame, anchor="nw")
        self.canvas.configure(yscrollcommand=self.scrollbar.set)
        self.canvas.pack(side="left", fill="both", expand=True)
        self.scrollbar.pack(side="right", fill="y")
        self.canvas.bind_all("<MouseWheel>", self._on_mouse_wheel)

        # ── 카테고리 카드 로드 ──
        current_keywords = self.app_config.get("keywords", DEFAULT_CONFIG["keywords"])
        current_notes    = self.app_config.get("notes",    DEFAULT_CONFIG["notes"])
        ai_filter_by_cat = ai_filter_data.get("by_category", {})
        for cat, kws in current_keywords.items():
            self._add_category_card(
                cat,
                ", ".join(kws),
                current_notes.get(cat, ""),
                ai_filter_by_cat.get(cat, "")
            )

    def _add_category_card(self, cat_name="", keywords="", notes="", ai_filter=""):
        """카테고리 카드 추가 — 읽기/편집 토글 + 저장/삭제"""
        card = tk.Frame(self.scrollable_frame, bg=self.C_PANEL,
                        highlightthickness=1,
                        highlightbackground=self.C_BORDER)
        card.pack(fill="x", padx=6, pady=5)

        is_editing = tk.BooleanVar(value=(cat_name == ""))

        # ── 헤더 행 ──
        hdr = tk.Frame(card, bg=self.C_PANEL)
        hdr.pack(fill="x", padx=12, pady=(10, 4))

        cat_entry = tk.Entry(hdr,
            font=("맑은 고딕", 11, "bold"),
            fg=self.C_ACCENT, bg=self.C_PANEL,
            bd=0, insertbackground=self.C_ACCENT, width=18)
        cat_entry.insert(0, cat_name)
        cat_entry.pack(side="left")

        btn_frame = tk.Frame(hdr, bg=self.C_PANEL)
        btn_frame.pack(side="right")

        # ── 본문 ──
        body = tk.Frame(card, bg=self.C_PANEL)
        body.pack(fill="x", padx=12, pady=(4, 10))

        # 키워드 행
        tk.Label(body, text="검색 키워드",
                 font=("맑은 고딕", 11, "bold"),
                 fg=self.C_TEXT_SUB, bg=self.C_PANEL).pack(anchor="w")
        kw_entry = tk.Entry(body,
            font=("맑은 고딕", 11), fg=self.C_TEXT,
            bg=self.C_KW_BG, bd=0,
            insertbackground=self.C_ACCENT)
        kw_entry.insert(0, keywords)
        kw_entry.pack(fill="x", pady=(4, 10), ipady=7)

        # 수집주의사항 + AI필터 2열
        two_col = tk.Frame(body, bg=self.C_PANEL)
        two_col.pack(fill="x")
        two_col.columnconfigure(0, weight=1)
        two_col.columnconfigure(1, weight=1)

        # 왼쪽: 수집 주의사항
        left_col = tk.Frame(two_col, bg=self.C_PANEL)
        left_col.grid(row=0, column=0, sticky="nsew", padx=(0, 6))
        tk.Label(left_col, text="수집 주의사항",
                 font=("맑은 고딕", 11, "bold"),
                 fg="#c47d00", bg=self.C_PANEL).pack(anchor="w")
        note_text = tk.Text(left_col, height=7,
            font=("맑은 고딕", 11), fg=self.C_TEXT,
            bg=self.C_NOTE_BG, bd=0, wrap="word",
            padx=8, pady=6,
            insertbackground=self.C_ACCENT)
        note_text.insert("1.0", notes)
        note_text.pack(fill="x", pady=(2, 0))

        # 오른쪽: AI 필터 기준
        right_col = tk.Frame(two_col, bg=self.C_PANEL)
        right_col.grid(row=0, column=1, sticky="nsew", padx=(6, 0))
        tk.Label(right_col, text="AI 필터 기준",
                 font=("맑은 고딕", 11, "bold"),
                 fg=self.C_ACCENT, bg=self.C_PANEL).pack(anchor="w")
        ai_text = tk.Text(right_col, height=7,
            font=("맑은 고딕", 11), fg=self.C_TEXT,
            bg="#f0f8ff", bd=0, wrap="word",
            padx=8, pady=6,
            insertbackground=self.C_ACCENT)
        ai_text.insert("1.0", ai_filter)
        ai_text.pack(fill="x", pady=(2, 0))

        # ── 편집/저장/삭제 버튼 동작 ──
        def set_readonly(readonly):
            state = "disabled" if readonly else "normal"
            bg_kw   = self.C_BG    if readonly else self.C_KW_BG
            bg_note = self.C_BG    if readonly else self.C_NOTE_BG
            bg_ai   = self.C_BG    if readonly else "#f0f8ff"
            cat_entry.config(state=state)
            kw_entry.config(state=state, bg=bg_kw)
            note_text.config(state=state, bg=bg_note)
            ai_text.config(state=state, bg=bg_ai)
            card.config(highlightbackground=
                self.C_ACCENT if not readonly else self.C_BORDER)

        def on_edit():
            is_editing.set(True)
            set_readonly(False)
            for w in btn_frame.winfo_children(): w.destroy()
            self._btn(btn_frame, "저장", self.C_ACCENT, "#1558c0",
                      on_save).pack(side="left", padx=(0, 4))
            self._btn(btn_frame, "삭제", "#fff1f2", self.C_DANGER,
                      on_delete).pack(side="left")

        def on_save():
            is_editing.set(False)
            set_readonly(True)
            for w in btn_frame.winfo_children(): w.destroy()
            self._btn(btn_frame, "편집", "#64748b", "#475569",
                      on_edit).pack(side="left", padx=(0, 4))
            self._btn(btn_frame, "삭제", "#fff1f2", self.C_DANGER,
                      on_delete).pack(side="left")
            self._save_all_categories()
            # 저장 완료 시각적 피드백 — 테두리 잠깐 초록색으로
            card.config(highlightbackground="#3b6d11")
            card.after(1200, lambda: card.config(highlightbackground=self.C_BORDER))

        def on_delete():
            if messagebox.askyesno("삭제 확인",
                f"'{cat_entry.get()}' 카테고리를 삭제할까요?"):
                card.destroy()
                self._save_all_categories()

        # 초기 버튼 상태
        if cat_name == "":
            on_edit()
        else:
            set_readonly(True)
            self._btn(btn_frame, "편집", "#64748b", "#475569",
                      on_edit).pack(side="left", padx=(0, 4))
            self._btn(btn_frame, "삭제", "#fff1f2", self.C_DANGER,
                      on_delete).pack(side="left")

        # 위젯 참조를 카드에 저장 (저장 시 데이터 추출용)
        card._cat_entry  = cat_entry
        card._kw_entry   = kw_entry
        card._note_text  = note_text
        card._ai_text    = ai_text

    # ── 2단계: 입력 검증 ────────────────────────────────────
    RISKY_KEYWORDS = {
        "테크", "기술", "서비스", "플랫폼", "솔루션", "미디어",
        "인터넷", "디지털", "스마트", "온라인", "클라우드",
        "쇼핑", "뉴스", "방송", "콘텐츠", "영상", "동영상",
        "AI", "it", "앱"
    }

    def _validate_keywords(self, keywords_map: dict) -> list:
        """키워드 위험도 + 중복 검사"""
        warnings = []
        all_seen = {}
        for cat, kws in keywords_map.items():
            for kw in kws:
                kw = kw.strip()
                if not kw:
                    continue
                if len(kw) <= 1:
                    warnings.append(f"[{cat}] '{kw}' — 1글자 키워드는 너무 범용적입니다. 조합어로 정교화를 권장합니다.")
                elif kw.lower() in [r.lower() for r in self.RISKY_KEYWORDS]:
                    warnings.append(f"[{cat}] '{kw}' — 매우 범용적인 단어입니다. 하루 수백 건 유입 가능. 구체적 키워드로 변경을 권장합니다.")
                if kw in all_seen:
                    warnings.append(f"'{kw}' — [{all_seen[kw]}]와 [{cat}] 두 카테고리에 중복 등록되어 있습니다.")
                else:
                    all_seen[kw] = cat
        return warnings


    def _save_all_categories(self):
        """모든 카테고리 카드 데이터를 categories.json + ai_filter.json 에 저장"""
        keywords_map, notes_map, ai_map = {}, {}, {}

        for card in self.scrollable_frame.winfo_children():
            if not hasattr(card, "_cat_entry"): continue
            cat  = card._cat_entry.get().strip()
            kws  = [k.strip() for k in card._kw_entry.get().split(",") if k.strip()]
            note = card._note_text.get("1.0", "end").strip()
            ai   = card._ai_text.get("1.0", "end").strip()
            if cat:
                keywords_map[cat] = kws
                notes_map[cat]    = note
                ai_map[cat]       = ai

        # 공통 AI 필터 저장
        global_rules = [
            l.strip() for l in self._global_ai_text.get("1.0", "end").splitlines()
            if l.strip()
        ]

        # ── 저장 전 검증 ──
        warnings = self._validate_keywords(keywords_map)
        if warnings:
            warn_msg = "\n\n".join(warnings)
            if not messagebox.askyesno("키워드 검토 권장",
                f"아래 항목을 확인해 주세요.\n\n{warn_msg}\n\n"
                f"그대로 저장하시겠습니까?"):
                return

        # categories.json 저장
        cats_data = _read_json(CONFIG_CATEGORIES, {})
        for cat, kws in keywords_map.items():
            if cat not in cats_data:
                cats_data[cat] = {}
            cats_data[cat]["keywords"] = kws
            cats_data[cat]["notes"]    = notes_map.get(cat, "")
        import json as _j
        with open(CONFIG_CATEGORIES, "w", encoding="utf-8") as f:
            _j.dump(cats_data, f, ensure_ascii=False, indent=2)

        # ai_filter.json 저장
        ai_data = _read_json(CONFIG_AI_FILTER, {})
        ai_data["global"]      = global_rules
        ai_data["by_category"] = ai_map
        with open(CONFIG_AI_FILTER, "w", encoding="utf-8") as f:
            _j.dump(ai_data, f, ensure_ascii=False, indent=2)

        # 저장 완료 — app_config 즉시 갱신 (테스트에 반영)
        self.app_config = load_config()
        self.root.title("PR 뉴스 모니터링  ✓ 저장됨")
        self.root.after(2000, lambda: self.root.title("PR 뉴스 모니터링"))

        # 테스트 제안 팝업
        if messagebox.askyesno("설정 저장 완료",
            "카테고리 설정이 저장되었습니다.\n\n"
            "수집이 잘 되는지 테스트해 보시겠습니까?\n"
            "(선택한 카테고리의 기사 3건을 미리 수집합니다)"):
            self.notebook.select(5)  # 테스트 탭(탭6)으로 이동
            self.root.after(100, self._refresh_test_tab)

    # ── 탭3: AI 필터 기준 ────────────────────────────────────
    def _build_tab3_ai(self, parent):
        """탭3: AI 필터 기준 — 전체 공통 + 카테고리별 필터 현황"""
        ai_data = _read_json(CONFIG_AI_FILTER, {})

        container = tk.Frame(parent, bg=self.C_BG)
        container.pack(fill="both", expand=True)
        cv = tk.Canvas(container, bg=self.C_BG, bd=0, highlightthickness=0)
        sb = ttk.Scrollbar(container, orient="vertical", command=cv.yview,
                           style="Vertical.TScrollbar")
        sf = tk.Frame(cv, bg=self.C_BG)
        sf.bind("<Configure>", lambda e: cv.configure(scrollregion=cv.bbox("all")))
        cv.create_window((0, 0), window=sf, anchor="nw")
        cv.configure(yscrollcommand=sb.set)
        cv.pack(side="left", fill="both", expand=True)
        sb.pack(side="right", fill="y")
        wrap = tk.Frame(sf, bg=self.C_BG)
        wrap.pack(fill="x", padx=20, pady=16)

        def section(title, icon, note=""):
            f = tk.Frame(wrap, bg=self.C_PANEL,
                         highlightthickness=1, highlightbackground=self.C_BORDER)
            f.pack(fill="x", pady=(0, 10))
            hdr = tk.Frame(f, bg=self.C_PANEL)
            hdr.pack(fill="x", padx=14, pady=(10, 2))
            tk.Label(hdr, text=f"{icon}  {title}",
                     font=("맑은 고딕", 11, "bold"),
                     fg=self.C_ACCENT, bg=self.C_PANEL).pack(side="left")
            if note:
                tk.Label(hdr, text=f"  {note}",
                         font=("맑은 고딕", 11), fg=self.C_TEXT_SUB,
                         bg=self.C_PANEL).pack(side="left")
            body = tk.Frame(f, bg=self.C_PANEL)
            body.pack(fill="x", padx=14, pady=(4, 12))
            return body

        # ── 안내 ──
        info = tk.Frame(wrap, bg="#e8f0fe",
                        highlightthickness=1, highlightbackground="#b0c8f0")
        info.pack(fill="x", pady=(0, 12))
        tk.Label(info,
            text="\u2139  AI \ud544\ud130 \uae30\uc900\uc740 \ud074\ub9ad\ud574\uc11c \uce74\ud14c\uace0\ub9ac \ud0ed\uc5d0\uc11c \uc218\uc815\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.\n    \uc774 \ud0ed\uc740 \ud604\uc7ac \uc801\uc6a9 \uc911\uc778 \uc804\uccb4 AI \ud544\ud130 \ud604\ud669\uc744 \ud655\uc778\ud558\ub294 \ud654\uba74\uc785\ub2c8\ub2e4.",
            font=("맑은 고딕", 11), fg="#185fa5", bg="#e8f0fe",
            justify="left").pack(padx=14, pady=8)

        # ── 전체 공통 필터 현황 ──
        b1 = section("전체 공통 AI 필터", "🤖",
                     "모든 카테고리에 적용 — 카테고리 탭 상단에서 수정")
        global_rules = ai_data.get("global", [])
        if global_rules:
            for i, rule in enumerate(global_rules, 1):
                row = tk.Frame(b1, bg=self.C_PANEL)
                row.pack(fill="x", pady=2)
                tk.Label(row, text=f"{i}.", width=3, anchor="e",
                         font=("맑은 고딕", 11), fg=self.C_TEXT_SUB,
                         bg=self.C_PANEL).pack(side="left")
                tk.Label(row, text=rule,
                         font=("맑은 고딕", 11), fg=self.C_TEXT,
                         bg=self.C_PANEL, anchor="w",
                         wraplength=700).pack(side="left", padx=(6, 0))
        else:
            tk.Label(b1, text="설정된 공통 필터가 없습니다.",
                     font=("맑은 고딕", 11), fg=self.C_TEXT_SUB,
                     bg=self.C_PANEL).pack(anchor="w")

        # ── 도메인 예외 ──
        b2 = section("도메인 예외 설정", "⚠",
                     "특정 카테고리의 IT 도메인 조건 예외")
        domain_exc = ai_data.get("domain_exception", [])
        if domain_exc:
            for exc in domain_exc:
                tk.Label(b2, text=f"· {exc}",
                         font=("맑은 고딕", 11), fg=self.C_TEXT,
                         bg=self.C_PANEL, anchor="w",
                         wraplength=700).pack(anchor="w", pady=2)
        else:
            tk.Label(b2, text="설정된 예외 없음",
                     font=("맑은 고딕", 11), fg=self.C_TEXT_SUB,
                     bg=self.C_PANEL).pack(anchor="w")

        # ── 카테고리별 AI 필터 현황 ──
        b3 = section("카테고리별 AI 필터 현황", "[카테고리]",
                     "카테고리 탭에서 수정 가능")
        by_cat = ai_data.get("by_category", {})
        if by_cat:
            for cat, rule in by_cat.items():
                row = tk.Frame(b3, bg=self.C_PANEL,
                               highlightthickness=1,
                               highlightbackground=self.C_BORDER)
                row.pack(fill="x", pady=3)
                tk.Label(row, text=cat, width=18, anchor="w",
                         font=("맑은 고딕", 11, "bold"),
                         fg=self.C_ACCENT, bg=self.C_PANEL).pack(side="left",
                         padx=(10, 6), pady=6)
                tk.Label(row, text=rule,
                         font=("맑은 고딕", 11), fg=self.C_TEXT,
                         bg=self.C_PANEL, anchor="w",
                         wraplength=580).pack(side="left", padx=(0, 10), pady=8)
        else:
            tk.Label(b3, text="설정된 카테고리별 필터가 없습니다.",
                     font=("맑은 고딕", 11), fg=self.C_TEXT_SUB,
                     bg=self.C_PANEL).pack(anchor="w")

        # ── 새로고침 버튼 ──
        refresh_row = tk.Frame(wrap, bg=self.C_BG)
        refresh_row.pack(fill="x")
        self._btn(refresh_row, "현황 새로고침", "#64748b", "#475569",
                  lambda: [w.destroy() for w in parent.winfo_children()] or
                          self._build_tab3_ai(parent)).pack(side="right")

    # ── 탭4: 운영 설정 ───────────────────────────────────────
    def _build_tab4_settings(self, parent):
        """탭4: 운영 설정 — 수집기간·포털·발송시간·수신자"""
        sett = _read_json(CONFIG_SETTINGS, {})

        wrap = tk.Frame(parent, bg=self.C_BG)
        wrap.pack(fill="both", expand=True, padx=20, pady=16)

        # ── 섹션 헬퍼 ──
        def section(p, title, icon):
            f = tk.Frame(p, bg=self.C_PANEL,
                         highlightthickness=1, highlightbackground=self.C_BORDER)
            f.pack(fill="x", pady=(0, 12))
            hdr = tk.Frame(f, bg=self.C_PANEL)
            hdr.pack(fill="x", padx=14, pady=(10, 0))
            tk.Label(hdr, text=f"{icon}  {title}",
                     font=("맑은 고딕", 11, "bold"),
                     fg=self.C_ACCENT, bg=self.C_PANEL).pack(side="left")
            body = tk.Frame(f, bg=self.C_PANEL)
            body.pack(fill="x", padx=14, pady=(6, 12))
            return body

        # ── 수집 기간 ──
        b1 = section(wrap, "수집 기간", "📅")
        tk.Label(b1, text="최근", font=("맑은 고딕", 11),
                 fg=self.C_TEXT, bg=self.C_PANEL).pack(side="left")
        self.days_entry = tk.Entry(b1, width=4,
            font=("맑은 고딕", 11, "bold"), fg=self.C_ACCENT,
            bg=self.C_KW_BG, bd=0, justify="center",
            insertbackground=self.C_ACCENT)
        self.days_entry.insert(0, str(sett.get("days_limit", 2)))
        self.days_entry.pack(side="left", padx=8)
        tk.Label(b1, text="일 동안 수집", font=("맑은 고딕", 11),
                 fg=self.C_TEXT, bg=self.C_PANEL).pack(side="left")

        # ── 수집 포털 ──
        b2 = section(wrap, "수집 포털", "🌐")
        portals = sett.get("portals", {"naver": True, "google": False})
        self._portal_var = tk.StringVar(
            value="naver" if portals.get("naver", True) else "google")
        for val, label, desc in [
            ("naver", "네이버", "국내 언론사 커버리지 우수 — 기본 권장"),
            ("google", "구글",  "네이버 미색인 기사 수집 가능 (해외 매체 포함)"),
        ]:
            row = tk.Frame(b2, bg=self.C_PANEL,
                           highlightthickness=1,
                           highlightbackground=self.C_BORDER)
            row.pack(fill="x", pady=3)
            tk.Radiobutton(row, variable=self._portal_var, value=val,
                           bg=self.C_PANEL, activebackground=self.C_PANEL,
                           selectcolor=self.C_PANEL).pack(side="left", padx=(8, 4))
            tk.Label(row, text=label, font=("맑은 고딕", 11, "bold"),
                     fg=self.C_TEXT, bg=self.C_PANEL).pack(side="left")
            tk.Label(row, text=f"  —  {desc}", font=("맑은 고딕", 11),
                     fg=self.C_TEXT_SUB, bg=self.C_PANEL).pack(side="left", pady=8)

        # ── 자동 발송 ──
        b3 = section(wrap, "자동 발송 시각", "⏰")
        tk.Label(b3, text="매일", font=("맑은 고딕", 11),
                 fg=self.C_TEXT, bg=self.C_PANEL).pack(side="left")
        self.auto_hour_entry = tk.Entry(b3, width=3,
            font=("맑은 고딕", 11, "bold"), fg=self.C_ACCENT,
            bg=self.C_KW_BG, bd=0, justify="center",
            insertbackground=self.C_ACCENT)
        self.auto_hour_entry.insert(0, str(sett.get("auto_hour", 9)).zfill(2))
        self.auto_hour_entry.pack(side="left", padx=(8, 2))
        tk.Label(b3, text="시", font=("맑은 고딕", 11),
                 fg=self.C_TEXT, bg=self.C_PANEL).pack(side="left")
        tk.Label(b3, text=" : ", font=("맑은 고딕", 11),
                 fg=self.C_TEXT_SUB, bg=self.C_PANEL).pack(side="left")
        self.auto_min_entry = tk.Entry(b3, width=3,
            font=("맑은 고딕", 11, "bold"), fg=self.C_ACCENT,
            bg=self.C_KW_BG, bd=0, justify="center",
            insertbackground=self.C_ACCENT)
        self.auto_min_entry.insert(0, str(sett.get("auto_min", 0)).zfill(2))
        self.auto_min_entry.pack(side="left", padx=(2, 8))
        tk.Label(b3, text="분", font=("맑은 고딕", 11),
                 fg=self.C_TEXT, bg=self.C_PANEL).pack(side="left", padx=(0, 16))
        self.auto_toggle_var = tk.BooleanVar(value=False)
        self.auto_toggle_btn = tk.Button(b3,
            text="OFF", bg="#d0dce8", fg="#5f7a96",
            font=("맑은 고딕", 11, "bold"), bd=0, cursor="hand2",
            padx=14, pady=4, command=self._toggle_auto_run)
        self.auto_toggle_btn.pack(side="left")

        # ── 발송 채널 ──
        b4 = section(wrap, "발송 채널", "")
        tk.Label(b4, text="리포트를 받을 채널을 선택하세요. 중복 선택 가능합니다.",
                 font=("맑은 고딕", 11), fg=self.C_TEXT_SUB,
                 bg=self.C_PANEL).pack(anchor="w", pady=(0, 10))

        send_channel = sett.get("send_channel", "email")

        # 채널 라디오 버튼
        self._channel_var = tk.StringVar(value=send_channel)

        channel_frame = tk.Frame(b4, bg=self.C_PANEL)
        channel_frame.pack(fill="x", pady=(0, 12))

        for val, label, desc in [
            ("email",       "이메일만",        "설정된 수신자 이메일로 발송"),
            ("slack",       "슬랙만",           "슬랙 웹훅 URL로 발송"),
            ("email_slack", "이메일 + 슬랙",   "이메일과 슬랙 동시 발송"),
        ]:
            row = tk.Frame(channel_frame, bg=self.C_PANEL,
                           highlightthickness=1, highlightbackground=self.C_BORDER)
            row.pack(fill="x", pady=3)
            tk.Radiobutton(row, variable=self._channel_var, value=val,
                           bg=self.C_PANEL, activebackground=self.C_PANEL,
                           selectcolor=self.C_PANEL,
                           command=self._on_channel_change).pack(side="left", padx=(8, 4), pady=8)
            tk.Label(row, text=label, font=("맑은 고딕", 11, "bold"),
                     fg=self.C_TEXT, bg=self.C_PANEL).pack(side="left")
            tk.Label(row, text=f"  —  {desc}", font=("맑은 고딕", 11),
                     fg=self.C_TEXT_SUB, bg=self.C_PANEL).pack(side="left", pady=8)

        # ── 이메일 수신자 설정 ──
        self._email_section = tk.Frame(b4, bg=self.C_PANEL)
        self._email_section.pack(fill="x", pady=(0, 8))
        tk.Label(self._email_section, text="수신자 이메일",
                 font=("맑은 고딕", 11, "bold"),
                 fg=self.C_TEXT, bg=self.C_PANEL).pack(anchor="w", pady=(4, 6))

        self._receiver_frame = tk.Frame(self._email_section, bg=self.C_PANEL)
        self._receiver_frame.pack(fill="x")
        receiver_list = sett.get("receiver_emails", [SENDER_EMAIL])
        for email in receiver_list:
            self._add_receiver_row(email)

        add_row = tk.Frame(self._email_section, bg=self.C_PANEL)
        add_row.pack(fill="x", pady=(6, 0))
        self._new_email_entry = tk.Entry(add_row, width=30,
            font=("맑은 고딕", 11), fg=self.C_TEXT,
            bg=self.C_KW_BG, bd=0, insertbackground=self.C_ACCENT)
        self._new_email_entry.insert(0, "추가할 이메일 입력...")
        self._new_email_entry.bind("<FocusIn>",
            lambda e: self._new_email_entry.delete(0, "end")
            if self._new_email_entry.get() == "추가할 이메일 입력..." else None)
        self._new_email_entry.pack(side="left", padx=(0, 8), ipady=4)
        self._btn(add_row, "+ 추가", self.C_ACCENT2, "#0b7a6a",
                  self._add_receiver_email).pack(side="left")

        # ── 슬랙 웹훅 설정 ──
        self._slack_section = tk.Frame(b4, bg=self.C_PANEL)
        self._slack_section.pack(fill="x", pady=(8, 0))
        tk.Label(self._slack_section, text="슬랙 웹훅 URL",
                 font=("맑은 고딕", 11, "bold"),
                 fg=self.C_TEXT, bg=self.C_PANEL).pack(anchor="w", pady=(4, 6))
        slack_row = tk.Frame(self._slack_section, bg=self.C_PANEL)
        slack_row.pack(fill="x")
        self._slack_url_entry = tk.Entry(slack_row, width=50,
            font=("맑은 고딕", 11), fg=self.C_TEXT,
            bg=self.C_KW_BG, bd=0, insertbackground=self.C_ACCENT)
        self._slack_url_entry.insert(0, sett.get("slack_webhook_url", ""))
        self._slack_url_entry.pack(side="left", ipady=4, padx=(0, 8))
        self._btn(slack_row, "연결 테스트", "#64748b", "#475569",
                  self._test_slack).pack(side="left")
        tk.Label(self._slack_section,
            text="슬랙 채널에서 앱 추가 → Incoming Webhooks → 웹훅 URL 복사",
            font=("맑은 고딕", 10), fg=self.C_TEXT_SUB,
            bg=self.C_PANEL).pack(anchor="w", pady=(4, 0))

        # 초기 채널 상태 적용
        self._on_channel_change()

        # ── 저장 버튼 ──
        self._save_bar(wrap, self._save_settings_tab)

    def _on_channel_change(self):
        """채널 선택에 따라 이메일/슬랙 섹션 표시 토글"""
        ch = self._channel_var.get()
        if ch == "email":
            self._email_section.pack(fill="x", pady=(0, 8))
            self._slack_section.pack_forget()
        elif ch == "slack":
            self._email_section.pack_forget()
            self._slack_section.pack(fill="x", pady=(8, 0))
        else:  # email_slack
            self._email_section.pack(fill="x", pady=(0, 8))
            self._slack_section.pack(fill="x", pady=(8, 0))

    def _add_receiver_row(self, email):
        """수신자 이메일 행 추가"""
        row = tk.Frame(self._receiver_frame, bg=self.C_PANEL)
        row.pack(fill="x", pady=2)
        tk.Label(row, text=email, font=("맑은 고딕", 11),
                 fg=self.C_TEXT, bg=self.C_PANEL, width=30,
                 anchor="w").pack(side="left")
        def remove():
            row.destroy()
        tk.Button(row, text="✕", fg=self.C_DANGER, bg=self.C_PANEL,
                  font=("맑은 고딕", 11), bd=0, cursor="hand2",
                  command=remove).pack(side="left", padx=4)

    def _add_receiver_email(self):
        """입력창에서 이메일 추가"""
        email = self._new_email_entry.get().strip()
        if not email or email == "추가할 이메일 입력..." or "@" not in email:
            messagebox.showerror("오류", "올바른 이메일 주소를 입력해 주세요.")
            return
        self._add_receiver_row(email)
        self._new_email_entry.delete(0, "end")

    def _save_settings_tab(self):
        """운영 설정 탭 저장 → settings.json"""
        try:
            days   = int(self.days_entry.get())
            hour   = int(self.auto_hour_entry.get())
            minute = int(self.auto_min_entry.get())
        except ValueError:
            messagebox.showerror("오류", "수집 기간·시·분은 숫자만 입력해 주세요.")
            return

        portal = self._portal_var.get()
        receivers = [
            w.winfo_children()[0].cget("text")
            for w in self._receiver_frame.winfo_children()
            if w.winfo_children()
        ]

        sett = _read_json(CONFIG_SETTINGS, {})
        sett["days_limit"]         = days
        sett["auto_hour"]          = hour
        sett["auto_min"]           = minute
        sett["portals"]            = {"naver": portal == "naver", "google": portal == "google"}
        sett["send_channel"]       = self._channel_var.get() if hasattr(self, "_channel_var") else "email"
        sett["receiver_emails"]    = receivers
        sett["slack_webhook_url"]  = self._slack_url_entry.get().strip() if hasattr(self, "_slack_url_entry") else ""
        import json as _json
        with open(CONFIG_SETTINGS, "w", encoding="utf-8") as f:
            _json.dump(sett, f, ensure_ascii=False, indent=2)

        self.root.title("PR 뉴스 모니터링  ✓ 저장됨")
        self.root.after(2000, lambda: self.root.title("PR 뉴스 모니터링"))

    # ── 탭5: 개발자 설정 ─────────────────────────────────────
    def _build_tab5_dev(self, parent):
        """탭5: 개발자 설정 — API 키·SMTP"""
        dev = _read_json(CONFIG_DEVELOPER, {})

        # 스크롤 영역
        container = tk.Frame(parent, bg=self.C_BG)
        container.pack(fill="both", expand=True)
        canvas = tk.Canvas(container, bg=self.C_BG, bd=0, highlightthickness=0)
        sb = ttk.Scrollbar(container, orient="vertical", command=canvas.yview,
                           style="Vertical.TScrollbar")
        sf = tk.Frame(canvas, bg=self.C_BG)
        sf.bind("<Configure>",
            lambda e: canvas.configure(scrollregion=canvas.bbox("all")))
        canvas.create_window((0, 0), window=sf, anchor="nw")
        canvas.configure(yscrollcommand=sb.set)
        canvas.pack(side="left", fill="both", expand=True)
        sb.pack(side="right", fill="y")
        canvas.bind_all("<MouseWheel>",
            lambda e: canvas.yview_scroll(int(-1*(e.delta/120)), "units"))
        wrap = tk.Frame(sf, bg=self.C_BG)
        wrap.pack(fill="x", padx=20, pady=16)

        def section(title, icon):
            f = tk.Frame(wrap, bg=self.C_PANEL,
                         highlightthickness=1, highlightbackground=self.C_BORDER)
            f.pack(fill="x", pady=(0, 12))
            hdr = tk.Frame(f, bg=self.C_PANEL)
            hdr.pack(fill="x", padx=14, pady=(10, 4))
            tk.Label(hdr, text=f"{icon}  {title}",
                     font=("맑은 고딕", 11, "bold"),
                     fg=self.C_ACCENT, bg=self.C_PANEL).pack(side="left")
            body = tk.Frame(f, bg=self.C_PANEL)
            body.pack(fill="x", padx=14, pady=(0, 12))
            return body

        def labeled_entry(parent, label, value, show=""):
            row = tk.Frame(parent, bg=self.C_PANEL)
            row.pack(fill="x", pady=3)
            tk.Label(row, text=label, width=14, anchor="w",
                     font=("맑은 고딕", 11), fg=self.C_TEXT_SUB,
                     bg=self.C_PANEL).pack(side="left")
            e = tk.Entry(row, font=("맑은 고딕", 11), fg=self.C_TEXT,
                         bg=self.C_KW_BG, bd=0, insertbackground=self.C_ACCENT,
                         show=show, width=36)
            e.insert(0, value)
            e.pack(side="left", ipady=4, padx=(0, 8))
            return e

        # ── 네이버 API ──
        b1 = section("네이버 API", "🔑")
        naver = dev.get("naver_api", {})
        self._dev_naver_id  = labeled_entry(b1, "Client ID",     naver.get("client_id", ""))
        self._dev_naver_sec = labeled_entry(b1, "Client Secret", naver.get("client_secret", ""), show="*")

        # ── Gemini API 키 ──
        b2 = section("Gemini API 키  (429 소진 시 자동 로테이션)", "🤖")
        tk.Label(b2, text="● 정상   ● 미등록",
                 font=("맑은 고딕", 11), fg=self.C_TEXT_SUB,
                 bg=self.C_PANEL).pack(anchor="w", pady=(0, 4))

        self._gemini_keys_frame = tk.Frame(b2, bg=self.C_PANEL)
        self._gemini_keys_frame.pack(fill="x")

        existing_keys = dev.get("gemini_api_keys", GEMINI_API_KEYS)
        for key in existing_keys:
            self._add_gemini_key_row(key)

        add_key_row = tk.Frame(b2, bg=self.C_PANEL)
        add_key_row.pack(fill="x", pady=(6, 0))
        self._new_key_entry = tk.Entry(add_key_row, width=46,
            font=("맑은 고딕", 11), fg=self.C_TEXT,
            bg=self.C_KW_BG, bd=0, insertbackground=self.C_ACCENT,
            show="*")
        self._new_key_entry.insert(0, "")
        self._new_key_entry.pack(side="left", ipady=4, padx=(0, 8))
        self._btn(add_key_row, "+ 키 추가", self.C_ACCENT2, "#0b7a6a",
                  self._add_gemini_key).pack(side="left")

        # ── SMTP ──
        b3 = section("이메일 SMTP 설정  (리포트 발신자)", "📤")
        smtp = dev.get("smtp", {})

        # 메일 서비스 선택
        smtp_row = tk.Frame(b3, bg=self.C_PANEL)
        smtp_row.pack(fill="x", pady=3)
        tk.Label(smtp_row, text="메일 서비스", width=14, anchor="w",
                 font=("맑은 고딕", 11), fg=self.C_TEXT_SUB,
                 bg=self.C_PANEL).pack(side="left")
        self._smtp_provider = tk.StringVar(value=smtp.get("provider", "Gmail"))
        smtp_providers = {
            "Gmail":   ("smtp.gmail.com",       587),
            "네이버":   ("smtp.naver.com",        587),
            "카카오":   ("smtp.kakao.com",         465),
            "Outlook": ("smtp.office365.com",    587),
            "다음":    ("smtp.daum.net",          465),
        }
        def on_provider_change(*args):
            p = self._smtp_provider.get()
            if p in smtp_providers:
                sv, pv = smtp_providers[p]
                self._dev_smtp_server.delete(0, "end")
                self._dev_smtp_server.insert(0, sv)
                self._dev_smtp_port.delete(0, "end")
                self._dev_smtp_port.insert(0, str(pv))
        provider_menu = ttk.Combobox(smtp_row, textvariable=self._smtp_provider,
            values=list(smtp_providers.keys()), state="readonly", width=12,
            font=("맑은 고딕", 11))
        provider_menu.pack(side="left", ipady=2)
        self._smtp_provider.trace("w", on_provider_change)

        self._dev_smtp_server = labeled_entry(b3, "SMTP 서버",  smtp.get("server", "smtp.gmail.com"))
        self._dev_smtp_port   = labeled_entry(b3, "포트",       str(smtp.get("port", 587)))
        self._dev_smtp_email  = labeled_entry(b3, "발신 이메일", smtp.get("sender_email", ""))
        self._dev_smtp_pw     = labeled_entry(b3, "앱 비밀번호", smtp.get("sender_password", ""), show="*")

        tip = tk.Frame(b3, bg=self.C_PANEL)
        tip.pack(fill="x", pady=(4, 0))
        tk.Label(tip,
            text="\u2139  Gmail 사용 시 일반 비밀번호 아닌 앱 비밀번호(16자리) 필요\n   myaccount.google.com \u2192 보안 \u2192 앱 비밀번호",
            font=("맑은 고딕", 11), fg=self.C_TEXT_SUB, bg=self.C_PANEL,
            justify="left").pack(anchor="w")

        # ── 저장 + 테스트 발송 ──
        self._save_bar(wrap, self._save_dev_tab,
                     extra_btns=[("테스트 발송", self.C_ACCENT2, "#0b7a6a", self._test_smtp)])

    def _add_gemini_key_row(self, key=""):
        """Gemini API 키 행 추가"""
        row = tk.Frame(self._gemini_keys_frame, bg=self.C_PANEL)
        row.pack(fill="x", pady=2)
        dot = tk.Label(row, text="●", font=("맑은 고딕", 11),
                       fg="#3b6d11" if key.strip() else self.C_BORDER,
                       bg=self.C_PANEL)
        dot.pack(side="left", padx=(0, 6))
        e = tk.Entry(row, font=("맑은 고딕", 11), fg=self.C_TEXT,
                     bg=self.C_KW_BG, bd=0, width=46, show="*",
                     insertbackground=self.C_ACCENT)
        e.insert(0, key)
        e.pack(side="left", ipady=3, padx=(0, 8))
        def remove():
            row.destroy()
        tk.Button(row, text="✕", fg=self.C_DANGER, bg=self.C_PANEL,
                  font=("맑은 고딕", 11), bd=0, cursor="hand2",
                  command=remove).pack(side="left")

    def _add_gemini_key(self):
        key = self._new_key_entry.get().strip()
        if not key:
            messagebox.showerror("오류", "API 키를 입력해 주세요.")
            return
        self._add_gemini_key_row(key)
        self._new_key_entry.delete(0, "end")

    def _save_dev_tab(self):
        """개발자 설정 저장 → developer.json"""
        keys = [
            w.winfo_children()[1].get().strip()
            for w in self._gemini_keys_frame.winfo_children()
            if len(w.winfo_children()) > 1
        ]
        keys = [k for k in keys if k]
        dev = _read_json(CONFIG_DEVELOPER, {})
        dev["naver_api"] = {
            "client_id":     self._dev_naver_id.get().strip(),
            "client_secret": self._dev_naver_sec.get().strip(),
        }
        dev["gemini_api_keys"] = keys
        dev["smtp"] = {
            "provider":        self._smtp_provider.get(),
            "server":          self._dev_smtp_server.get().strip(),
            "port":            int(self._dev_smtp_port.get().strip() or 587),
            "sender_email":    self._dev_smtp_email.get().strip(),
            "sender_password": self._dev_smtp_pw.get().strip(),
        }
        import json as _json
        with open(CONFIG_DEVELOPER, "w", encoding="utf-8") as f:
            _json.dump(dev, f, ensure_ascii=False, indent=2)
        self.root.title("PR 뉴스 모니터링  ✓ 저장됨")
        self.root.after(2000, lambda: self.root.title("PR 뉴스 모니터링"))

    def _test_slack(self):
        """슬랙 웹훅 연결 테스트"""
        url = self._slack_url_entry.get().strip()
        if not url or not url.startswith("https://hooks.slack.com"):
            messagebox.showerror("오류", "올바른 슬랙 웹훅 URL을 입력해 주세요.\nhttps://hooks.slack.com/... 형식이어야 합니다.")
            return
        try:
            import requests as _req, json as _json
            payload = {"text": "카테노이드 PR 뉴스 모니터링 — 슬랙 연결 테스트입니다."}
            resp = _req.post(url, data=_json.dumps(payload),
                             headers={"Content-Type": "application/json"}, timeout=10)
            if resp.status_code == 200 and resp.text == "ok":
                messagebox.showinfo("연결 성공", "슬랙 채널로 테스트 메시지를 발송했습니다.")
            else:
                messagebox.showerror("연결 실패", f"슬랙 응답 오류: {resp.status_code} {resp.text}")
        except Exception as e:
            messagebox.showerror("연결 실패", f"오류: {e}")

    def _test_smtp(self):
        """테스트 이메일 발송"""
        import smtplib
        from email.mime.text import MIMEText
        try:
            server_addr = self._dev_smtp_server.get().strip()
            port        = int(self._dev_smtp_port.get().strip() or 587)
            sender      = self._dev_smtp_email.get().strip()
            password    = self._dev_smtp_pw.get().strip()
            msg = MIMEText("뉴스클리핑 SMTP 테스트 발송입니다.", "plain", "utf-8")
            msg["Subject"] = "[뉴스클리핑] SMTP 테스트"
            msg["From"]    = sender
            msg["To"]      = sender
            with smtplib.SMTP(server_addr, port) as s:
                s.starttls()
                s.login(sender, password)
                s.sendmail(sender, [sender], msg.as_string())
            messagebox.showinfo("발송 성공", f"{sender} 으로 테스트 메일을 발송했습니다.")
        except Exception as e:
            messagebox.showerror("발송 실패", f"SMTP 오류:\n{e}")

    # ── 탭6: 테스트 ──────────────────────────────────────────
    def _build_tab6_test(self, parent):
        """탭6: 테스트 — 카테고리 선택 후 샘플 수집·미리보기"""
        self._test_parent = parent

        wrap = tk.Frame(parent, bg=self.C_BG)
        wrap.pack(fill="both", expand=True, padx=20, pady=16)

        # ── 안내 배너 ──
        banner = tk.Frame(wrap, bg="#eff6ff",
                          highlightthickness=1, highlightbackground="#bfdbfe")
        banner.pack(fill="x", pady=(0, 14))
        tk.Label(banner,
            text="카테고리 설정 저장 후 수집이 잘 되는지 미리 확인합니다. "
                 "선택한 카테고리의 상위 기사 3건을 실제로 수집해 보여줍니다.",
            font=("맑은 고딕", 11), fg="#1e40af", bg="#eff6ff",
            wraplength=900, justify="left").pack(padx=14, pady=10)

        # ── 카테고리 선택 + 실행 ──
        ctrl = tk.Frame(wrap, bg=self.C_BG)
        ctrl.pack(fill="x", pady=(0, 14))

        tk.Label(ctrl, text="카테고리 선택",
                 font=("맑은 고딕", 11, "bold"),
                 fg=self.C_TEXT, bg=self.C_BG).pack(side="left", padx=(0, 10))

        cats = list(self.app_config.get("keywords", {}).keys())
        self._test_cat_var = tk.StringVar(value=cats[0] if cats else "")
        self._test_cat_menu = ttk.Combobox(ctrl,
            textvariable=self._test_cat_var,
            values=cats, state="readonly", width=20,
            font=("맑은 고딕", 11))
        self._test_cat_menu.pack(side="left", padx=(0, 12))

        self._btn(ctrl, "수집 테스트 실행", self.C_ACCENT, "#1d4ed8",
                  self._run_test, fg_color="#ffffff").pack(side="left")

        # ── 결과 영역 ──
        self._test_result_frame = tk.Frame(wrap, bg=self.C_BG)
        self._test_result_frame.pack(fill="both", expand=True)

        # 초기 안내
        tk.Label(self._test_result_frame,
            text="카테고리를 선택하고 '수집 테스트 실행'을 클릭하세요.",
            font=("맑은 고딕", 11), fg=self.C_TEXT_SUB, bg=self.C_BG).pack(expand=True)

    def _refresh_test_tab(self):
        """테스트 탭 카테고리 목록 갱신 후 자동 실행"""
        cats = list(self.app_config.get("keywords", {}).keys())
        if hasattr(self, '_test_cat_menu') and cats:
            self._test_cat_menu['values'] = cats
            self._test_cat_var.set(cats[0])
            self._run_test()

    def _run_test(self):
        """선택한 카테고리 실제 수집 후 결과 표시"""
        cat = self._test_cat_var.get()
        if not cat:
            messagebox.showwarning("알림", "카테고리를 선택해 주세요.")
            return

        # 결과 영역 초기화
        for w in self._test_result_frame.winfo_children():
            w.destroy()

        # 로딩 표시
        loading = tk.Label(self._test_result_frame,
            text="수집 중... 잠시만 기다려 주세요.",
            font=("맑은 고딕", 11), fg=self.C_TEXT_SUB, bg=self.C_BG)
        loading.pack(expand=True)
        self.root.update()

        # 백그라운드 수집
        def do_test():
            try:
                # 항상 최신 저장 파일에서 읽기
                self.app_config = load_config()
                keywords = self.app_config.get("keywords", {}).get(cat, [])
                days = int(self.days_entry.get()) if hasattr(self, 'days_entry') else                        _read_json(CONFIG_SETTINGS, {}).get("days_limit", 2)

                raw = []
                for kw in keywords[:3]:  # 키워드 최대 3개만 샘플
                    res = get_naver_news(kw, days, cat)
                    raw.extend(res)

                # 중복 제거
                seen, deduped = set(), []
                for item in raw:
                    t = item.get("기사제목", "")
                    if t not in seen:
                        seen.add(t)
                        deduped.append(item)

                total_raw = len(deduped)
                preview   = deduped[:3]

                self.root.after(0, lambda: self._show_test_result(
                    cat, total_raw, preview))
            except Exception as e:
                self.root.after(0, lambda: self._show_test_error(str(e)))

        import threading
        threading.Thread(target=do_test, daemon=True).start()

    def _show_test_result(self, cat, total_raw, preview):
        """테스트 결과 화면 표시"""
        for w in self._test_result_frame.winfo_children():
            w.destroy()

        f = self._test_result_frame

        # ── 수치 요약 ──
        stat_row = tk.Frame(f, bg=self.C_BG)
        stat_row.pack(fill="x", pady=(0, 14))

        def stat_card(parent, label, value, color):
            card = tk.Frame(parent, bg=self.C_PANEL,
                            highlightthickness=1,
                            highlightbackground=self.C_BORDER)
            card.pack(side="left", padx=(0, 10), ipadx=16, ipady=10)
            tk.Label(card, text=label,
                     font=("맑은 고딕", 10), fg=self.C_TEXT_SUB,
                     bg=self.C_PANEL).pack()
            tk.Label(card, text=str(value),
                     font=("맑은 고딕", 18, "bold"),
                     fg=color, bg=self.C_PANEL).pack()

        stat_card(stat_row, "1차 수집", f"{total_raw}건", self.C_ACCENT)
        stat_card(stat_row, "AI 필터 후 예상",
                  f"~{max(1, int(total_raw * 0.6))}건", "#0d9488")
        stat_card(stat_row, "테스트 카테고리", cat, self.C_TEXT_SUB)

        # ── 기사 미리보기 3건 ──
        tk.Label(f, text="상위 기사 3건 미리보기",
                 font=("맑은 고딕", 11, "bold"),
                 fg=self.C_TEXT, bg=self.C_BG).pack(anchor="w", pady=(4, 8))

        if not preview:
            tk.Label(f,
                text="수집된 기사가 없습니다. 키워드나 수집 기간을 확인해 주세요.",
                font=("맑은 고딕", 11), fg=self.C_DANGER, bg=self.C_BG).pack(anchor="w")
            return

        for i, item in enumerate(preview, 1):
            card = tk.Frame(f, bg=self.C_PANEL,
                            highlightthickness=1,
                            highlightbackground=self.C_BORDER)
            card.pack(fill="x", pady=(0, 8))

            top = tk.Frame(card, bg=self.C_PANEL)
            top.pack(fill="x", padx=14, pady=(10, 4))

            # 순번 뱃지
            tk.Label(top, text=f" {i} ",
                     font=("맑은 고딕", 10, "bold"),
                     fg="#ffffff", bg=self.C_ACCENT).pack(side="left", padx=(0, 8))

            # 제목 (클릭 시 링크)
            title = item.get("기사제목", "")
            link  = item.get("링크", "")
            title_lbl = tk.Label(top, text=title,
                font=("맑은 고딕", 11, "bold"),
                fg=self.C_ACCENT, bg=self.C_PANEL,
                cursor="hand2", wraplength=800, justify="left")
            title_lbl.pack(side="left", anchor="w")
            if link:
                title_lbl.bind("<Button-1>",
                    lambda e, url=link: __import__('webbrowser').open(url))

            # 메타 정보
            meta = tk.Frame(card, bg=self.C_PANEL)
            meta.pack(fill="x", padx=14, pady=(0, 10))
            media   = item.get("언론사", "")
            pub     = item.get("배포일자", "")
            keyword = item.get("검색키워드", "")
            tk.Label(meta,
                text=f"{media}  ·  {pub}  ·  키워드: {keyword}",
                font=("맑은 고딕", 10),
                fg=self.C_TEXT_SUB, bg=self.C_PANEL).pack(anchor="w")

        # ── 안내 ──
        tk.Label(f,
            text="* AI 필터 후 예상 건수는 실제와 다를 수 있습니다. "
                 "전체 실행은 '모니터링 실행' 버튼을 사용하세요.",
            font=("맑은 고딕", 10), fg=self.C_TEXT_SUB, bg=self.C_BG,
            wraplength=900, justify="left").pack(anchor="w", pady=(8, 0))

    def _show_test_error(self, err):
        """테스트 오류 표시"""
        for w in self._test_result_frame.winfo_children():
            w.destroy()
        tk.Label(self._test_result_frame,
            text=f"오류가 발생했습니다:\n{err}",
            font=("맑은 고딕", 11), fg=self.C_DANGER,
            bg=self.C_BG, wraplength=800).pack(expand=True)

    def _on_mouse_wheel(self, event):
        # 현재 포커스된 위젯의 부모 캔버스 찾기
        widget = event.widget
        while widget:
            if isinstance(widget, tk.Canvas):
                widget.yview_scroll(int(-1 * (event.delta / 120)), "units")
                return
            try:
                widget = widget.master
            except Exception:
                break
        # 폴백: 카테고리 탭 캔버스
        if hasattr(self, 'canvas'):
            self.canvas.yview_scroll(int(-1 * (event.delta / 120)), "units")

    # ── 카테고리 행 ──────────────────────────────────────────
    def add_keyword_row(self, category_text, keywords_text, note_text):
        card = tk.Frame(self.scrollable_frame, bg=self.C_CARD,
                        bd=0, highlightthickness=1,
                        highlightbackground=self.C_BORDER,
                        highlightcolor=self.C_ACCENT)
        card.pack(fill="x", padx=8, pady=5, ipady=2)

        # ── 왼쪽: 카테고리명 + 삭제 버튼 ──
        left = tk.Frame(card, bg=self.C_CARD, width=130)
        left.pack(side="left", fill="y", padx=(14, 0), pady=10)
        left.pack_propagate(False)

        # 카테고리 레이블 (클릭 시 편집)
        cat_entry = tk.Entry(left,
                             font=("맑은 고딕", 11, "bold"),
                             fg=self.C_ACCENT, bg=self.C_CARD,
                             insertbackground=self.C_ACCENT,
                             bd=0, justify="center",
                             disabledforeground=self.C_TEXT_SUB,
                             width=12)
        cat_entry.insert(0, category_text)
        cat_entry.pack(fill="x", pady=(6, 6))

        # 구분선
        tk.Frame(left, bg=self.C_BORDER, height=1).pack(fill="x", pady=2)

        del_btn = tk.Button(left, text="✕  구분 삭제",
                            bg="#fff0f0", fg=self.C_DANGER,
                            font=("맑은 고딕", 11, "bold"), bd=0,
                            cursor="hand2",
                            activebackground="#ffe0e0",
                            activeforeground=self.C_DANGER,
                            pady=5, relief="flat")
        del_btn.config(command=lambda: self.delete_row(card, cat_entry))
        del_btn.bind("<Enter>", lambda e: del_btn.config(bg="#ffe0e0"))
        del_btn.bind("<Leave>", lambda e: del_btn.config(bg="#fff0f0"))
        del_btn.pack(fill="x")

        # ── 구분선 ──
        tk.Frame(card, bg=self.C_BORDER, width=1).pack(side="left", fill="y", padx=10, pady=8)

        # ── 키워드 영역 ──
        kw_wrap = tk.Frame(card, bg=self.C_CARD)
        kw_wrap.pack(side="left", fill="both", expand=True, pady=8)

        tk.Label(kw_wrap, text="검색 키워드", font=("맑은 고딕", 11, "bold"),
                 fg=self.C_ACCENT2, bg=self.C_CARD).pack(anchor="w", padx=4, pady=(2,0))

        kw_entry = scrolledtext.ScrolledText(
            kw_wrap, height=4, font=("맑은 고딕", 11),
            wrap=tk.WORD, bd=0, relief="flat",
            bg=self.C_KW_BG, fg=self.C_TEXT,
            insertbackground=self.C_TEXT,
            selectbackground=self.C_ACCENT2,
            padx=8, pady=6)
        kw_entry.insert(tk.END, keywords_text)
        kw_entry.pack(fill="both", expand=True, padx=4)

        # ── 구분선 ──
        tk.Frame(card, bg=self.C_BORDER, width=1).pack(side="left", fill="y", padx=10, pady=8)

        # ── 주의사항 영역 ──
        note_wrap = tk.Frame(card, bg=self.C_CARD, width=480)
        note_wrap.pack(side="right", fill="y", pady=8, padx=(0, 12))
        note_wrap.pack_propagate(False)

        note_hdr = tk.Frame(note_wrap, bg=self.C_CARD)
        note_hdr.pack(fill="x", padx=4)
        tk.Label(note_hdr, text="·  수집·필터 주의사항", font=("맑은 고딕", 11, "bold"),
                 fg="#c47d00", bg=self.C_CARD).pack(side="left")
        tk.Label(note_hdr, text="→ AI 프롬프트 직접 반영", font=("맑은 고딕", 11),
                 fg=self.C_TEXT_SUB, bg=self.C_CARD).pack(side="right")

        note_entry = scrolledtext.ScrolledText(
            note_wrap, height=4, font=("맑은 고딕", 11),
            wrap=tk.WORD, bd=0, relief="flat",
            bg=self.C_NOTE_BG, fg="#7a4f00",
            insertbackground="#7a4f00",
            selectbackground="#ffe082",
            padx=8, pady=6)
        note_entry.insert(tk.END, note_text)
        note_entry.pack(fill="both", expand=True, padx=4)

        self.row_entries.append((cat_entry, kw_entry, note_entry, card))

    def delete_row(self, frame, cat_entry):
        for item in self.row_entries:
            if item[0] == cat_entry:
                self.row_entries.remove(item)
                break
        frame.destroy()

    def get_edited_data(self):
        """카테고리 탭 카드들에서 keywords_map, notes_map 추출"""
        keywords_map, notes_map = {}, {}
        if not hasattr(self, 'scrollable_frame'):
            return keywords_map, notes_map
        for card in self.scrollable_frame.winfo_children():
            if not hasattr(card, "_cat_entry"): continue
            cat  = card._cat_entry.get().strip()
            kws  = [k.strip() for k in card._kw_entry.get().split(",") if k.strip()]
            note = card._note_text.get("1.0", "end").strip()
            if cat:
                keywords_map[cat] = kws
                notes_map[cat]    = note
        return keywords_map, notes_map


    def just_save_config_action(self):
        try:
            days = int(self.days_entry.get())
            hour = int(self.auto_hour_entry.get())
            minute = int(self.auto_min_entry.get())
        except ValueError:
            messagebox.showerror("오류", "수집 기간·시·분은 숫자만 입력해 주세요.")
            return
        keywords_map, notes_map = self.get_edited_data()
        save_config(days, keywords_map, notes_map, hour, minute)
        messagebox.showinfo("저장 완료", f"설정이 저장되었습니다.\n자동 발송 시각: {hour:02d}:{minute:02d}")

    def start_thread(self):
        # 🔒 [스레드 이중 가동 보호]: 다중 스레드 연산 충돌 차단
        if self.is_running:
            messagebox.showwarning("경고", "이미 모니터링이 가동 중입니다. 잠시만 대기해 주세요.")
            return
            
        valid_keys = [k for k in GEMINI_API_KEYS if k.strip()]
        if not valid_keys:
            messagebox.showerror("API 키 누락", "유효한 Gemini API 키가 없습니다.")
            return
            
        # 🔒 [자원 경합 에러 해결]: 스레드를 띄우기 전 메인 UI 스레드 영역에서 안전하게 입력 위젯 자원을 먼저 선점 추출합니다.
        try:
            # 운영설정 탭 입력값 우선, 없으면 settings.json 폴백
            if hasattr(self, "days_entry"):
                days = int(self.days_entry.get())
            else:
                days = _read_json(CONFIG_SETTINGS, {}).get("days_limit", 2)
        except ValueError:
            messagebox.showerror("오류", "수집 기간은 숫자만 입력해 주세요.")
            return

        # JSON 파일에서 직접 읽기 (항상 저장된 최신값 사용)
        cfg = load_config()
        keywords_map = cfg.get("keywords", {})
        notes_map    = cfg.get("notes",    {})
        if not keywords_map:
            messagebox.showerror("오류", "카테고리·키워드를 설정하고 저장해 주세요.")
            return
            
        self.is_running = True
        
        # 스레드 타겟인 start_process 함수에 선점 수집된 데이터 인자(Arguments)를 명확히 바인딩하여 튕김을 해결합니다.
        threading.Thread(target=self.start_process, args=(days, keywords_map, notes_map), daemon=True).start()

    # ── 진행 상태 팝업 ───────────────────────────────────────
    def show_status_window(self):
        self.status_win = tk.Toplevel(self.root)
        self.status_win.title("")
        self.status_win.geometry("460x180")
        self.status_win.resizable(False, False)
        self.status_win.configure(bg="#ffffff")
        self.status_win.transient(self.root)
        self.status_win.grab_set()

        # /헤더 라인
        tk.Frame(self.status_win, bg=self.C_ACCENT, height=3).pack(fill="x")

        tk.Label(self.status_win, text="처리 중...",
                 font=("맑은 고딕", 11), fg=self.C_TEXT_SUB,
                 bg=self.C_PANEL).pack(anchor="w", padx=24, pady=(16, 4))

        self.status_label = tk.Label(
            self.status_win,
            text="📡 네이버 뉴스 수집 중...",
            font=("맑은 고딕", 11, "bold"),
            fg=self.C_TEXT, bg=self.C_PANEL)
        self.status_label.pack(padx=24, pady=(0, 20))

        self.progress = ttk.Progressbar(
            self.status_win, mode="indeterminate",
            length=400, style="TProgressbar")
        self.progress.pack(padx=24)
        self.progress.start(12)

    def update_status(self, text, current_val=0, max_val=100):
        def _update():
            if hasattr(self, "status_label") and self.status_label.winfo_exists():
                self.status_label.config(text=text)
        self.root.after(0, _update)

    def close_status_window(self):
        def _close():
            if hasattr(self, "status_win") and self.status_win.winfo_exists():
                self.status_win.destroy()
        self.root.after(0, _close)

    # ── 시스템 트레이 ───────────────────────────────────────
    def _make_tray_icon_image(self):
        img = Image.new("RGBA", (64, 64), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)
        d.ellipse([2, 2, 62, 62], fill="#1a73e8")
        d.rectangle([16, 18, 48, 46], fill="white")
        d.rectangle([20, 23, 44, 25], fill="#1a73e8")
        d.rectangle([20, 29, 38, 31], fill="#1a73e8")
        d.rectangle([20, 35, 35, 37], fill="#1a73e8")
        return img

    def _setup_tray(self):
        if not TRAY_AVAILABLE:
            return
        img = self._make_tray_icon_image()
        menu = pystray.Menu(
            TrayItem("PR 뉴스 모니터링 열기", self._show_window, default=True),
            pystray.Menu.SEPARATOR,
            TrayItem("지금 수집 실행", lambda icon, item: self.root.after(0, self.start_thread)),
            pystray.Menu.SEPARATOR,
            TrayItem("프로그램 종료", self._quit_app),
        )
        self.tray_icon = pystray.Icon(
            "뉴스모니터링", img,
            "카테노이드 뉴스모니터링\n더블클릭: 창 열기  |  우클릭: 메뉴",
            menu
        )
        threading.Thread(target=self.tray_icon.run, daemon=True).start()

    def _show_window(self, icon=None, item=None):
        self.root.after(0, lambda: (
            self.root.deiconify(),
            self.root.lift(),
            self.root.focus_force()
        ))

    def _hide_to_tray(self):
        self.root.withdraw()
        if TRAY_AVAILABLE and self.tray_icon:
            try:
                self.tray_icon.notify(
                    "백그라운드에서 계속 실행 중입니다.",
                    "카테노이드 뉴스모니터링"
                )
            except Exception:
                pass

    def _save_all(self):
        """전체 저장 — 모든 탭 입력값을 config JSON에 일괄 저장"""
        try:
            import json as _j

            # ── 1. 기업정보 (탭1) ──
            if hasattr(self, '_co_name'):
                services = []
                if hasattr(self, '_services_frame'):
                    for row in self._services_frame.winfo_children():
                        entries = [w for w in row.winfo_children()
                                   if isinstance(w, tk.Entry)]
                        if len(entries) >= 3:
                            en, ko, desc = entries[0].get(), entries[1].get(), entries[2].get()
                            if en or ko:
                                services.append({"name_en": en, "name": ko, "desc": desc})
                interests = []
                if hasattr(self, '_interests_frame'):
                    for row in self._interests_frame.winfo_children():
                        for w in row.winfo_children():
                            if isinstance(w, tk.Entry) and w.get().strip():
                                interests.append(w.get().strip())
                company = {
                    "_comment": "기업 기본 정보 — AI 프롬프트에 자동 주입됩니다.",
                    "name":      self._co_name.get().strip(),
                    "name_en":   self._co_name_en.get().strip(),
                    "identity":  self._co_identity.get("1.0", "end").strip(),
                    "services":  services,
                    "interests": interests,
                }
                with open(CONFIG_COMPANY, "w", encoding="utf-8") as f:
                    _j.dump(company, f, ensure_ascii=False, indent=2)

            # ── 2. 카테고리·키워드·AI필터 (탭2) ──
            if hasattr(self, 'scrollable_frame'):
                keywords_map, notes_map, ai_map = {}, {}, {}
                for card in self.scrollable_frame.winfo_children():
                    if not hasattr(card, "_cat_entry"): continue
                    cat  = card._cat_entry.get().strip()
                    kws  = [k.strip() for k in card._kw_entry.get().split(",") if k.strip()]
                    note = card._note_text.get("1.0", "end").strip()
                    ai   = card._ai_text.get("1.0", "end").strip()
                    if cat:
                        keywords_map[cat] = kws
                        notes_map[cat]    = note
                        ai_map[cat]       = ai

                # 공통 AI 필터
                global_rules = []
                if hasattr(self, '_global_ai_text'):
                    global_rules = [l.strip()
                        for l in self._global_ai_text.get("1.0", "end").splitlines()
                        if l.strip()]

                cats_data = _read_json(CONFIG_CATEGORIES, {})
                for cat, kws in keywords_map.items():
                    if cat not in cats_data:
                        cats_data[cat] = {}
                    cats_data[cat]["keywords"] = kws
                    cats_data[cat]["notes"]    = notes_map.get(cat, "")
                with open(CONFIG_CATEGORIES, "w", encoding="utf-8") as f:
                    _j.dump(cats_data, f, ensure_ascii=False, indent=2)

                ai_data = _read_json(CONFIG_AI_FILTER, {})
                ai_data["global"]      = global_rules
                ai_data["by_category"] = ai_map
                with open(CONFIG_AI_FILTER, "w", encoding="utf-8") as f:
                    _j.dump(ai_data, f, ensure_ascii=False, indent=2)

            # ── 3. 운영 설정 (탭4) ──
            if hasattr(self, 'days_entry'):
                try:
                    days   = int(self.days_entry.get())
                    hour   = int(self.auto_hour_entry.get())
                    minute = int(self.auto_min_entry.get())
                except ValueError:
                    days, hour, minute = 2, 9, 0
                portal    = self._portal_var.get() if hasattr(self, '_portal_var') else "naver"
                channel   = self._channel_var.get() if hasattr(self, '_channel_var') else "email"
                slack_url = self._slack_url_entry.get().strip() if hasattr(self, '_slack_url_entry') else ""
                receivers = [
                    w.winfo_children()[0].cget("text")
                    for w in self._receiver_frame.winfo_children()
                    if hasattr(w, 'winfo_children') and w.winfo_children()
                ] if hasattr(self, '_receiver_frame') else []

                sett = _read_json(CONFIG_SETTINGS, {})
                sett.update({
                    "days_limit": days, "auto_hour": hour, "auto_min": minute,
                    "portals": {"naver": portal == "naver", "google": portal == "google"},
                    "send_channel": channel, "slack_webhook_url": slack_url,
                    "receiver_emails": receivers,
                })
                with open(CONFIG_SETTINGS, "w", encoding="utf-8") as f:
                    _j.dump(sett, f, ensure_ascii=False, indent=2)

            # ── 4. 개발자 설정 (탭5) ──
            if hasattr(self, '_dev_naver_id'):
                keys = [
                    w.winfo_children()[1].get().strip()
                    for w in self._gemini_keys_frame.winfo_children()
                    if len(w.winfo_children()) > 1
                ] if hasattr(self, '_gemini_keys_frame') else []
                keys = [k for k in keys if k]
                dev = _read_json(CONFIG_DEVELOPER, {})
                dev["naver_api"] = {
                    "client_id":     self._dev_naver_id.get().strip(),
                    "client_secret": self._dev_naver_sec.get().strip(),
                }
                if keys:
                    dev["gemini_api_keys"] = keys
                dev["smtp"] = {
                    "provider":        self._smtp_provider.get() if hasattr(self, '_smtp_provider') else "Gmail",
                    "server":          self._dev_smtp_server.get().strip(),
                    "port":            int(self._dev_smtp_port.get().strip() or 587),
                    "sender_email":    self._dev_smtp_email.get().strip(),
                    "sender_password": self._dev_smtp_pw.get().strip(),
                }
                with open(CONFIG_DEVELOPER, "w", encoding="utf-8") as f:
                    _j.dump(dev, f, ensure_ascii=False, indent=2)

            # ── 완료 피드백 ──
            self.app_config = load_config()
            self.root.title("PR 뉴스 모니터링  ✓ 전체 저장됨")
            self.root.after(2000, lambda: self.root.title("PR 뉴스 모니터링"))

        except Exception as e:
            messagebox.showerror("저장 오류", f"전체 저장 중 오류가 발생했습니다.\n{e}")

    def _quit_app(self, icon=None, item=None):
        if self.tray_icon:
            self.tray_icon.stop()
        self.root.after(0, self.root.destroy)

    # ── 자동 실행 스케줄러 ─────────────────────────────────
    def _toggle_auto_run(self):
        if self.auto_toggle_var.get():
            self.auto_toggle_var.set(False)
            self.auto_toggle_btn.config(text="OFF", bg="#d0dce8", fg="#5f7a96")
            if self._auto_run_job:
                schedule.cancel_job(self._auto_run_job)
                self._auto_run_job = None
            print("[자동실행] 스케줄 해제")
        else:
            try:
                hour = int(self.auto_hour_entry.get())
                minute = int(self.auto_min_entry.get())
                if not (0 <= hour <= 23) or not (0 <= minute <= 59):
                    raise ValueError
            except ValueError:
                messagebox.showerror("오류", "시: 0~23, 분: 0~59 사이의 숫자를 입력해 주세요.")
                return
            time_str = f"{hour:02d}:{minute:02d}"
            self.auto_toggle_var.set(True)
            self.auto_toggle_btn.config(text=f"ON  {time_str}", bg="#1a73e8", fg="#ffffff")
            self._auto_run_job = schedule.every().day.at(time_str).do(self._auto_run_once)
            threading.Thread(target=self._schedule_loop, daemon=True).start()
            print(f"[자동실행] 매일 {time_str} 스케줄 등록")
            messagebox.showinfo("자동실행 등록",
                f"매일 {time_str}에 자동 수집 후 메일을 발송합니다.\nX 버튼으로 닫아도 트레이에서 계속 실행됩니다.")

    def _schedule_loop(self):
        while self.auto_toggle_var.get():
            schedule.run_pending()
            time.sleep(30)

    def _auto_run_once(self):
        print(f"[자동실행] {datetime.now().strftime('%Y-%m-%d %H:%M')} 자동 수집 시작")
        self.root.after(0, lambda: self.days_entry.delete(0, tk.END))
        self.root.after(0, lambda: self.days_entry.insert(0, "1"))
        self.root.after(100, self.start_thread)

    # ── 메인 프로세스 ────────────────────────────────────────
    def _show_error_popup(self, errors):
        """실행 중 발생한 오류를 모아서 드래그·복사 가능한 팝업으로 표시"""
        if not errors:
            return
        popup = tk.Toplevel(self.root)
        popup.title("실행 중 오류 발생")
        popup.geometry("680x420")
        popup.configure(bg=self.C_PANEL)
        popup.resizable(True, True)
        popup.transient(self.root)
        popup.grab_set()

        tk.Frame(popup, bg=self.C_DANGER, height=3).pack(fill="x")

        tk.Label(popup,
                 text=f"·  총 {len(errors)}건의 오류가 발생했습니다  —  텍스트를 드래그하여 복사할 수 있습니다",
                 font=("맑은 고딕", 11, "bold"),
                 fg=self.C_DANGER, bg=self.C_PANEL).pack(anchor="w", padx=16, pady=(10, 4))

        # 드래그·복사 가능한 텍스트 위젯
        txt = tk.Text(popup, font=("Consolas", 9),
                      bg=self.C_KW_BG, fg=self.C_TEXT,
                      relief="flat", wrap=tk.WORD,
                      padx=10, pady=8,
                      selectbackground=self.C_ACCENT2)
        txt.pack(fill="both", expand=True, padx=12, pady=(0, 8))

        for i, err in enumerate(errors, 1):
            txt.insert(tk.END, f"[{i}] {err}\n\n")
        txt.config(state="disabled")  # 읽기 전용 (드래그 복사는 가능)

        tk.Button(popup, text="닫기",
                  bg=self.C_BORDER, fg=self.C_TEXT,
                  font=("맑은 고딕", 11, "bold"),
                  bd=0, padx=20, pady=6, cursor="hand2",
                  command=popup.destroy).pack(pady=(0, 12))

    def start_process(self, days, keywords_map, notes_map):
        _errors = []  # 실행 중 발생한 오류를 모아두는 리스트
        try:
            save_config(days, keywords_map, notes_map)

            # ai_filter.json 에서 카테고리별 AI 필터 기준도 합산
            ai_filter_data = _read_json(CONFIG_AI_FILTER, {})
            ai_by_cat      = ai_filter_data.get("by_category", {})
            global_rules   = ai_filter_data.get("global", [])

            notes_context_list = []
            for cat, note_txt in notes_map.items():
                ai_rule = ai_by_cat.get(cat, "")
                combined = note_txt
                if ai_rule:
                    combined += f"\n\n[AI 필터 기준]\n{ai_rule}"
                notes_context_list.append(
                    f"■ 카테고리 [{cat}]에 대한 주의사항:\n{combined}"
                )
            if global_rules:
                global_str = "\n".join(global_rules)
                notes_context_list.insert(0,
                    f"■ 전체 공통 AI 필터:\n{global_str}")
            all_notes_context = "\n\n".join(notes_context_list)

            self.root.after(0, self.show_status_window)
            time.sleep(0.15)

            # 1단계: 뉴스 수집
            raw_results = []
            task_list = [(kw, days, cat) for cat, kws in keywords_map.items() for kw in kws]

            # ── 네이버 뉴스 수집 ──
            self.update_status("📡  네이버 뉴스 수집 중...")
            with ThreadPoolExecutor(max_workers=12) as ex:
                naver_futures = {ex.submit(get_naver_news, t[0], t[1], t[2]): t[0] for t in task_list}
                for future in as_completed(naver_futures):
                    kw = naver_futures[future]
                    try:
                        res = future.result()
                        if res: raw_results.extend(res)
                    except Exception as e:
                        _errors.append(f"[네이버 수집 오류] {kw}: {e}")

            # ── 중복 제거: 카테고리 우선순위 + 링크·제목 기준 ──
            # 우선순위: Customers(1) > Partners(2) > 나머지(3)
            # 같은 기사가 여러 카테고리에 수집됐을 때 우선순위 높은 카테고리로만 유지
            CATEGORY_PRIORITY = {"Customers": 1, "Partners": 2}

            # 링크/제목별 우선순위 가장 높은 항목 선별
            link_best  = {}  # link  → item (가장 우선순위 높은 것)
            title_best = {}  # title → item

            for item in raw_results:
                link  = item.get("링크", "")
                title = item.get("기사제목", "")
                cat   = item.get("구분", "")
                pri   = CATEGORY_PRIORITY.get(cat, 99)

                if link:
                    existing = link_best.get(link)
                    if existing is None or pri < CATEGORY_PRIORITY.get(existing.get("구분",""), 99):
                        link_best[link] = item
                if title:
                    existing = title_best.get(title)
                    if existing is None or pri < CATEGORY_PRIORITY.get(existing.get("구분",""), 99):
                        title_best[title] = item

            # 우선순위 기준으로 최종 목록 구성
            seen_links  = set()
            seen_titles = set()
            deduped = []
            # 우선순위 높은 순으로 정렬 후 처리
            sorted_results = sorted(
                raw_results,
                key=lambda x: CATEGORY_PRIORITY.get(x.get("구분",""), 99)
            )
            for item in sorted_results:
                link  = item.get("링크", "")
                title = item.get("기사제목", "")
                if link  and link  in seen_links:  continue
                if title and title in seen_titles: continue
                if link:  seen_links.add(link)
                if title: seen_titles.add(title)
                deduped.append(item)
            raw_results = deduped

            if not raw_results:
                self.root.after(0, lambda: (self.close_status_window(),
                    messagebox.showinfo("안내", "수집된 뉴스가 없습니다.")))
                self.is_running = False
                return

            # 2단계: AI 필터
            self.update_status("·  Gemini AI 필터링 중...")
            ai_decision_map = ask_gemini_bulk_refine(raw_results, all_notes_context, _errors)

            # 🛡️ [AI 분류 변형 완벽 차단 및 순수 필터화]
            # AI가 원래의 수집 카테고리를 임의 변경하는 것을 전적으로 방지합니다.
            # 제미나이는 오직 각 기사를 살려둘지(KEEP), 지울지(FILTERED_OUT)만 결정합니다.
            ai_refined = []
            for idx, item in enumerate(raw_results):
                decision = ai_decision_map.get(str(idx), "KEEP")
                
                # 오직 'KEEP'으로 판정된 기사만, 처음 네이버 수집 시에 정해진 '구분'을 100% 그대로 유지하여 승인합니다.
                if decision == "KEEP":
                    ai_refined.append(item)

            if not ai_refined:
                self.root.after(0, lambda: (self.close_status_window(),
                    messagebox.showinfo("안내", "필터링 후 유관 뉴스가 없습니다.")))
                self.is_running = False
                return

            df = pd.DataFrame(ai_refined)
            if "링크" in df.columns:
                df.drop_duplicates(subset=["링크"], keep="first", inplace=True)
            if "기사제목" in df.columns:
                df.drop_duplicates(subset=["기사제목"], keep="first", inplace=True)

            # 🛠 *[IndexError 사전 방지 안전장치]: Pre-Check 구조화 완수
            all_filtered_dfs = {}
            has_any_news = False

            for category in keywords_map.keys():
                df_sub = df[df["구분"] == category].copy() if not df.empty and "구분" in df.columns else pd.DataFrame()
                df_filtered = remove_duplicates_advanced(df_sub)
                all_filtered_dfs[category] = df_filtered
                if not df_filtered.empty:
                    has_any_news = True

            if not has_any_news:
                def _no_filtered_news():
                    self.close_status_window()
                    messagebox.showinfo("안내", "중복 제거 및 AI 정밀 필터링 결과, 유관한 새로운 뉴스가 존재하지 않습니다.")
                self.root.after(0, _no_filtered_news)
                self.is_running = False
                return

            # 3단계: 엑셀 + 이메일
            self.update_status("📊  엑셀 리포트 생성 중...")
            today_str = datetime.now().strftime("%Y%m%d")
            filename  = f"카테노이드_뉴스클리핑_{today_str}.xlsx"
            filepath  = os.path.join(os.getcwd(), filename)
            summary_html = ""

            with pd.ExcelWriter(filepath, engine="openpyxl") as writer:
                for category in keywords_map.keys():
                    df_filtered = all_filtered_dfs[category]

                    summary_html += f'''
                    <div style="margin-bottom:18px;padding:12px 16px;background:#fdfdfd;border-left:4px solid #3b9eff;border-radius:0 4px 4px 0;font-family:'맑은 고딕',sans-serif;">
                        <strong style="font-size:14px;color:#1c3d5a;">📌 {category}</strong>'''

                    if df_filtered.empty:
                        summary_html += '<p style="margin:6px 0 0;font-size:12px;color:#aaa;font-style:italic;">(수집된 뉴스 없음)</p>'
                    else:
                        summary_html += '<ul style="margin:8px 0 0;padding-left:18px;font-size:13px;">'
                        for _, row in df_filtered.head(15).iterrows():
                            summary_html += f'<li style="margin-bottom:4px;"><a href="{row["링크"]}" target="_blank" style="color:#0066cc;text-decoration:none;">{row["기사제목"]}</a> <span style="font-size:11px;color:#888;">({row["언론사"]} | {row["배포일자"]})</span></li>'
                        summary_html += "</ul>"
                    summary_html += "</div>"

                    if not df_filtered.empty:
                        excel_df = pd.DataFrame({
                            "구분":     df_filtered["구분"],
                            "검색키워드": df_filtered["검색키워드"],
                            "기사제목":  df_filtered.apply(make_hyperlink, axis=1),
                            "배포일자":  df_filtered["배포일자"],
                            "언론사":   df_filtered["언론사"],
                            "검색포털":  df_filtered["검색포털"],
                        })
                        sheet_name = re.sub(r'[\\*?:/\[\]]', '', str(category).strip())[:30] or "결과"
                        excel_df.to_excel(writer, index=False, sheet_name=sheet_name)

            _ch_sett  = _read_json(CONFIG_SETTINGS, {})
            _channel  = _ch_sett.get("send_channel", "email")
            _ch_label = {"email":"이메일","slack":"슬랙","email_slack":"이메일+슬랙"}.get(_channel,"이메일")
            self.update_status(f"발송 중... ({_ch_label})")
            _email_ok = send_email_with_summary(filepath, filename, summary_html, days) if _channel in ("email","email_slack") else False
            _slack_ok = send_slack_notification(summary_html, days) if _channel in ("slack","email_slack") else False

            def _finish():
                self.close_status_window()
                if os.path.exists(filepath):
                    try: os.remove(filepath)
                    except Exception: pass
                if _email_ok or _slack_ok:
                    messagebox.showinfo("발송 완료", f"리포트가 발송되었습니다. ({_ch_label})")
                else:
                    if not _email_ok and _channel in ("email","email_slack"):
                        _errors.append("[이메일 발송 실패] SMTP 오류 — 메일 계정 설정을 확인해 주세요.")
                    if not _slack_ok and _channel in ("slack","email_slack"):
                        _errors.append("[슬랙 발송 실패] 웹훅 URL을 확인해 주세요.")
                    messagebox.showwarning("경고", "발송에 실패했습니다. 개발자 설정을 확인해 주세요.")
                if _errors:
                    self.root.after(200, lambda: self._show_error_popup(_errors))
                self.is_running = False
            self.root.after(0, _finish)

        except Exception as proc_err:
            import traceback
            err_detail = traceback.format_exc()
            _errors.append(f"[치명적 오류]\n{err_detail}")
            self.close_status_window()
            self.root.after(0, lambda: self._show_error_popup(_errors))
            self.is_running = False

if __name__ == "__main__":
    # ── 로그 파일 설정 ──────────────────────────────────
    # debug/ 폴더에 일자별 파일 생성 (monitoring_YYYYMMDD.log)
    # 30일 이상 된 파일은 자동 삭제
    _base_dir = os.path.dirname(os.path.abspath(__file__))
    _log_dir  = os.path.join(_base_dir, "debug")
    os.makedirs(_log_dir, exist_ok=True)

    _today    = datetime.now().strftime("%Y%m%d")
    log_path  = os.path.join(_log_dir, f"monitoring_{_today}.log")

    logging.basicConfig(
        level=logging.INFO,           # DEBUG → INFO (PIL 플러그인 로딩 등 제외)
        format="%(asctime)s [%(levelname)s] %(message)s",
        handlers=[
            logging.FileHandler(log_path, encoding="utf-8"),
        ]
    )
    # 외부 라이브러리 DEBUG 로그 끄기 (PIL, requests 등)
    logging.getLogger("PIL").setLevel(logging.WARNING)
    logging.getLogger("urllib3").setLevel(logging.WARNING)
    logging.getLogger("requests").setLevel(logging.WARNING)

    # print() 출력은 로그 파일로 리다이렉트 (오류 추적용)
    # sys.stdout / sys.stderr 리다이렉트는 하지 않음
    # → PIL 등 외부 라이브러리 DEBUG 출력이 로그에 쌓이는 문제 방지
    logging.info(f"=== 뉴스모니터링 시작 ({_today}) ===")

    # 30일 이상 된 로그 파일 자동 삭제
    import glob
    _cutoff = datetime.now() - timedelta(days=30)
    for _old in glob.glob(os.path.join(_log_dir, "monitoring_*.log")):
        try:
            _file_date = datetime.strptime(os.path.basename(_old), "monitoring_%Y%m%d.log")
            if _file_date < _cutoff:
                os.remove(_old)
        except Exception:
            pass
    # ────────────────────────────────────────────────────

    import subprocess, sys
    for pkg, imp in [("schedule","schedule"), ("pystray","pystray"), ("pillow","PIL")]:
        try:
            __import__(imp)
        except ImportError:
            print(f"{pkg} 설치 중...")
            subprocess.check_call([sys.executable, "-m", "pip", "install", pkg, "-q"])
    import schedule
    try:
        import pystray
        from pystray import MenuItem as TrayItem
        from PIL import Image, ImageDraw
        TRAY_AVAILABLE = True
    except ImportError:
        TRAY_AVAILABLE = False

    root = tk.Tk()
    app = ModernMonitoringApp(root)
    root.protocol("WM_DELETE_WINDOW", app._hide_to_tray)  # X버튼 → 트레이 숨기기
    app._setup_tray()
    root.mainloop()