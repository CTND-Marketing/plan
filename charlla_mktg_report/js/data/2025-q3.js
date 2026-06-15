// ============================================================
// 2025년 3분기 데이터
// ============================================================
// 기간: 2025.07.01 - 2025.09.30
// 단계: 본격 성장
// ============================================================

window.PERIOD_2025_Q3 = {
  "meta": {
    "id": "2025-q3",
    "label": "2025년 3분기",
    "range": "2025.07.01 - 2025.09.30",
    "sampleStart": "2025.08.01",
    "sampleEnd": "2025.08.19",
    "dayLabels": [
      "8/1",
      "8/2",
      "8/3",
      "8/4",
      "8/5",
      "8/6",
      "8/7",
      "8/8",
      "8/9",
      "8/10",
      "8/11",
      "8/12",
      "8/13",
      "8/14",
      "8/15",
      "8/16",
      "8/17",
      "8/18",
      "8/19"
    ],
    "phase": "본격 성장"
  },
  "CONNECTED_FLOW_DATA": {
    "linen": {
      "name": "린넨 셋업 컬렉션 상세 (5개 연결)",
      "totalLoad": 96701,
      "lastPct": 22,
      "mainExit": "영상 #2 → #3 (-32%p)",
      "dailyLoad": [
        4427,
        4746,
        5012,
        5250,
        5080,
        5345,
        5481,
        5284,
        5080,
        5216,
        5386,
        5549,
        5637,
        5501,
        5284,
        5175,
        5080,
        4869,
        5005
      ],
      "videos": [
        {
          "id": "cv-linen-1",
          "name": "영상 #1",
          "loads": 19339,
          "position": "상단"
        },
        {
          "id": "cv-linen-2",
          "name": "영상 #2",
          "loads": 14311,
          "position": "중상단"
        },
        {
          "id": "cv-linen-3",
          "name": "영상 #3",
          "loads": 8123,
          "position": "중단"
        },
        {
          "id": "cv-linen-4",
          "name": "영상 #4",
          "loads": 5995,
          "position": "중하단"
        },
        {
          "id": "cv-linen-5",
          "name": "영상 #5",
          "loads": 4255,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "19,339",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 74,
          "label": "영상 #2",
          "count": "14,311",
          "loc": "중상단",
          "down": false
        },
        {
          "pct": 42,
          "label": "영상 #3",
          "count": "8,123",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 31,
          "label": "영상 #4",
          "count": "5,995",
          "loc": "중하단",
          "down": false
        },
        {
          "pct": 22,
          "label": "영상 #5",
          "count": "4,255",
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
          "count": "75,426",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 14,
          "count": "13,538",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 6,
          "count": "5,802",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 2,
          "count": "1,934",
          "external": true
        }
      ]
    },
    "shoes": {
      "name": "신상 슈즈 컬렉션 (4개 연결)",
      "totalLoad": 66939,
      "lastPct": 35,
      "mainExit": "영상 #1 → #2 (-28%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-shoes-1",
          "name": "영상 #1",
          "loads": 16735,
          "position": "상단"
        },
        {
          "id": "cv-shoes-2",
          "name": "영상 #2",
          "loads": 12049,
          "position": "중단"
        },
        {
          "id": "cv-shoes-3",
          "name": "영상 #3",
          "loads": 9037,
          "position": "중하단"
        },
        {
          "id": "cv-shoes-4",
          "name": "영상 #4",
          "loads": 5862,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "16,735",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 72,
          "label": "영상 #2",
          "count": "12,049",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 54,
          "label": "영상 #3",
          "count": "9,037",
          "loc": "중하단",
          "down": false
        },
        {
          "pct": 35,
          "label": "영상 #4",
          "count": "5,862",
          "loc": "하단",
          "down": false
        }
      ],
      "alert": "영상 #1 → #2 구간에서 이탈률 28%p 발생.",
      "domain": []
    },
    "denim": {
      "name": "데님 시리즈 (3개 연결)",
      "totalLoad": 49040,
      "lastPct": 48,
      "mainExit": "영상 #1 → #2 (-22%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-denim-1",
          "name": "영상 #1",
          "loads": 12260,
          "position": "상단"
        },
        {
          "id": "cv-denim-2",
          "name": "영상 #2",
          "loads": 9563,
          "position": "중단"
        },
        {
          "id": "cv-denim-3",
          "name": "영상 #3",
          "loads": 5887,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "12,260",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 78,
          "label": "영상 #2",
          "count": "9,563",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 48,
          "label": "영상 #3",
          "count": "5,887",
          "loc": "하단",
          "down": false
        }
      ],
      "alert": "마지막까지 시청률 48%로 양호.",
      "domain": []
    },
    "outer": {
      "name": "아우터 컬렉션 (3개 연결)",
      "totalLoad": 36857,
      "lastPct": 52,
      "mainExit": "영상 #1 → #2 (-18%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-outer-1",
          "name": "영상 #1",
          "loads": 9214,
          "position": "상단"
        },
        {
          "id": "cv-outer-2",
          "name": "영상 #2",
          "loads": 7555,
          "position": "중단"
        },
        {
          "id": "cv-outer-3",
          "name": "영상 #3",
          "loads": 4783,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "9,214",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 82,
          "label": "영상 #2",
          "count": "7,555",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 52,
          "label": "영상 #3",
          "count": "4,783",
          "loc": "하단",
          "down": false
        }
      ],
      "alert": "시청 유지율이 우수합니다.",
      "domain": []
    },
    "acc": {
      "name": "액세서리 시리즈 (4개 연결)",
      "totalLoad": 29161,
      "lastPct": 28,
      "mainExit": "영상 #2 → #3 (-30%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-acc-1",
          "name": "영상 #1",
          "loads": 7290,
          "position": "상단"
        },
        {
          "id": "cv-acc-2",
          "name": "영상 #2",
          "loads": 6124,
          "position": "중상단"
        },
        {
          "id": "cv-acc-3",
          "name": "영상 #3",
          "loads": 3937,
          "position": "중단"
        },
        {
          "id": "cv-acc-4",
          "name": "영상 #4",
          "loads": 2045,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "7,290",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 84,
          "label": "영상 #2",
          "count": "6,124",
          "loc": "중상단",
          "down": false
        },
        {
          "pct": 54,
          "label": "영상 #3",
          "count": "3,937",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 28,
          "label": "영상 #4",
          "count": "2,045",
          "loc": "하단",
          "down": false
        }
      ],
      "alert": "영상 #2 → #3 구간에서 30%p 급락.",
      "domain": []
    },
    "bigDeal": {
      "name": "여름 빅딜 페이지 (10개 연결)",
      "totalLoad": 128126,
      "lastPct": 18,
      "mainExit": "영상 #4 → #5 (-25%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-bigDeal-1",
          "name": "영상 #1",
          "loads": 25625,
          "position": "영상 #1"
        },
        {
          "id": "cv-bigDeal-2",
          "name": "영상 #2",
          "loads": 23060,
          "position": "영상 #2"
        },
        {
          "id": "cv-bigDeal-3",
          "name": "영상 #3",
          "loads": 19219,
          "position": "영상 #3"
        },
        {
          "id": "cv-bigDeal-4",
          "name": "영상 #4",
          "loads": 15380,
          "position": "영상 #4"
        },
        {
          "id": "cv-bigDeal-5",
          "name": "영상 #5",
          "loads": 8969,
          "position": "영상 #5"
        },
        {
          "id": "cv-bigDeal-6",
          "name": "영상 #6",
          "loads": 6406,
          "position": "영상 #6"
        },
        {
          "id": "cv-bigDeal-7",
          "name": "영상 #7",
          "loads": 4801,
          "position": "영상 #7"
        },
        {
          "id": "cv-bigDeal-8",
          "name": "영상 #8",
          "loads": 3841,
          "position": "영상 #8"
        },
        {
          "id": "cv-bigDeal-9",
          "name": "영상 #9",
          "loads": 3203,
          "position": "영상 #9"
        },
        {
          "id": "cv-bigDeal-10",
          "name": "영상 #10",
          "loads": 2664,
          "position": "영상 #10"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "25,625",
          "loc": "",
          "down": false
        },
        {
          "pct": 90,
          "label": "영상 #2",
          "count": "23,060",
          "loc": "",
          "down": false
        },
        {
          "pct": 75,
          "label": "영상 #3",
          "count": "19,219",
          "loc": "",
          "down": false
        },
        {
          "pct": 60,
          "label": "영상 #4",
          "count": "15,380",
          "loc": "",
          "down": false
        },
        {
          "pct": 35,
          "label": "영상 #5",
          "count": "8,969",
          "loc": "",
          "down": true
        },
        {
          "pct": 25,
          "label": "영상 #6",
          "count": "6,406",
          "loc": "",
          "down": false
        },
        {
          "pct": 19,
          "label": "영상 #7",
          "count": "4,801",
          "loc": "",
          "down": false
        },
        {
          "pct": 15,
          "label": "영상 #8",
          "count": "3,841",
          "loc": "",
          "down": false
        },
        {
          "pct": 12,
          "label": "영상 #9",
          "count": "3,203",
          "loc": "",
          "down": false
        },
        {
          "pct": 10,
          "label": "영상 #10",
          "count": "2,664",
          "loc": "",
          "down": false
        }
      ],
      "alert": "영상 #4 → #5 구간 이탈 25%p.",
      "domain": []
    },
    "megaBrand": {
      "name": "메가 브랜드 페이지 (20개 연결)",
      "totalLoad": 212758,
      "lastPct": 9,
      "mainExit": "영상 #6 → #7 (-22%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-megaBrand-1",
          "name": "영상 #1",
          "loads": 42552,
          "position": "영상 #1"
        },
        {
          "id": "cv-megaBrand-2",
          "name": "영상 #2",
          "loads": 37446,
          "position": "영상 #2"
        },
        {
          "id": "cv-megaBrand-3",
          "name": "영상 #3",
          "loads": 33198,
          "position": "영상 #3"
        },
        {
          "id": "cv-megaBrand-4",
          "name": "영상 #4",
          "loads": 29786,
          "position": "영상 #4"
        },
        {
          "id": "cv-megaBrand-5",
          "name": "영상 #5",
          "loads": 27658,
          "position": "영상 #5"
        },
        {
          "id": "cv-megaBrand-6",
          "name": "영상 #6",
          "loads": 25956,
          "position": "영상 #6"
        },
        {
          "id": "cv-megaBrand-7",
          "name": "영상 #7",
          "loads": 16595,
          "position": "영상 #7"
        },
        {
          "id": "cv-megaBrand-8",
          "name": "영상 #8",
          "loads": 14042,
          "position": "영상 #8"
        },
        {
          "id": "cv-megaBrand-9",
          "name": "영상 #9",
          "loads": 11914,
          "position": "영상 #9"
        },
        {
          "id": "cv-megaBrand-10",
          "name": "영상 #10",
          "loads": 10213,
          "position": "영상 #10"
        },
        {
          "id": "cv-megaBrand-11",
          "name": "영상 #11",
          "loads": 8937,
          "position": "영상 #11"
        },
        {
          "id": "cv-megaBrand-12",
          "name": "영상 #12",
          "loads": 7660,
          "position": "영상 #12"
        },
        {
          "id": "cv-megaBrand-13",
          "name": "영상 #13",
          "loads": 6808,
          "position": "영상 #13"
        },
        {
          "id": "cv-megaBrand-14",
          "name": "영상 #14",
          "loads": 5957,
          "position": "영상 #14"
        },
        {
          "id": "cv-megaBrand-15",
          "name": "영상 #15",
          "loads": 5532,
          "position": "영상 #15"
        },
        {
          "id": "cv-megaBrand-16",
          "name": "영상 #16",
          "loads": 5106,
          "position": "영상 #16"
        },
        {
          "id": "cv-megaBrand-17",
          "name": "영상 #17",
          "loads": 4680,
          "position": "영상 #17"
        },
        {
          "id": "cv-megaBrand-18",
          "name": "영상 #18",
          "loads": 4255,
          "position": "영상 #18"
        },
        {
          "id": "cv-megaBrand-19",
          "name": "영상 #19",
          "loads": 4043,
          "position": "영상 #19"
        },
        {
          "id": "cv-megaBrand-20",
          "name": "영상 #20",
          "loads": 3830,
          "position": "영상 #20"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "42,552",
          "loc": "",
          "down": false
        },
        {
          "pct": 88,
          "label": "영상 #2",
          "count": "37,446",
          "loc": "",
          "down": false
        },
        {
          "pct": 78,
          "label": "영상 #3",
          "count": "33,198",
          "loc": "",
          "down": false
        },
        {
          "pct": 70,
          "label": "영상 #4",
          "count": "29,786",
          "loc": "",
          "down": false
        },
        {
          "pct": 65,
          "label": "영상 #5",
          "count": "27,658",
          "loc": "",
          "down": false
        },
        {
          "pct": 61,
          "label": "영상 #6",
          "count": "25,956",
          "loc": "",
          "down": false
        },
        {
          "pct": 39,
          "label": "영상 #7",
          "count": "16,595",
          "loc": "",
          "down": true
        },
        {
          "pct": 33,
          "label": "영상 #8",
          "count": "14,042",
          "loc": "",
          "down": false
        },
        {
          "pct": 28,
          "label": "영상 #9",
          "count": "11,914",
          "loc": "",
          "down": false
        },
        {
          "pct": 24,
          "label": "영상 #10",
          "count": "10,213",
          "loc": "",
          "down": false
        },
        {
          "pct": 21,
          "label": "영상 #11",
          "count": "8,937",
          "loc": "",
          "down": false
        },
        {
          "pct": 18,
          "label": "영상 #12",
          "count": "7,660",
          "loc": "",
          "down": false
        },
        {
          "pct": 16,
          "label": "영상 #13",
          "count": "6,808",
          "loc": "",
          "down": false
        },
        {
          "pct": 14,
          "label": "영상 #14",
          "count": "5,957",
          "loc": "",
          "down": false
        },
        {
          "pct": 13,
          "label": "영상 #15",
          "count": "5,532",
          "loc": "",
          "down": false
        },
        {
          "pct": 12,
          "label": "영상 #16",
          "count": "5,106",
          "loc": "",
          "down": false
        },
        {
          "pct": 11,
          "label": "영상 #17",
          "count": "4,680",
          "loc": "",
          "down": false
        },
        {
          "pct": 10,
          "label": "영상 #18",
          "count": "4,255",
          "loc": "",
          "down": false
        },
        {
          "pct": 9.5,
          "label": "영상 #19",
          "count": "4,043",
          "loc": "",
          "down": false
        },
        {
          "pct": 9,
          "label": "영상 #20",
          "count": "3,830",
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
      "load": "27,121",
      "play": "22,239 (82%)",
      "avg": "16.8초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 84,
          "count": "22,782",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 10,
          "count": "2,712",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 6,
          "count": "1,627",
          "external": true
        }
      ]
    },
    "v2": {
      "name": "신상 가방 클로즈업",
      "load": "18,433",
      "play": "13,825 (75%)",
      "avg": "13.2초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 92,
          "count": "16,959",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 5,
          "count": "921",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 3,
          "count": "554",
          "external": true
        }
      ]
    },
    "v3": {
      "name": "스니커즈 풋샷",
      "load": "15,783",
      "play": "11,048 (70%)",
      "avg": "11.8초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 79,
          "count": "12,468",
          "external": false
        },
        {
          "name": "brand.musinsa.com",
          "label": "외부",
          "pct": 14,
          "count": "2,209",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 7,
          "count": "1,105",
          "external": true
        }
      ]
    },
    "v4": {
      "name": "여름 메인 비주얼",
      "load": "12,541",
      "play": "9,782 (78%)",
      "avg": "15.4초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 88,
          "count": "11,036",
          "external": false
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 12,
          "count": "1,505",
          "external": true
        }
      ]
    },
    "v5": {
      "name": "크롭 셔츠 디테일",
      "load": "11,405",
      "play": "7,413 (65%)",
      "avg": "10.2초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 81,
          "count": "9,238",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 11,
          "count": "1,255",
          "external": true
        },
        {
          "name": "brand.musinsa.com",
          "label": "외부",
          "pct": 8,
          "count": "913",
          "external": true
        }
      ]
    }
  },
  "FLOATING_DATA": {
    "floating-home": {
      "name": "홈 메인 플로팅",
      "load": "42,432",
      "clicks": "2,296",
      "ctr": "5.41%",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 88,
          "count": "37,340",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 8,
          "count": "3,395",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 4,
          "count": "1,697",
          "external": true
        }
      ],
      "banners": [
        {
          "name": "린넨 반팔 셋업 (베이지)",
          "clicks": 2296,
          "ctr": 5.41
        }
      ]
    },
    "floating-category": {
      "name": "카테고리 플로팅 (상의)",
      "load": "35,238",
      "clicks": "1,308",
      "ctr": "3.71%",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 94,
          "count": "33,123",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 6,
          "count": "2,114",
          "external": true
        }
      ],
      "banners": [
        {
          "name": "셔츠 컬렉션 시리즈",
          "clicks": 1308,
          "ctr": 3.71
        }
      ]
    },
    "floating-event": {
      "name": "이벤트 페이지 플로팅",
      "load": "23,395",
      "clicks": "612",
      "ctr": "2.62%",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 71,
          "count": "16,610",
          "external": false
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 22,
          "count": "5,147",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 7,
          "count": "1,637",
          "external": true
        }
      ],
      "banners": [
        {
          "name": "여름 시즌오프 ~50%",
          "clicks": 612,
          "ctr": 2.62
        }
      ]
    }
  },
  "SLIDE_VIDEO_DATA": {
    "sv1": {
      "name": "린넨 반팔 셋업 쇼츠",
      "clicks": 1256,
      "ctr": 8.42,
      "banners": [
        {
          "name": "린넨 반팔 셋업 (베이지)",
          "clicks": 749,
          "ctr": 5.02
        },
        {
          "name": "린넨 반팔 셋업 (네이비)",
          "clicks": 507,
          "ctr": 3.4
        }
      ],
      "domain": []
    },
    "sv2": {
      "name": "와이드 슬랙스 쇼츠",
      "clicks": 981,
      "ctr": 7.18,
      "banners": [
        {
          "name": "와이드 슬랙스 (블랙)",
          "clicks": 981,
          "ctr": 7.18
        }
      ],
      "domain": []
    },
    "sv3": {
      "name": "크롭 셔츠 쇼츠",
      "clicks": 753,
      "ctr": 5.74,
      "banners": [
        {
          "name": "크롭 셔츠 (화이트)",
          "clicks": 753,
          "ctr": 5.74
        }
      ],
      "domain": []
    },
    "sv4": {
      "name": "밀짚 모자 쇼츠",
      "clicks": 477,
      "ctr": 3.81,
      "banners": [
        {
          "name": "밀짚 모자 (내추럴)",
          "clicks": 477,
          "ctr": 3.81
        }
      ],
      "domain": []
    },
    "s2v1": {
      "name": "린넨 자켓 룩북",
      "clicks": 953,
      "ctr": 6.62,
      "banners": [],
      "domain": []
    },
    "s2v2": {
      "name": "린넨 셔츠 디테일",
      "clicks": 677,
      "ctr": 5.91,
      "banners": [],
      "domain": []
    },
    "s2v3": {
      "name": "린넨 팬츠 핏감",
      "clicks": 447,
      "ctr": 5.42,
      "banners": [],
      "domain": []
    },
    "s3v1": {
      "name": "룩북 #1 모델 워킹",
      "clicks": 543,
      "ctr": 5.74,
      "banners": [],
      "domain": []
    },
    "s3v2": {
      "name": "룩북 #2 클로즈업",
      "clicks": 437,
      "ctr": 5.18,
      "banners": [],
      "domain": []
    },
    "s3v3": {
      "name": "룩북 #3 디테일",
      "clicks": 307,
      "ctr": 4.04,
      "banners": [],
      "domain": []
    },
    "s4v1": {
      "name": "베스트 #1",
      "clicks": 253,
      "ctr": 4.12,
      "banners": [],
      "domain": []
    },
    "s4v2": {
      "name": "베스트 #2",
      "clicks": 207,
      "ctr": 3.74,
      "banners": [],
      "domain": []
    }
  },
  "MULTI_VIDEO_DATA": {
    "mv1": {
      "name": "비치웨어 모델 컷 A",
      "clicks": 695,
      "ctr": 4.62,
      "banners": [
        {
          "name": "비치 원피스 (화이트)",
          "clicks": 416,
          "ctr": 2.77
        },
        {
          "name": "비치 모자",
          "clicks": 279,
          "ctr": 1.85
        }
      ],
      "domain": []
    },
    "mv2": {
      "name": "선글라스 클로즈업",
      "clicks": 296,
      "ctr": 3.18,
      "banners": [
        {
          "name": "오버사이즈 선글라스",
          "clicks": 296,
          "ctr": 3.18
        }
      ],
      "domain": []
    },
    "mv3": {
      "name": "샌들 360°",
      "clicks": 150,
      "ctr": 2.41,
      "banners": [
        {
          "name": "플랫 샌들 (탠)",
          "clicks": 150,
          "ctr": 2.41
        }
      ],
      "domain": []
    },
    "mv4": {
      "name": "비치백 디테일",
      "clicks": 41,
      "ctr": 1.18,
      "banners": [
        {
          "name": "비치백 (스트로)",
          "clicks": 41,
          "ctr": 1.18
        }
      ],
      "domain": []
    },
    "m2v1": {
      "name": "시즌 룩 1",
      "clicks": 222,
      "ctr": 3.1,
      "banners": [],
      "domain": []
    },
    "m2v2": {
      "name": "시즌 룩 2",
      "clicks": 156,
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
      "load": 27121,
      "play": 22239,
      "playRate": 82,
      "avgTime": 16.8,
      "parentPage": "displayer",
      "dailyLoad": [
        1238,
        1326,
        1414,
        1503,
        1421,
        1523,
        1462,
        1421,
        1482,
        1571,
        1510,
        1618,
        1659,
        1625,
        1550,
        1571,
        1530,
        1442,
        1482
      ],
      "dailyPlay": [
        1015,
        1087,
        1160,
        1232,
        1166,
        1249,
        1199,
        1166,
        1216,
        1288,
        1238,
        1327,
        1361,
        1333,
        1272,
        1288,
        1255,
        1182,
        1216
      ],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 84,
          "count": "22,782",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 10,
          "count": "2,712",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 6,
          "count": "1,627",
          "external": true
        }
      ]
    },
    "v2": {
      "name": "신상 가방 클로즈업",
      "type": "단일 영상",
      "placement": "상세페이지",
      "load": 18433,
      "play": 13825,
      "playRate": 75,
      "avgTime": 13.2,
      "parentPage": "displayer",
      "dailyLoad": [
        843,
        898,
        959,
        938,
        986,
        1013,
        1034,
        1006,
        959,
        932,
        979,
        1020,
        1040,
        1013,
        959,
        925,
        898,
        870,
        898
      ],
      "dailyPlay": [
        632,
        673,
        719,
        704,
        740,
        760,
        775,
        755,
        719,
        699,
        734,
        765,
        781,
        760,
        719,
        694,
        673,
        653,
        673
      ],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 92,
          "count": "16,959",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 5,
          "count": "921",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 3,
          "count": "554",
          "external": true
        }
      ]
    },
    "v3": {
      "name": "스니커즈 풋샷",
      "type": "단일 영상",
      "placement": "상세페이지",
      "load": 15783,
      "play": 11048,
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
          "count": "12,468",
          "external": false
        },
        {
          "name": "brand.musinsa.com",
          "label": "외부",
          "pct": 14,
          "count": "2,209",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 7,
          "count": "1,105",
          "external": true
        }
      ]
    },
    "v4": {
      "name": "여름 메인 비주얼",
      "type": "단일 영상",
      "placement": "메인 배너",
      "load": 12541,
      "play": 9782,
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
          "count": "11,036",
          "external": false
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 12,
          "count": "1,505",
          "external": true
        }
      ]
    },
    "v5": {
      "name": "크롭 셔츠 디테일",
      "type": "단일 영상",
      "placement": "상세페이지",
      "load": 11405,
      "play": 7413,
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
          "count": "9,238",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 11,
          "count": "1,255",
          "external": true
        },
        {
          "name": "brand.musinsa.com",
          "label": "외부",
          "pct": 8,
          "count": "913",
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
      "load": 42432,
      "clicks": 2296,
      "ctr": 5.41,
      "dailyLoad": [
        1918,
        2047,
        2162,
        2258,
        2183,
        2298,
        2360,
        2271,
        2183,
        2237,
        2319,
        2394,
        2434,
        2373,
        2271,
        2224,
        2183,
        2094,
        2149
      ],
      "dailyClicks": [
        103,
        111,
        117,
        122,
        118,
        124,
        128,
        123,
        118,
        121,
        125,
        129,
        132,
        129,
        123,
        120,
        118,
        114,
        116
      ],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 88,
          "count": "37,340",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 8,
          "count": "3,395",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 4,
          "count": "1,697",
          "external": true
        }
      ],
      "engagement": {
        "likes": 1378,
        "shares": 574,
        "saves": 230
      },
      "videos": [
        {
          "id": "floating-home-v1",
          "name": "홈 메인 플로팅 영상",
          "dailyClicks": [
            103,
            111,
            117,
            122,
            118,
            124,
            128,
            123,
            118,
            121,
            125,
            129,
            132,
            129,
            123,
            120,
            118,
            114,
            116
          ],
          "totalClicks": 2296,
          "ctr": 5.41,
          "banners": [
            {
              "name": "린넨 반팔 셋업 (베이지)",
              "clicks": 2296,
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
      "load": 35238,
      "clicks": 1308,
      "ctr": 3.71,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 94,
          "count": "33,123",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 6,
          "count": "2,114",
          "external": true
        }
      ],
      "engagement": {
        "likes": 785,
        "shares": 327,
        "saves": 131
      },
      "videos": [
        {
          "id": "floating-category-v1",
          "name": "카테고리 플로팅 (상의) 영상",
          "dailyClicks": [],
          "totalClicks": 1308,
          "ctr": 3.71,
          "banners": [
            {
              "name": "셔츠 컬렉션 시리즈",
              "clicks": 1308,
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
      "load": 23395,
      "clicks": 612,
      "ctr": 2.62,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 71,
          "count": "16,610",
          "external": false
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 22,
          "count": "5,147",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 7,
          "count": "1,637",
          "external": true
        }
      ],
      "engagement": {
        "likes": 367,
        "shares": 153,
        "saves": 61
      },
      "videos": [
        {
          "id": "floating-event-v1",
          "name": "이벤트 페이지 플로팅 영상",
          "dailyClicks": [],
          "totalClicks": 612,
          "ctr": 2.62,
          "banners": [
            {
              "name": "여름 시즌오프 ~50%",
              "clicks": 612,
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
      "load": 46377,
      "clicks": 3456,
      "ctr": 7.45,
      "dailyLoad": [
        2094,
        2244,
        2373,
        2475,
        2394,
        2516,
        2584,
        2489,
        2394,
        2455,
        2543,
        2625,
        2666,
        2598,
        2489,
        2434,
        2394,
        2292,
        2353
      ],
      "dailyClicks": [
        156,
        167,
        177,
        185,
        179,
        188,
        192,
        186,
        179,
        184,
        190,
        196,
        199,
        194,
        186,
        182,
        179,
        171,
        175
      ],
      "domain": [],
      "engagement": {
        "likes": 2073,
        "shares": 726,
        "saves": 415
      },
      "videos": [
        {
          "id": "sv1",
          "name": "린넨 반팔 셋업 쇼츠",
          "dailyClicks": [
            56,
            61,
            64,
            67,
            65,
            68,
            70,
            67,
            65,
            67,
            69,
            71,
            72,
            70,
            67,
            66,
            65,
            62,
            63
          ],
          "totalClicks": 1256,
          "ctr": 8.42,
          "banners": [
            {
              "name": "린넨 반팔 셋업 (베이지)",
              "clicks": 749,
              "ctr": 5.02
            },
            {
              "name": "린넨 반팔 셋업 (네이비)",
              "clicks": 507,
              "ctr": 3.4
            }
          ]
        },
        {
          "id": "sv2",
          "name": "와이드 슬랙스 쇼츠",
          "dailyClicks": [],
          "totalClicks": 981,
          "ctr": 7.18,
          "banners": [
            {
              "name": "와이드 슬랙스 (블랙)",
              "clicks": 981,
              "ctr": 7.18
            }
          ]
        },
        {
          "id": "sv3",
          "name": "크롭 셔츠 쇼츠",
          "dailyClicks": [],
          "totalClicks": 753,
          "ctr": 5.74,
          "banners": [
            {
              "name": "크롭 셔츠 (화이트)",
              "clicks": 753,
              "ctr": 5.74
            }
          ]
        },
        {
          "id": "sv4",
          "name": "밀짚 모자 쇼츠",
          "dailyClicks": [],
          "totalClicks": 477,
          "ctr": 3.81,
          "banners": [
            {
              "name": "밀짚 모자 (내추럴)",
              "clicks": 477,
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
      "load": 35961,
      "clicks": 2190,
      "ctr": 6.09,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [],
      "engagement": {
        "likes": 1314,
        "shares": 460,
        "saves": 263
      },
      "videos": [
        {
          "id": "s2v1",
          "name": "린넨 자켓 룩북",
          "dailyClicks": [],
          "totalClicks": 953,
          "ctr": 6.62,
          "banners": []
        },
        {
          "id": "s2v2",
          "name": "린넨 셔츠 디테일",
          "dailyClicks": [],
          "totalClicks": 677,
          "ctr": 5.91,
          "banners": []
        },
        {
          "id": "s2v3",
          "name": "린넨 팬츠 핏감",
          "dailyClicks": [],
          "totalClicks": 447,
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
      "load": 25297,
      "clicks": 1287,
      "ctr": 5.09,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [],
      "engagement": {
        "likes": 772,
        "shares": 270,
        "saves": 154
      },
      "videos": [
        {
          "id": "s3v1",
          "name": "룩북 #1 모델 워킹",
          "dailyClicks": [],
          "totalClicks": 543,
          "ctr": 5.74,
          "banners": []
        },
        {
          "id": "s3v2",
          "name": "룩북 #2 클로즈업",
          "dailyClicks": [],
          "totalClicks": 437,
          "ctr": 5.18,
          "banners": []
        },
        {
          "id": "s3v3",
          "name": "룩북 #3 디테일",
          "dailyClicks": [],
          "totalClicks": 307,
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
      "load": 17770,
      "clicks": 648,
      "ctr": 3.65,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [],
      "engagement": {
        "likes": 389,
        "shares": 136,
        "saves": 78
      },
      "videos": [
        {
          "id": "s4v1",
          "name": "베스트 #1",
          "dailyClicks": [],
          "totalClicks": 253,
          "ctr": 4.12,
          "banners": []
        },
        {
          "id": "s4v2",
          "name": "베스트 #2",
          "dailyClicks": [],
          "totalClicks": 207,
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
      "load": 32720,
      "clicks": 1145,
      "ctr": 3.5,
      "dailyLoad": [],
      "dailyClicks": [
        52,
        55,
        58,
        61,
        59,
        62,
        64,
        61,
        59,
        61,
        63,
        65,
        66,
        64,
        61,
        60,
        59,
        56,
        58
      ],
      "domain": [],
      "engagement": {
        "likes": 630,
        "shares": 229,
        "saves": 103
      },
      "videos": [
        {
          "id": "mv1",
          "name": "비치웨어 모델 컷 A",
          "dailyClicks": [],
          "totalClicks": 695,
          "ctr": 4.62,
          "banners": [
            {
              "name": "비치 원피스 (화이트)",
              "clicks": 416,
              "ctr": 2.77
            },
            {
              "name": "비치 모자",
              "clicks": 279,
              "ctr": 1.85
            }
          ]
        },
        {
          "id": "mv2",
          "name": "선글라스 클로즈업",
          "dailyClicks": [],
          "totalClicks": 296,
          "ctr": 3.18,
          "banners": [
            {
              "name": "오버사이즈 선글라스",
              "clicks": 296,
              "ctr": 3.18
            }
          ]
        },
        {
          "id": "mv3",
          "name": "샌들 360°",
          "dailyClicks": [],
          "totalClicks": 150,
          "ctr": 2.41,
          "banners": [
            {
              "name": "플랫 샌들 (탠)",
              "clicks": 150,
              "ctr": 2.41
            }
          ]
        },
        {
          "id": "mv4",
          "name": "비치백 디테일",
          "dailyClicks": [],
          "totalClicks": 41,
          "ctr": 1.18,
          "banners": [
            {
              "name": "비치백 (스트로)",
              "clicks": 41,
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
      "load": 21027,
      "clicks": 509,
      "ctr": 2.42,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [],
      "engagement": {
        "likes": 279,
        "shares": 102,
        "saves": 46
      },
      "videos": [
        {
          "id": "m2v1",
          "name": "시즌 룩 1",
          "dailyClicks": [],
          "totalClicks": 222,
          "ctr": 3.1,
          "banners": []
        },
        {
          "id": "m2v2",
          "name": "시즌 룩 2",
          "dailyClicks": [],
          "totalClicks": 156,
          "ctr": 2.62,
          "banners": []
        }
      ]
    }
  },
  "REVENUE": {
    "total": 304000000,
    "totalDelta": 39.4,
    "widgetContribution": 63840000,
    "widgetContributionPct": 21,
    "dailyRevenue": [
      16000000,
      17976911,
      18287969,
      17129158,
      15964684,
      15491708,
      15093456,
      14358759,
      14152197,
      -3807586,
      17584103,
      21453392,
      20382122,
      18283967,
      17056626,
      16992445,
      17058288,
      16939205,
      17602596
    ],
    "byChannel": [
      {
        "channel": "자사몰",
        "revenue": 188480000,
        "pct": 62.0
      },
      {
        "channel": "네이버 스마트스토어",
        "revenue": 54720000,
        "pct": 18.0
      },
      {
        "channel": "카카오 쇼핑하기",
        "revenue": 30400000,
        "pct": 10.0
      },
      {
        "channel": "무신사 브랜드관",
        "revenue": 21280000,
        "pct": 7.0
      },
      {
        "channel": "인스타그램 쇼핑",
        "revenue": 9120000,
        "pct": 3.0
      }
    ],
    "byWidget": [
      {
        "widgetId": "slide-s1",
        "name": "2026 여름 신상 쇼츠 컬렉션",
        "revenue": 33440000,
        "orders": 880
      },
      {
        "widgetId": "slide-s2",
        "name": "린넨 셋업 시리즈 슬라이드",
        "revenue": 24320000,
        "orders": 593
      },
      {
        "widgetId": "floating-home",
        "name": "홈 메인 플로팅",
        "revenue": 18240000,
        "orders": 434
      },
      {
        "widgetId": "multi-m1",
        "name": "홈 비치웨어 멀티 위젯",
        "revenue": 12160000,
        "orders": 270
      },
      {
        "widgetId": "slide-s3",
        "name": "신상 룩북 슬라이드",
        "revenue": 9120000,
        "orders": 228
      }
    ],
    "topProducts": [
      {
        "rank": 1,
        "name": "린넨 반팔 셋업 (베이지)",
        "revenue": 24928000,
        "units": 280
      },
      {
        "rank": 2,
        "name": "와이드 슬랙스 (블랙)",
        "revenue": 19456000,
        "units": 256
      },
      {
        "rank": 3,
        "name": "크롭 셔츠 (화이트)",
        "revenue": 15504000,
        "units": 267
      },
      {
        "rank": 4,
        "name": "비치 원피스 (화이트)",
        "revenue": 12768000,
        "units": 103
      },
      {
        "rank": 5,
        "name": "오버사이즈 선글라스",
        "revenue": 10640000,
        "units": 112
      }
    ]
  },
  "AD_OPERATION": {
    "totalSpend": 68000000,
    "totalSpendDelta": 18.4,
    "roas": 4.5,
    "cpc": 1583,
    "cpa": 41667,
    "dailySpend": [
      3578947,
      3947450,
      4005433,
      3789426,
      3572364,
      3484200,
      3409964,
      3273014,
      3234510,
      3430891,
      3874230,
      4073872,
      3900230,
      3560140,
      3361200,
      3350797,
      3361469,
      3342167,
      3449696
    ],
    "dailyRoas": [
      4.2,
      4.35,
      4.5,
      4.65,
      4.8,
      4.2,
      4.35,
      4.5,
      4.65,
      4.8,
      4.2,
      4.35,
      4.5,
      4.65,
      4.8,
      4.2,
      4.35,
      4.5,
      4.65
    ],
    "byChannel": [
      {
        "channel": "네이버 검색",
        "spend": 21760000,
        "impressions": 536842,
        "clicks": 14602,
        "cpc": 420,
        "conversions": 620,
        "cpa": 18400,
        "revenue": 60800000,
        "roas": 4.8
      },
      {
        "channel": "구글 검색",
        "spend": 14960000,
        "impressions": 322105,
        "clicks": 9019,
        "cpc": 510,
        "conversions": 359,
        "cpa": 19800,
        "revenue": 39520000,
        "roas": 4.6
      },
      {
        "channel": "메타 (페이스북/인스타)",
        "spend": 16320000,
        "impressions": 572632,
        "clicks": 9448,
        "cpc": 380,
        "conversions": 294,
        "cpa": 21600,
        "revenue": 30400000,
        "roas": 4.2
      },
      {
        "channel": "카카오",
        "spend": 9520000,
        "impressions": 250526,
        "clicks": 6872,
        "cpc": 340,
        "conversions": 261,
        "cpa": 15200,
        "revenue": 21280000,
        "roas": 5.2
      },
      {
        "channel": "유튜브",
        "spend": 5440000,
        "impressions": 107368,
        "clicks": 3006,
        "cpc": 450,
        "conversions": 98,
        "cpa": 22800,
        "revenue": 9120000,
        "roas": 3.6
      }
    ],
    "campaigns": [
      {
        "id": "c1",
        "name": "여름 신상 시즌 캠페인",
        "channel": "네이버 검색",
        "spend": 12240000,
        "impressions": 286316,
        "clicks": 8589,
        "conversions": 359,
        "roas": 5.2
      },
      {
        "id": "c2",
        "name": "브랜드 인지도 확보",
        "channel": "메타",
        "spend": 9520000,
        "impressions": 393684,
        "clicks": 6013,
        "conversions": 163,
        "roas": 3.8
      },
      {
        "id": "c3",
        "name": "재방문 리타게팅",
        "channel": "구글 GDN",
        "spend": 8160000,
        "impressions": 178947,
        "clicks": 5583,
        "conversions": 294,
        "roas": 6.1
      },
      {
        "id": "c4",
        "name": "신규 회원 가입 유도",
        "channel": "카카오",
        "spend": 6800000,
        "impressions": 178947,
        "clicks": 5154,
        "conversions": 228,
        "roas": 4.9
      }
    ],
    "funnel": {
      "impression": 1789474,
      "click": 42947,
      "widgetView": 26627,
      "bannerClick": 4793,
      "purchase": 1632
    }
  },
  "MEMBERSHIP": {
    "totalActive": 18904,
    "activeDelta": 12.4,
    "newSignups": 2780,
    "paidConversion": 172,
    "paidConversionRate": 6.2,
    "funnel": {
      "visit": 77840,
      "signup": 2780,
      "firstPurchase": 172,
      "repurchase": 55
    },
    "dailySignups": [
      146,
      169,
      172,
      159,
      146,
      141,
      136,
      128,
      125,
      138,
      164,
      177,
      166,
      145,
      133,
      132,
      133,
      132,
      138
    ],
    "cohort": [
      {
        "cohort": "8월",
        "m0": 100,
        "m1": 78,
        "m2": 65,
        "m3": 54
      },
      {
        "cohort": "8월 중",
        "m0": 100,
        "m1": 82,
        "m2": 68,
        "m3": null
      },
      {
        "cohort": "8월 말",
        "m0": 100,
        "m1": 80,
        "m2": null,
        "m3": null
      }
    ]
  },
  "CHURN": {
    "dormantCount": 1853,
    "dormantRate": 9.8,
    "churnCount": 397,
    "churnRate": 2.1,
    "churnRateDelta": -0.4,
    "dailyChurn": [
      21,
      25,
      25,
      23,
      21,
      20,
      19,
      18,
      17,
      19,
      24,
      26,
      24,
      21,
      19,
      18,
      19,
      18,
      20
    ],
    "reasons": [
      {
        "reason": "가격 부담",
        "count": 127,
        "pct": 32.0
      },
      {
        "reason": "필요 없어짐",
        "count": 95,
        "pct": 24.0
      },
      {
        "reason": "서비스 불만",
        "count": 71,
        "pct": 18.0
      },
      {
        "reason": "다른 서비스로 이동",
        "count": 56,
        "pct": 14.0
      },
      {
        "reason": "기타",
        "count": 48,
        "pct": 12.0
      }
    ]
  },
  "KEY_METRICS": {
    "cac": 395349,
    "ltv": 51460,
    "ltvCacRatio": 0.13,
    "mrr": 101333333,
    "mrrDelta": 8.4,
    "arpu": 16081
  }
};
