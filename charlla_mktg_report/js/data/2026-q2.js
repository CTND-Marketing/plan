// ============================================================
// 2026년 2분기 데이터
// ============================================================
// 기간: 2026.04.01 - 2026.06.30
// 단계: 안정 성장
// ============================================================

window.PERIOD_2026_Q2 = {
  "meta": {
    "id": "2026-q2",
    "label": "2026년 2분기",
    "range": "2026.04.01 - 2026.06.30",
    "sampleStart": "2026.05.01",
    "sampleEnd": "2026.05.19",
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
    "phase": "안정 성장"
  },
  "CONNECTED_FLOW_DATA": {
    "linen": {
      "name": "린넨 셋업 컬렉션 상세 (5개 연결)",
      "totalLoad": 142208,
      "lastPct": 22,
      "mainExit": "영상 #2 → #3 (-32%p)",
      "dailyLoad": [
        6510,
        6980,
        7370,
        7720,
        7470,
        7860,
        8060,
        7770,
        7470,
        7670,
        7920,
        8160,
        8290,
        8090,
        7770,
        7610,
        7470,
        7160,
        7360
      ],
      "videos": [
        {
          "id": "cv-linen-1",
          "name": "영상 #1",
          "loads": 28440,
          "position": "상단"
        },
        {
          "id": "cv-linen-2",
          "name": "영상 #2",
          "loads": 21046,
          "position": "중상단"
        },
        {
          "id": "cv-linen-3",
          "name": "영상 #3",
          "loads": 11945,
          "position": "중단"
        },
        {
          "id": "cv-linen-4",
          "name": "영상 #4",
          "loads": 8816,
          "position": "중하단"
        },
        {
          "id": "cv-linen-5",
          "name": "영상 #5",
          "loads": 6257,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "28,440",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 74,
          "label": "영상 #2",
          "count": "21,046",
          "loc": "중상단",
          "down": false
        },
        {
          "pct": 42,
          "label": "영상 #3",
          "count": "11,945",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 31,
          "label": "영상 #4",
          "count": "8,816",
          "loc": "중하단",
          "down": false
        },
        {
          "pct": 22,
          "label": "영상 #5",
          "count": "6,257",
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
          "count": "110,920",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 14,
          "count": "19,909",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 6,
          "count": "8,532",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 2,
          "count": "2,844",
          "external": true
        }
      ]
    },
    "shoes": {
      "name": "신상 슈즈 컬렉션 (4개 연결)",
      "totalLoad": 98440,
      "lastPct": 35,
      "mainExit": "영상 #1 → #2 (-28%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-shoes-1",
          "name": "영상 #1",
          "loads": 24610,
          "position": "상단"
        },
        {
          "id": "cv-shoes-2",
          "name": "영상 #2",
          "loads": 17719,
          "position": "중단"
        },
        {
          "id": "cv-shoes-3",
          "name": "영상 #3",
          "loads": 13290,
          "position": "중하단"
        },
        {
          "id": "cv-shoes-4",
          "name": "영상 #4",
          "loads": 8621,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "24,610",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 72,
          "label": "영상 #2",
          "count": "17,719",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 54,
          "label": "영상 #3",
          "count": "13,290",
          "loc": "중하단",
          "down": false
        },
        {
          "pct": 35,
          "label": "영상 #4",
          "count": "8,621",
          "loc": "하단",
          "down": false
        }
      ],
      "alert": "영상 #1 → #2 구간에서 이탈률 28%p 발생.",
      "domain": []
    },
    "denim": {
      "name": "데님 시리즈 (3개 연결)",
      "totalLoad": 72118,
      "lastPct": 48,
      "mainExit": "영상 #1 → #2 (-22%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-denim-1",
          "name": "영상 #1",
          "loads": 18030,
          "position": "상단"
        },
        {
          "id": "cv-denim-2",
          "name": "영상 #2",
          "loads": 14063,
          "position": "중단"
        },
        {
          "id": "cv-denim-3",
          "name": "영상 #3",
          "loads": 8657,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "18,030",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 78,
          "label": "영상 #2",
          "count": "14,063",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 48,
          "label": "영상 #3",
          "count": "8,657",
          "loc": "하단",
          "down": false
        }
      ],
      "alert": "마지막까지 시청률 48%로 양호.",
      "domain": []
    },
    "outer": {
      "name": "아우터 컬렉션 (3개 연결)",
      "totalLoad": 54201,
      "lastPct": 52,
      "mainExit": "영상 #1 → #2 (-18%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-outer-1",
          "name": "영상 #1",
          "loads": 13550,
          "position": "상단"
        },
        {
          "id": "cv-outer-2",
          "name": "영상 #2",
          "loads": 11111,
          "position": "중단"
        },
        {
          "id": "cv-outer-3",
          "name": "영상 #3",
          "loads": 7034,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "13,550",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 82,
          "label": "영상 #2",
          "count": "11,111",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 52,
          "label": "영상 #3",
          "count": "7,034",
          "loc": "하단",
          "down": false
        }
      ],
      "alert": "시청 유지율이 우수합니다.",
      "domain": []
    },
    "acc": {
      "name": "액세서리 시리즈 (4개 연결)",
      "totalLoad": 42884,
      "lastPct": 28,
      "mainExit": "영상 #2 → #3 (-30%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-acc-1",
          "name": "영상 #1",
          "loads": 10721,
          "position": "상단"
        },
        {
          "id": "cv-acc-2",
          "name": "영상 #2",
          "loads": 9006,
          "position": "중상단"
        },
        {
          "id": "cv-acc-3",
          "name": "영상 #3",
          "loads": 5789,
          "position": "중단"
        },
        {
          "id": "cv-acc-4",
          "name": "영상 #4",
          "loads": 3008,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "10,721",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 84,
          "label": "영상 #2",
          "count": "9,006",
          "loc": "중상단",
          "down": false
        },
        {
          "pct": 54,
          "label": "영상 #3",
          "count": "5,789",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 28,
          "label": "영상 #4",
          "count": "3,008",
          "loc": "하단",
          "down": false
        }
      ],
      "alert": "영상 #2 → #3 구간에서 30%p 급락.",
      "domain": []
    },
    "bigDeal": {
      "name": "여름 빅딜 페이지 (10개 연결)",
      "totalLoad": 188420,
      "lastPct": 18,
      "mainExit": "영상 #4 → #5 (-25%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-bigDeal-1",
          "name": "영상 #1",
          "loads": 37684,
          "position": "영상 #1"
        },
        {
          "id": "cv-bigDeal-2",
          "name": "영상 #2",
          "loads": 33912,
          "position": "영상 #2"
        },
        {
          "id": "cv-bigDeal-3",
          "name": "영상 #3",
          "loads": 28263,
          "position": "영상 #3"
        },
        {
          "id": "cv-bigDeal-4",
          "name": "영상 #4",
          "loads": 22617,
          "position": "영상 #4"
        },
        {
          "id": "cv-bigDeal-5",
          "name": "영상 #5",
          "loads": 13189,
          "position": "영상 #5"
        },
        {
          "id": "cv-bigDeal-6",
          "name": "영상 #6",
          "loads": 9421,
          "position": "영상 #6"
        },
        {
          "id": "cv-bigDeal-7",
          "name": "영상 #7",
          "loads": 7060,
          "position": "영상 #7"
        },
        {
          "id": "cv-bigDeal-8",
          "name": "영상 #8",
          "loads": 5648,
          "position": "영상 #8"
        },
        {
          "id": "cv-bigDeal-9",
          "name": "영상 #9",
          "loads": 4710,
          "position": "영상 #9"
        },
        {
          "id": "cv-bigDeal-10",
          "name": "영상 #10",
          "loads": 3917,
          "position": "영상 #10"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "37,684",
          "loc": "",
          "down": false
        },
        {
          "pct": 90,
          "label": "영상 #2",
          "count": "33,912",
          "loc": "",
          "down": false
        },
        {
          "pct": 75,
          "label": "영상 #3",
          "count": "28,263",
          "loc": "",
          "down": false
        },
        {
          "pct": 60,
          "label": "영상 #4",
          "count": "22,617",
          "loc": "",
          "down": false
        },
        {
          "pct": 35,
          "label": "영상 #5",
          "count": "13,189",
          "loc": "",
          "down": true
        },
        {
          "pct": 25,
          "label": "영상 #6",
          "count": "9,421",
          "loc": "",
          "down": false
        },
        {
          "pct": 19,
          "label": "영상 #7",
          "count": "7,060",
          "loc": "",
          "down": false
        },
        {
          "pct": 15,
          "label": "영상 #8",
          "count": "5,648",
          "loc": "",
          "down": false
        },
        {
          "pct": 12,
          "label": "영상 #9",
          "count": "4,710",
          "loc": "",
          "down": false
        },
        {
          "pct": 10,
          "label": "영상 #10",
          "count": "3,917",
          "loc": "",
          "down": false
        }
      ],
      "alert": "영상 #4 → #5 구간 이탈 25%p.",
      "domain": []
    },
    "megaBrand": {
      "name": "메가 브랜드 페이지 (20개 연결)",
      "totalLoad": 312880,
      "lastPct": 9,
      "mainExit": "영상 #6 → #7 (-22%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-megaBrand-1",
          "name": "영상 #1",
          "loads": 62576,
          "position": "영상 #1"
        },
        {
          "id": "cv-megaBrand-2",
          "name": "영상 #2",
          "loads": 55067,
          "position": "영상 #2"
        },
        {
          "id": "cv-megaBrand-3",
          "name": "영상 #3",
          "loads": 48820,
          "position": "영상 #3"
        },
        {
          "id": "cv-megaBrand-4",
          "name": "영상 #4",
          "loads": 43803,
          "position": "영상 #4"
        },
        {
          "id": "cv-megaBrand-5",
          "name": "영상 #5",
          "loads": 40674,
          "position": "영상 #5"
        },
        {
          "id": "cv-megaBrand-6",
          "name": "영상 #6",
          "loads": 38171,
          "position": "영상 #6"
        },
        {
          "id": "cv-megaBrand-7",
          "name": "영상 #7",
          "loads": 24405,
          "position": "영상 #7"
        },
        {
          "id": "cv-megaBrand-8",
          "name": "영상 #8",
          "loads": 20650,
          "position": "영상 #8"
        },
        {
          "id": "cv-megaBrand-9",
          "name": "영상 #9",
          "loads": 17521,
          "position": "영상 #9"
        },
        {
          "id": "cv-megaBrand-10",
          "name": "영상 #10",
          "loads": 15019,
          "position": "영상 #10"
        },
        {
          "id": "cv-megaBrand-11",
          "name": "영상 #11",
          "loads": 13142,
          "position": "영상 #11"
        },
        {
          "id": "cv-megaBrand-12",
          "name": "영상 #12",
          "loads": 11265,
          "position": "영상 #12"
        },
        {
          "id": "cv-megaBrand-13",
          "name": "영상 #13",
          "loads": 10012,
          "position": "영상 #13"
        },
        {
          "id": "cv-megaBrand-14",
          "name": "영상 #14",
          "loads": 8761,
          "position": "영상 #14"
        },
        {
          "id": "cv-megaBrand-15",
          "name": "영상 #15",
          "loads": 8135,
          "position": "영상 #15"
        },
        {
          "id": "cv-megaBrand-16",
          "name": "영상 #16",
          "loads": 7509,
          "position": "영상 #16"
        },
        {
          "id": "cv-megaBrand-17",
          "name": "영상 #17",
          "loads": 6883,
          "position": "영상 #17"
        },
        {
          "id": "cv-megaBrand-18",
          "name": "영상 #18",
          "loads": 6258,
          "position": "영상 #18"
        },
        {
          "id": "cv-megaBrand-19",
          "name": "영상 #19",
          "loads": 5945,
          "position": "영상 #19"
        },
        {
          "id": "cv-megaBrand-20",
          "name": "영상 #20",
          "loads": 5632,
          "position": "영상 #20"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "62,576",
          "loc": "",
          "down": false
        },
        {
          "pct": 88,
          "label": "영상 #2",
          "count": "55,067",
          "loc": "",
          "down": false
        },
        {
          "pct": 78,
          "label": "영상 #3",
          "count": "48,820",
          "loc": "",
          "down": false
        },
        {
          "pct": 70,
          "label": "영상 #4",
          "count": "43,803",
          "loc": "",
          "down": false
        },
        {
          "pct": 65,
          "label": "영상 #5",
          "count": "40,674",
          "loc": "",
          "down": false
        },
        {
          "pct": 61,
          "label": "영상 #6",
          "count": "38,171",
          "loc": "",
          "down": false
        },
        {
          "pct": 39,
          "label": "영상 #7",
          "count": "24,405",
          "loc": "",
          "down": true
        },
        {
          "pct": 33,
          "label": "영상 #8",
          "count": "20,650",
          "loc": "",
          "down": false
        },
        {
          "pct": 28,
          "label": "영상 #9",
          "count": "17,521",
          "loc": "",
          "down": false
        },
        {
          "pct": 24,
          "label": "영상 #10",
          "count": "15,019",
          "loc": "",
          "down": false
        },
        {
          "pct": 21,
          "label": "영상 #11",
          "count": "13,142",
          "loc": "",
          "down": false
        },
        {
          "pct": 18,
          "label": "영상 #12",
          "count": "11,265",
          "loc": "",
          "down": false
        },
        {
          "pct": 16,
          "label": "영상 #13",
          "count": "10,012",
          "loc": "",
          "down": false
        },
        {
          "pct": 14,
          "label": "영상 #14",
          "count": "8,761",
          "loc": "",
          "down": false
        },
        {
          "pct": 13,
          "label": "영상 #15",
          "count": "8,135",
          "loc": "",
          "down": false
        },
        {
          "pct": 12,
          "label": "영상 #16",
          "count": "7,509",
          "loc": "",
          "down": false
        },
        {
          "pct": 11,
          "label": "영상 #17",
          "count": "6,883",
          "loc": "",
          "down": false
        },
        {
          "pct": 10,
          "label": "영상 #18",
          "count": "6,258",
          "loc": "",
          "down": false
        },
        {
          "pct": 9.5,
          "label": "영상 #19",
          "count": "5,945",
          "loc": "",
          "down": false
        },
        {
          "pct": 9,
          "label": "영상 #20",
          "count": "5,632",
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
      "load": "39,884",
      "play": "32,705 (82%)",
      "avg": "16.8초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 84,
          "count": "33,503",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 10,
          "count": "3,988",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 6,
          "count": "2,393",
          "external": true
        }
      ]
    },
    "v2": {
      "name": "신상 가방 클로즈업",
      "load": "27,108",
      "play": "20,331 (75%)",
      "avg": "13.2초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 92,
          "count": "24,939",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 5,
          "count": "1,355",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 3,
          "count": "814",
          "external": true
        }
      ]
    },
    "v3": {
      "name": "스니커즈 풋샷",
      "load": "23,210",
      "play": "16,247 (70%)",
      "avg": "11.8초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 79,
          "count": "18,336",
          "external": false
        },
        {
          "name": "brand.musinsa.com",
          "label": "외부",
          "pct": 14,
          "count": "3,249",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 7,
          "count": "1,625",
          "external": true
        }
      ]
    },
    "v4": {
      "name": "여름 메인 비주얼",
      "load": "18,442",
      "play": "14,385 (78%)",
      "avg": "15.4초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 88,
          "count": "16,229",
          "external": false
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 12,
          "count": "2,213",
          "external": true
        }
      ]
    },
    "v5": {
      "name": "크롭 셔츠 디테일",
      "load": "16,772",
      "play": "10,902 (65%)",
      "avg": "10.2초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 81,
          "count": "13,585",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 11,
          "count": "1,845",
          "external": true
        },
        {
          "name": "brand.musinsa.com",
          "label": "외부",
          "pct": 8,
          "count": "1,342",
          "external": true
        }
      ]
    }
  },
  "FLOATING_DATA": {
    "floating-home": {
      "name": "홈 메인 플로팅",
      "load": "62,400",
      "clicks": "3,376",
      "ctr": "5.41%",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 88,
          "count": "54,912",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 8,
          "count": "4,992",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 4,
          "count": "2,496",
          "external": true
        }
      ],
      "banners": [
        {
          "name": "린넨 반팔 셋업 (베이지)",
          "clicks": 3376,
          "ctr": 5.41
        }
      ]
    },
    "floating-category": {
      "name": "카테고리 플로팅 (상의)",
      "load": "51,820",
      "clicks": "1,924",
      "ctr": "3.71%",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 94,
          "count": "48,711",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 6,
          "count": "3,109",
          "external": true
        }
      ],
      "banners": [
        {
          "name": "셔츠 컬렉션 시리즈",
          "clicks": 1924,
          "ctr": 3.71
        }
      ]
    },
    "floating-event": {
      "name": "이벤트 페이지 플로팅",
      "load": "34,404",
      "clicks": "900",
      "ctr": "2.62%",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 71,
          "count": "24,427",
          "external": false
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 22,
          "count": "7,569",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 7,
          "count": "2,408",
          "external": true
        }
      ],
      "banners": [
        {
          "name": "여름 시즌오프 ~50%",
          "clicks": 900,
          "ctr": 2.62
        }
      ]
    }
  },
  "SLIDE_VIDEO_DATA": {
    "sv1": {
      "name": "린넨 반팔 셋업 쇼츠",
      "clicks": 1847,
      "ctr": 8.42,
      "banners": [
        {
          "name": "린넨 반팔 셋업 (베이지)",
          "clicks": 1102,
          "ctr": 5.02
        },
        {
          "name": "린넨 반팔 셋업 (네이비)",
          "clicks": 745,
          "ctr": 3.4
        }
      ],
      "domain": []
    },
    "sv2": {
      "name": "와이드 슬랙스 쇼츠",
      "clicks": 1442,
      "ctr": 7.18,
      "banners": [
        {
          "name": "와이드 슬랙스 (블랙)",
          "clicks": 1442,
          "ctr": 7.18
        }
      ],
      "domain": []
    },
    "sv3": {
      "name": "크롭 셔츠 쇼츠",
      "clicks": 1108,
      "ctr": 5.74,
      "banners": [
        {
          "name": "크롭 셔츠 (화이트)",
          "clicks": 1108,
          "ctr": 5.74
        }
      ],
      "domain": []
    },
    "sv4": {
      "name": "밀짚 모자 쇼츠",
      "clicks": 702,
      "ctr": 3.81,
      "banners": [
        {
          "name": "밀짚 모자 (내추럴)",
          "clicks": 702,
          "ctr": 3.81
        }
      ],
      "domain": []
    },
    "s2v1": {
      "name": "린넨 자켓 룩북",
      "clicks": 1402,
      "ctr": 6.62,
      "banners": [],
      "domain": []
    },
    "s2v2": {
      "name": "린넨 셔츠 디테일",
      "clicks": 996,
      "ctr": 5.91,
      "banners": [],
      "domain": []
    },
    "s2v3": {
      "name": "린넨 팬츠 핏감",
      "clicks": 658,
      "ctr": 5.42,
      "banners": [],
      "domain": []
    },
    "s3v1": {
      "name": "룩북 #1 모델 워킹",
      "clicks": 798,
      "ctr": 5.74,
      "banners": [],
      "domain": []
    },
    "s3v2": {
      "name": "룩북 #2 클로즈업",
      "clicks": 642,
      "ctr": 5.18,
      "banners": [],
      "domain": []
    },
    "s3v3": {
      "name": "룩북 #3 디테일",
      "clicks": 452,
      "ctr": 4.04,
      "banners": [],
      "domain": []
    },
    "s4v1": {
      "name": "베스트 #1",
      "clicks": 372,
      "ctr": 4.12,
      "banners": [],
      "domain": []
    },
    "s4v2": {
      "name": "베스트 #2",
      "clicks": 305,
      "ctr": 3.74,
      "banners": [],
      "domain": []
    }
  },
  "MULTI_VIDEO_DATA": {
    "mv1": {
      "name": "비치웨어 모델 컷 A",
      "clicks": 1022,
      "ctr": 4.62,
      "banners": [
        {
          "name": "비치 원피스 (화이트)",
          "clicks": 612,
          "ctr": 2.77
        },
        {
          "name": "비치 모자",
          "clicks": 410,
          "ctr": 1.85
        }
      ],
      "domain": []
    },
    "mv2": {
      "name": "선글라스 클로즈업",
      "clicks": 436,
      "ctr": 3.18,
      "banners": [
        {
          "name": "오버사이즈 선글라스",
          "clicks": 436,
          "ctr": 3.18
        }
      ],
      "domain": []
    },
    "mv3": {
      "name": "샌들 360°",
      "clicks": 220,
      "ctr": 2.41,
      "banners": [
        {
          "name": "플랫 샌들 (탠)",
          "clicks": 220,
          "ctr": 2.41
        }
      ],
      "domain": []
    },
    "mv4": {
      "name": "비치백 디테일",
      "clicks": 60,
      "ctr": 1.18,
      "banners": [
        {
          "name": "비치백 (스트로)",
          "clicks": 60,
          "ctr": 1.18
        }
      ],
      "domain": []
    },
    "m2v1": {
      "name": "시즌 룩 1",
      "clicks": 326,
      "ctr": 3.1,
      "banners": [],
      "domain": []
    },
    "m2v2": {
      "name": "시즌 룩 2",
      "clicks": 230,
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
      "load": 39884,
      "play": 32705,
      "playRate": 82,
      "avgTime": 16.8,
      "parentPage": "displayer",
      "dailyLoad": [
        1820,
        1950,
        2080,
        2210,
        2090,
        2240,
        2150,
        2090,
        2180,
        2310,
        2220,
        2380,
        2440,
        2390,
        2280,
        2310,
        2250,
        2120,
        2180
      ],
      "dailyPlay": [
        1492,
        1599,
        1706,
        1812,
        1714,
        1837,
        1763,
        1714,
        1788,
        1894,
        1820,
        1952,
        2001,
        1960,
        1870,
        1894,
        1845,
        1738,
        1788
      ],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 84,
          "count": "33,503",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 10,
          "count": "3,988",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 6,
          "count": "2,393",
          "external": true
        }
      ]
    },
    "v2": {
      "name": "신상 가방 클로즈업",
      "type": "단일 영상",
      "placement": "상세페이지",
      "load": 27108,
      "play": 20331,
      "playRate": 75,
      "avgTime": 13.2,
      "parentPage": "displayer",
      "dailyLoad": [
        1240,
        1320,
        1410,
        1380,
        1450,
        1490,
        1520,
        1480,
        1410,
        1370,
        1440,
        1500,
        1530,
        1490,
        1410,
        1360,
        1320,
        1280,
        1320
      ],
      "dailyPlay": [
        930,
        990,
        1058,
        1035,
        1088,
        1118,
        1140,
        1110,
        1058,
        1028,
        1080,
        1125,
        1148,
        1118,
        1058,
        1020,
        990,
        960,
        990
      ],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 92,
          "count": "24,939",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 5,
          "count": "1,355",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 3,
          "count": "814",
          "external": true
        }
      ]
    },
    "v3": {
      "name": "스니커즈 풋샷",
      "type": "단일 영상",
      "placement": "상세페이지",
      "load": 23210,
      "play": 16247,
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
          "count": "18,336",
          "external": false
        },
        {
          "name": "brand.musinsa.com",
          "label": "외부",
          "pct": 14,
          "count": "3,249",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 7,
          "count": "1,625",
          "external": true
        }
      ]
    },
    "v4": {
      "name": "여름 메인 비주얼",
      "type": "단일 영상",
      "placement": "메인 배너",
      "load": 18442,
      "play": 14385,
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
          "count": "16,229",
          "external": false
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 12,
          "count": "2,213",
          "external": true
        }
      ]
    },
    "v5": {
      "name": "크롭 셔츠 디테일",
      "type": "단일 영상",
      "placement": "상세페이지",
      "load": 16772,
      "play": 10902,
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
          "count": "13,585",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 11,
          "count": "1,845",
          "external": true
        },
        {
          "name": "brand.musinsa.com",
          "label": "외부",
          "pct": 8,
          "count": "1,342",
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
      "load": 62400,
      "clicks": 3376,
      "ctr": 5.41,
      "dailyLoad": [
        2820,
        3010,
        3180,
        3320,
        3210,
        3380,
        3470,
        3340,
        3210,
        3290,
        3410,
        3520,
        3580,
        3490,
        3340,
        3270,
        3210,
        3080,
        3160
      ],
      "dailyClicks": [
        152,
        163,
        172,
        180,
        174,
        183,
        188,
        181,
        174,
        178,
        184,
        190,
        194,
        189,
        181,
        177,
        174,
        167,
        171
      ],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 88,
          "count": "54,912",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 8,
          "count": "4,992",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 4,
          "count": "2,496",
          "external": true
        }
      ],
      "engagement": {
        "likes": 2026,
        "shares": 844,
        "saves": 338
      },
      "videos": [
        {
          "id": "floating-home-v1",
          "name": "홈 메인 플로팅 영상",
          "dailyClicks": [
            152,
            163,
            172,
            180,
            174,
            183,
            188,
            181,
            174,
            178,
            184,
            190,
            194,
            189,
            181,
            177,
            174,
            167,
            171
          ],
          "totalClicks": 3376,
          "ctr": 5.41,
          "banners": [
            {
              "name": "린넨 반팔 셋업 (베이지)",
              "clicks": 3376,
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
      "load": 51820,
      "clicks": 1924,
      "ctr": 3.71,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 94,
          "count": "48,711",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 6,
          "count": "3,109",
          "external": true
        }
      ],
      "engagement": {
        "likes": 1154,
        "shares": 481,
        "saves": 192
      },
      "videos": [
        {
          "id": "floating-category-v1",
          "name": "카테고리 플로팅 (상의) 영상",
          "dailyClicks": [],
          "totalClicks": 1924,
          "ctr": 3.71,
          "banners": [
            {
              "name": "셔츠 컬렉션 시리즈",
              "clicks": 1924,
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
      "load": 34404,
      "clicks": 900,
      "ctr": 2.62,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 71,
          "count": "24,427",
          "external": false
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 22,
          "count": "7,569",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 7,
          "count": "2,408",
          "external": true
        }
      ],
      "engagement": {
        "likes": 540,
        "shares": 225,
        "saves": 90
      },
      "videos": [
        {
          "id": "floating-event-v1",
          "name": "이벤트 페이지 플로팅 영상",
          "dailyClicks": [],
          "totalClicks": 900,
          "ctr": 2.62,
          "banners": [
            {
              "name": "여름 시즌오프 ~50%",
              "clicks": 900,
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
      "load": 68201,
      "clicks": 5082,
      "ctr": 7.45,
      "dailyLoad": [
        3080,
        3300,
        3490,
        3640,
        3520,
        3700,
        3800,
        3660,
        3520,
        3610,
        3740,
        3860,
        3920,
        3820,
        3660,
        3580,
        3520,
        3370,
        3460
      ],
      "dailyClicks": [
        229,
        246,
        260,
        272,
        263,
        277,
        283,
        273,
        263,
        270,
        279,
        288,
        293,
        285,
        273,
        267,
        263,
        251,
        258
      ],
      "domain": [],
      "engagement": {
        "likes": 3049,
        "shares": 1067,
        "saves": 610
      },
      "videos": [
        {
          "id": "sv1",
          "name": "린넨 반팔 셋업 쇼츠",
          "dailyClicks": [
            83,
            89,
            94,
            99,
            95,
            100,
            103,
            99,
            95,
            98,
            101,
            104,
            106,
            103,
            99,
            97,
            95,
            91,
            93
          ],
          "totalClicks": 1847,
          "ctr": 8.42,
          "banners": [
            {
              "name": "린넨 반팔 셋업 (베이지)",
              "clicks": 1102,
              "ctr": 5.02
            },
            {
              "name": "린넨 반팔 셋업 (네이비)",
              "clicks": 745,
              "ctr": 3.4
            }
          ]
        },
        {
          "id": "sv2",
          "name": "와이드 슬랙스 쇼츠",
          "dailyClicks": [],
          "totalClicks": 1442,
          "ctr": 7.18,
          "banners": [
            {
              "name": "와이드 슬랙스 (블랙)",
              "clicks": 1442,
              "ctr": 7.18
            }
          ]
        },
        {
          "id": "sv3",
          "name": "크롭 셔츠 쇼츠",
          "dailyClicks": [],
          "totalClicks": 1108,
          "ctr": 5.74,
          "banners": [
            {
              "name": "크롭 셔츠 (화이트)",
              "clicks": 1108,
              "ctr": 5.74
            }
          ]
        },
        {
          "id": "sv4",
          "name": "밀짚 모자 쇼츠",
          "dailyClicks": [],
          "totalClicks": 702,
          "ctr": 3.81,
          "banners": [
            {
              "name": "밀짚 모자 (내추럴)",
              "clicks": 702,
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
      "load": 52884,
      "clicks": 3221,
      "ctr": 6.09,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [],
      "engagement": {
        "likes": 1933,
        "shares": 676,
        "saves": 387
      },
      "videos": [
        {
          "id": "s2v1",
          "name": "린넨 자켓 룩북",
          "dailyClicks": [],
          "totalClicks": 1402,
          "ctr": 6.62,
          "banners": []
        },
        {
          "id": "s2v2",
          "name": "린넨 셔츠 디테일",
          "dailyClicks": [],
          "totalClicks": 996,
          "ctr": 5.91,
          "banners": []
        },
        {
          "id": "s2v3",
          "name": "린넨 팬츠 핏감",
          "dailyClicks": [],
          "totalClicks": 658,
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
      "load": 37202,
      "clicks": 1892,
      "ctr": 5.09,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [],
      "engagement": {
        "likes": 1135,
        "shares": 397,
        "saves": 227
      },
      "videos": [
        {
          "id": "s3v1",
          "name": "룩북 #1 모델 워킹",
          "dailyClicks": [],
          "totalClicks": 798,
          "ctr": 5.74,
          "banners": []
        },
        {
          "id": "s3v2",
          "name": "룩북 #2 클로즈업",
          "dailyClicks": [],
          "totalClicks": 642,
          "ctr": 5.18,
          "banners": []
        },
        {
          "id": "s3v3",
          "name": "룩북 #3 디테일",
          "dailyClicks": [],
          "totalClicks": 452,
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
      "load": 26133,
      "clicks": 953,
      "ctr": 3.65,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [],
      "engagement": {
        "likes": 572,
        "shares": 200,
        "saves": 114
      },
      "videos": [
        {
          "id": "s4v1",
          "name": "베스트 #1",
          "dailyClicks": [],
          "totalClicks": 372,
          "ctr": 4.12,
          "banners": []
        },
        {
          "id": "s4v2",
          "name": "베스트 #2",
          "dailyClicks": [],
          "totalClicks": 305,
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
      "load": 48118,
      "clicks": 1684,
      "ctr": 3.5,
      "dailyLoad": [],
      "dailyClicks": [
        76,
        81,
        86,
        90,
        87,
        91,
        94,
        90,
        87,
        89,
        92,
        95,
        97,
        94,
        90,
        88,
        87,
        83,
        85
      ],
      "domain": [],
      "engagement": {
        "likes": 926,
        "shares": 337,
        "saves": 152
      },
      "videos": [
        {
          "id": "mv1",
          "name": "비치웨어 모델 컷 A",
          "dailyClicks": [],
          "totalClicks": 1022,
          "ctr": 4.62,
          "banners": [
            {
              "name": "비치 원피스 (화이트)",
              "clicks": 612,
              "ctr": 2.77
            },
            {
              "name": "비치 모자",
              "clicks": 410,
              "ctr": 1.85
            }
          ]
        },
        {
          "id": "mv2",
          "name": "선글라스 클로즈업",
          "dailyClicks": [],
          "totalClicks": 436,
          "ctr": 3.18,
          "banners": [
            {
              "name": "오버사이즈 선글라스",
              "clicks": 436,
              "ctr": 3.18
            }
          ]
        },
        {
          "id": "mv3",
          "name": "샌들 360°",
          "dailyClicks": [],
          "totalClicks": 220,
          "ctr": 2.41,
          "banners": [
            {
              "name": "플랫 샌들 (탠)",
              "clicks": 220,
              "ctr": 2.41
            }
          ]
        },
        {
          "id": "mv4",
          "name": "비치백 디테일",
          "dailyClicks": [],
          "totalClicks": 60,
          "ctr": 1.18,
          "banners": [
            {
              "name": "비치백 (스트로)",
              "clicks": 60,
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
      "load": 30922,
      "clicks": 748,
      "ctr": 2.42,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [],
      "engagement": {
        "likes": 411,
        "shares": 150,
        "saves": 67
      },
      "videos": [
        {
          "id": "m2v1",
          "name": "시즌 룩 1",
          "dailyClicks": [],
          "totalClicks": 326,
          "ctr": 3.1,
          "banners": []
        },
        {
          "id": "m2v2",
          "name": "시즌 룩 2",
          "dailyClicks": [],
          "totalClicks": 230,
          "ctr": 2.62,
          "banners": []
        }
      ]
    }
  },
  "REVENUE": {
    "total": 478000000,
    "totalDelta": 23.8,
    "widgetContribution": 152960000,
    "widgetContributionPct": 32,
    "dailyRevenue": [
      25157895,
      28266327,
      28755424,
      26933346,
      25102365,
      24358673,
      23732473,
      22577258,
      22252468,
      -5986926,
      27648688,
      33732637,
      32048206,
      28749132,
      26819300,
      26718383,
      26821913,
      26634672,
      27677766
    ],
    "byChannel": [
      {
        "channel": "자사몰",
        "revenue": 296360000,
        "pct": 62.0
      },
      {
        "channel": "네이버 스마트스토어",
        "revenue": 86040000,
        "pct": 18.0
      },
      {
        "channel": "카카오 쇼핑하기",
        "revenue": 47800000,
        "pct": 10.0
      },
      {
        "channel": "무신사 브랜드관",
        "revenue": 33460000,
        "pct": 7.0
      },
      {
        "channel": "인스타그램 쇼핑",
        "revenue": 14340000,
        "pct": 3.0
      }
    ],
    "byWidget": [
      {
        "widgetId": "slide-s1",
        "name": "2026 여름 신상 쇼츠 컬렉션",
        "revenue": 52580000,
        "orders": 1384
      },
      {
        "widgetId": "slide-s2",
        "name": "린넨 셋업 시리즈 슬라이드",
        "revenue": 38240000,
        "orders": 933
      },
      {
        "widgetId": "floating-home",
        "name": "홈 메인 플로팅",
        "revenue": 28680000,
        "orders": 683
      },
      {
        "widgetId": "multi-m1",
        "name": "홈 비치웨어 멀티 위젯",
        "revenue": 19120000,
        "orders": 425
      },
      {
        "widgetId": "slide-s3",
        "name": "신상 룩북 슬라이드",
        "revenue": 14340000,
        "orders": 358
      }
    ],
    "topProducts": [
      {
        "rank": 1,
        "name": "린넨 반팔 셋업 (베이지)",
        "revenue": 39196000,
        "units": 440
      },
      {
        "rank": 2,
        "name": "와이드 슬랙스 (블랙)",
        "revenue": 30592000,
        "units": 403
      },
      {
        "rank": 3,
        "name": "크롭 셔츠 (화이트)",
        "revenue": 24378000,
        "units": 420
      },
      {
        "rank": 4,
        "name": "비치 원피스 (화이트)",
        "revenue": 20076000,
        "units": 162
      },
      {
        "rank": 5,
        "name": "오버사이즈 선글라스",
        "revenue": 16730000,
        "units": 176
      }
    ]
  },
  "AD_OPERATION": {
    "totalSpend": 98000000,
    "totalSpendDelta": 18.4,
    "roas": 4.9,
    "cpc": 1583,
    "cpa": 41667,
    "dailySpend": [
      5157895,
      5688973,
      5772535,
      5461232,
      5148407,
      5021347,
      4914360,
      4716991,
      4661500,
      4944520,
      5583449,
      5871168,
      5620919,
      5130789,
      4844082,
      4829089,
      4844470,
      4816653,
      4971621
    ],
    "dailyRoas": [
      4.6,
      4.75,
      4.9,
      5.05,
      5.2,
      4.6,
      4.75,
      4.9,
      5.05,
      5.2,
      4.6,
      4.75,
      4.9,
      5.05,
      5.2,
      4.6,
      4.75,
      4.9,
      5.05
    ],
    "byChannel": [
      {
        "channel": "네이버 검색",
        "spend": 31360000,
        "impressions": 773684,
        "clicks": 21044,
        "cpc": 420,
        "conversions": 894,
        "cpa": 18400,
        "revenue": 95600000,
        "roas": 4.8
      },
      {
        "channel": "구글 검색",
        "spend": 21560000,
        "impressions": 464210,
        "clicks": 12998,
        "cpc": 510,
        "conversions": 517,
        "cpa": 19800,
        "revenue": 62140000,
        "roas": 4.6
      },
      {
        "channel": "메타 (페이스북/인스타)",
        "spend": 23520000,
        "impressions": 825263,
        "clicks": 13617,
        "cpc": 380,
        "conversions": 423,
        "cpa": 21600,
        "revenue": 47800000,
        "roas": 4.2
      },
      {
        "channel": "카카오",
        "spend": 13720000,
        "impressions": 361053,
        "clicks": 9903,
        "cpc": 340,
        "conversions": 376,
        "cpa": 15200,
        "revenue": 33460000,
        "roas": 5.2
      },
      {
        "channel": "유튜브",
        "spend": 7840000,
        "impressions": 154737,
        "clicks": 4333,
        "cpc": 450,
        "conversions": 141,
        "cpa": 22800,
        "revenue": 14340000,
        "roas": 3.6
      }
    ],
    "campaigns": [
      {
        "id": "c1",
        "name": "여름 신상 시즌 캠페인",
        "channel": "네이버 검색",
        "spend": 17640000,
        "impressions": 412632,
        "clicks": 12379,
        "conversions": 517,
        "roas": 5.2
      },
      {
        "id": "c2",
        "name": "브랜드 인지도 확보",
        "channel": "메타",
        "spend": 13720000,
        "impressions": 567368,
        "clicks": 8665,
        "conversions": 235,
        "roas": 3.8
      },
      {
        "id": "c3",
        "name": "재방문 리타게팅",
        "channel": "구글 GDN",
        "spend": 11760000,
        "impressions": 257895,
        "clicks": 8046,
        "conversions": 423,
        "roas": 6.1
      },
      {
        "id": "c4",
        "name": "신규 회원 가입 유도",
        "channel": "카카오",
        "spend": 9800000,
        "impressions": 257895,
        "clicks": 7427,
        "conversions": 329,
        "roas": 4.9
      }
    ],
    "funnel": {
      "impression": 2578947,
      "click": 61895,
      "widgetView": 38375,
      "bannerClick": 6907,
      "purchase": 2352
    }
  },
  "MEMBERSHIP": {
    "totalActive": 26112,
    "activeDelta": 12.4,
    "newSignups": 3840,
    "paidConversion": 284,
    "paidConversionRate": 7.4,
    "funnel": {
      "visit": 107520,
      "signup": 3840,
      "firstPurchase": 284,
      "repurchase": 91
    },
    "dailySignups": [
      202,
      233,
      238,
      220,
      202,
      194,
      188,
      176,
      173,
      189,
      227,
      244,
      229,
      201,
      184,
      183,
      184,
      182,
      191
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
    "dormantCount": 2037,
    "dormantRate": 7.8,
    "churnCount": 470,
    "churnRate": 1.8,
    "churnRateDelta": -0.4,
    "dailyChurn": [
      25,
      29,
      30,
      27,
      25,
      24,
      23,
      21,
      20,
      22,
      28,
      31,
      29,
      25,
      22,
      22,
      22,
      22,
      23
    ],
    "reasons": [
      {
        "reason": "가격 부담",
        "count": 150,
        "pct": 32.0
      },
      {
        "reason": "필요 없어짐",
        "count": 113,
        "pct": 24.0
      },
      {
        "reason": "서비스 불만",
        "count": 85,
        "pct": 18.0
      },
      {
        "reason": "다른 서비스로 이동",
        "count": 66,
        "pct": 14.0
      },
      {
        "reason": "기타",
        "count": 56,
        "pct": 12.0
      }
    ]
  },
  "KEY_METRICS": {
    "cac": 345070,
    "ltv": 58578,
    "ltvCacRatio": 0.17,
    "mrr": 159333333,
    "mrrDelta": 8.4,
    "arpu": 18306
  }
};
