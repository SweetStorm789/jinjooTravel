export interface HolyPlace {
  id: string;
  name: string;
  nameKo: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  description: string;
  significance: string;
}

export const HOLY_PLACES: Record<string, HolyPlace> = {
  vatican: {
    id: 'vatican',
    name: 'Vatican City',
    nameKo: '바티칸',
    country: '이탈리아',
    coordinates: { lat: 41.9029, lng: 12.4534 },
    address: 'Vatican City',
    description: '가톨릭의 중심지이자 교황청 소재지',
    significance: '성 베드로 대성당과 시스티나 성당이 있는 가톨릭의 성지'
  },
  medjugorje: {
    id: 'medjugorje',
    name: 'Medjugorje',
    nameKo: '메주고리예',
    country: '보스니아 헤르체고비나',
    coordinates: { lat: 43.1843, lng: 17.6756 },
    address: 'Medjugorje, Bosnia and Herzegovina',
    description: '1981년부터 계속되는 성모 발현지',
    significance: '평화의 여왕 성모님이 발현하신 현대의 순례지'
  },
  fatima: {
    id: 'fatima',
    name: 'Fatima',
    nameKo: '파티마',
    country: '포르투갈',
    coordinates: { lat: 39.6317, lng: -8.6720 },
    address: 'Fatima, Portugal',
    description: '1917년 성모님이 세 목동에게 발현하신 성지',
    significance: '파티마의 성모님이 발현하신 세계적인 순례지'
  },
  lourdes: {
    id: 'lourdes',
    name: 'Lourdes',
    nameKo: '루르드',
    country: '프랑스',
    coordinates: { lat: 43.0935, lng: -0.0467 },
    address: 'Lourdes, France',
    description: '1858년 성모님이 성 베르나데트에게 발현하신 성지',
    significance: '무염시태의 성모님이 발현하신 치유의 성지'
  },
  guadalupe: {
    id: 'guadalupe',
    name: 'Guadalupe',
    nameKo: '과달루페',
    country: '멕시코',
    coordinates: { lat: 19.4847, lng: -99.1174 },
    address: 'Villa de Guadalupe, Mexico City, Mexico',
    description: '1531년 성모님이 성 후안 디에고에게 발현하신 성지',
    significance: '과달루페의 성모님이 발현하신 아메리카 대륙의 수호성모 성지'
  },
  rome: {
    id: 'rome',
    name: 'Rome',
    nameKo: '로마',
    country: '이탈리아',
    coordinates: { lat: 41.9028, lng: 12.4964 },
    address: 'Rome, Italy',
    description: '순교자들의 피로 세워진 영원한 도시',
    significance: '성 베드로와 성 바오로가 순교한 초대교회의 중심지'
  },
  assisi: {
    id: 'assisi',
    name: 'Assisi',
    nameKo: '아시시',
    country: '이탈리아',
    coordinates: { lat: 43.0717, lng: 12.6059 },
    address: 'Assisi, Italy',
    description: '성 프란치스코의 고향',
    significance: '가난과 평화의 성인 프란치스코가 태어난 성지'
  },
  jerusalem: {
    id: 'jerusalem',
    name: 'Jerusalem',
    nameKo: '예루살렘',
    country: '이스라엘',
    coordinates: { lat: 31.7683, lng: 35.2137 },
    address: 'Jerusalem, Israel',
    description: '예수님의 수난과 죽음, 부활의 성지',
    significance: '그리스도교 신앙의 중심지이자 성지 중의 성지'
  }
};

// 성지별 순례 정보
export const getPilgrimageInfo = (placeId: string) => {
  const place = HOLY_PLACES[placeId];
  if (!place) return null;

  return {
    ...place,
    embedUrl: `https://www.google.com/maps?q=${place.coordinates.lat},${place.coordinates.lng}&output=embed`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${place.coordinates.lat},${place.coordinates.lng}`,
    searchUrl: `https://www.google.com/maps/search/${encodeURIComponent(place.name + ' ' + place.address)}`
  };
};