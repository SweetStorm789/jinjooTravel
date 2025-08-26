import { Card, CardContent } from "./ui/card";
import { Shield, Users, Award, Clock, CheckCircle, Star } from "lucide-react";

export default function CompanyFeatures() {
  const features = [
    {
      icon: Shield,
      title: "안전한 여행",
      description: "전문 가이드와 함께하는 체계적인 성지순례",
      stats: "100% 안전 보장"
    },
    {
      icon: Users,
      title: "30년 경험",
      description: "축적된 전문 노하우와 현지 네트워크",
      stats: "5,000+ 고객"
    },
    {
      icon: Award,
      title: "품질 보증",
      description: "고객만족도 검증된 프로그램",
      stats: "98% 만족도"
    },
    {
      icon: Clock,
      title: "현지 전문가",
      description: "각 지역별 전문 현지 가이드와 현지 네트워크",
      stats: "현지 전문 가이드"
    }
  ];

  const testimonials = [
    {
      name: "박 바오로",
      rating: 5,
      comment: "수백 명의 기도식구들은 쏟아지는 은총에 기쁨 넘쳐 순례길에서 돌아온다. 그리고 그 순례의 삶을 우리 현장에서 살기 위해 애를 쓴다..",
      location: "부산"
    },
    {
      name: "박민수",
      rating: 5,
      comment: "안전하고 체계적인 일정 관리로 편안한 여행을 할 수 있었습니다.",
      location: "부산"
    },
    {
      name: "이정숙",
      rating: 5,
      comment: "20년 경험이 느껴지는 완벽한 서비스였습니다. 추천합니다!",
      location: "대구"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Features Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-white rounded-full px-4 py-2 mb-6 shadow-sm">
            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">진주여행사의 약속</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            믿을 수 있는
            <br />
            <span className="text-gray-600">여행 파트너</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="text-center bg-white border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-6 group-hover:bg-gray-900 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-gray-700 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                <div className="text-sm font-semibold text-gray-900 bg-gray-100 rounded-full px-4 py-2 inline-block">
                  {feature.stats}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="bg-white rounded-3xl p-12 shadow-sm">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">고객 후기</h3>
            <p className="text-gray-600">실제 고객들이 들려주는 진주여행사 이야기</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.comment}"
                </blockquote>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <span className="font-semibold text-gray-700">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "20+", label: "년 경험" },
            { number: "5,000+", label: "만족 고객" },
            { number: "50+", label: "성지 코스" },
            { number: "98%", label: "고객 만족도" }
          ].map((stat, index) => (
            <div key={index} className="p-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}