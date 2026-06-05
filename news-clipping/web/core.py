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