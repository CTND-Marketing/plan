# 뉴스클리핑 — 카테노이드 PR 뉴스 모니터링 시스템

카테노이드 PR팀을 위한 자율형 뉴스 수집·필터링·발송 자동화 시스템입니다.

## 주요 기능

- **네이버 뉴스 API** 기반 키워드 자동 수집
- **Gemini AI** 기반 2차 정밀 필터링
- **카테고리별 맞춤 설정** (키워드·수집 주의사항·AI 필터 기준)
- **이메일 / 슬랙** 자동 발송 (채널 선택 가능)
- **자동 발송 스케줄러** (매일 지정 시간 자동 실행)
- **중복 기사 자동 제거** (TF-IDF + 코사인 유사도)
- **테스트 기능** (저장 후 샘플 수집으로 설정 검증)

## 폴더 구조

```
news-clipping/
├── monitoring.py          # 메인 실행 파일
├── 뉴스모니터링.vbs        # 실행 (CMD 창 없이)
├── 뉴스모니터링.bat        # 실행 (오류 확인용)
├── requirements.txt       # 필요 패키지
│
├── config/
│   ├── company.json       # 기업 기본 정보
│   ├── categories.json    # 카테고리·키워드·수집 주의사항
│   ├── ai_filter.json     # AI 필터 기준
│   ├── settings.json      # 운영 설정 (수집기간·발송시간·수신자)
│   └── developer.json     # API 키·SMTP (gitignore 제외 — 직접 생성 필요)
│
├── modules/               # 모듈 폴더 (추후 확장용)
└── debug/                 # 실행 로그 (자동 생성)
```

## 설치 방법

### 1. 패키지 설치

```bash
pip install -r requirements.txt
```

### 2. developer.json 생성

`config/` 폴더 안에 `developer.json` 파일을 직접 만들어야 합니다.
(API 키 보안상 깃허브에 포함되지 않습니다)

```json
{
  "naver_api": {
    "client_id": "네이버_API_클라이언트_ID",
    "client_secret": "네이버_API_시크릿"
  },
  "gemini_api_keys": [
    "Gemini_API_키_1",
    "Gemini_API_키_2"
  ],
  "smtp": {
    "provider": "Gmail",
    "server": "smtp.gmail.com",
    "port": 587,
    "sender_email": "발신_이메일@gmail.com",
    "sender_password": "Gmail_앱_비밀번호_16자리"
  },
  "invalid_domains": [
    "blog.naver.com",
    "cafe.naver.com",
    "tistory.com",
    "post.naver.com"
  ]
}
```

### 3. 실행

- **일반 실행**: `뉴스모니터링.vbs` 더블클릭 (CMD 창 없음)
- **오류 확인**: `뉴스모니터링.bat` 더블클릭 (CMD 창 표시)

## API 키 발급

| API | 발급 경로 |
|-----|----------|
| 네이버 검색 API | [developers.naver.com](https://developers.naver.com) → 애플리케이션 등록 → 검색 |
| Gemini API | [aistudio.google.com](https://aistudio.google.com) → Get API Key |
| Gmail 앱 비밀번호 | myaccount.google.com → 보안 → 2단계 인증 → 앱 비밀번호 |

## 설정 방법

프로그램 실행 후 각 탭에서 설정 → **전체 저장** 클릭

| 탭 | 설정 내용 |
|----|----------|
| 기업정보 | 기업명·서비스·핵심 관심 영역 |
| 카테고리 | 키워드·수집 주의사항·AI 필터 기준 |
| AI 필터 | 전체 공통 필터 현황 확인 |
| 운영 설정 | 수집 기간·포털·발송 채널·수신자 |
| 개발자 설정 | API 키·SMTP 설정 |
| 테스트 | 카테고리별 샘플 수집 미리보기 |

## 요구 사항

- Windows 10/11
- Python 3.8 이상
- 인터넷 연결 필요 (네이버 API, Gemini API)
