// 공통 타입 정의
export interface User {
  id: number;
  username: string;
  role: 'ADMIN' | 'USER';
}

export interface PilgrimageProduct {
  id: number;
  title: string;
  productCode: string;
  region: string;
  country: string;
  duration: number;
  price: number;
  departureDate: Date;
  returnDate: Date;
  minParticipants: number;
  maxParticipants: number;
  currentParticipants: number;
  description: string;
  includedItems: string[];
  excludedItems: string[];
  notes: string;
  status: 'ACTIVE' | 'FULL' | 'CLOSED';
  isFeatured: boolean;
}

export interface PilgrimageItinerary {
  id: number;
  productId: number;
  dayNumber: number;
  location: string;
  description: string;
  meals: string;
  accommodation: string;
  transportation: string;
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