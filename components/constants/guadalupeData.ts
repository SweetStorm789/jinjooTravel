export const marianSitesData = [
  { id: "fatima", name: "파티마", country: "포르투갈", active: false },
  { id: "lourdes", name: "루르드", country: "프랑스", active: false },
  { id: "guadalupe", name: "과달루페", country: "멕시코", active: true },
  { id: "banneux", name: "바뇌", country: "벨기에", active: false },
  { id: "medjugorje", name: "메주고리예", country: "보스니아", active: false }
];

export const apparitionTimeline = [
  {
    date: "12월 9일",
    title: "1차 발현",
    description: "테페약 언덕에서 성모님 첫 발현",
    type: "primary" as const
  },
  {
    date: "12월 10일", 
    title: "2차 발현",
    description: "주교의 표징 요구, 성모님의 재확인",
    type: "secondary" as const
  },
  {
    date: "12월 11일",
    title: "3차 발현", 
    description: "삼촌의 병으로 성모님께 도움 청함",
    type: "secondary" as const
  },
  {
    date: "12월 12일",
    title: "4차 발현",
    description: "틸마의 기적, 성화 현현",
    type: "secondary" as const
  }
];

export const mainMessages = [
  "모든 민족의 어머니",
  "원주민과 스페인인의 화해", 
  "가난하고 소외된 자들에 대한 사랑",
  "아메리카 대륙의 복음화"
];

export const juanDiegoTimeline = [
  { label: "출생", value: "1474년 쿠아우티틀란 출생" },
  { label: "개종", value: "1524년 가톨릭 개종 (50세)" },
  { label: "발현", value: "1531년 성모님 발현 목격 (57세)" },
  { label: "선종", value: "1548년 5월 30일 선종 (74세)" },
  { label: "시성", value: "2002년 7월 31일 시성" }
];

export const tilmaScientificData = {
  physical: [
    "선인장 섬유로 제작 (아가베 아야카틀)",
    "168cm × 103cm 크기",
    "490년간 부패하지 않음", 
    "온도와 습도 변화에 무관"
  ],
  chemical: [
    "알려진 안료나 염료 검출 안됨",
    "색상 변화 없음",
    "바니시나 보호막 없음",
    "붓질이나 스케치 흔적 없음"
  ]
};

export const modernImpacts = [
  {
    icon: "Crown",
    title: "문화적 화해",
    description: "스페인 정복자와 원주민 사이의 갈등을 성모님의 사랑으로 치유하는 계기가 되었습니다.",
    color: "amber"
  },
  {
    icon: "Users", 
    title: "대규모 개종",
    description: "발현 후 10년간 800만 명의 원주민이 가톨릭으로 개종하여 신대륙 복음화의 토대를 마련했습니다.",
    color: "blue"
  },
  {
    icon: "Heart",
    title: "사회 변화", 
    description: "원주민의 인권과 존엄성을 인정받는 계기가 되었으며, 멕시코 정체성 형성에 큰 영향을 미쳤습니다.",
    color: "green"
  }
];

export const visitInfo = [
  {
    icon: "MapPin",
    title: "위치",
    description: "멕시코시티 북부\n테페약 언덕"
  },
  {
    icon: "Calendar", 
    title: "주요 축일",
    description: "12월 12일\n과달루페 성모 대축일"
  },
  {
    icon: "Clock",
    title: "개방 시간", 
    description: "06:00-21:00\n대성당과 성당"
  },
  {
    icon: "Users",
    title: "순례객",
    description: "연간 2천만 명\n세계 최대 성모 순례지"
  }
];

export const miracleStats = [
  { label: "발현 횟수", value: "4번" },
  { label: "틸마 보존", value: "490년" },
  { label: "개종자 수", value: "800만명" },
  { label: "순례 역사", value: "490년" }
];