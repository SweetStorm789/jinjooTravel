import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Calendar, Users, Star, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { getSafeBaseUrl } from '../src/lib/constants';

interface FeaturedPackage {
  id: number;
  title: string;
  subtitle: string;
  region: string;
  duration: string;
  price: number;
  image_url?: string;
  status: string;
  max_people: number;
  rating?: number;
  reviews?: number;
}

interface FeaturedPackagesProps {
  setCurrentPage: (page: string) => void;
}

export default function FeaturedPackages({ setCurrentPage }: FeaturedPackagesProps) {
  const [packages, setPackages] = useState<FeaturedPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPackages = async () => {
      try {
        const baseUrl = getSafeBaseUrl();
        
        // BASE_URL이 비어있거나 유효하지 않은 경우 처리
        if (!baseUrl || baseUrl === '') {
          setPackages([]);
          return;
        }
        
        const response = await axios.get(`${baseUrl}/api/packages`);

        // 응답 데이터 구조 확인 및 안전한 처리
        let packagesData;
        if (response.data && Array.isArray(response.data.packages)) {
          packagesData = response.data.packages;
        } else if (Array.isArray(response.data)) {
          packagesData = response.data;
        } else {
          console.warn('⚠️ Response data is not an array or does not have packages property');
          packagesData = [];
        }
        
        if (!Array.isArray(packagesData)) {
          console.error('❌ packagesData is not an array, cannot use filter');
          console.log('🔄 Using fallback dummy data');
          setPackages([]);
          return;
        }
        
        const publishedPackages = packagesData.filter((pkg: any) => pkg.status === 'published');
        
        // published 패키지가 없으면 빈 배열 설정
        if (publishedPackages.length === 0) {
          console.log('🔄 No published packages found, setting empty array');
          setPackages([]);
          return;
        }
        
        const featuredPackages = publishedPackages.slice(0, 6)
          .map((pkg: any) => {
            
            // 메인 이미지 찾기
            const mainImage = pkg.images?.find((img: any) => img.image_type === 'main');
            const firstImage = pkg.images?.[0];
            const imageUrl = mainImage || firstImage;
            


            return {
              id: pkg.id,
              title: pkg.title,
              subtitle: pkg.subtitle,
              region: pkg.region,
              duration: pkg.duration,
              price: pkg.price,
              image_url: imageUrl ? `${baseUrl}/uploads/${imageUrl.image_url.split('/').pop()}` : '/placeholder-image.jpg',
              status: pkg.status,
              max_people: pkg.max_people,
              rating: 4.8, // 임시 평점
              reviews: Math.floor(Math.random() * 300) + 100 // 임시 리뷰 수
            };
          });
        setPackages(featuredPackages);
      } catch (error: any) {
        console.error('❌ Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          config: error.config
        });
        
        // 네트워크 에러나 서버 연결 실패 시 빈 배열 설정
        if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
          console.log('🔄 Network error, setting empty array');
        }
        
        // 에러 시 빈 배열 설정
        setPackages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedPackages();
  }, []);

  if (isLoading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden border-0 shadow-lg animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-medium text-gray-600">추천 성지순례</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            믿음의 여행을
            <br />
            <span className="text-gray-600">함께 시작하세요</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            전문 가이드와 함께하는 안전하고 의미있는 성지순례를 소개합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <Card 
              key={pkg.id} 
              className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white ${
                index === 1 ? 'lg:scale-105 lg:z-10' : ''
              }`}
              onClick={() => setCurrentPage(`package-detail-${pkg.id}`)}
            >
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={pkg.image_url}
                  alt={pkg.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Rating */}
                {/* <div className="absolute top-4 right-4 flex items-center bg-white/90 rounded-full px-3 py-1">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{pkg.rating}</span>
                </div> */}

                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-bold mb-2">{pkg.subtitle}</h3>
                  <h4 className="text-white/80">{pkg.title}</h4>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{pkg.region}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      최대 {pkg.max_people}명
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {(pkg.price / 10000).toFixed(0)}만원
                      </div>
                      {/* <div className="text-sm text-gray-500">
                        {pkg.reviews}개 후기
                      </div> */}
                    </div>
                    <Button className="bg-gray-900 hover:bg-gray-800 text-white group-hover:scale-105 transition-transform">
                      상세보기
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-4 text-gray-900 border-gray-300 hover:bg-gray-50"
            onClick={() => setCurrentPage("pilgrimage-packages")}
          >
            성지순례 일정 보기
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}