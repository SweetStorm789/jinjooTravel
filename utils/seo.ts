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
    title: '루르드 성지 정보 - 진주여행사',
    description: '성모 마리아가 발현하신 루르드 성지 정보. 기적의 샘, 무염시태 동굴, 로사리오 성당 등 주요 순례지를 소개합니다.',
    keywords: '루르드, 성모발현, 베르나데타, 기적의샘, 무염시태동굴',
    ogTitle: '루르드 성지 정보',
    ogDescription: '성모 마리아 발현지 루르드 성지 안내'
  },
  'fatima': {
    title: '파티마 성지 정보 - 진주여행사',
    description: '성모 마리아가 발현하신 파티마 성지 정보. 파티마 성모 발현 대성당, 아잔다 따 고베, 세 목동이 등 순례지를 소개합니다.',
    keywords: '파티마, 성모발현, 루치아, 프란치스코, 히야친타, 포르투갈',
    ogTitle: '파티마 성지 정보',
    ogDescription: '성모 마리아 발현지 파티마 성지 안내'
  },
  'medjugorje': {
    title: '메주고리예 성지 정보 - 진주여행사',
    description: '성모 마리아가 지속적으로 발현하시는 메주고리예 성지 정보. 야고보 성당, 십자가의 길, 발현의 언덕 등을 소개합니다.',
    keywords: '메주고리예, 성모발현, 보스니아, 야고보성당, 십자가의길',
    ogTitle: '메주고리예 성지 정보',
    ogDescription: '현재도 발현이 계속되는 메주고리예 성지 안내'
  },
  'company-history': {
    title: '회사 소개 - 진주여행사',
    description: '20년 경험의 가톨릭 성지순례 전문 여행사 진주여행사를 소개합니다. 안전하고 의미있는 순례를 위한 우리의 철학과 역사를 확인하세요.',
    keywords: '진주여행사, 회사소개, 성지순례 전문, 가톨릭 여행사',
    ogTitle: '진주여행사 소개',
    ogDescription: '20년 경험의 성지순례 전문 여행사'
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
        "telephone": "02-1234-5678",
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

