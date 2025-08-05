export const marianSitesData = [
  { id: "fatima", name: "파티마", country: "포르투갈", active: false },
  { id: "lourdes", name: "루르드", country: "프랑스", active: false },
  { id: "guadalupe", name: "과달루페", country: "멕시코", active: false },
  { id: "banneux", name: "바뇌", country: "벨기에", active: true },
  { id: "medjugorje", name: "메주고리예", country: "보스니아", active: false }
];

export const apparitionTimeline = [
  {
    date: "1월 15일",
    title: "1차 발현",
    description: "\"이리 오너라, 내 딸아\" - 첫 만남",
    type: "primary" as const
  },
  {
    date: "1월 18일",
    title: "2차 발현", 
    description: "\"나를 따라오너라\" - 샘으로 인도",
    type: "secondary" as const
  },
  {
    date: "1월 19일",
    title: "3차 발현",
    description: "\"가난한 자들의 성모님\" 자기 소개",
    type: "secondary" as const
  },
  {
    date: "1월 20일",
    title: "4차 발현",
    description: "작은 성당 건립 요청",
    type: "secondary" as const
  },
  {
    date: "2월 11일",
    title: "5차 발현",
    description: "루르드 발현일에 다시 나타나심",
    type: "secondary" as const
  },
  {
    date: "2월 15일",
    title: "6차 발현",
    description: "병자들을 위한 샘물의 축복",
    type: "secondary" as const
  },
  {
    date: "2월 20일",
    title: "7차 발현",
    description: "묵주기도의 중요성 강조",
    type: "secondary" as const
  },
  {
    date: "3월 2일",
    title: "8차 발현",
    description: "\"내가 그리스도의 어머니임을 믿으라\"",
    type: "secondary" as const
  }
];

export const apparitionFeatures = {
  temporal: [
    "총 47일간 8번 발현",
    "주로 저녁 시간",
    "짧지만 명확한 메시지"
  ],
  message: [
    "가난한 자들에 대한 사랑",
    "기도와 회개", 
    "병자들을 위한 치유"
  ],
  approval: [
    "1949년 공식 승인",
    "엄격한 조사 과정",
    "의학적 기적 확인"
  ]
};

export const marietteBeckoTestimony = {
  appearance: "성모님은 하얀 옷을 입고 계셨고, 파란 띠를 두르고 계셨습니다. 황금 장미가 달린 맨발이셨고, 너무나 아름다우셨습니다. 빛이 성모님을 둘러싸고 있었습니다.",
  voice: "성모님의 목소리는 매우 부드럽고 다정했습니다. 마치 어머니가 자녀에게 말하는 것 같았습니다. 프랑스어로 말씀하셨지만 완전히 이해할 수 있었습니다."
};

export const poorPeopleMotherImpacts = [
  {
    icon: "Heart",
    title: "사회적 메시지",
    description: "성모님께서 \"가난한 자들의 성모님\"이라고 소개하신 것은 사회 정의에 대한 강력한 메시지였습니다.",
    color: "green"
  },
  {
    icon: "Droplets", 
    title: "치유의 샘",
    description: "\"이 샘은 모든 민족들을 위한 것\"이라는 말씀처럼 국경을 초월한 치유의 은총을 베푸셨습니다.",
    color: "blue"
  },
  {
    icon: "Shield",
    title: "모든 민족의 어머니",
    description: "바뇌의 메시지는 특정 지역을 넘어 전 세계 가난하고 소외된 이들을 위한 것이었습니다.",
    color: "purple"
  }
];

export const historicalContext = [
  "1929년 세계 대공황 시작",
  "대량 실업과 사회 불안", 
  "종교적 무관심 증가",
  "사회주의 운동 확산"
];

export const visitInfo = [
  {
    icon: "MapPin",
    title: "위치",
    description: "벨기에 리에주 지방\n바뇌 마을"
  },
  {
    icon: "Calendar",
    title: "주요 축일", 
    description: "1월 15일 (첫 발현)\n가난한 자들의 성모님"
  },
  {
    icon: "Clock",
    title: "개방 시간",
    description: "08:00-18:00\n성당과 성지"
  },
  {
    icon: "Users",
    title: "순례객",
    description: "연간 50만 명\n유럽 주요 순례지"
  }
];

export const apparitionStats = [
  { label: "발현 횟수", value: "8번" },
  { label: "발현 기간", value: "47일" },
  { label: "교회 승인", value: "1949년" },
  { label: "순례 역사", value: "90년" }
];