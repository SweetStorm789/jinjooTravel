import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Calendar, Users, Star, ArrowRight } from "lucide-react";

export default function FeaturedPackages() {
  const packages = [
    {
      id: 1,
      title: "이스라엘/팔레스타인 성지순례",
      subtitle: "예수님 발자취를 따라가는",
      location: "예루살렘, 베들레헴, 나사렛",
      duration: "7박 8일",
      price: "2,890,000",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop",
      tag: "인기",
      participants: "최대 30명",
      rating: 4.9,
      reviews: 324
    },
    {
      id: 2,
      title: "그리스/터키 성지순례",
      subtitle: "사도 바울의 전도여행길",
      location: "아테네, 고린도, 에베소",
      duration: "8박 9일",
      price: "3,290,000",
      image: "https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=800&auto=format&fit=crop",
      tag: "추천",
      participants: "최대 25명",
      rating: 4.8,
      reviews: 267
    },
    {
      id: 3,
      title: "이탈리아 가톨릭 성지순례",
      subtitle: "바티칸과 로마",
      location: "로마, 바티칸, 아시시",
      duration: "6박 7일",
      price: "2,590,000",
      image: "https://images.unsplash.com/photo-1590588151092-b61cb656eb65?q=80&w=800&auto=format&fit=crop",
      tag: "특가",
      participants: "최대 35명",
      rating: 4.7,
      reviews: 189
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-medium text-gray-600">추천 여행상품</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            믿음의 여행을
            <br />
            <span className="text-gray-600">함께 시작하세요</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            전문 가이드와 함께하는 안전하고 의미있는 성지순례 여행상품을 소개합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <Card key={pkg.id} className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white ${
              index === 1 ? 'lg:scale-105 lg:z-10' : ''
            }`}>
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                    {pkg.tag}
                  </Badge>
                </div>
                
                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center bg-white/90 rounded-full px-3 py-1">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{pkg.rating}</span>
                </div>

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
                    <span className="text-sm">{pkg.location}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {pkg.participants}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {pkg.price.toLocaleString()}원
                      </div>
                      <div className="text-sm text-gray-500">
                        {pkg.reviews}개 후기
                      </div>
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
          <Button variant="outline" size="lg" className="px-8 py-4 text-gray-900 border-gray-300 hover:bg-gray-50">
            모든 상품 보기
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}