export interface PilgrimagePackage {
  id?: number;
  title: string;
  subtitle?: string;
  description: string;
  region: string;
  duration: string;
  price: number;
  departure_date: Date;
  arrival_date: Date;
  max_people: number;
  highlights: string;
  status: 'draft' | 'published' | 'closed';
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface PackageItinerary {
  id?: number;
  package_id: number;
  day_number: number;
  day_label: string;
  title: string;
  description?: string;
  activities: string;
  meals?: string;
  accommodation?: string;
  created_at?: Date;
}

export interface PackageImage {
  id?: number;
  package_id: number;
  image_url: string;
  image_type: 'main' | 'detail';
  sort_order: number;
  created_at?: Date;
}
