// ============================================================
// 2025년 4분기 데이터
// ============================================================
// 기간: 2025.10.01 - 2025.12.31
// 단계: 시즌 특수
// ============================================================

window.PERIOD_2025_Q4 = {
  "meta": {
    "id": "2025-q4",
    "label": "2025년 4분기",
    "range": "2025.10.01 - 2025.12.31",
    "sampleStart": "2025.11.01",
    "sampleEnd": "2025.11.19",
    "dayLabels": [
      "11/1",
      "11/2",
      "11/3",
      "11/4",
      "11/5",
      "11/6",
      "11/7",
      "11/8",
      "11/9",
      "11/10",
      "11/11",
      "11/12",
      "11/13",
      "11/14",
      "11/15",
      "11/16",
      "11/17",
      "11/18",
      "11/19"
    ],
    "phase": "시즌 특수"
  },
  "CONNECTED_FLOW_DATA": {
    "linen": {
      "name": "린넨 셋업 컬렉션 상세 (5개 연결)",
      "totalLoad": 167805,
      "lastPct": 22,
      "mainExit": "영상 #2 → #3 (-32%p)",
      "dailyLoad": [
        7682,
        8236,
        8697,
        9110,
        8815,
        9275,
        9511,
        9169,
        8815,
        9051,
        9346,
        9629,
        9782,
        9546,
        9169,
        8980,
        8815,
        8449,
        8685
      ],
      "videos": [
        {
          "id": "cv-linen-1",
          "name": "영상 #1",
          "loads": 33559,
          "position": "상단"
        },
        {
          "id": "cv-linen-2",
          "name": "영상 #2",
          "loads": 24834,
          "position": "중상단"
        },
        {
          "id": "cv-linen-3",
          "name": "영상 #3",
          "loads": 14095,
          "position": "중단"
        },
        {
          "id": "cv-linen-4",
          "name": "영상 #4",
          "loads": 10403,
          "position": "중하단"
        },
        {
          "id": "cv-linen-5",
          "name": "영상 #5",
          "loads": 7383,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "33,559",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 74,
          "label": "영상 #2",
          "count": "24,834",
          "loc": "중상단",
          "down": false
        },
        {
          "pct": 42,
          "label": "영상 #3",
          "count": "14,095",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 31,
          "label": "영상 #4",
          "count": "10,403",
          "loc": "중하단",
          "down": false
        },
        {
          "pct": 22,
          "label": "영상 #5",
          "count": "7,383",
          "loc": "하단",
          "down": false
        }
      ],
      "alert": "영상 #2 → #3 구간에서 이탈률 32%p 급증. 영상 #3 인트로 점검 권장.",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 78,
          "count": "130,886",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 14,
          "count": "23,493",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 6,
          "count": "10,068",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 2,
          "count": "3,356",
          "external": true
        }
      ]
    },
    "shoes": {
      "name": "신상 슈즈 컬렉션 (4개 연결)",
      "totalLoad": 116159,
      "lastPct": 35,
      "mainExit": "영상 #1 → #2 (-28%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-shoes-1",
          "name": "영상 #1",
          "loads": 29040,
          "position": "상단"
        },
        {
          "id": "cv-shoes-2",
          "name": "영상 #2",
          "loads": 20908,
          "position": "중단"
        },
        {
          "id": "cv-shoes-3",
          "name": "영상 #3",
          "loads": 15682,
          "position": "중하단"
        },
        {
          "id": "cv-shoes-4",
          "name": "영상 #4",
          "loads": 10173,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "29,040",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 72,
          "label": "영상 #2",
          "count": "20,908",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 54,
          "label": "영상 #3",
          "count": "15,682",
          "loc": "중하단",
          "down": false
        },
        {
          "pct": 35,
          "label": "영상 #4",
          "count": "10,173",
          "loc": "하단",
          "down": false
        }
      ],
      "alert": "영상 #1 → #2 구간에서 이탈률 28%p 발생.",
      "domain": []
    },
    "denim": {
      "name": "데님 시리즈 (3개 연결)",
      "totalLoad": 85099,
      "lastPct": 48,
      "mainExit": "영상 #1 → #2 (-22%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-denim-1",
          "name": "영상 #1",
          "loads": 21275,
          "position": "상단"
        },
        {
          "id": "cv-denim-2",
          "name": "영상 #2",
          "loads": 16594,
          "position": "중단"
        },
        {
          "id": "cv-denim-3",
          "name": "영상 #3",
          "loads": 10215,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "21,275",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 78,
          "label": "영상 #2",
          "count": "16,594",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 48,
          "label": "영상 #3",
          "count": "10,215",
          "loc": "하단",
          "down": false
        }
      ],
      "alert": "마지막까지 시청률 48%로 양호.",
      "domain": []
    },
    "outer": {
      "name": "아우터 컬렉션 (3개 연결)",
      "totalLoad": 63957,
      "lastPct": 52,
      "mainExit": "영상 #1 → #2 (-18%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-outer-1",
          "name": "영상 #1",
          "loads": 15989,
          "position": "상단"
        },
        {
          "id": "cv-outer-2",
          "name": "영상 #2",
          "loads": 13111,
          "position": "중단"
        },
        {
          "id": "cv-outer-3",
          "name": "영상 #3",
          "loads": 8300,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "15,989",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 82,
          "label": "영상 #2",
          "count": "13,111",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 52,
          "label": "영상 #3",
          "count": "8,300",
          "loc": "하단",
          "down": false
        }
      ],
      "alert": "시청 유지율이 우수합니다.",
      "domain": []
    },
    "acc": {
      "name": "액세서리 시리즈 (4개 연결)",
      "totalLoad": 50603,
      "lastPct": 28,
      "mainExit": "영상 #2 → #3 (-30%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-acc-1",
          "name": "영상 #1",
          "loads": 12651,
          "position": "상단"
        },
        {
          "id": "cv-acc-2",
          "name": "영상 #2",
          "loads": 10627,
          "position": "중상단"
        },
        {
          "id": "cv-acc-3",
          "name": "영상 #3",
          "loads": 6831,
          "position": "중단"
        },
        {
          "id": "cv-acc-4",
          "name": "영상 #4",
          "loads": 3549,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "12,651",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 84,
          "label": "영상 #2",
          "count": "10,627",
          "loc": "중상단",
          "down": false
        },
        {
          "pct": 54,
          "label": "영상 #3",
          "count": "6,831",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 28,
          "label": "영상 #4",
          "count": "3,549",
          "loc": "하단",
          "down": false
        }
      ],
      "alert": "영상 #2 → #3 구간에서 30%p 급락.",
      "domain": []
    },
    "bigDeal": {
      "name": "여름 빅딜 페이지 (10개 연결)",
      "totalLoad": 222336,
      "lastPct": 18,
      "mainExit": "영상 #4 → #5 (-25%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-bigDeal-1",
          "name": "영상 #1",
          "loads": 44467,
          "position": "영상 #1"
        },
        {
          "id": "cv-bigDeal-2",
          "name": "영상 #2",
          "loads": 40016,
          "position": "영상 #2"
        },
        {
          "id": "cv-bigDeal-3",
          "name": "영상 #3",
          "loads": 33350,
          "position": "영상 #3"
        },
        {
          "id": "cv-bigDeal-4",
          "name": "영상 #4",
          "loads": 26688,
          "position": "영상 #4"
        },
        {
          "id": "cv-bigDeal-5",
          "name": "영상 #5",
          "loads": 15563,
          "position": "영상 #5"
        },
        {
          "id": "cv-bigDeal-6",
          "name": "영상 #6",
          "loads": 11117,
          "position": "영상 #6"
        },
        {
          "id": "cv-bigDeal-7",
          "name": "영상 #7",
          "loads": 8331,
          "position": "영상 #7"
        },
        {
          "id": "cv-bigDeal-8",
          "name": "영상 #8",
          "loads": 6665,
          "position": "영상 #8"
        },
        {
          "id": "cv-bigDeal-9",
          "name": "영상 #9",
          "loads": 5558,
          "position": "영상 #9"
        },
        {
          "id": "cv-bigDeal-10",
          "name": "영상 #10",
          "loads": 4622,
          "position": "영상 #10"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "44,467",
          "loc": "",
          "down": false
        },
        {
          "pct": 90,
          "label": "영상 #2",
          "count": "40,016",
          "loc": "",
          "down": false
        },
        {
          "pct": 75,
          "label": "영상 #3",
          "count": "33,350",
          "loc": "",
          "down": false
        },
        {
          "pct": 60,
          "label": "영상 #4",
          "count": "26,688",
          "loc": "",
          "down": false
        },
        {
          "pct": 35,
          "label": "영상 #5",
          "count": "15,563",
          "loc": "",
          "down": true
        },
        {
          "pct": 25,
          "label": "영상 #6",
          "count": "11,117",
          "loc": "",
          "down": false
        },
        {
          "pct": 19,
          "label": "영상 #7",
          "count": "8,331",
          "loc": "",
          "down": false
        },
        {
          "pct": 15,
          "label": "영상 #8",
          "count": "6,665",
          "loc": "",
          "down": false
        },
        {
          "pct": 12,
          "label": "영상 #9",
          "count": "5,558",
          "loc": "",
          "down": false
        },
        {
          "pct": 10,
          "label": "영상 #10",
          "count": "4,622",
          "loc": "",
          "down": false
        }
      ],
      "alert": "영상 #4 → #5 구간 이탈 25%p.",
      "domain": []
    },
    "megaBrand": {
      "name": "메가 브랜드 페이지 (20개 연결)",
      "totalLoad": 369198,
      "lastPct": 9,
      "mainExit": "영상 #6 → #7 (-22%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-megaBrand-1",
          "name": "영상 #1",
          "loads": 73840,
          "position": "영상 #1"
        },
        {
          "id": "cv-megaBrand-2",
          "name": "영상 #2",
          "loads": 64979,
          "position": "영상 #2"
        },
        {
          "id": "cv-megaBrand-3",
          "name": "영상 #3",
          "loads": 57608,
          "position": "영상 #3"
        },
        {
          "id": "cv-megaBrand-4",
          "name": "영상 #4",
          "loads": 51688,
          "position": "영상 #4"
        },
        {
          "id": "cv-megaBrand-5",
          "name": "영상 #5",
          "loads": 47995,
          "position": "영상 #5"
        },
        {
          "id": "cv-megaBrand-6",
          "name": "영상 #6",
          "loads": 45042,
          "position": "영상 #6"
        },
        {
          "id": "cv-megaBrand-7",
          "name": "영상 #7",
          "loads": 28798,
          "position": "영상 #7"
        },
        {
          "id": "cv-megaBrand-8",
          "name": "영상 #8",
          "loads": 24367,
          "position": "영상 #8"
        },
        {
          "id": "cv-megaBrand-9",
          "name": "영상 #9",
          "loads": 20675,
          "position": "영상 #9"
        },
        {
          "id": "cv-megaBrand-10",
          "name": "영상 #10",
          "loads": 17722,
          "position": "영상 #10"
        },
        {
          "id": "cv-megaBrand-11",
          "name": "영상 #11",
          "loads": 15508,
          "position": "영상 #11"
        },
        {
          "id": "cv-megaBrand-12",
          "name": "영상 #12",
          "loads": 13293,
          "position": "영상 #12"
        },
        {
          "id": "cv-megaBrand-13",
          "name": "영상 #13",
          "loads": 11814,
          "position": "영상 #13"
        },
        {
          "id": "cv-megaBrand-14",
          "name": "영상 #14",
          "loads": 10338,
          "position": "영상 #14"
        },
        {
          "id": "cv-megaBrand-15",
          "name": "영상 #15",
          "loads": 9599,
          "position": "영상 #15"
        },
        {
          "id": "cv-megaBrand-16",
          "name": "영상 #16",
          "loads": 8861,
          "position": "영상 #16"
        },
        {
          "id": "cv-megaBrand-17",
          "name": "영상 #17",
          "loads": 8122,
          "position": "영상 #17"
        },
        {
          "id": "cv-megaBrand-18",
          "name": "영상 #18",
          "loads": 7384,
          "position": "영상 #18"
        },
        {
          "id": "cv-megaBrand-19",
          "name": "영상 #19",
          "loads": 7015,
          "position": "영상 #19"
        },
        {
          "id": "cv-megaBrand-20",
          "name": "영상 #20",
          "loads": 6646,
          "position": "영상 #20"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "73,840",
          "loc": "",
          "down": false
        },
        {
          "pct": 88,
          "label": "영상 #2",
          "count": "64,979",
          "loc": "",
          "down": false
        },
        {
          "pct": 78,
          "label": "영상 #3",
          "count": "57,608",
          "loc": "",
          "down": false
        },
        {
          "pct": 70,
          "label": "영상 #4",
          "count": "51,688",
          "loc": "",
          "down": false
        },
        {
          "pct": 65,
          "label": "영상 #5",
          "count": "47,995",
          "loc": "",
          "down": false
        },
        {
          "pct": 61,
          "label": "영상 #6",
          "count": "45,042",
          "loc": "",
          "down": false
        },
        {
          "pct": 39,
          "label": "영상 #7",
          "count": "28,798",
          "loc": "",
          "down": true
        },
        {
          "pct": 33,
          "label": "영상 #8",
          "count": "24,367",
          "loc": "",
          "down": false
        },
        {
          "pct": 28,
          "label": "영상 #9",
          "count": "20,675",
          "loc": "",
          "down": false
        },
        {
          "pct": 24,
          "label": "영상 #10",
          "count": "17,722",
          "loc": "",
          "down": false
        },
        {
          "pct": 21,
          "label": "영상 #11",
          "count": "15,508",
          "loc": "",
          "down": false
        },
        {
          "pct": 18,
          "label": "영상 #12",
          "count": "13,293",
          "loc": "",
          "down": false
        },
        {
          "pct": 16,
          "label": "영상 #13",
          "count": "11,814",
          "loc": "",
          "down": false
        },
        {
          "pct": 14,
          "label": "영상 #14",
          "count": "10,338",
          "loc": "",
          "down": false
        },
        {
          "pct": 13,
          "label": "영상 #15",
          "count": "9,599",
          "loc": "",
          "down": false
        },
        {
          "pct": 12,
          "label": "영상 #16",
          "count": "8,861",
          "loc": "",
          "down": false
        },
        {
          "pct": 11,
          "label": "영상 #17",
          "count": "8,122",
          "loc": "",
          "down": false
        },
        {
          "pct": 10,
          "label": "영상 #18",
          "count": "7,384",
          "loc": "",
          "down": false
        },
        {
          "pct": 9.5,
          "label": "영상 #19",
          "count": "7,015",
          "loc": "",
          "down": false
        },
        {
          "pct": 9,
          "label": "영상 #20",
          "count": "6,646",
          "loc": "",
          "down": false
        }
      ],
      "alert": "중반부 콘텐츠 점검 + 영상 수 축소 검토.",
      "domain": []
    }
  },
  "SINGLE_VIDEO_DATA": {
    "v1": {
      "name": "린넨 셋업 컬렉션 메인 배너",
      "load": "47,063",
      "play": "38,592 (82%)",
      "avg": "16.8초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 84,
          "count": "39,534",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 10,
          "count": "4,706",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 6,
          "count": "2,824",
          "external": true
        }
      ]
    },
    "v2": {
      "name": "신상 가방 클로즈업",
      "load": "31,987",
      "play": "23,991 (75%)",
      "avg": "13.2초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 92,
          "count": "29,428",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 5,
          "count": "1,599",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 3,
          "count": "961",
          "external": true
        }
      ]
    },
    "v3": {
      "name": "스니커즈 풋샷",
      "load": "27,388",
      "play": "19,171 (70%)",
      "avg": "11.8초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 79,
          "count": "21,636",
          "external": false
        },
        {
          "name": "brand.musinsa.com",
          "label": "외부",
          "pct": 14,
          "count": "3,834",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 7,
          "count": "1,918",
          "external": true
        }
      ]
    },
    "v4": {
      "name": "여름 메인 비주얼",
      "load": "21,762",
      "play": "16,974 (78%)",
      "avg": "15.4초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 88,
          "count": "19,150",
          "external": false
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 12,
          "count": "2,611",
          "external": true
        }
      ]
    },
    "v5": {
      "name": "크롭 셔츠 디테일",
      "load": "19,791",
      "play": "12,864 (65%)",
      "avg": "10.2초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 81,
          "count": "16,030",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 11,
          "count": "2,177",
          "external": true
        },
        {
          "name": "brand.musinsa.com",
          "label": "외부",
          "pct": 8,
          "count": "1,584",
          "external": true
        }
      ]
    }
  },
  "FLOATING_DATA": {
    "floating-home": {
      "name": "홈 메인 플로팅",
      "load": "73,632",
      "clicks": "3,984",
      "ctr": "5.41%",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 88,
          "count": "64,796",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 8,
          "count": "5,891",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 4,
          "count": "2,945",
          "external": true
        }
      ],
      "banners": [
        {
          "name": "린넨 반팔 셋업 (베이지)",
          "clicks": 3984,
          "ctr": 5.41
        }
      ]
    },
    "floating-category": {
      "name": "카테고리 플로팅 (상의)",
      "load": "61,148",
      "clicks": "2,270",
      "ctr": "3.71%",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 94,
          "count": "57,479",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 6,
          "count": "3,669",
          "external": true
        }
      ],
      "banners": [
        {
          "name": "셔츠 컬렉션 시리즈",
          "clicks": 2270,
          "ctr": 3.71
        }
      ]
    },
    "floating-event": {
      "name": "이벤트 페이지 플로팅",
      "load": "40,597",
      "clicks": "1,062",
      "ctr": "2.62%",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 71,
          "count": "28,824",
          "external": false
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 22,
          "count": "8,931",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 7,
          "count": "2,841",
          "external": true
        }
      ],
      "banners": [
        {
          "name": "여름 시즌오프 ~50%",
          "clicks": 1062,
          "ctr": 2.62
        }
      ]
    }
  },
  "SLIDE_VIDEO_DATA": {
    "sv1": {
      "name": "린넨 반팔 셋업 쇼츠",
      "clicks": 2179,
      "ctr": 8.42,
      "banners": [
        {
          "name": "린넨 반팔 셋업 (베이지)",
          "clicks": 1300,
          "ctr": 5.02
        },
        {
          "name": "린넨 반팔 셋업 (네이비)",
          "clicks": 879,
          "ctr": 3.4
        }
      ],
      "domain": []
    },
    "sv2": {
      "name": "와이드 슬랙스 쇼츠",
      "clicks": 1702,
      "ctr": 7.18,
      "banners": [
        {
          "name": "와이드 슬랙스 (블랙)",
          "clicks": 1702,
          "ctr": 7.18
        }
      ],
      "domain": []
    },
    "sv3": {
      "name": "크롭 셔츠 쇼츠",
      "clicks": 1307,
      "ctr": 5.74,
      "banners": [
        {
          "name": "크롭 셔츠 (화이트)",
          "clicks": 1307,
          "ctr": 5.74
        }
      ],
      "domain": []
    },
    "sv4": {
      "name": "밀짚 모자 쇼츠",
      "clicks": 828,
      "ctr": 3.81,
      "banners": [
        {
          "name": "밀짚 모자 (내추럴)",
          "clicks": 828,
          "ctr": 3.81
        }
      ],
      "domain": []
    },
    "s2v1": {
      "name": "린넨 자켓 룩북",
      "clicks": 1654,
      "ctr": 6.62,
      "banners": [],
      "domain": []
    },
    "s2v2": {
      "name": "린넨 셔츠 디테일",
      "clicks": 1175,
      "ctr": 5.91,
      "banners": [],
      "domain": []
    },
    "s2v3": {
      "name": "린넨 팬츠 핏감",
      "clicks": 776,
      "ctr": 5.42,
      "banners": [],
      "domain": []
    },
    "s3v1": {
      "name": "룩북 #1 모델 워킹",
      "clicks": 942,
      "ctr": 5.74,
      "banners": [],
      "domain": []
    },
    "s3v2": {
      "name": "룩북 #2 클로즈업",
      "clicks": 758,
      "ctr": 5.18,
      "banners": [],
      "domain": []
    },
    "s3v3": {
      "name": "룩북 #3 디테일",
      "clicks": 533,
      "ctr": 4.04,
      "banners": [],
      "domain": []
    },
    "s4v1": {
      "name": "베스트 #1",
      "clicks": 439,
      "ctr": 4.12,
      "banners": [],
      "domain": []
    },
    "s4v2": {
      "name": "베스트 #2",
      "clicks": 360,
      "ctr": 3.74,
      "banners": [],
      "domain": []
    }
  },
  "MULTI_VIDEO_DATA": {
    "mv1": {
      "name": "비치웨어 모델 컷 A",
      "clicks": 1206,
      "ctr": 4.62,
      "banners": [
        {
          "name": "비치 원피스 (화이트)",
          "clicks": 722,
          "ctr": 2.77
        },
        {
          "name": "비치 모자",
          "clicks": 484,
          "ctr": 1.85
        }
      ],
      "domain": []
    },
    "mv2": {
      "name": "선글라스 클로즈업",
      "clicks": 514,
      "ctr": 3.18,
      "banners": [
        {
          "name": "오버사이즈 선글라스",
          "clicks": 514,
          "ctr": 3.18
        }
      ],
      "domain": []
    },
    "mv3": {
      "name": "샌들 360°",
      "clicks": 260,
      "ctr": 2.41,
      "banners": [
        {
          "name": "플랫 샌들 (탠)",
          "clicks": 260,
          "ctr": 2.41
        }
      ],
      "domain": []
    },
    "mv4": {
      "name": "비치백 디테일",
      "clicks": 71,
      "ctr": 1.18,
      "banners": [
        {
          "name": "비치백 (스트로)",
          "clicks": 71,
          "ctr": 1.18
        }
      ],
      "domain": []
    },
    "m2v1": {
      "name": "시즌 룩 1",
      "clicks": 385,
      "ctr": 3.1,
      "banners": [],
      "domain": []
    },
    "m2v2": {
      "name": "시즌 룩 2",
      "clicks": 271,
      "ctr": 2.62,
      "banners": [],
      "domain": []
    }
  },
  "VIDEO_DETAIL_DATA": {
    "v1": {
      "name": "린넨 셋업 컬렉션 메인 배너",
      "type": "단일 영상",
      "placement": "메인 배너",
      "load": 47063,
      "play": 38592,
      "playRate": 82,
      "avgTime": 16.8,
      "parentPage": "displayer",
      "dailyLoad": [
        2148,
        2301,
        2454,
        2608,
        2466,
        2643,
        2537,
        2466,
        2572,
        2726,
        2620,
        2808,
        2879,
        2820,
        2690,
        2726,
        2655,
        2502,
        2572
      ],
      "dailyPlay": [
        1761,
        1887,
        2013,
        2138,
        2023,
        2168,
        2080,
        2023,
        2110,
        2235,
        2148,
        2303,
        2361,
        2313,
        2207,
        2235,
        2177,
        2051,
        2110
      ],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 84,
          "count": "39,534",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 10,
          "count": "4,706",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 6,
          "count": "2,824",
          "external": true
        }
      ]
    },
    "v2": {
      "name": "신상 가방 클로즈업",
      "type": "단일 영상",
      "placement": "상세페이지",
      "load": 31987,
      "play": 23991,
      "playRate": 75,
      "avgTime": 13.2,
      "parentPage": "displayer",
      "dailyLoad": [
        1463,
        1558,
        1664,
        1628,
        1711,
        1758,
        1794,
        1746,
        1664,
        1617,
        1699,
        1770,
        1805,
        1758,
        1664,
        1605,
        1558,
        1510,
        1558
      ],
      "dailyPlay": [
        1097,
        1168,
        1248,
        1221,
        1284,
        1319,
        1345,
        1310,
        1248,
        1213,
        1274,
        1328,
        1355,
        1319,
        1248,
        1204,
        1168,
        1133,
        1168
      ],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 92,
          "count": "29,428",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 5,
          "count": "1,599",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 3,
          "count": "961",
          "external": true
        }
      ]
    },
    "v3": {
      "name": "스니커즈 풋샷",
      "type": "단일 영상",
      "placement": "상세페이지",
      "load": 27388,
      "play": 19171,
      "playRate": 70,
      "avgTime": 11.8,
      "parentPage": "displayer",
      "dailyLoad": [],
      "dailyPlay": [],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 79,
          "count": "21,636",
          "external": false
        },
        {
          "name": "brand.musinsa.com",
          "label": "외부",
          "pct": 14,
          "count": "3,834",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 7,
          "count": "1,918",
          "external": true
        }
      ]
    },
    "v4": {
      "name": "여름 메인 비주얼",
      "type": "단일 영상",
      "placement": "메인 배너",
      "load": 21762,
      "play": 16974,
      "playRate": 78,
      "avgTime": 15.4,
      "parentPage": "displayer",
      "dailyLoad": [],
      "dailyPlay": [],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 88,
          "count": "19,150",
          "external": false
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 12,
          "count": "2,611",
          "external": true
        }
      ]
    },
    "v5": {
      "name": "크롭 셔츠 디테일",
      "type": "단일 영상",
      "placement": "상세페이지",
      "load": 19791,
      "play": 12864,
      "playRate": 65,
      "avgTime": 10.2,
      "parentPage": "displayer",
      "dailyLoad": [],
      "dailyPlay": [],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 81,
          "count": "16,030",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 11,
          "count": "2,177",
          "external": true
        },
        {
          "name": "brand.musinsa.com",
          "label": "외부",
          "pct": 8,
          "count": "1,584",
          "external": true
        }
      ]
    }
  },
  "WIDGET_DETAIL_DATA": {
    "floating-home": {
      "name": "홈 메인 플로팅",
      "type": "플로팅 위젯",
      "created": "2026.03.02",
      "parentPage": "widget-floating",
      "load": 73632,
      "clicks": 3984,
      "ctr": 5.41,
      "dailyLoad": [
        3328,
        3552,
        3752,
        3918,
        3788,
        3988,
        4095,
        3941,
        3788,
        3882,
        4024,
        4154,
        4224,
        4118,
        3941,
        3859,
        3788,
        3634,
        3729
      ],
      "dailyClicks": [
        179,
        192,
        203,
        212,
        205,
        216,
        222,
        214,
        205,
        210,
        217,
        224,
        229,
        223,
        214,
        209,
        205,
        197,
        202
      ],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 88,
          "count": "64,796",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 8,
          "count": "5,891",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 4,
          "count": "2,945",
          "external": true
        }
      ],
      "engagement": {
        "likes": 2391,
        "shares": 996,
        "saves": 399
      },
      "videos": [
        {
          "id": "floating-home-v1",
          "name": "홈 메인 플로팅 영상",
          "dailyClicks": [
            179,
            192,
            203,
            212,
            205,
            216,
            222,
            214,
            205,
            210,
            217,
            224,
            229,
            223,
            214,
            209,
            205,
            197,
            202
          ],
          "totalClicks": 3984,
          "ctr": 5.41,
          "banners": [
            {
              "name": "린넨 반팔 셋업 (베이지)",
              "clicks": 3984,
              "ctr": 5.41
            }
          ]
        }
      ]
    },
    "floating-category": {
      "name": "카테고리 플로팅 (상의)",
      "type": "플로팅 위젯",
      "created": "2026.03.14",
      "parentPage": "widget-floating",
      "load": 61148,
      "clicks": 2270,
      "ctr": 3.71,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 94,
          "count": "57,479",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 6,
          "count": "3,669",
          "external": true
        }
      ],
      "engagement": {
        "likes": 1362,
        "shares": 568,
        "saves": 227
      },
      "videos": [
        {
          "id": "floating-category-v1",
          "name": "카테고리 플로팅 (상의) 영상",
          "dailyClicks": [],
          "totalClicks": 2270,
          "ctr": 3.71,
          "banners": [
            {
              "name": "셔츠 컬렉션 시리즈",
              "clicks": 2270,
              "ctr": 3.71
            }
          ]
        }
      ]
    },
    "floating-event": {
      "name": "이벤트 페이지 플로팅",
      "type": "플로팅 위젯",
      "created": "2026.05.01",
      "parentPage": "widget-floating",
      "load": 40597,
      "clicks": 1062,
      "ctr": 2.62,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 71,
          "count": "28,824",
          "external": false
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 22,
          "count": "8,931",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 7,
          "count": "2,841",
          "external": true
        }
      ],
      "engagement": {
        "likes": 637,
        "shares": 266,
        "saves": 106
      },
      "videos": [
        {
          "id": "floating-event-v1",
          "name": "이벤트 페이지 플로팅 영상",
          "dailyClicks": [],
          "totalClicks": 1062,
          "ctr": 2.62,
          "banners": [
            {
              "name": "여름 시즌오프 ~50%",
              "clicks": 1062,
              "ctr": 2.62
            }
          ]
        }
      ]
    },
    "slide-s1": {
      "name": "2026 여름 신상 쇼츠 컬렉션",
      "type": "슬라이드 위젯",
      "created": "2026.04.18",
      "parentPage": "widget-slide",
      "load": 80477,
      "clicks": 5997,
      "ctr": 7.45,
      "dailyLoad": [
        3634,
        3894,
        4118,
        4295,
        4154,
        4366,
        4484,
        4319,
        4154,
        4260,
        4413,
        4555,
        4626,
        4508,
        4319,
        4224,
        4154,
        3977,
        4083
      ],
      "dailyClicks": [
        270,
        290,
        307,
        321,
        310,
        327,
        334,
        322,
        310,
        319,
        329,
        340,
        346,
        336,
        322,
        315,
        310,
        296,
        304
      ],
      "domain": [],
      "engagement": {
        "likes": 3598,
        "shares": 1259,
        "saves": 720
      },
      "videos": [
        {
          "id": "sv1",
          "name": "린넨 반팔 셋업 쇼츠",
          "dailyClicks": [
            98,
            105,
            111,
            117,
            112,
            118,
            122,
            117,
            112,
            116,
            119,
            123,
            125,
            122,
            117,
            114,
            112,
            107,
            110
          ],
          "totalClicks": 2179,
          "ctr": 8.42,
          "banners": [
            {
              "name": "린넨 반팔 셋업 (베이지)",
              "clicks": 1300,
              "ctr": 5.02
            },
            {
              "name": "린넨 반팔 셋업 (네이비)",
              "clicks": 879,
              "ctr": 3.4
            }
          ]
        },
        {
          "id": "sv2",
          "name": "와이드 슬랙스 쇼츠",
          "dailyClicks": [],
          "totalClicks": 1702,
          "ctr": 7.18,
          "banners": [
            {
              "name": "와이드 슬랙스 (블랙)",
              "clicks": 1702,
              "ctr": 7.18
            }
          ]
        },
        {
          "id": "sv3",
          "name": "크롭 셔츠 쇼츠",
          "dailyClicks": [],
          "totalClicks": 1307,
          "ctr": 5.74,
          "banners": [
            {
              "name": "크롭 셔츠 (화이트)",
              "clicks": 1307,
              "ctr": 5.74
            }
          ]
        },
        {
          "id": "sv4",
          "name": "밀짚 모자 쇼츠",
          "dailyClicks": [],
          "totalClicks": 828,
          "ctr": 3.81,
          "banners": [
            {
              "name": "밀짚 모자 (내추럴)",
              "clicks": 828,
              "ctr": 3.81
            }
          ]
        }
      ]
    },
    "slide-s2": {
      "name": "린넨 셋업 시리즈 슬라이드",
      "type": "슬라이드 위젯",
      "created": "2026.04.05",
      "parentPage": "widget-slide",
      "load": 62403,
      "clicks": 3801,
      "ctr": 6.09,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [],
      "engagement": {
        "likes": 2281,
        "shares": 798,
        "saves": 457
      },
      "videos": [
        {
          "id": "s2v1",
          "name": "린넨 자켓 룩북",
          "dailyClicks": [],
          "totalClicks": 1654,
          "ctr": 6.62,
          "banners": []
        },
        {
          "id": "s2v2",
          "name": "린넨 셔츠 디테일",
          "dailyClicks": [],
          "totalClicks": 1175,
          "ctr": 5.91,
          "banners": []
        },
        {
          "id": "s2v3",
          "name": "린넨 팬츠 핏감",
          "dailyClicks": [],
          "totalClicks": 776,
          "ctr": 5.42,
          "banners": []
        }
      ]
    },
    "slide-s3": {
      "name": "신상 룩북 슬라이드",
      "type": "슬라이드 위젯",
      "created": "2026.04.10",
      "parentPage": "widget-slide",
      "load": 43898,
      "clicks": 2233,
      "ctr": 5.09,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [],
      "engagement": {
        "likes": 1339,
        "shares": 468,
        "saves": 268
      },
      "videos": [
        {
          "id": "s3v1",
          "name": "룩북 #1 모델 워킹",
          "dailyClicks": [],
          "totalClicks": 942,
          "ctr": 5.74,
          "banners": []
        },
        {
          "id": "s3v2",
          "name": "룩북 #2 클로즈업",
          "dailyClicks": [],
          "totalClicks": 758,
          "ctr": 5.18,
          "banners": []
        },
        {
          "id": "s3v3",
          "name": "룩북 #3 디테일",
          "dailyClicks": [],
          "totalClicks": 533,
          "ctr": 4.04,
          "banners": []
        }
      ]
    },
    "slide-s4": {
      "name": "베스트 컬렉션 슬라이드",
      "type": "슬라이드 위젯",
      "created": "2026.03.28",
      "parentPage": "widget-slide",
      "load": 30837,
      "clicks": 1125,
      "ctr": 3.65,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [],
      "engagement": {
        "likes": 675,
        "shares": 236,
        "saves": 135
      },
      "videos": [
        {
          "id": "s4v1",
          "name": "베스트 #1",
          "dailyClicks": [],
          "totalClicks": 439,
          "ctr": 4.12,
          "banners": []
        },
        {
          "id": "s4v2",
          "name": "베스트 #2",
          "dailyClicks": [],
          "totalClicks": 360,
          "ctr": 3.74,
          "banners": []
        }
      ]
    },
    "multi-m1": {
      "name": "홈 비치웨어 멀티 위젯",
      "type": "멀티 샵플레이어",
      "created": "2026.04.22",
      "parentPage": "widget-multi",
      "load": 56779,
      "clicks": 1987,
      "ctr": 3.5,
      "dailyLoad": [],
      "dailyClicks": [
        90,
        96,
        101,
        106,
        103,
        107,
        111,
        106,
        103,
        105,
        109,
        112,
        114,
        111,
        106,
        104,
        103,
        98,
        100
      ],
      "domain": [],
      "engagement": {
        "likes": 1093,
        "shares": 398,
        "saves": 179
      },
      "videos": [
        {
          "id": "mv1",
          "name": "비치웨어 모델 컷 A",
          "dailyClicks": [],
          "totalClicks": 1206,
          "ctr": 4.62,
          "banners": [
            {
              "name": "비치 원피스 (화이트)",
              "clicks": 722,
              "ctr": 2.77
            },
            {
              "name": "비치 모자",
              "clicks": 484,
              "ctr": 1.85
            }
          ]
        },
        {
          "id": "mv2",
          "name": "선글라스 클로즈업",
          "dailyClicks": [],
          "totalClicks": 514,
          "ctr": 3.18,
          "banners": [
            {
              "name": "오버사이즈 선글라스",
              "clicks": 514,
              "ctr": 3.18
            }
          ]
        },
        {
          "id": "mv3",
          "name": "샌들 360°",
          "dailyClicks": [],
          "totalClicks": 260,
          "ctr": 2.41,
          "banners": [
            {
              "name": "플랫 샌들 (탠)",
              "clicks": 260,
              "ctr": 2.41
            }
          ]
        },
        {
          "id": "mv4",
          "name": "비치백 디테일",
          "dailyClicks": [],
          "totalClicks": 71,
          "ctr": 1.18,
          "banners": [
            {
              "name": "비치백 (스트로)",
              "clicks": 71,
              "ctr": 1.18
            }
          ]
        }
      ]
    },
    "multi-m2": {
      "name": "시즌 컬렉션 멀티",
      "type": "멀티 샵플레이어",
      "created": "2026.04.20",
      "parentPage": "widget-multi",
      "load": 36488,
      "clicks": 883,
      "ctr": 2.42,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [],
      "engagement": {
        "likes": 485,
        "shares": 177,
        "saves": 79
      },
      "videos": [
        {
          "id": "m2v1",
          "name": "시즌 룩 1",
          "dailyClicks": [],
          "totalClicks": 385,
          "ctr": 3.1,
          "banners": []
        },
        {
          "id": "m2v2",
          "name": "시즌 룩 2",
          "dailyClicks": [],
          "totalClicks": 271,
          "ctr": 2.62,
          "banners": []
        }
      ]
    }
  },
  "REVENUE": {
    "total": 542000000,
    "totalDelta": 78.3,
    "widgetContribution": 151760000,
    "widgetContributionPct": 28,
    "dailyRevenue": [
      28526316,
      32050939,
      32605523,
      30539485,
      28463351,
      27620085,
      26910043,
      25600155,
      25231878,
      -6788522,
      31350604,
      38249141,
      36339179,
      32598388,
      30410168,
      30295740,
      30413131,
      30200820,
      31383576
    ],
    "byChannel": [
      {
        "channel": "자사몰",
        "revenue": 336040000,
        "pct": 62.0
      },
      {
        "channel": "네이버 스마트스토어",
        "revenue": 97560000,
        "pct": 18.0
      },
      {
        "channel": "카카오 쇼핑하기",
        "revenue": 54200000,
        "pct": 10.0
      },
      {
        "channel": "무신사 브랜드관",
        "revenue": 37940000,
        "pct": 7.0
      },
      {
        "channel": "인스타그램 쇼핑",
        "revenue": 16260000,
        "pct": 3.0
      }
    ],
    "byWidget": [
      {
        "widgetId": "slide-s1",
        "name": "2026 여름 신상 쇼츠 컬렉션",
        "revenue": 59620000,
        "orders": 1569
      },
      {
        "widgetId": "slide-s2",
        "name": "린넨 셋업 시리즈 슬라이드",
        "revenue": 43360000,
        "orders": 1058
      },
      {
        "widgetId": "floating-home",
        "name": "홈 메인 플로팅",
        "revenue": 32520000,
        "orders": 774
      },
      {
        "widgetId": "multi-m1",
        "name": "홈 비치웨어 멀티 위젯",
        "revenue": 21680000,
        "orders": 482
      },
      {
        "widgetId": "slide-s3",
        "name": "신상 룩북 슬라이드",
        "revenue": 16260000,
        "orders": 406
      }
    ],
    "topProducts": [
      {
        "rank": 1,
        "name": "린넨 반팔 셋업 (베이지)",
        "revenue": 44444000,
        "units": 499
      },
      {
        "rank": 2,
        "name": "와이드 슬랙스 (블랙)",
        "revenue": 34688000,
        "units": 456
      },
      {
        "rank": 3,
        "name": "크롭 셔츠 (화이트)",
        "revenue": 27642000,
        "units": 477
      },
      {
        "rank": 4,
        "name": "비치 원피스 (화이트)",
        "revenue": 22764000,
        "units": 184
      },
      {
        "rank": 5,
        "name": "오버사이즈 선글라스",
        "revenue": 18970000,
        "units": 200
      }
    ]
  },
  "AD_OPERATION": {
    "totalSpend": 124000000,
    "totalSpendDelta": 18.4,
    "roas": 4.4,
    "cpc": 1583,
    "cpa": 41667,
    "dailySpend": [
      6526316,
      7198292,
      7304024,
      6910130,
      6514311,
      6353541,
      6218170,
      5968438,
      5898225,
      6256331,
      7064772,
      7428825,
      7112183,
      6492019,
      6129247,
      6110276,
      6129738,
      6094540,
      6290622
    ],
    "dailyRoas": [
      4.1,
      4.25,
      4.4,
      4.55,
      4.7,
      4.1,
      4.25,
      4.4,
      4.55,
      4.7,
      4.1,
      4.25,
      4.4,
      4.55,
      4.7,
      4.1,
      4.25,
      4.4,
      4.55
    ],
    "byChannel": [
      {
        "channel": "네이버 검색",
        "spend": 39680000,
        "impressions": 978947,
        "clicks": 26627,
        "cpc": 420,
        "conversions": 1131,
        "cpa": 18400,
        "revenue": 108400000,
        "roas": 4.8
      },
      {
        "channel": "구글 검색",
        "spend": 27280000,
        "impressions": 587368,
        "clicks": 16446,
        "cpc": 510,
        "conversions": 655,
        "cpa": 19800,
        "revenue": 70460000,
        "roas": 4.6
      },
      {
        "channel": "메타 (페이스북/인스타)",
        "spend": 29760000,
        "impressions": 1044211,
        "clicks": 17230,
        "cpc": 380,
        "conversions": 536,
        "cpa": 21600,
        "revenue": 54200000,
        "roas": 4.2
      },
      {
        "channel": "카카오",
        "spend": 17360000,
        "impressions": 456842,
        "clicks": 12531,
        "cpc": 340,
        "conversions": 476,
        "cpa": 15200,
        "revenue": 37940000,
        "roas": 5.2
      },
      {
        "channel": "유튜브",
        "spend": 9920000,
        "impressions": 195789,
        "clicks": 5482,
        "cpc": 450,
        "conversions": 179,
        "cpa": 22800,
        "revenue": 16260000,
        "roas": 3.6
      }
    ],
    "campaigns": [
      {
        "id": "c1",
        "name": "여름 신상 시즌 캠페인",
        "channel": "네이버 검색",
        "spend": 22320000,
        "impressions": 522105,
        "clicks": 15663,
        "conversions": 655,
        "roas": 5.2
      },
      {
        "id": "c2",
        "name": "브랜드 인지도 확보",
        "channel": "메타",
        "spend": 17360000,
        "impressions": 717895,
        "clicks": 10964,
        "conversions": 298,
        "roas": 3.8
      },
      {
        "id": "c3",
        "name": "재방문 리타게팅",
        "channel": "구글 GDN",
        "spend": 14880000,
        "impressions": 326316,
        "clicks": 10181,
        "conversions": 536,
        "roas": 6.1
      },
      {
        "id": "c4",
        "name": "신규 회원 가입 유도",
        "channel": "카카오",
        "spend": 12400000,
        "impressions": 326316,
        "clicks": 9398,
        "conversions": 417,
        "roas": 4.9
      }
    ],
    "funnel": {
      "impression": 3263158,
      "click": 78316,
      "widgetView": 48556,
      "bannerClick": 8740,
      "purchase": 2976
    }
  },
  "MEMBERSHIP": {
    "totalActive": 32776,
    "activeDelta": 12.4,
    "newSignups": 4820,
    "paidConversion": 376,
    "paidConversionRate": 7.8,
    "funnel": {
      "visit": 134960,
      "signup": 4820,
      "firstPurchase": 376,
      "repurchase": 120
    },
    "dailySignups": [
      254,
      293,
      299,
      276,
      253,
      244,
      236,
      221,
      217,
      236,
      285,
      306,
      288,
      252,
      231,
      229,
      231,
      229,
      240
    ],
    "cohort": [
      {
        "cohort": "11월",
        "m0": 100,
        "m1": 78,
        "m2": 65,
        "m3": 54
      },
      {
        "cohort": "11월 중",
        "m0": 100,
        "m1": 82,
        "m2": 68,
        "m3": null
      },
      {
        "cohort": "11월 말",
        "m0": 100,
        "m1": 80,
        "m2": null,
        "m3": null
      }
    ]
  },
  "CHURN": {
    "dormantCount": 2360,
    "dormantRate": 7.2,
    "churnCount": 623,
    "churnRate": 1.9,
    "churnRateDelta": -0.4,
    "dailyChurn": [
      33,
      39,
      40,
      36,
      33,
      31,
      30,
      28,
      27,
      30,
      38,
      41,
      38,
      32,
      29,
      29,
      29,
      29,
      31
    ],
    "reasons": [
      {
        "reason": "가격 부담",
        "count": 199,
        "pct": 32.0
      },
      {
        "reason": "필요 없어짐",
        "count": 150,
        "pct": 24.0
      },
      {
        "reason": "서비스 불만",
        "count": 112,
        "pct": 18.0
      },
      {
        "reason": "다른 서비스로 이동",
        "count": 87,
        "pct": 14.0
      },
      {
        "reason": "기타",
        "count": 75,
        "pct": 12.0
      }
    ]
  },
  "KEY_METRICS": {
    "cac": 329787,
    "ltv": 52917,
    "ltvCacRatio": 0.16,
    "mrr": 180666667,
    "mrrDelta": 8.4,
    "arpu": 16536
  }
};
