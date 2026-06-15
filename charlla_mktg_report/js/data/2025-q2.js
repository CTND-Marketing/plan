// ============================================================
// 2025년 2분기 데이터
// ============================================================
// 기간: 2025.04.01 - 2025.06.30
// 단계: 성장 시작
// ============================================================

window.PERIOD_2025_Q2 = {
  "meta": {
    "id": "2025-q2",
    "label": "2025년 2분기",
    "range": "2025.04.01 - 2025.06.30",
    "sampleStart": "2025.05.01",
    "sampleEnd": "2025.05.19",
    "dayLabels": [
      "5/1",
      "5/2",
      "5/3",
      "5/4",
      "5/5",
      "5/6",
      "5/7",
      "5/8",
      "5/9",
      "5/10",
      "5/11",
      "5/12",
      "5/13",
      "5/14",
      "5/15",
      "5/16",
      "5/17",
      "5/18",
      "5/19"
    ],
    "phase": "성장 시작"
  },
  "CONNECTED_FLOW_DATA": {
    "linen": {
      "name": "린넨 셋업 컬렉션 상세 (5개 연결)",
      "totalLoad": 68260,
      "lastPct": 22,
      "mainExit": "영상 #2 → #3 (-32%p)",
      "dailyLoad": [
        3125,
        3350,
        3538,
        3706,
        3586,
        3773,
        3869,
        3730,
        3586,
        3682,
        3802,
        3917,
        3979,
        3883,
        3730,
        3653,
        3586,
        3437,
        3533
      ],
      "videos": [
        {
          "id": "cv-linen-1",
          "name": "영상 #1",
          "loads": 13651,
          "position": "상단"
        },
        {
          "id": "cv-linen-2",
          "name": "영상 #2",
          "loads": 10102,
          "position": "중상단"
        },
        {
          "id": "cv-linen-3",
          "name": "영상 #3",
          "loads": 5734,
          "position": "중단"
        },
        {
          "id": "cv-linen-4",
          "name": "영상 #4",
          "loads": 4232,
          "position": "중하단"
        },
        {
          "id": "cv-linen-5",
          "name": "영상 #5",
          "loads": 3003,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "13,651",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 74,
          "label": "영상 #2",
          "count": "10,102",
          "loc": "중상단",
          "down": false
        },
        {
          "pct": 42,
          "label": "영상 #3",
          "count": "5,734",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 31,
          "label": "영상 #4",
          "count": "4,232",
          "loc": "중하단",
          "down": false
        },
        {
          "pct": 22,
          "label": "영상 #5",
          "count": "3,003",
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
          "count": "53,242",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 14,
          "count": "9,556",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 6,
          "count": "4,095",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 2,
          "count": "1,365",
          "external": true
        }
      ]
    },
    "shoes": {
      "name": "신상 슈즈 컬렉션 (4개 연결)",
      "totalLoad": 47251,
      "lastPct": 35,
      "mainExit": "영상 #1 → #2 (-28%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-shoes-1",
          "name": "영상 #1",
          "loads": 11813,
          "position": "상단"
        },
        {
          "id": "cv-shoes-2",
          "name": "영상 #2",
          "loads": 8505,
          "position": "중단"
        },
        {
          "id": "cv-shoes-3",
          "name": "영상 #3",
          "loads": 6379,
          "position": "중하단"
        },
        {
          "id": "cv-shoes-4",
          "name": "영상 #4",
          "loads": 4138,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "11,813",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 72,
          "label": "영상 #2",
          "count": "8,505",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 54,
          "label": "영상 #3",
          "count": "6,379",
          "loc": "중하단",
          "down": false
        },
        {
          "pct": 35,
          "label": "영상 #4",
          "count": "4,138",
          "loc": "하단",
          "down": false
        }
      ],
      "alert": "영상 #1 → #2 구간에서 이탈률 28%p 발생.",
      "domain": []
    },
    "denim": {
      "name": "데님 시리즈 (3개 연결)",
      "totalLoad": 34617,
      "lastPct": 48,
      "mainExit": "영상 #1 → #2 (-22%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-denim-1",
          "name": "영상 #1",
          "loads": 8654,
          "position": "상단"
        },
        {
          "id": "cv-denim-2",
          "name": "영상 #2",
          "loads": 6750,
          "position": "중단"
        },
        {
          "id": "cv-denim-3",
          "name": "영상 #3",
          "loads": 4155,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "8,654",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 78,
          "label": "영상 #2",
          "count": "6,750",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 48,
          "label": "영상 #3",
          "count": "4,155",
          "loc": "하단",
          "down": false
        }
      ],
      "alert": "마지막까지 시청률 48%로 양호.",
      "domain": []
    },
    "outer": {
      "name": "아우터 컬렉션 (3개 연결)",
      "totalLoad": 26016,
      "lastPct": 52,
      "mainExit": "영상 #1 → #2 (-18%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-outer-1",
          "name": "영상 #1",
          "loads": 6504,
          "position": "상단"
        },
        {
          "id": "cv-outer-2",
          "name": "영상 #2",
          "loads": 5333,
          "position": "중단"
        },
        {
          "id": "cv-outer-3",
          "name": "영상 #3",
          "loads": 3376,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "6,504",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 82,
          "label": "영상 #2",
          "count": "5,333",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 52,
          "label": "영상 #3",
          "count": "3,376",
          "loc": "하단",
          "down": false
        }
      ],
      "alert": "시청 유지율이 우수합니다.",
      "domain": []
    },
    "acc": {
      "name": "액세서리 시리즈 (4개 연결)",
      "totalLoad": 20584,
      "lastPct": 28,
      "mainExit": "영상 #2 → #3 (-30%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-acc-1",
          "name": "영상 #1",
          "loads": 5146,
          "position": "상단"
        },
        {
          "id": "cv-acc-2",
          "name": "영상 #2",
          "loads": 4323,
          "position": "중상단"
        },
        {
          "id": "cv-acc-3",
          "name": "영상 #3",
          "loads": 2779,
          "position": "중단"
        },
        {
          "id": "cv-acc-4",
          "name": "영상 #4",
          "loads": 1444,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "5,146",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 84,
          "label": "영상 #2",
          "count": "4,323",
          "loc": "중상단",
          "down": false
        },
        {
          "pct": 54,
          "label": "영상 #3",
          "count": "2,779",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 28,
          "label": "영상 #4",
          "count": "1,444",
          "loc": "하단",
          "down": false
        }
      ],
      "alert": "영상 #2 → #3 구간에서 30%p 급락.",
      "domain": []
    },
    "bigDeal": {
      "name": "여름 빅딜 페이지 (10개 연결)",
      "totalLoad": 90442,
      "lastPct": 18,
      "mainExit": "영상 #4 → #5 (-25%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-bigDeal-1",
          "name": "영상 #1",
          "loads": 18088,
          "position": "영상 #1"
        },
        {
          "id": "cv-bigDeal-2",
          "name": "영상 #2",
          "loads": 16278,
          "position": "영상 #2"
        },
        {
          "id": "cv-bigDeal-3",
          "name": "영상 #3",
          "loads": 13566,
          "position": "영상 #3"
        },
        {
          "id": "cv-bigDeal-4",
          "name": "영상 #4",
          "loads": 10856,
          "position": "영상 #4"
        },
        {
          "id": "cv-bigDeal-5",
          "name": "영상 #5",
          "loads": 6331,
          "position": "영상 #5"
        },
        {
          "id": "cv-bigDeal-6",
          "name": "영상 #6",
          "loads": 4522,
          "position": "영상 #6"
        },
        {
          "id": "cv-bigDeal-7",
          "name": "영상 #7",
          "loads": 3389,
          "position": "영상 #7"
        },
        {
          "id": "cv-bigDeal-8",
          "name": "영상 #8",
          "loads": 2711,
          "position": "영상 #8"
        },
        {
          "id": "cv-bigDeal-9",
          "name": "영상 #9",
          "loads": 2261,
          "position": "영상 #9"
        },
        {
          "id": "cv-bigDeal-10",
          "name": "영상 #10",
          "loads": 1880,
          "position": "영상 #10"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "18,088",
          "loc": "",
          "down": false
        },
        {
          "pct": 90,
          "label": "영상 #2",
          "count": "16,278",
          "loc": "",
          "down": false
        },
        {
          "pct": 75,
          "label": "영상 #3",
          "count": "13,566",
          "loc": "",
          "down": false
        },
        {
          "pct": 60,
          "label": "영상 #4",
          "count": "10,856",
          "loc": "",
          "down": false
        },
        {
          "pct": 35,
          "label": "영상 #5",
          "count": "6,331",
          "loc": "",
          "down": true
        },
        {
          "pct": 25,
          "label": "영상 #6",
          "count": "4,522",
          "loc": "",
          "down": false
        },
        {
          "pct": 19,
          "label": "영상 #7",
          "count": "3,389",
          "loc": "",
          "down": false
        },
        {
          "pct": 15,
          "label": "영상 #8",
          "count": "2,711",
          "loc": "",
          "down": false
        },
        {
          "pct": 12,
          "label": "영상 #9",
          "count": "2,261",
          "loc": "",
          "down": false
        },
        {
          "pct": 10,
          "label": "영상 #10",
          "count": "1,880",
          "loc": "",
          "down": false
        }
      ],
      "alert": "영상 #4 → #5 구간 이탈 25%p.",
      "domain": []
    },
    "megaBrand": {
      "name": "메가 브랜드 페이지 (20개 연결)",
      "totalLoad": 150182,
      "lastPct": 9,
      "mainExit": "영상 #6 → #7 (-22%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-megaBrand-1",
          "name": "영상 #1",
          "loads": 30036,
          "position": "영상 #1"
        },
        {
          "id": "cv-megaBrand-2",
          "name": "영상 #2",
          "loads": 26432,
          "position": "영상 #2"
        },
        {
          "id": "cv-megaBrand-3",
          "name": "영상 #3",
          "loads": 23434,
          "position": "영상 #3"
        },
        {
          "id": "cv-megaBrand-4",
          "name": "영상 #4",
          "loads": 21025,
          "position": "영상 #4"
        },
        {
          "id": "cv-megaBrand-5",
          "name": "영상 #5",
          "loads": 19524,
          "position": "영상 #5"
        },
        {
          "id": "cv-megaBrand-6",
          "name": "영상 #6",
          "loads": 18322,
          "position": "영상 #6"
        },
        {
          "id": "cv-megaBrand-7",
          "name": "영상 #7",
          "loads": 11714,
          "position": "영상 #7"
        },
        {
          "id": "cv-megaBrand-8",
          "name": "영상 #8",
          "loads": 9912,
          "position": "영상 #8"
        },
        {
          "id": "cv-megaBrand-9",
          "name": "영상 #9",
          "loads": 8410,
          "position": "영상 #9"
        },
        {
          "id": "cv-megaBrand-10",
          "name": "영상 #10",
          "loads": 7209,
          "position": "영상 #10"
        },
        {
          "id": "cv-megaBrand-11",
          "name": "영상 #11",
          "loads": 6308,
          "position": "영상 #11"
        },
        {
          "id": "cv-megaBrand-12",
          "name": "영상 #12",
          "loads": 5407,
          "position": "영상 #12"
        },
        {
          "id": "cv-megaBrand-13",
          "name": "영상 #13",
          "loads": 4806,
          "position": "영상 #13"
        },
        {
          "id": "cv-megaBrand-14",
          "name": "영상 #14",
          "loads": 4205,
          "position": "영상 #14"
        },
        {
          "id": "cv-megaBrand-15",
          "name": "영상 #15",
          "loads": 3905,
          "position": "영상 #15"
        },
        {
          "id": "cv-megaBrand-16",
          "name": "영상 #16",
          "loads": 3604,
          "position": "영상 #16"
        },
        {
          "id": "cv-megaBrand-17",
          "name": "영상 #17",
          "loads": 3304,
          "position": "영상 #17"
        },
        {
          "id": "cv-megaBrand-18",
          "name": "영상 #18",
          "loads": 3004,
          "position": "영상 #18"
        },
        {
          "id": "cv-megaBrand-19",
          "name": "영상 #19",
          "loads": 2854,
          "position": "영상 #19"
        },
        {
          "id": "cv-megaBrand-20",
          "name": "영상 #20",
          "loads": 2703,
          "position": "영상 #20"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "30,036",
          "loc": "",
          "down": false
        },
        {
          "pct": 88,
          "label": "영상 #2",
          "count": "26,432",
          "loc": "",
          "down": false
        },
        {
          "pct": 78,
          "label": "영상 #3",
          "count": "23,434",
          "loc": "",
          "down": false
        },
        {
          "pct": 70,
          "label": "영상 #4",
          "count": "21,025",
          "loc": "",
          "down": false
        },
        {
          "pct": 65,
          "label": "영상 #5",
          "count": "19,524",
          "loc": "",
          "down": false
        },
        {
          "pct": 61,
          "label": "영상 #6",
          "count": "18,322",
          "loc": "",
          "down": false
        },
        {
          "pct": 39,
          "label": "영상 #7",
          "count": "11,714",
          "loc": "",
          "down": true
        },
        {
          "pct": 33,
          "label": "영상 #8",
          "count": "9,912",
          "loc": "",
          "down": false
        },
        {
          "pct": 28,
          "label": "영상 #9",
          "count": "8,410",
          "loc": "",
          "down": false
        },
        {
          "pct": 24,
          "label": "영상 #10",
          "count": "7,209",
          "loc": "",
          "down": false
        },
        {
          "pct": 21,
          "label": "영상 #11",
          "count": "6,308",
          "loc": "",
          "down": false
        },
        {
          "pct": 18,
          "label": "영상 #12",
          "count": "5,407",
          "loc": "",
          "down": false
        },
        {
          "pct": 16,
          "label": "영상 #13",
          "count": "4,806",
          "loc": "",
          "down": false
        },
        {
          "pct": 14,
          "label": "영상 #14",
          "count": "4,205",
          "loc": "",
          "down": false
        },
        {
          "pct": 13,
          "label": "영상 #15",
          "count": "3,905",
          "loc": "",
          "down": false
        },
        {
          "pct": 12,
          "label": "영상 #16",
          "count": "3,604",
          "loc": "",
          "down": false
        },
        {
          "pct": 11,
          "label": "영상 #17",
          "count": "3,304",
          "loc": "",
          "down": false
        },
        {
          "pct": 10,
          "label": "영상 #18",
          "count": "3,004",
          "loc": "",
          "down": false
        },
        {
          "pct": 9.5,
          "label": "영상 #19",
          "count": "2,854",
          "loc": "",
          "down": false
        },
        {
          "pct": 9,
          "label": "영상 #20",
          "count": "2,703",
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
      "load": "19,144",
      "play": "15,698 (82%)",
      "avg": "16.8초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 84,
          "count": "16,081",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 10,
          "count": "1,914",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 6,
          "count": "1,149",
          "external": true
        }
      ]
    },
    "v2": {
      "name": "신상 가방 클로즈업",
      "load": "13,012",
      "play": "9,759 (75%)",
      "avg": "13.2초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 92,
          "count": "11,971",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 5,
          "count": "650",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 3,
          "count": "391",
          "external": true
        }
      ]
    },
    "v3": {
      "name": "스니커즈 풋샷",
      "load": "11,141",
      "play": "7,799 (70%)",
      "avg": "11.8초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 79,
          "count": "8,801",
          "external": false
        },
        {
          "name": "brand.musinsa.com",
          "label": "외부",
          "pct": 14,
          "count": "1,560",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 7,
          "count": "780",
          "external": true
        }
      ]
    },
    "v4": {
      "name": "여름 메인 비주얼",
      "load": "8,852",
      "play": "6,905 (78%)",
      "avg": "15.4초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 88,
          "count": "7,790",
          "external": false
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 12,
          "count": "1,062",
          "external": true
        }
      ]
    },
    "v5": {
      "name": "크롭 셔츠 디테일",
      "load": "8,051",
      "play": "5,233 (65%)",
      "avg": "10.2초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 81,
          "count": "6,521",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 11,
          "count": "886",
          "external": true
        },
        {
          "name": "brand.musinsa.com",
          "label": "외부",
          "pct": 8,
          "count": "644",
          "external": true
        }
      ]
    }
  },
  "FLOATING_DATA": {
    "floating-home": {
      "name": "홈 메인 플로팅",
      "load": "29,952",
      "clicks": "1,620",
      "ctr": "5.41%",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 88,
          "count": "26,358",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 8,
          "count": "2,396",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 4,
          "count": "1,198",
          "external": true
        }
      ],
      "banners": [
        {
          "name": "린넨 반팔 셋업 (베이지)",
          "clicks": 1620,
          "ctr": 5.41
        }
      ]
    },
    "floating-category": {
      "name": "카테고리 플로팅 (상의)",
      "load": "24,874",
      "clicks": "924",
      "ctr": "3.71%",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 94,
          "count": "23,381",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 6,
          "count": "1,492",
          "external": true
        }
      ],
      "banners": [
        {
          "name": "셔츠 컬렉션 시리즈",
          "clicks": 924,
          "ctr": 3.71
        }
      ]
    },
    "floating-event": {
      "name": "이벤트 페이지 플로팅",
      "load": "16,514",
      "clicks": "432",
      "ctr": "2.62%",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 71,
          "count": "11,725",
          "external": false
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 22,
          "count": "3,633",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 7,
          "count": "1,156",
          "external": true
        }
      ],
      "banners": [
        {
          "name": "여름 시즌오프 ~50%",
          "clicks": 432,
          "ctr": 2.62
        }
      ]
    }
  },
  "SLIDE_VIDEO_DATA": {
    "sv1": {
      "name": "린넨 반팔 셋업 쇼츠",
      "clicks": 887,
      "ctr": 8.42,
      "banners": [
        {
          "name": "린넨 반팔 셋업 (베이지)",
          "clicks": 529,
          "ctr": 5.02
        },
        {
          "name": "린넨 반팔 셋업 (네이비)",
          "clicks": 358,
          "ctr": 3.4
        }
      ],
      "domain": []
    },
    "sv2": {
      "name": "와이드 슬랙스 쇼츠",
      "clicks": 692,
      "ctr": 7.18,
      "banners": [
        {
          "name": "와이드 슬랙스 (블랙)",
          "clicks": 692,
          "ctr": 7.18
        }
      ],
      "domain": []
    },
    "sv3": {
      "name": "크롭 셔츠 쇼츠",
      "clicks": 532,
      "ctr": 5.74,
      "banners": [
        {
          "name": "크롭 셔츠 (화이트)",
          "clicks": 532,
          "ctr": 5.74
        }
      ],
      "domain": []
    },
    "sv4": {
      "name": "밀짚 모자 쇼츠",
      "clicks": 337,
      "ctr": 3.81,
      "banners": [
        {
          "name": "밀짚 모자 (내추럴)",
          "clicks": 337,
          "ctr": 3.81
        }
      ],
      "domain": []
    },
    "s2v1": {
      "name": "린넨 자켓 룩북",
      "clicks": 673,
      "ctr": 6.62,
      "banners": [],
      "domain": []
    },
    "s2v2": {
      "name": "린넨 셔츠 디테일",
      "clicks": 478,
      "ctr": 5.91,
      "banners": [],
      "domain": []
    },
    "s2v3": {
      "name": "린넨 팬츠 핏감",
      "clicks": 316,
      "ctr": 5.42,
      "banners": [],
      "domain": []
    },
    "s3v1": {
      "name": "룩북 #1 모델 워킹",
      "clicks": 383,
      "ctr": 5.74,
      "banners": [],
      "domain": []
    },
    "s3v2": {
      "name": "룩북 #2 클로즈업",
      "clicks": 308,
      "ctr": 5.18,
      "banners": [],
      "domain": []
    },
    "s3v3": {
      "name": "룩북 #3 디테일",
      "clicks": 217,
      "ctr": 4.04,
      "banners": [],
      "domain": []
    },
    "s4v1": {
      "name": "베스트 #1",
      "clicks": 179,
      "ctr": 4.12,
      "banners": [],
      "domain": []
    },
    "s4v2": {
      "name": "베스트 #2",
      "clicks": 146,
      "ctr": 3.74,
      "banners": [],
      "domain": []
    }
  },
  "MULTI_VIDEO_DATA": {
    "mv1": {
      "name": "비치웨어 모델 컷 A",
      "clicks": 491,
      "ctr": 4.62,
      "banners": [
        {
          "name": "비치 원피스 (화이트)",
          "clicks": 294,
          "ctr": 2.77
        },
        {
          "name": "비치 모자",
          "clicks": 197,
          "ctr": 1.85
        }
      ],
      "domain": []
    },
    "mv2": {
      "name": "선글라스 클로즈업",
      "clicks": 209,
      "ctr": 3.18,
      "banners": [
        {
          "name": "오버사이즈 선글라스",
          "clicks": 209,
          "ctr": 3.18
        }
      ],
      "domain": []
    },
    "mv3": {
      "name": "샌들 360°",
      "clicks": 106,
      "ctr": 2.41,
      "banners": [
        {
          "name": "플랫 샌들 (탠)",
          "clicks": 106,
          "ctr": 2.41
        }
      ],
      "domain": []
    },
    "mv4": {
      "name": "비치백 디테일",
      "clicks": 29,
      "ctr": 1.18,
      "banners": [
        {
          "name": "비치백 (스트로)",
          "clicks": 29,
          "ctr": 1.18
        }
      ],
      "domain": []
    },
    "m2v1": {
      "name": "시즌 룩 1",
      "clicks": 156,
      "ctr": 3.1,
      "banners": [],
      "domain": []
    },
    "m2v2": {
      "name": "시즌 룩 2",
      "clicks": 110,
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
      "load": 19144,
      "play": 15698,
      "playRate": 82,
      "avgTime": 16.8,
      "parentPage": "displayer",
      "dailyLoad": [
        874,
        936,
        998,
        1061,
        1003,
        1075,
        1032,
        1003,
        1046,
        1109,
        1066,
        1142,
        1171,
        1147,
        1094,
        1109,
        1080,
        1018,
        1046
      ],
      "dailyPlay": [
        716,
        768,
        819,
        870,
        823,
        882,
        846,
        823,
        858,
        909,
        874,
        937,
        960,
        941,
        898,
        909,
        886,
        834,
        858
      ],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 84,
          "count": "16,081",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 10,
          "count": "1,914",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 6,
          "count": "1,149",
          "external": true
        }
      ]
    },
    "v2": {
      "name": "신상 가방 클로즈업",
      "type": "단일 영상",
      "placement": "상세페이지",
      "load": 13012,
      "play": 9759,
      "playRate": 75,
      "avgTime": 13.2,
      "parentPage": "displayer",
      "dailyLoad": [
        595,
        634,
        677,
        662,
        696,
        715,
        730,
        710,
        677,
        658,
        691,
        720,
        734,
        715,
        677,
        653,
        634,
        614,
        634
      ],
      "dailyPlay": [
        446,
        475,
        508,
        497,
        522,
        537,
        547,
        533,
        508,
        493,
        518,
        540,
        551,
        537,
        508,
        490,
        475,
        461,
        475
      ],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 92,
          "count": "11,971",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 5,
          "count": "650",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 3,
          "count": "391",
          "external": true
        }
      ]
    },
    "v3": {
      "name": "스니커즈 풋샷",
      "type": "단일 영상",
      "placement": "상세페이지",
      "load": 11141,
      "play": 7799,
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
          "count": "8,801",
          "external": false
        },
        {
          "name": "brand.musinsa.com",
          "label": "외부",
          "pct": 14,
          "count": "1,560",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 7,
          "count": "780",
          "external": true
        }
      ]
    },
    "v4": {
      "name": "여름 메인 비주얼",
      "type": "단일 영상",
      "placement": "메인 배너",
      "load": 8852,
      "play": 6905,
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
          "count": "7,790",
          "external": false
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 12,
          "count": "1,062",
          "external": true
        }
      ]
    },
    "v5": {
      "name": "크롭 셔츠 디테일",
      "type": "단일 영상",
      "placement": "상세페이지",
      "load": 8051,
      "play": 5233,
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
          "count": "6,521",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 11,
          "count": "886",
          "external": true
        },
        {
          "name": "brand.musinsa.com",
          "label": "외부",
          "pct": 8,
          "count": "644",
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
      "load": 29952,
      "clicks": 1620,
      "ctr": 5.41,
      "dailyLoad": [
        1354,
        1445,
        1526,
        1594,
        1541,
        1622,
        1666,
        1603,
        1541,
        1579,
        1637,
        1690,
        1718,
        1675,
        1603,
        1570,
        1541,
        1478,
        1517
      ],
      "dailyClicks": [
        73,
        78,
        83,
        86,
        84,
        88,
        90,
        87,
        84,
        85,
        88,
        91,
        93,
        91,
        87,
        85,
        84,
        80,
        82
      ],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 88,
          "count": "26,358",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 8,
          "count": "2,396",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 4,
          "count": "1,198",
          "external": true
        }
      ],
      "engagement": {
        "likes": 972,
        "shares": 405,
        "saves": 162
      },
      "videos": [
        {
          "id": "floating-home-v1",
          "name": "홈 메인 플로팅 영상",
          "dailyClicks": [
            73,
            78,
            83,
            86,
            84,
            88,
            90,
            87,
            84,
            85,
            88,
            91,
            93,
            91,
            87,
            85,
            84,
            80,
            82
          ],
          "totalClicks": 1620,
          "ctr": 5.41,
          "banners": [
            {
              "name": "린넨 반팔 셋업 (베이지)",
              "clicks": 1620,
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
      "load": 24874,
      "clicks": 924,
      "ctr": 3.71,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 94,
          "count": "23,381",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 6,
          "count": "1,492",
          "external": true
        }
      ],
      "engagement": {
        "likes": 554,
        "shares": 231,
        "saves": 92
      },
      "videos": [
        {
          "id": "floating-category-v1",
          "name": "카테고리 플로팅 (상의) 영상",
          "dailyClicks": [],
          "totalClicks": 924,
          "ctr": 3.71,
          "banners": [
            {
              "name": "셔츠 컬렉션 시리즈",
              "clicks": 924,
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
      "load": 16514,
      "clicks": 432,
      "ctr": 2.62,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 71,
          "count": "11,725",
          "external": false
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 22,
          "count": "3,633",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 7,
          "count": "1,156",
          "external": true
        }
      ],
      "engagement": {
        "likes": 259,
        "shares": 108,
        "saves": 43
      },
      "videos": [
        {
          "id": "floating-event-v1",
          "name": "이벤트 페이지 플로팅 영상",
          "dailyClicks": [],
          "totalClicks": 432,
          "ctr": 2.62,
          "banners": [
            {
              "name": "여름 시즌오프 ~50%",
              "clicks": 432,
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
      "load": 32736,
      "clicks": 2439,
      "ctr": 7.45,
      "dailyLoad": [
        1478,
        1584,
        1675,
        1747,
        1690,
        1776,
        1824,
        1757,
        1690,
        1733,
        1795,
        1853,
        1882,
        1834,
        1757,
        1718,
        1690,
        1618,
        1661
      ],
      "dailyClicks": [
        110,
        118,
        125,
        131,
        126,
        133,
        136,
        131,
        126,
        130,
        134,
        138,
        141,
        137,
        131,
        128,
        126,
        120,
        124
      ],
      "domain": [],
      "engagement": {
        "likes": 1464,
        "shares": 512,
        "saves": 293
      },
      "videos": [
        {
          "id": "sv1",
          "name": "린넨 반팔 셋업 쇼츠",
          "dailyClicks": [
            40,
            43,
            45,
            48,
            46,
            48,
            49,
            48,
            46,
            47,
            48,
            50,
            51,
            49,
            48,
            47,
            46,
            44,
            45
          ],
          "totalClicks": 887,
          "ctr": 8.42,
          "banners": [
            {
              "name": "린넨 반팔 셋업 (베이지)",
              "clicks": 529,
              "ctr": 5.02
            },
            {
              "name": "린넨 반팔 셋업 (네이비)",
              "clicks": 358,
              "ctr": 3.4
            }
          ]
        },
        {
          "id": "sv2",
          "name": "와이드 슬랙스 쇼츠",
          "dailyClicks": [],
          "totalClicks": 692,
          "ctr": 7.18,
          "banners": [
            {
              "name": "와이드 슬랙스 (블랙)",
              "clicks": 692,
              "ctr": 7.18
            }
          ]
        },
        {
          "id": "sv3",
          "name": "크롭 셔츠 쇼츠",
          "dailyClicks": [],
          "totalClicks": 532,
          "ctr": 5.74,
          "banners": [
            {
              "name": "크롭 셔츠 (화이트)",
              "clicks": 532,
              "ctr": 5.74
            }
          ]
        },
        {
          "id": "sv4",
          "name": "밀짚 모자 쇼츠",
          "dailyClicks": [],
          "totalClicks": 337,
          "ctr": 3.81,
          "banners": [
            {
              "name": "밀짚 모자 (내추럴)",
              "clicks": 337,
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
      "load": 25384,
      "clicks": 1546,
      "ctr": 6.09,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [],
      "engagement": {
        "likes": 928,
        "shares": 324,
        "saves": 186
      },
      "videos": [
        {
          "id": "s2v1",
          "name": "린넨 자켓 룩북",
          "dailyClicks": [],
          "totalClicks": 673,
          "ctr": 6.62,
          "banners": []
        },
        {
          "id": "s2v2",
          "name": "린넨 셔츠 디테일",
          "dailyClicks": [],
          "totalClicks": 478,
          "ctr": 5.91,
          "banners": []
        },
        {
          "id": "s2v3",
          "name": "린넨 팬츠 핏감",
          "dailyClicks": [],
          "totalClicks": 316,
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
      "load": 17857,
      "clicks": 908,
      "ctr": 5.09,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [],
      "engagement": {
        "likes": 545,
        "shares": 191,
        "saves": 109
      },
      "videos": [
        {
          "id": "s3v1",
          "name": "룩북 #1 모델 워킹",
          "dailyClicks": [],
          "totalClicks": 383,
          "ctr": 5.74,
          "banners": []
        },
        {
          "id": "s3v2",
          "name": "룩북 #2 클로즈업",
          "dailyClicks": [],
          "totalClicks": 308,
          "ctr": 5.18,
          "banners": []
        },
        {
          "id": "s3v3",
          "name": "룩북 #3 디테일",
          "dailyClicks": [],
          "totalClicks": 217,
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
      "load": 12544,
      "clicks": 457,
      "ctr": 3.65,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [],
      "engagement": {
        "likes": 275,
        "shares": 96,
        "saves": 55
      },
      "videos": [
        {
          "id": "s4v1",
          "name": "베스트 #1",
          "dailyClicks": [],
          "totalClicks": 179,
          "ctr": 4.12,
          "banners": []
        },
        {
          "id": "s4v2",
          "name": "베스트 #2",
          "dailyClicks": [],
          "totalClicks": 146,
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
      "load": 23097,
      "clicks": 808,
      "ctr": 3.5,
      "dailyLoad": [],
      "dailyClicks": [
        36,
        39,
        41,
        43,
        42,
        44,
        45,
        43,
        42,
        43,
        44,
        46,
        47,
        45,
        43,
        42,
        42,
        40,
        41
      ],
      "domain": [],
      "engagement": {
        "likes": 444,
        "shares": 162,
        "saves": 73
      },
      "videos": [
        {
          "id": "mv1",
          "name": "비치웨어 모델 컷 A",
          "dailyClicks": [],
          "totalClicks": 491,
          "ctr": 4.62,
          "banners": [
            {
              "name": "비치 원피스 (화이트)",
              "clicks": 294,
              "ctr": 2.77
            },
            {
              "name": "비치 모자",
              "clicks": 197,
              "ctr": 1.85
            }
          ]
        },
        {
          "id": "mv2",
          "name": "선글라스 클로즈업",
          "dailyClicks": [],
          "totalClicks": 209,
          "ctr": 3.18,
          "banners": [
            {
              "name": "오버사이즈 선글라스",
              "clicks": 209,
              "ctr": 3.18
            }
          ]
        },
        {
          "id": "mv3",
          "name": "샌들 360°",
          "dailyClicks": [],
          "totalClicks": 106,
          "ctr": 2.41,
          "banners": [
            {
              "name": "플랫 샌들 (탠)",
              "clicks": 106,
              "ctr": 2.41
            }
          ]
        },
        {
          "id": "mv4",
          "name": "비치백 디테일",
          "dailyClicks": [],
          "totalClicks": 29,
          "ctr": 1.18,
          "banners": [
            {
              "name": "비치백 (스트로)",
              "clicks": 29,
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
      "load": 14843,
      "clicks": 359,
      "ctr": 2.42,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [],
      "engagement": {
        "likes": 197,
        "shares": 72,
        "saves": 32
      },
      "videos": [
        {
          "id": "m2v1",
          "name": "시즌 룩 1",
          "dailyClicks": [],
          "totalClicks": 156,
          "ctr": 3.1,
          "banners": []
        },
        {
          "id": "m2v2",
          "name": "시즌 룩 2",
          "dailyClicks": [],
          "totalClicks": 110,
          "ctr": 2.62,
          "banners": []
        }
      ]
    }
  },
  "REVENUE": {
    "total": 218000000,
    "totalDelta": 53.5,
    "widgetContribution": 30520000,
    "widgetContributionPct": 14,
    "dailyRevenue": [
      11473684,
      12891337,
      13114398,
      12283409,
      11448359,
      11109186,
      10823597,
      10296741,
      10148615,
      -2730437,
      12609652,
      15384341,
      14616127,
      13111529,
      12231396,
      12185371,
      12232588,
      12147193,
      12622914
    ],
    "byChannel": [
      {
        "channel": "자사몰",
        "revenue": 135160000,
        "pct": 62.0
      },
      {
        "channel": "네이버 스마트스토어",
        "revenue": 39240000,
        "pct": 18.0
      },
      {
        "channel": "카카오 쇼핑하기",
        "revenue": 21800000,
        "pct": 10.0
      },
      {
        "channel": "무신사 브랜드관",
        "revenue": 15260000,
        "pct": 7.0
      },
      {
        "channel": "인스타그램 쇼핑",
        "revenue": 6540000,
        "pct": 3.0
      }
    ],
    "byWidget": [
      {
        "widgetId": "slide-s1",
        "name": "2026 여름 신상 쇼츠 컬렉션",
        "revenue": 23980000,
        "orders": 631
      },
      {
        "widgetId": "slide-s2",
        "name": "린넨 셋업 시리즈 슬라이드",
        "revenue": 17440000,
        "orders": 425
      },
      {
        "widgetId": "floating-home",
        "name": "홈 메인 플로팅",
        "revenue": 13080000,
        "orders": 311
      },
      {
        "widgetId": "multi-m1",
        "name": "홈 비치웨어 멀티 위젯",
        "revenue": 8720000,
        "orders": 194
      },
      {
        "widgetId": "slide-s3",
        "name": "신상 룩북 슬라이드",
        "revenue": 6540000,
        "orders": 164
      }
    ],
    "topProducts": [
      {
        "rank": 1,
        "name": "린넨 반팔 셋업 (베이지)",
        "revenue": 17876000,
        "units": 201
      },
      {
        "rank": 2,
        "name": "와이드 슬랙스 (블랙)",
        "revenue": 13952000,
        "units": 184
      },
      {
        "rank": 3,
        "name": "크롭 셔츠 (화이트)",
        "revenue": 11118000,
        "units": 192
      },
      {
        "rank": 4,
        "name": "비치 원피스 (화이트)",
        "revenue": 9156000,
        "units": 74
      },
      {
        "rank": 5,
        "name": "오버사이즈 선글라스",
        "revenue": 7630000,
        "units": 80
      }
    ]
  },
  "AD_OPERATION": {
    "totalSpend": 52000000,
    "totalSpendDelta": 18.4,
    "roas": 4.2,
    "cpc": 1583,
    "cpa": 41667,
    "dailySpend": [
      2736842,
      3018639,
      3062978,
      2897797,
      2731808,
      2664388,
      2607620,
      2502893,
      2473449,
      2623621,
      2962646,
      3115314,
      2982529,
      2722460,
      2570329,
      2562374,
      2570535,
      2555775,
      2638003
    ],
    "dailyRoas": [
      3.9,
      4.05,
      4.2,
      4.35,
      4.5,
      3.9,
      4.05,
      4.2,
      4.35,
      4.5,
      3.9,
      4.05,
      4.2,
      4.35,
      4.5,
      3.9,
      4.05,
      4.2,
      4.35
    ],
    "byChannel": [
      {
        "channel": "네이버 검색",
        "spend": 16640000,
        "impressions": 410526,
        "clicks": 11166,
        "cpc": 420,
        "conversions": 474,
        "cpa": 18400,
        "revenue": 43600000,
        "roas": 4.8
      },
      {
        "channel": "구글 검색",
        "spend": 11440000,
        "impressions": 246316,
        "clicks": 6897,
        "cpc": 510,
        "conversions": 275,
        "cpa": 19800,
        "revenue": 28340000,
        "roas": 4.6
      },
      {
        "channel": "메타 (페이스북/인스타)",
        "spend": 12480000,
        "impressions": 437895,
        "clicks": 7225,
        "cpc": 380,
        "conversions": 225,
        "cpa": 21600,
        "revenue": 21800000,
        "roas": 4.2
      },
      {
        "channel": "카카오",
        "spend": 7280000,
        "impressions": 191579,
        "clicks": 5255,
        "cpc": 340,
        "conversions": 200,
        "cpa": 15200,
        "revenue": 15260000,
        "roas": 5.2
      },
      {
        "channel": "유튜브",
        "spend": 4160000,
        "impressions": 82105,
        "clicks": 2299,
        "cpc": 450,
        "conversions": 75,
        "cpa": 22800,
        "revenue": 6540000,
        "roas": 3.6
      }
    ],
    "campaigns": [
      {
        "id": "c1",
        "name": "여름 신상 시즌 캠페인",
        "channel": "네이버 검색",
        "spend": 9360000,
        "impressions": 218947,
        "clicks": 6568,
        "conversions": 275,
        "roas": 5.2
      },
      {
        "id": "c2",
        "name": "브랜드 인지도 확보",
        "channel": "메타",
        "spend": 7280000,
        "impressions": 301053,
        "clicks": 4598,
        "conversions": 125,
        "roas": 3.8
      },
      {
        "id": "c3",
        "name": "재방문 리타게팅",
        "channel": "구글 GDN",
        "spend": 6240000,
        "impressions": 136842,
        "clicks": 4269,
        "conversions": 225,
        "roas": 6.1
      },
      {
        "id": "c4",
        "name": "신규 회원 가입 유도",
        "channel": "카카오",
        "spend": 5200000,
        "impressions": 136842,
        "clicks": 3941,
        "conversions": 175,
        "roas": 4.9
      }
    ],
    "funnel": {
      "impression": 1368421,
      "click": 32842,
      "widgetView": 20362,
      "bannerClick": 3665,
      "purchase": 1248
    }
  },
  "MEMBERSHIP": {
    "totalActive": 13464,
    "activeDelta": 12.4,
    "newSignups": 1980,
    "paidConversion": 101,
    "paidConversionRate": 5.1,
    "funnel": {
      "visit": 55440,
      "signup": 1980,
      "firstPurchase": 101,
      "repurchase": 32
    },
    "dailySignups": [
      104,
      120,
      123,
      113,
      104,
      100,
      97,
      91,
      89,
      98,
      117,
      126,
      118,
      103,
      95,
      94,
      95,
      94,
      99
    ],
    "cohort": [
      {
        "cohort": "5월",
        "m0": 100,
        "m1": 78,
        "m2": 65,
        "m3": 54
      },
      {
        "cohort": "5월 중",
        "m0": 100,
        "m1": 82,
        "m2": 68,
        "m3": null
      },
      {
        "cohort": "5월 말",
        "m0": 100,
        "m1": 80,
        "m2": null,
        "m3": null
      }
    ]
  },
  "CHURN": {
    "dormantCount": 1414,
    "dormantRate": 10.5,
    "churnCount": 323,
    "churnRate": 2.4,
    "churnRateDelta": -0.4,
    "dailyChurn": [
      17,
      20,
      21,
      19,
      17,
      16,
      16,
      14,
      14,
      15,
      20,
      21,
      20,
      17,
      15,
      15,
      15,
      15,
      16
    ],
    "reasons": [
      {
        "reason": "가격 부담",
        "count": 103,
        "pct": 32.0
      },
      {
        "reason": "필요 없어짐",
        "count": 78,
        "pct": 24.0
      },
      {
        "reason": "서비스 불만",
        "count": 58,
        "pct": 18.0
      },
      {
        "reason": "다른 서비스로 이동",
        "count": 45,
        "pct": 14.0
      },
      {
        "reason": "기타",
        "count": 39,
        "pct": 12.0
      }
    ]
  },
  "KEY_METRICS": {
    "cac": 514851,
    "ltv": 51812,
    "ltvCacRatio": 0.1,
    "mrr": 72666667,
    "mrrDelta": 8.4,
    "arpu": 16191
  }
};
