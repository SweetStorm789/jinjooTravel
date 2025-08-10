// 공통 타입 정의
export interface User {
  id: number;
  username: string;
  role: 'ADMIN' | 'USER';
}

export interface PilgrimageProduct {
  id: number;
  title: string;
  subtitle: string;
  productCode: string;
  region: string;
  country: string;
  duration: string;
  price: number;
  departureDate: Date;
  returnDate: Date;
  minParticipants: number;
  maxParticipants: number;
  currentParticipants: number;
  description: string;
  highlights: string[];
  includedItems: string[];
  excludedItems: string[];
  notes: string;
  customerPromise: string;
  cancellationPolicy: string;
  otherInfo: string;
  status: 'ACTIVE' | 'FULL' | 'CLOSED';
  isFeatured: boolean;
  isWithPriest: boolean;
  isDirect: boolean;
  tags: string[];
}

export interface PilgrimageItinerary {
  id: number;
  productId: number;
  dayNumber: number;
  title: string;
  description: string;
  activities: string[];
  meals: string;
  accommodation: string;
}

export interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  imageType: 'MAIN' | 'DETAIL' | 'SITE';
  displayOrder: number;
}

// 컴포넌트 Props 타입
export interface PageProps {
  setCurrentPage: (page: string) => void;
  isAdmin?: boolean;
}