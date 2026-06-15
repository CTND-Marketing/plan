// ============================================================
// 2026년 1분기 데이터
// ============================================================
// 기간: 2026.01.01 - 2026.03.31
// 단계: 안정기
// ============================================================

window.PERIOD_2026_Q1 = {
  "meta": {
    "id": "2026-q1",
    "label": "2026년 1분기",
    "range": "2026.01.01 - 2026.03.31",
    "sampleStart": "2026.02.01",
    "sampleEnd": "2026.02.19",
    "dayLabels": [
      "2/1",
      "2/2",
      "2/3",
      "2/4",
      "2/5",
      "2/6",
      "2/7",
      "2/8",
      "2/9",
      "2/10",
      "2/11",
      "2/12",
      "2/13",
      "2/14",
      "2/15",
      "2/16",
      "2/17",
      "2/18",
      "2/19"
    ],
    "phase": "안정기"
  },
  "CONNECTED_FLOW_DATA": {
    "linen": {
      "name": "린넨 셋업 컬렉션 상세 (5개 연결)",
      "totalLoad": 116611,
      "lastPct": 22,
      "mainExit": "영상 #2 → #3 (-32%p)",
      "dailyLoad": [
        5338,
        5724,
        6043,
        6330,
        6125,
        6445,
        6609,
        6371,
        6125,
        6289,
        6494,
        6691,
        6798,
        6634,
        6371,
        6240,
        6125,
        5871,
        6035
      ],
      "videos": [
        {
          "id": "cv-linen-1",
          "name": "영상 #1",
          "loads": 23321,
          "position": "상단"
        },
        {
          "id": "cv-linen-2",
          "name": "영상 #2",
          "loads": 17258,
          "position": "중상단"
        },
        {
          "id": "cv-linen-3",
          "name": "영상 #3",
          "loads": 9795,
          "position": "중단"
        },
        {
          "id": "cv-linen-4",
          "name": "영상 #4",
          "loads": 7229,
          "position": "중하단"
        },
        {
          "id": "cv-linen-5",
          "name": "영상 #5",
          "loads": 5131,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "23,321",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 74,
          "label": "영상 #2",
          "count": "17,258",
          "loc": "중상단",
          "down": false
        },
        {
          "pct": 42,
          "label": "영상 #3",
          "count": "9,795",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 31,
          "label": "영상 #4",
          "count": "7,229",
          "loc": "중하단",
          "down": false
        },
        {
          "pct": 22,
          "label": "영상 #5",
          "count": "5,131",
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
          "count": "90,954",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 14,
          "count": "16,325",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 6,
          "count": "6,996",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 2,
          "count": "2,332",
          "external": true
        }
      ]
    },
    "shoes": {
      "name": "신상 슈즈 컬렉션 (4개 연결)",
      "totalLoad": 80721,
      "lastPct": 35,
      "mainExit": "영상 #1 → #2 (-28%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-shoes-1",
          "name": "영상 #1",
          "loads": 20180,
          "position": "상단"
        },
        {
          "id": "cv-shoes-2",
          "name": "영상 #2",
          "loads": 14530,
          "position": "중단"
        },
        {
          "id": "cv-shoes-3",
          "name": "영상 #3",
          "loads": 10898,
          "position": "중하단"
        },
        {
          "id": "cv-shoes-4",
          "name": "영상 #4",
          "loads": 7069,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "20,180",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 72,
          "label": "영상 #2",
          "count": "14,530",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 54,
          "label": "영상 #3",
          "count": "10,898",
          "loc": "중하단",
          "down": false
        },
        {
          "pct": 35,
          "label": "영상 #4",
          "count": "7,069",
          "loc": "하단",
          "down": false
        }
      ],
      "alert": "영상 #1 → #2 구간에서 이탈률 28%p 발생.",
      "domain": []
    },
    "denim": {
      "name": "데님 시리즈 (3개 연결)",
      "totalLoad": 59137,
      "lastPct": 48,
      "mainExit": "영상 #1 → #2 (-22%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-denim-1",
          "name": "영상 #1",
          "loads": 14785,
          "position": "상단"
        },
        {
          "id": "cv-denim-2",
          "name": "영상 #2",
          "loads": 11532,
          "position": "중단"
        },
        {
          "id": "cv-denim-3",
          "name": "영상 #3",
          "loads": 7099,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "14,785",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 78,
          "label": "영상 #2",
          "count": "11,532",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 48,
          "label": "영상 #3",
          "count": "7,099",
          "loc": "하단",
          "down": false
        }
      ],
      "alert": "마지막까지 시청률 48%로 양호.",
      "domain": []
    },
    "outer": {
      "name": "아우터 컬렉션 (3개 연결)",
      "totalLoad": 44445,
      "lastPct": 52,
      "mainExit": "영상 #1 → #2 (-18%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-outer-1",
          "name": "영상 #1",
          "loads": 11111,
          "position": "상단"
        },
        {
          "id": "cv-outer-2",
          "name": "영상 #2",
          "loads": 9111,
          "position": "중단"
        },
        {
          "id": "cv-outer-3",
          "name": "영상 #3",
          "loads": 5768,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "11,111",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 82,
          "label": "영상 #2",
          "count": "9,111",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 52,
          "label": "영상 #3",
          "count": "5,768",
          "loc": "하단",
          "down": false
        }
      ],
      "alert": "시청 유지율이 우수합니다.",
      "domain": []
    },
    "acc": {
      "name": "액세서리 시리즈 (4개 연결)",
      "totalLoad": 35165,
      "lastPct": 28,
      "mainExit": "영상 #2 → #3 (-30%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-acc-1",
          "name": "영상 #1",
          "loads": 8791,
          "position": "상단"
        },
        {
          "id": "cv-acc-2",
          "name": "영상 #2",
          "loads": 7385,
          "position": "중상단"
        },
        {
          "id": "cv-acc-3",
          "name": "영상 #3",
          "loads": 4747,
          "position": "중단"
        },
        {
          "id": "cv-acc-4",
          "name": "영상 #4",
          "loads": 2467,
          "position": "하단"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "8,791",
          "loc": "상단",
          "down": false
        },
        {
          "pct": 84,
          "label": "영상 #2",
          "count": "7,385",
          "loc": "중상단",
          "down": false
        },
        {
          "pct": 54,
          "label": "영상 #3",
          "count": "4,747",
          "loc": "중단",
          "down": true
        },
        {
          "pct": 28,
          "label": "영상 #4",
          "count": "2,467",
          "loc": "하단",
          "down": false
        }
      ],
      "alert": "영상 #2 → #3 구간에서 30%p 급락.",
      "domain": []
    },
    "bigDeal": {
      "name": "여름 빅딜 페이지 (10개 연결)",
      "totalLoad": 154504,
      "lastPct": 18,
      "mainExit": "영상 #4 → #5 (-25%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-bigDeal-1",
          "name": "영상 #1",
          "loads": 30901,
          "position": "영상 #1"
        },
        {
          "id": "cv-bigDeal-2",
          "name": "영상 #2",
          "loads": 27808,
          "position": "영상 #2"
        },
        {
          "id": "cv-bigDeal-3",
          "name": "영상 #3",
          "loads": 23176,
          "position": "영상 #3"
        },
        {
          "id": "cv-bigDeal-4",
          "name": "영상 #4",
          "loads": 18546,
          "position": "영상 #4"
        },
        {
          "id": "cv-bigDeal-5",
          "name": "영상 #5",
          "loads": 10815,
          "position": "영상 #5"
        },
        {
          "id": "cv-bigDeal-6",
          "name": "영상 #6",
          "loads": 7725,
          "position": "영상 #6"
        },
        {
          "id": "cv-bigDeal-7",
          "name": "영상 #7",
          "loads": 5789,
          "position": "영상 #7"
        },
        {
          "id": "cv-bigDeal-8",
          "name": "영상 #8",
          "loads": 4631,
          "position": "영상 #8"
        },
        {
          "id": "cv-bigDeal-9",
          "name": "영상 #9",
          "loads": 3862,
          "position": "영상 #9"
        },
        {
          "id": "cv-bigDeal-10",
          "name": "영상 #10",
          "loads": 3212,
          "position": "영상 #10"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "30,901",
          "loc": "",
          "down": false
        },
        {
          "pct": 90,
          "label": "영상 #2",
          "count": "27,808",
          "loc": "",
          "down": false
        },
        {
          "pct": 75,
          "label": "영상 #3",
          "count": "23,176",
          "loc": "",
          "down": false
        },
        {
          "pct": 60,
          "label": "영상 #4",
          "count": "18,546",
          "loc": "",
          "down": false
        },
        {
          "pct": 35,
          "label": "영상 #5",
          "count": "10,815",
          "loc": "",
          "down": true
        },
        {
          "pct": 25,
          "label": "영상 #6",
          "count": "7,725",
          "loc": "",
          "down": false
        },
        {
          "pct": 19,
          "label": "영상 #7",
          "count": "5,789",
          "loc": "",
          "down": false
        },
        {
          "pct": 15,
          "label": "영상 #8",
          "count": "4,631",
          "loc": "",
          "down": false
        },
        {
          "pct": 12,
          "label": "영상 #9",
          "count": "3,862",
          "loc": "",
          "down": false
        },
        {
          "pct": 10,
          "label": "영상 #10",
          "count": "3,212",
          "loc": "",
          "down": false
        }
      ],
      "alert": "영상 #4 → #5 구간 이탈 25%p.",
      "domain": []
    },
    "megaBrand": {
      "name": "메가 브랜드 페이지 (20개 연결)",
      "totalLoad": 256562,
      "lastPct": 9,
      "mainExit": "영상 #6 → #7 (-22%p)",
      "dailyLoad": [],
      "videos": [
        {
          "id": "cv-megaBrand-1",
          "name": "영상 #1",
          "loads": 51312,
          "position": "영상 #1"
        },
        {
          "id": "cv-megaBrand-2",
          "name": "영상 #2",
          "loads": 45155,
          "position": "영상 #2"
        },
        {
          "id": "cv-megaBrand-3",
          "name": "영상 #3",
          "loads": 40032,
          "position": "영상 #3"
        },
        {
          "id": "cv-megaBrand-4",
          "name": "영상 #4",
          "loads": 35918,
          "position": "영상 #4"
        },
        {
          "id": "cv-megaBrand-5",
          "name": "영상 #5",
          "loads": 33353,
          "position": "영상 #5"
        },
        {
          "id": "cv-megaBrand-6",
          "name": "영상 #6",
          "loads": 31300,
          "position": "영상 #6"
        },
        {
          "id": "cv-megaBrand-7",
          "name": "영상 #7",
          "loads": 20012,
          "position": "영상 #7"
        },
        {
          "id": "cv-megaBrand-8",
          "name": "영상 #8",
          "loads": 16933,
          "position": "영상 #8"
        },
        {
          "id": "cv-megaBrand-9",
          "name": "영상 #9",
          "loads": 14367,
          "position": "영상 #9"
        },
        {
          "id": "cv-megaBrand-10",
          "name": "영상 #10",
          "loads": 12316,
          "position": "영상 #10"
        },
        {
          "id": "cv-megaBrand-11",
          "name": "영상 #11",
          "loads": 10776,
          "position": "영상 #11"
        },
        {
          "id": "cv-megaBrand-12",
          "name": "영상 #12",
          "loads": 9237,
          "position": "영상 #12"
        },
        {
          "id": "cv-megaBrand-13",
          "name": "영상 #13",
          "loads": 8210,
          "position": "영상 #13"
        },
        {
          "id": "cv-megaBrand-14",
          "name": "영상 #14",
          "loads": 7184,
          "position": "영상 #14"
        },
        {
          "id": "cv-megaBrand-15",
          "name": "영상 #15",
          "loads": 6671,
          "position": "영상 #15"
        },
        {
          "id": "cv-megaBrand-16",
          "name": "영상 #16",
          "loads": 6157,
          "position": "영상 #16"
        },
        {
          "id": "cv-megaBrand-17",
          "name": "영상 #17",
          "loads": 5644,
          "position": "영상 #17"
        },
        {
          "id": "cv-megaBrand-18",
          "name": "영상 #18",
          "loads": 5132,
          "position": "영상 #18"
        },
        {
          "id": "cv-megaBrand-19",
          "name": "영상 #19",
          "loads": 4875,
          "position": "영상 #19"
        },
        {
          "id": "cv-megaBrand-20",
          "name": "영상 #20",
          "loads": 4618,
          "position": "영상 #20"
        }
      ],
      "steps": [
        {
          "pct": 100,
          "label": "영상 #1",
          "count": "51,312",
          "loc": "",
          "down": false
        },
        {
          "pct": 88,
          "label": "영상 #2",
          "count": "45,155",
          "loc": "",
          "down": false
        },
        {
          "pct": 78,
          "label": "영상 #3",
          "count": "40,032",
          "loc": "",
          "down": false
        },
        {
          "pct": 70,
          "label": "영상 #4",
          "count": "35,918",
          "loc": "",
          "down": false
        },
        {
          "pct": 65,
          "label": "영상 #5",
          "count": "33,353",
          "loc": "",
          "down": false
        },
        {
          "pct": 61,
          "label": "영상 #6",
          "count": "31,300",
          "loc": "",
          "down": false
        },
        {
          "pct": 39,
          "label": "영상 #7",
          "count": "20,012",
          "loc": "",
          "down": true
        },
        {
          "pct": 33,
          "label": "영상 #8",
          "count": "16,933",
          "loc": "",
          "down": false
        },
        {
          "pct": 28,
          "label": "영상 #9",
          "count": "14,367",
          "loc": "",
          "down": false
        },
        {
          "pct": 24,
          "label": "영상 #10",
          "count": "12,316",
          "loc": "",
          "down": false
        },
        {
          "pct": 21,
          "label": "영상 #11",
          "count": "10,776",
          "loc": "",
          "down": false
        },
        {
          "pct": 18,
          "label": "영상 #12",
          "count": "9,237",
          "loc": "",
          "down": false
        },
        {
          "pct": 16,
          "label": "영상 #13",
          "count": "8,210",
          "loc": "",
          "down": false
        },
        {
          "pct": 14,
          "label": "영상 #14",
          "count": "7,184",
          "loc": "",
          "down": false
        },
        {
          "pct": 13,
          "label": "영상 #15",
          "count": "6,671",
          "loc": "",
          "down": false
        },
        {
          "pct": 12,
          "label": "영상 #16",
          "count": "6,157",
          "loc": "",
          "down": false
        },
        {
          "pct": 11,
          "label": "영상 #17",
          "count": "5,644",
          "loc": "",
          "down": false
        },
        {
          "pct": 10,
          "label": "영상 #18",
          "count": "5,132",
          "loc": "",
          "down": false
        },
        {
          "pct": 9.5,
          "label": "영상 #19",
          "count": "4,875",
          "loc": "",
          "down": false
        },
        {
          "pct": 9,
          "label": "영상 #20",
          "count": "4,618",
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
      "load": "32,705",
      "play": "26,818 (82%)",
      "avg": "16.8초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 84,
          "count": "27,472",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 10,
          "count": "3,270",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 6,
          "count": "1,962",
          "external": true
        }
      ]
    },
    "v2": {
      "name": "신상 가방 클로즈업",
      "load": "22,229",
      "play": "16,671 (75%)",
      "avg": "13.2초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 92,
          "count": "20,450",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 5,
          "count": "1,111",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 3,
          "count": "667",
          "external": true
        }
      ]
    },
    "v3": {
      "name": "스니커즈 풋샷",
      "load": "19,032",
      "play": "13,323 (70%)",
      "avg": "11.8초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 79,
          "count": "15,036",
          "external": false
        },
        {
          "name": "brand.musinsa.com",
          "label": "외부",
          "pct": 14,
          "count": "2,664",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 7,
          "count": "1,332",
          "external": true
        }
      ]
    },
    "v4": {
      "name": "여름 메인 비주얼",
      "load": "15,122",
      "play": "11,796 (78%)",
      "avg": "15.4초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 88,
          "count": "13,308",
          "external": false
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 12,
          "count": "1,815",
          "external": true
        }
      ]
    },
    "v5": {
      "name": "크롭 셔츠 디테일",
      "load": "13,753",
      "play": "8,940 (65%)",
      "avg": "10.2초",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 81,
          "count": "11,140",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 11,
          "count": "1,513",
          "external": true
        },
        {
          "name": "brand.musinsa.com",
          "label": "외부",
          "pct": 8,
          "count": "1,100",
          "external": true
        }
      ]
    }
  },
  "FLOATING_DATA": {
    "floating-home": {
      "name": "홈 메인 플로팅",
      "load": "51,168",
      "clicks": "2,768",
      "ctr": "5.41%",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 88,
          "count": "45,028",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 8,
          "count": "4,093",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 4,
          "count": "2,047",
          "external": true
        }
      ],
      "banners": [
        {
          "name": "린넨 반팔 셋업 (베이지)",
          "clicks": 2768,
          "ctr": 5.41
        }
      ]
    },
    "floating-category": {
      "name": "카테고리 플로팅 (상의)",
      "load": "42,492",
      "clicks": "1,578",
      "ctr": "3.71%",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 94,
          "count": "39,943",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 6,
          "count": "2,549",
          "external": true
        }
      ],
      "banners": [
        {
          "name": "셔츠 컬렉션 시리즈",
          "clicks": 1578,
          "ctr": 3.71
        }
      ]
    },
    "floating-event": {
      "name": "이벤트 페이지 플로팅",
      "load": "28,211",
      "clicks": "738",
      "ctr": "2.62%",
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 71,
          "count": "20,030",
          "external": false
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 22,
          "count": "6,207",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 7,
          "count": "1,975",
          "external": true
        }
      ],
      "banners": [
        {
          "name": "여름 시즌오프 ~50%",
          "clicks": 738,
          "ctr": 2.62
        }
      ]
    }
  },
  "SLIDE_VIDEO_DATA": {
    "sv1": {
      "name": "린넨 반팔 셋업 쇼츠",
      "clicks": 1515,
      "ctr": 8.42,
      "banners": [
        {
          "name": "린넨 반팔 셋업 (베이지)",
          "clicks": 904,
          "ctr": 5.02
        },
        {
          "name": "린넨 반팔 셋업 (네이비)",
          "clicks": 611,
          "ctr": 3.4
        }
      ],
      "domain": []
    },
    "sv2": {
      "name": "와이드 슬랙스 쇼츠",
      "clicks": 1182,
      "ctr": 7.18,
      "banners": [
        {
          "name": "와이드 슬랙스 (블랙)",
          "clicks": 1182,
          "ctr": 7.18
        }
      ],
      "domain": []
    },
    "sv3": {
      "name": "크롭 셔츠 쇼츠",
      "clicks": 909,
      "ctr": 5.74,
      "banners": [
        {
          "name": "크롭 셔츠 (화이트)",
          "clicks": 909,
          "ctr": 5.74
        }
      ],
      "domain": []
    },
    "sv4": {
      "name": "밀짚 모자 쇼츠",
      "clicks": 576,
      "ctr": 3.81,
      "banners": [
        {
          "name": "밀짚 모자 (내추럴)",
          "clicks": 576,
          "ctr": 3.81
        }
      ],
      "domain": []
    },
    "s2v1": {
      "name": "린넨 자켓 룩북",
      "clicks": 1150,
      "ctr": 6.62,
      "banners": [],
      "domain": []
    },
    "s2v2": {
      "name": "린넨 셔츠 디테일",
      "clicks": 817,
      "ctr": 5.91,
      "banners": [],
      "domain": []
    },
    "s2v3": {
      "name": "린넨 팬츠 핏감",
      "clicks": 540,
      "ctr": 5.42,
      "banners": [],
      "domain": []
    },
    "s3v1": {
      "name": "룩북 #1 모델 워킹",
      "clicks": 654,
      "ctr": 5.74,
      "banners": [],
      "domain": []
    },
    "s3v2": {
      "name": "룩북 #2 클로즈업",
      "clicks": 526,
      "ctr": 5.18,
      "banners": [],
      "domain": []
    },
    "s3v3": {
      "name": "룩북 #3 디테일",
      "clicks": 371,
      "ctr": 4.04,
      "banners": [],
      "domain": []
    },
    "s4v1": {
      "name": "베스트 #1",
      "clicks": 305,
      "ctr": 4.12,
      "banners": [],
      "domain": []
    },
    "s4v2": {
      "name": "베스트 #2",
      "clicks": 250,
      "ctr": 3.74,
      "banners": [],
      "domain": []
    }
  },
  "MULTI_VIDEO_DATA": {
    "mv1": {
      "name": "비치웨어 모델 컷 A",
      "clicks": 838,
      "ctr": 4.62,
      "banners": [
        {
          "name": "비치 원피스 (화이트)",
          "clicks": 502,
          "ctr": 2.77
        },
        {
          "name": "비치 모자",
          "clicks": 336,
          "ctr": 1.85
        }
      ],
      "domain": []
    },
    "mv2": {
      "name": "선글라스 클로즈업",
      "clicks": 358,
      "ctr": 3.18,
      "banners": [
        {
          "name": "오버사이즈 선글라스",
          "clicks": 358,
          "ctr": 3.18
        }
      ],
      "domain": []
    },
    "mv3": {
      "name": "샌들 360°",
      "clicks": 180,
      "ctr": 2.41,
      "banners": [
        {
          "name": "플랫 샌들 (탠)",
          "clicks": 180,
          "ctr": 2.41
        }
      ],
      "domain": []
    },
    "mv4": {
      "name": "비치백 디테일",
      "clicks": 49,
      "ctr": 1.18,
      "banners": [
        {
          "name": "비치백 (스트로)",
          "clicks": 49,
          "ctr": 1.18
        }
      ],
      "domain": []
    },
    "m2v1": {
      "name": "시즌 룩 1",
      "clicks": 267,
      "ctr": 3.1,
      "banners": [],
      "domain": []
    },
    "m2v2": {
      "name": "시즌 룩 2",
      "clicks": 189,
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
      "load": 32705,
      "play": 26818,
      "playRate": 82,
      "avgTime": 16.8,
      "parentPage": "displayer",
      "dailyLoad": [
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
      "dailyPlay": [
        1223,
        1311,
        1399,
        1486,
        1405,
        1506,
        1446,
        1405,
        1466,
        1553,
        1492,
        1601,
        1641,
        1607,
        1533,
        1553,
        1513,
        1425,
        1466
      ],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 84,
          "count": "27,472",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 10,
          "count": "3,270",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 6,
          "count": "1,962",
          "external": true
        }
      ]
    },
    "v2": {
      "name": "신상 가방 클로즈업",
      "type": "단일 영상",
      "placement": "상세페이지",
      "load": 22229,
      "play": 16671,
      "playRate": 75,
      "avgTime": 13.2,
      "parentPage": "displayer",
      "dailyLoad": [
        1017,
        1082,
        1156,
        1132,
        1189,
        1222,
        1246,
        1214,
        1156,
        1123,
        1181,
        1230,
        1255,
        1222,
        1156,
        1115,
        1082,
        1050,
        1082
      ],
      "dailyPlay": [
        763,
        812,
        868,
        849,
        892,
        917,
        935,
        910,
        868,
        843,
        886,
        922,
        941,
        917,
        868,
        836,
        812,
        787,
        812
      ],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 92,
          "count": "20,450",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 5,
          "count": "1,111",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 3,
          "count": "667",
          "external": true
        }
      ]
    },
    "v3": {
      "name": "스니커즈 풋샷",
      "type": "단일 영상",
      "placement": "상세페이지",
      "load": 19032,
      "play": 13323,
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
          "count": "15,036",
          "external": false
        },
        {
          "name": "brand.musinsa.com",
          "label": "외부",
          "pct": 14,
          "count": "2,664",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 7,
          "count": "1,332",
          "external": true
        }
      ]
    },
    "v4": {
      "name": "여름 메인 비주얼",
      "type": "단일 영상",
      "placement": "메인 배너",
      "load": 15122,
      "play": 11796,
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
          "count": "13,308",
          "external": false
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 12,
          "count": "1,815",
          "external": true
        }
      ]
    },
    "v5": {
      "name": "크롭 셔츠 디테일",
      "type": "단일 영상",
      "placement": "상세페이지",
      "load": 13753,
      "play": 8940,
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
          "count": "11,140",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 11,
          "count": "1,513",
          "external": true
        },
        {
          "name": "brand.musinsa.com",
          "label": "외부",
          "pct": 8,
          "count": "1,100",
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
      "load": 51168,
      "clicks": 2768,
      "ctr": 5.41,
      "dailyLoad": [
        2312,
        2468,
        2608,
        2722,
        2632,
        2772,
        2845,
        2739,
        2632,
        2698,
        2796,
        2886,
        2936,
        2862,
        2739,
        2681,
        2632,
        2526,
        2591
      ],
      "dailyClicks": [
        125,
        134,
        141,
        148,
        143,
        150,
        154,
        148,
        143,
        146,
        151,
        156,
        159,
        155,
        148,
        145,
        143,
        137,
        140
      ],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 88,
          "count": "45,028",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 8,
          "count": "4,093",
          "external": true
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 4,
          "count": "2,047",
          "external": true
        }
      ],
      "engagement": {
        "likes": 1661,
        "shares": 692,
        "saves": 277
      },
      "videos": [
        {
          "id": "floating-home-v1",
          "name": "홈 메인 플로팅 영상",
          "dailyClicks": [
            125,
            134,
            141,
            148,
            143,
            150,
            154,
            148,
            143,
            146,
            151,
            156,
            159,
            155,
            148,
            145,
            143,
            137,
            140
          ],
          "totalClicks": 2768,
          "ctr": 5.41,
          "banners": [
            {
              "name": "린넨 반팔 셋업 (베이지)",
              "clicks": 2768,
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
      "load": 42492,
      "clicks": 1578,
      "ctr": 3.71,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 94,
          "count": "39,943",
          "external": false
        },
        {
          "name": "smartstore.naver.com",
          "label": "외부",
          "pct": 6,
          "count": "2,549",
          "external": true
        }
      ],
      "engagement": {
        "likes": 946,
        "shares": 394,
        "saves": 157
      },
      "videos": [
        {
          "id": "floating-category-v1",
          "name": "카테고리 플로팅 (상의) 영상",
          "dailyClicks": [],
          "totalClicks": 1578,
          "ctr": 3.71,
          "banners": [
            {
              "name": "셔츠 컬렉션 시리즈",
              "clicks": 1578,
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
      "load": 28211,
      "clicks": 738,
      "ctr": 2.62,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [
        {
          "name": "mall.example.com",
          "label": "자사",
          "pct": 71,
          "count": "20,030",
          "external": false
        },
        {
          "name": "instagram.com",
          "label": "외부",
          "pct": 22,
          "count": "6,207",
          "external": true
        },
        {
          "name": "store.kakao.com",
          "label": "외부",
          "pct": 7,
          "count": "1,975",
          "external": true
        }
      ],
      "engagement": {
        "likes": 443,
        "shares": 184,
        "saves": 74
      },
      "videos": [
        {
          "id": "floating-event-v1",
          "name": "이벤트 페이지 플로팅 영상",
          "dailyClicks": [],
          "totalClicks": 738,
          "ctr": 2.62,
          "banners": [
            {
              "name": "여름 시즌오프 ~50%",
              "clicks": 738,
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
      "load": 55925,
      "clicks": 4167,
      "ctr": 7.45,
      "dailyLoad": [
        2526,
        2706,
        2862,
        2985,
        2886,
        3034,
        3116,
        3001,
        2886,
        2960,
        3067,
        3165,
        3214,
        3132,
        3001,
        2936,
        2886,
        2763,
        2837
      ],
      "dailyClicks": [
        188,
        202,
        213,
        223,
        216,
        227,
        232,
        224,
        216,
        221,
        229,
        236,
        240,
        234,
        224,
        219,
        216,
        206,
        212
      ],
      "domain": [],
      "engagement": {
        "likes": 2500,
        "shares": 875,
        "saves": 500
      },
      "videos": [
        {
          "id": "sv1",
          "name": "린넨 반팔 셋업 쇼츠",
          "dailyClicks": [
            68,
            73,
            77,
            81,
            78,
            82,
            84,
            81,
            78,
            80,
            83,
            85,
            87,
            84,
            81,
            80,
            78,
            75,
            76
          ],
          "totalClicks": 1515,
          "ctr": 8.42,
          "banners": [
            {
              "name": "린넨 반팔 셋업 (베이지)",
              "clicks": 904,
              "ctr": 5.02
            },
            {
              "name": "린넨 반팔 셋업 (네이비)",
              "clicks": 611,
              "ctr": 3.4
            }
          ]
        },
        {
          "id": "sv2",
          "name": "와이드 슬랙스 쇼츠",
          "dailyClicks": [],
          "totalClicks": 1182,
          "ctr": 7.18,
          "banners": [
            {
              "name": "와이드 슬랙스 (블랙)",
              "clicks": 1182,
              "ctr": 7.18
            }
          ]
        },
        {
          "id": "sv3",
          "name": "크롭 셔츠 쇼츠",
          "dailyClicks": [],
          "totalClicks": 909,
          "ctr": 5.74,
          "banners": [
            {
              "name": "크롭 셔츠 (화이트)",
              "clicks": 909,
              "ctr": 5.74
            }
          ]
        },
        {
          "id": "sv4",
          "name": "밀짚 모자 쇼츠",
          "dailyClicks": [],
          "totalClicks": 576,
          "ctr": 3.81,
          "banners": [
            {
              "name": "밀짚 모자 (내추럴)",
              "clicks": 576,
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
      "load": 43365,
      "clicks": 2641,
      "ctr": 6.09,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [],
      "engagement": {
        "likes": 1585,
        "shares": 554,
        "saves": 317
      },
      "videos": [
        {
          "id": "s2v1",
          "name": "린넨 자켓 룩북",
          "dailyClicks": [],
          "totalClicks": 1150,
          "ctr": 6.62,
          "banners": []
        },
        {
          "id": "s2v2",
          "name": "린넨 셔츠 디테일",
          "dailyClicks": [],
          "totalClicks": 817,
          "ctr": 5.91,
          "banners": []
        },
        {
          "id": "s2v3",
          "name": "린넨 팬츠 핏감",
          "dailyClicks": [],
          "totalClicks": 540,
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
      "load": 30506,
      "clicks": 1551,
      "ctr": 5.09,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [],
      "engagement": {
        "likes": 931,
        "shares": 326,
        "saves": 186
      },
      "videos": [
        {
          "id": "s3v1",
          "name": "룩북 #1 모델 워킹",
          "dailyClicks": [],
          "totalClicks": 654,
          "ctr": 5.74,
          "banners": []
        },
        {
          "id": "s3v2",
          "name": "룩북 #2 클로즈업",
          "dailyClicks": [],
          "totalClicks": 526,
          "ctr": 5.18,
          "banners": []
        },
        {
          "id": "s3v3",
          "name": "룩북 #3 디테일",
          "dailyClicks": [],
          "totalClicks": 371,
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
      "load": 21429,
      "clicks": 781,
      "ctr": 3.65,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [],
      "engagement": {
        "likes": 469,
        "shares": 164,
        "saves": 93
      },
      "videos": [
        {
          "id": "s4v1",
          "name": "베스트 #1",
          "dailyClicks": [],
          "totalClicks": 305,
          "ctr": 4.12,
          "banners": []
        },
        {
          "id": "s4v2",
          "name": "베스트 #2",
          "dailyClicks": [],
          "totalClicks": 250,
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
      "load": 39457,
      "clicks": 1381,
      "ctr": 3.5,
      "dailyLoad": [],
      "dailyClicks": [
        62,
        66,
        71,
        74,
        71,
        75,
        77,
        74,
        71,
        73,
        75,
        78,
        80,
        77,
        74,
        72,
        71,
        68,
        70
      ],
      "domain": [],
      "engagement": {
        "likes": 759,
        "shares": 276,
        "saves": 125
      },
      "videos": [
        {
          "id": "mv1",
          "name": "비치웨어 모델 컷 A",
          "dailyClicks": [],
          "totalClicks": 838,
          "ctr": 4.62,
          "banners": [
            {
              "name": "비치 원피스 (화이트)",
              "clicks": 502,
              "ctr": 2.77
            },
            {
              "name": "비치 모자",
              "clicks": 336,
              "ctr": 1.85
            }
          ]
        },
        {
          "id": "mv2",
          "name": "선글라스 클로즈업",
          "dailyClicks": [],
          "totalClicks": 358,
          "ctr": 3.18,
          "banners": [
            {
              "name": "오버사이즈 선글라스",
              "clicks": 358,
              "ctr": 3.18
            }
          ]
        },
        {
          "id": "mv3",
          "name": "샌들 360°",
          "dailyClicks": [],
          "totalClicks": 180,
          "ctr": 2.41,
          "banners": [
            {
              "name": "플랫 샌들 (탠)",
              "clicks": 180,
              "ctr": 2.41
            }
          ]
        },
        {
          "id": "mv4",
          "name": "비치백 디테일",
          "dailyClicks": [],
          "totalClicks": 49,
          "ctr": 1.18,
          "banners": [
            {
              "name": "비치백 (스트로)",
              "clicks": 49,
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
      "load": 25356,
      "clicks": 613,
      "ctr": 2.42,
      "dailyLoad": [],
      "dailyClicks": [],
      "domain": [],
      "engagement": {
        "likes": 337,
        "shares": 123,
        "saves": 55
      },
      "videos": [
        {
          "id": "m2v1",
          "name": "시즌 룩 1",
          "dailyClicks": [],
          "totalClicks": 267,
          "ctr": 3.1,
          "banners": []
        },
        {
          "id": "m2v2",
          "name": "시즌 룩 2",
          "dailyClicks": [],
          "totalClicks": 189,
          "ctr": 2.62,
          "banners": []
        }
      ]
    }
  },
  "REVENUE": {
    "total": 386000000,
    "totalDelta": -28.8,
    "widgetContribution": 92640000,
    "widgetContributionPct": 24,
    "dailyRevenue": [
      20315789,
      22825946,
      23220907,
      21749522,
      20270948,
      19670393,
      19164717,
      18231845,
      17969566,
      -4834629,
      22327183,
      27240163,
      25879932,
      23215826,
      21657426,
      21575933,
      21659536,
      21508333,
      22350664
    ],
    "byChannel": [
      {
        "channel": "자사몰",
        "revenue": 239320000,
        "pct": 62.0
      },
      {
        "channel": "네이버 스마트스토어",
        "revenue": 69480000,
        "pct": 18.0
      },
      {
        "channel": "카카오 쇼핑하기",
        "revenue": 38600000,
        "pct": 10.0
      },
      {
        "channel": "무신사 브랜드관",
        "revenue": 27020000,
        "pct": 7.0
      },
      {
        "channel": "인스타그램 쇼핑",
        "revenue": 11580000,
        "pct": 3.0
      }
    ],
    "byWidget": [
      {
        "widgetId": "slide-s1",
        "name": "2026 여름 신상 쇼츠 컬렉션",
        "revenue": 42460000,
        "orders": 1117
      },
      {
        "widgetId": "slide-s2",
        "name": "린넨 셋업 시리즈 슬라이드",
        "revenue": 30880000,
        "orders": 753
      },
      {
        "widgetId": "floating-home",
        "name": "홈 메인 플로팅",
        "revenue": 23160000,
        "orders": 551
      },
      {
        "widgetId": "multi-m1",
        "name": "홈 비치웨어 멀티 위젯",
        "revenue": 15440000,
        "orders": 343
      },
      {
        "widgetId": "slide-s3",
        "name": "신상 룩북 슬라이드",
        "revenue": 11580000,
        "orders": 290
      }
    ],
    "topProducts": [
      {
        "rank": 1,
        "name": "린넨 반팔 셋업 (베이지)",
        "revenue": 31652000,
        "units": 356
      },
      {
        "rank": 2,
        "name": "와이드 슬랙스 (블랙)",
        "revenue": 24704000,
        "units": 325
      },
      {
        "rank": 3,
        "name": "크롭 셔츠 (화이트)",
        "revenue": 19686000,
        "units": 339
      },
      {
        "rank": 4,
        "name": "비치 원피스 (화이트)",
        "revenue": 16212000,
        "units": 131
      },
      {
        "rank": 5,
        "name": "오버사이즈 선글라스",
        "revenue": 13510000,
        "units": 142
      }
    ]
  },
  "AD_OPERATION": {
    "totalSpend": 82000000,
    "totalSpendDelta": 5.0,
    "roas": 4.7,
    "cpc": 1583,
    "cpa": 41667,
    "dailySpend": [
      4315789,
      4760161,
      4830081,
      4569602,
      4307851,
      4201535,
      4112016,
      3946870,
      3900439,
      4137251,
      4671865,
      4912610,
      4703218,
      4293109,
      4053212,
      4040667,
      4053536,
      4030260,
      4159928
    ],
    "dailyRoas": [
      4.4,
      4.55,
      4.7,
      4.85,
      5.0,
      4.4,
      4.55,
      4.7,
      4.85,
      5.0,
      4.4,
      4.55,
      4.7,
      4.85,
      5.0,
      4.4,
      4.55,
      4.7,
      4.85
    ],
    "byChannel": [
      {
        "channel": "네이버 검색",
        "spend": 26240000,
        "impressions": 647368,
        "clicks": 17608,
        "cpc": 420,
        "conversions": 748,
        "cpa": 18400,
        "revenue": 77200000,
        "roas": 4.8
      },
      {
        "channel": "구글 검색",
        "spend": 18040000,
        "impressions": 388421,
        "clicks": 10876,
        "cpc": 510,
        "conversions": 433,
        "cpa": 19800,
        "revenue": 50180000,
        "roas": 4.6
      },
      {
        "channel": "메타 (페이스북/인스타)",
        "spend": 19680000,
        "impressions": 690526,
        "clicks": 11394,
        "cpc": 380,
        "conversions": 354,
        "cpa": 21600,
        "revenue": 38600000,
        "roas": 4.2
      },
      {
        "channel": "카카오",
        "spend": 11480000,
        "impressions": 302105,
        "clicks": 8286,
        "cpc": 340,
        "conversions": 315,
        "cpa": 15200,
        "revenue": 27020000,
        "roas": 5.2
      },
      {
        "channel": "유튜브",
        "spend": 6560000,
        "impressions": 129474,
        "clicks": 3625,
        "cpc": 450,
        "conversions": 118,
        "cpa": 22800,
        "revenue": 11580000,
        "roas": 3.6
      }
    ],
    "campaigns": [
      {
        "id": "c1",
        "name": "여름 신상 시즌 캠페인",
        "channel": "네이버 검색",
        "spend": 14760000,
        "impressions": 345263,
        "clicks": 10358,
        "conversions": 433,
        "roas": 5.2
      },
      {
        "id": "c2",
        "name": "브랜드 인지도 확보",
        "channel": "메타",
        "spend": 11480000,
        "impressions": 474737,
        "clicks": 7250,
        "conversions": 197,
        "roas": 3.8
      },
      {
        "id": "c3",
        "name": "재방문 리타게팅",
        "channel": "구글 GDN",
        "spend": 9840000,
        "impressions": 215790,
        "clicks": 6733,
        "conversions": 354,
        "roas": 6.1
      },
      {
        "id": "c4",
        "name": "신규 회원 가입 유도",
        "channel": "카카오",
        "spend": 8200000,
        "impressions": 215790,
        "clicks": 6215,
        "conversions": 276,
        "roas": 4.9
      }
    ],
    "funnel": {
      "impression": 2157895,
      "click": 51789,
      "widgetView": 32109,
      "bannerClick": 5780,
      "purchase": 1968
    }
  },
  "MEMBERSHIP": {
    "totalActive": 21216,
    "activeDelta": 4.8,
    "newSignups": 3120,
    "paidConversion": 212,
    "paidConversionRate": 6.8,
    "funnel": {
      "visit": 87360,
      "signup": 3120,
      "firstPurchase": 212,
      "repurchase": 68
    },
    "dailySignups": [
      164,
      190,
      194,
      179,
      164,
      158,
      153,
      143,
      141,
      152,
      185,
      198,
      186,
      163,
      149,
      149,
      149,
      148,
      155
    ],
    "cohort": [
      {
        "cohort": "2월",
        "m0": 100,
        "m1": 78,
        "m2": 65,
        "m3": 54
      },
      {
        "cohort": "2월 중",
        "m0": 100,
        "m1": 82,
        "m2": 68,
        "m3": null
      },
      {
        "cohort": "2월 말",
        "m0": 100,
        "m1": 80,
        "m2": null,
        "m3": null
      }
    ]
  },
  "CHURN": {
    "dormantCount": 1803,
    "dormantRate": 8.5,
    "churnCount": 424,
    "churnRate": 2.0,
    "churnRateDelta": 0.2,
    "dailyChurn": [
      22,
      26,
      27,
      25,
      22,
      21,
      20,
      19,
      18,
      21,
      26,
      28,
      26,
      22,
      20,
      20,
      20,
      20,
      21
    ],
    "reasons": [
      {
        "reason": "가격 부담",
        "count": 136,
        "pct": 32.0
      },
      {
        "reason": "필요 없어짐",
        "count": 102,
        "pct": 24.0
      },
      {
        "reason": "서비스 불만",
        "count": 76,
        "pct": 18.0
      },
      {
        "reason": "다른 서비스로 이동",
        "count": 59,
        "pct": 14.0
      },
      {
        "reason": "기타",
        "count": 51,
        "pct": 12.0
      }
    ]
  },
  "KEY_METRICS": {
    "cac": 386792,
    "ltv": 58220,
    "ltvCacRatio": 0.15,
    "mrr": 128666667,
    "mrrDelta": -2.0,
    "arpu": 18194
  }
};
