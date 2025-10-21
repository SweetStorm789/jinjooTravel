// SEO 메타 태그 관리를 위한 유틸리티 함수들

export interface PageMeta {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

/**
 * 페이지별 메타 정보
 */
export const pageMetaData: Record<string, PageMeta> = {
  'home': {
    title: '진주여행사 - 가톨릭 성지순례 전문',
    description: '20년 경험의 가톨릭 성지순례 전문 여행사. 바티칸, 루르드, 파티마, 메주고리예 등 세계 각지 성지를 안전하고 의미있게 순례하세요.',
    keywords: '가톨릭, 성지순례, 바티칸, 루르드, 파티마, 메주고리예, 여행사, 진주여행사',
    ogTitle: '진주여행사 - 가톨릭 성지순례 전문',
    ogDescription: '20년 경험의 가톨릭 성지순례 전문 여행사'
  },
  'pilgrimage-packages': {
    title: '성지순례 일정 - 진주여행사',
    description: '바티칸, 이스라엘, 유럽 성지순례 일정을 확인하세요. 신부님 동행, 1급 호텔, 현지 가이드로 안전하고 의미있는 순례를 제공합니다.',
    keywords: '성지순례 일정, 바티칸 순례, 이스라엘 순례, 유럽 성지, 가톨릭 여행, 성지순례',
    ogTitle: '성지순례 일정 - 진주여행사',
    ogDescription: '전문 가이드와 함께하는 안전한 성지순례'
  },
  'vatican': {
    title: '바티칸 성지 정보 - 진주여행사',
    description: '가톨릭의 중심지 바티칸 성지 정보. 베드로 대성당, 시스티나 성당, 바티칸 박물관 등 주요 성지와 순례 정보를 제공합니다.',
    keywords: '바티칸, 베드로 대성당, 시스티나 성당, 바티칸 박물관, 로마 성지',
    ogTitle: '바티칸 성지 정보',
    ogDescription: '가톨릭의 중심지 바티칸 주요 성지 안내'
  },
  'lourdes': {
    title: '루르드 성모 발현지 정보 - 진주여행사',
    description: '성모 마리아가 베르나데트에게 발현하신 루르드 성모 발현지 정보. 기적의 샘, 무염시태 동굴, 로사리오 성당 등 주요 순례지를 소개합니다.',
    keywords: '루르드, 성모발현, 베르나데트, 기적의샘, 무염시태동굴, 프랑스',
    ogTitle: '루르드 성모 발현지 정보',
    ogDescription: '성모 마리아가 발현하신 루르드 성지 안내'
  },
  'fatima': {
    title: '파티마 성모 발현지 정보 - 진주여행사',
    description: '성모 마리아가 세 목동에게 발현하신 파티마 성모 발현지 정보. 파티마 성모 발현 대성당, 아잔다 따 고베, 세 목동이 등 순례지를 소개합니다.',
    keywords: '파티마, 성모발현, 루치아, 프란치스코, 히야친타, 포르투갈, 세목동',
    ogTitle: '파티마 성모 발현지 정보',
    ogDescription: '성모 마리아가 발현하신 파티마 성지 안내'
  },
  'medjugorje': {
    title: '메주고리예 성모 발현지 정보 - 진주여행사',
    description: '성모 마리아가 지속적으로 발현하시는 메주고리예 성모 발현지 정보. 야고보 성당, 십자가의 길, 발현의 언덕 등을 소개합니다.',
    keywords: '메주고리예, 성모발현, 보스니아, 야고보성당, 십자가의길, 평화의여왕',
    ogTitle: '메주고리예 성모 발현지 정보',
    ogDescription: '현재도 발현이 계속되는 메주고리예 성지 안내'
  },
  'company-history': {
    title: '회사 소개 - 진주여행사',
    description: '20년 경험의 가톨릭 성지순례 전문 여행사 진주여행사를 소개합니다. 안전하고 의미있는 순례를 위한 우리의 철학과 역사를 확인하세요.',
    keywords: '진주여행사, 회사소개, 성지순례 전문, 가톨릭 여행사',
    ogTitle: '진주여행사 소개',
    ogDescription: '20년 경험의 성지순례 전문 여행사'
  },
  'greece': {
    title: '그리스 성지 정보 - 진주여행사',
    description: '사도 바오로의 전도 여행지 그리스 성지 정보. 아테네, 코린토, 데살로니카, 필리피 등 성서의 땅을 순례하세요.',
    keywords: '그리스, 아테네, 코린토, 데살로니카, 필리피, 사도바오로, 성서순례',
    ogTitle: '그리스 성지 정보',
    ogDescription: '사도 바오로의 전도 여행지 그리스 성지 안내'
  },
  'spain': {
    title: '스페인 성지 정보 - 진주여행사',
    description: '성 야고보의 무덤이 있는 산티아고 데 콤포스텔라와 성 테레사, 성 이냐시오의 고향 스페인 성지 정보를 제공합니다.',
    keywords: '스페인, 산티아고데콤포스텔라, 성야고보, 성테레사, 성이냐시오, 아빌라, 로욜라',
    ogTitle: '스페인 성지 정보',
    ogDescription: '성 야고보의 무덤이 있는 스페인 성지 안내'
  },
  'israel': {
    title: '이스라엘 성지 정보 - 진주여행사',
    description: '예수님의 고향 이스라엘 성지 정보. 예루살렘, 베들레헴, 나자렛, 갈릴래아 등 성서의 땅을 순례하세요.',
    keywords: '이스라엘, 예루살렘, 베들레헴, 나자렛, 갈릴래아, 성지순례, 성서순례',
    ogTitle: '이스라엘 성지 정보',
    ogDescription: '예수님의 고향 이스라엘 성지 안내'
  },
  'egypt': {
    title: '이집트 성지 정보 - 진주여행사',
    description: '성가족의 피난지 이집트 성지 정보. 카이로, 알렉산드리아, 시나이 산 등 성서의 땅을 순례하세요.',
    keywords: '이집트, 카이로, 알렉산드리아, 시나이산, 성가족피난, 성서순례',
    ogTitle: '이집트 성지 정보',
    ogDescription: '성가족의 피난지 이집트 성지 안내'
  },
  'italy': {
    title: '이탈리아 성지 정보 - 진주여행사',
    description: '가톨릭의 중심지 이탈리아 성지 정보. 로마, 아시시, 시에나, 오르비에또 등 이탈리아의 주요 성지들을 소개합니다.',
    keywords: '이탈리아, 로마, 아시시, 시에나, 오르비에또, 성지순례, 가톨릭성지',
    ogTitle: '이탈리아 성지 정보',
    ogDescription: '가톨릭의 중심지 이탈리아 성지 안내'
  },
  'rome': {
    title: '로마 성지 정보 - 진주여행사',
    description: '가톨릭의 중심지 로마 성지 정보. 성 베드로 대성당, 성 바오로 대성당, 성 요한 라테란 대성당 등 주요 성지들을 소개합니다.',
    keywords: '로마, 성베드로대성당, 성바오로대성당, 성요한라테란대성당, 로마성지',
    ogTitle: '로마 성지 정보',
    ogDescription: '가톨릭의 중심지 로마 성지 안내'
  },
  'assisi': {
    title: '아시시 성지 정보 - 진주여행사',
    description: '성 프란치스코의 고향 아시시 성지 정보. 성 프란치스코 대성당, 성 클라라 대성당 등 프란치스코회의 발상지를 순례하세요.',
    keywords: '아시시, 성프란치스코, 성클라라, 프란치스코회, 아시시성지',
    ogTitle: '아시시 성지 정보',
    ogDescription: '성 프란치스코의 고향 아시시 성지 안내'
  },
  'sangiovannirotondo': {
    title: '산조반니로톤도 성지 정보 - 진주여행사',
    description: '성 파도바의 성 비오 신부가 살았던 산조반니로톤도 성지 정보. 성 비오 신부의 무덤과 발현지 등을 소개합니다.',
    keywords: '산조반니로톤도, 성비오신부, 성파도바, 성비오발현지, 이탈리아성지',
    ogTitle: '산조반니로톤도 성지 정보',
    ogDescription: '성 비오 신부의 고향 산조반니로톤도 성지 안내'
  },
  'loreto': {
    title: '로레토 성지 정보 - 진주여행사',
    description: '성가족의 집이 있는 로레토 성지 정보. 성가족의 집 성당과 성모님의 발현지 로레토를 순례하세요.',
    keywords: '로레토, 성가족의집, 성가족의집성당, 성모발현지, 이탈리아성지',
    ogTitle: '로레토 성지 정보',
    ogDescription: '성가족의 집이 있는 로레토 성지 안내'
  },
  'siena': {
    title: '시에나 성지 정보 - 진주여행사',
    description: '성녀 카타리나의 고향 시에나 성지 정보. 성 도미니코 대성당과 성녀 카타리나의 생가 등을 소개합니다.',
    keywords: '시에나, 성녀카타리나, 성도미니코대성당, 시에나성지, 이탈리아성지',
    ogTitle: '시에나 성지 정보',
    ogDescription: '성녀 카타리나의 고향 시에나 성지 안내'
  },
  'orviettoo': {
    title: '오르비에또 성지 정보 - 진주여행사',
    description: '성체기적이 일어난 오르비에또 성지 정보. 오르비에또 대성당과 성체기적의 역사를 소개합니다.',
    keywords: '오르비에또, 성체기적, 오르비에또대성당, 성체성사, 이탈리아성지',
    ogTitle: '오르비에또 성지 정보',
    ogDescription: '성체기적이 일어난 오르비에또 성지 안내'
  },
  'lanciano': {
    title: '란치아노 성지 정보 - 진주여행사',
    description: '세계 최초의 성체기적이 일어난 란치아노 성지 정보. 성체기적 성당과 성체기적의 역사를 소개합니다.',
    keywords: '란치아노, 성체기적, 성체기적성당, 성체성사, 이탈리아성지',
    ogTitle: '란치아노 성지 정보',
    ogDescription: '세계 최초의 성체기적이 일어난 란치아노 성지 안내'
  },
  'turkiye': {
    title: '튀르키예 성지 정보 - 진주여행사',
    description: '사도 바오로의 고향과 초기 교회의 발상지 튀르키예 성지 정보. 안티오키아, 에페소, 이스탄불 등을 소개합니다.',
    keywords: '튀르키예, 안티오키아, 에페소, 이스탄불, 사도바오로, 초기교회',
    ogTitle: '튀르키예 성지 정보',
    ogDescription: '사도 바오로의 고향 튀르키예 성지 안내'
  },
  'france': {
    title: '프랑스 성지 정보 - 진주여행사',
    description: '루르드, 파리, 리용 등 프랑스의 주요 성지 정보. 성모 발현지와 성인들의 고향을 순례하세요.',
    keywords: '프랑스, 루르드, 파리, 리용, 성모발현지, 성지순례',
    ogTitle: '프랑스 성지 정보',
    ogDescription: '루르드와 파리 등 프랑스 성지 안내'
  },
  'guadalupe': {
    title: '과달루페 성모 발현지 정보 - 진주여행사',
    description: '성모 마리아가 후안 디에고에게 발현하신 과달루페 성모 발현지 정보. 틸마 성모와 성모의 외투 등을 소개합니다.',
    keywords: '과달루페, 성모발현, 후안디에고, 틸마성모, 멕시코, 성모의외투',
    ogTitle: '과달루페 성모 발현지 정보',
    ogDescription: '성모 마리아가 발현하신 과달루페 성지 안내'
  },
  'banneux': {
    title: '바뇌 성모 발현지 정보 - 진주여행사',
    description: '성모 마리아가 마리에트 베코에게 발현하신 바뇌 성모 발현지 정보. 가난한 성모님과 치유의 샘 등을 소개합니다.',
    keywords: '바뇌, 성모발현, 마리에트베코, 가난한성모님, 치유의샘, 벨기에',
    ogTitle: '바뇌 성모 발현지 정보',
    ogDescription: '성모 마리아가 발현하신 바뇌 성지 안내'
  }
};

/**
 * 메타 태그를 업데이트하는 함수
 */
export const updateMetaTags = (page: string, customMeta?: Partial<PageMeta>) => {
  const meta = { ...pageMetaData[page] || pageMetaData['home'], ...customMeta };
  
  // Title 업데이트
  document.title = meta.title;
  
  // Description 메타 태그
  updateMetaTag('description', meta.description);
  
  // Keywords 메타 태그
  updateMetaTag('keywords', meta.keywords);
  
  // Open Graph 메타 태그들
  updateMetaTag('og:title', meta.ogTitle || meta.title, 'property');
  updateMetaTag('og:description', meta.ogDescription || meta.description, 'property');
  updateMetaTag('og:type', 'website', 'property');
  updateMetaTag('og:url', window.location.href, 'property');
  
  if (meta.ogImage) {
    updateMetaTag('og:image', meta.ogImage, 'property');
  }
  
  // Twitter Card 메타 태그들
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', meta.ogTitle || meta.title);
  updateMetaTag('twitter:description', meta.ogDescription || meta.description);
};

/**
 * 개별 메타 태그를 업데이트하는 헬퍼 함수
 */
const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  
  meta.content = content;
};

/**
 * 구조화된 데이터 (JSON-LD) 추가
 */
export const updateStructuredData = (page: string) => {
  // 기존 구조화된 데이터 제거
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  let structuredData: any = null;
  
  switch (page) {
    case 'home':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "name": "진주여행사",
        "description": "가톨릭 성지순례 전문 여행사",
        "url": window.location.origin,
        "telephone": "02-738-0747",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "KR",
          "addressLocality": "서울"
        },
        "speciality": "가톨릭 성지순례"
      };
      break;
    case 'pilgrimage-packages':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "성지순례 일정",
        "provider": {
          "@type": "TravelAgency",
          "name": "진주여행사"
        },
        "description": "바티칸, 이스라엘, 유럽 등 세계 각지 성지순례 일정"
      };
      break;
  }
  
  if (structuredData) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }
};

