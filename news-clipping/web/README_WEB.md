# 뉴스클리핑 웹 버전

## 실행 방법

```bash
# 1. 패키지 설치
pip install -r requirements.txt

# 2. 서버 실행
python app.py

# 3. 브라우저에서 접속
http://localhost:5000
```

## 폴더 구조

```
web/
├── app.py              ← Flask 서버
├── requirements.txt
├── templates/
│   ├── base.html       ← 공통 레이아웃
│   ├── company.html    ← 기업정보
│   ├── category.html   ← 카테고리·키워드
│   ├── settings.html   ← 운영 설정
│   ├── developer.html  ← 개발자 설정
│   └── test.html       ← 테스트
└── static/
    ├── css/style.css
    └── js/main.js
```

config/ 폴더는 web/ 폴더의 상위 디렉토리에 있어야 합니다.
