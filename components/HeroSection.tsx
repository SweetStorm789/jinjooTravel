import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { ArrowRight, Play } from "lucide-react";
import vaticanImage from "../images/vatican/st-peters-basilica.jpg";
import milanoImage from "../images/italy/milano-duomo.jpg";
import sagradaImage from "../images/spain/sagrada-familia.jpg";
import santiagoImage from "../images/spain/santiago-de-compostela.jpg";

export default function HeroSection({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: vaticanImage,
      title: "바티칸 베드로 대성당",
      subtitle: "세계 가톨릭의 중심지",
      location: "이탈리아 로마",
    },
    {
      image: milanoImage,
      title: "밀라노 두오모 대성당",
      subtitle: "이탈리아의 고딕 건축 걸작",
      location: "이탈리아 밀라노",
    },
    {
      image: sagradaImage,
      title: "사그라다 파밀리아",
      subtitle: "가우디의 미완성 걸작",
      location: "스페인 바르셀로나",
    },
    {
      image: santiagoImage,
      title: "산티아고 데 콤포스텔라",
      subtitle: "순례자들의 마지막 목적지",
      location: "스페인 갈리시아",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-[70vh] bg-gray-50">
      {/* Background image carousel */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
        >
          {/* Blurred background */}
          <ImageWithFallback
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-lg"
            style={{ objectPosition: 'center center' }}
          />
          {/* Main image with directional blur effects */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative overflow-hidden rounded-xl">
              <ImageWithFallback
                src={slide.image}
                alt={slide.title}
                className="max-w-full max-h-full object-contain"
                style={{
                  maskImage: `
                    linear-gradient(to bottom, 
                      rgba(0,0,0,0) 0%, 
                      rgba(0,0,0,0.9) 10%, 
                      rgba(0,0,0,1) 20%, 
                      rgba(0,0,0,1) 80%, 
                      rgba(0,0,0,0.3) 90%, 
                      rgba(0,0,0,0) 100%
                    ),
                    linear-gradient(to right, 
                      rgba(0,0,0,0) 0%, 
                      rgba(0,0,0,0.9) 10%, 
                      rgba(0,0,0,1) 20%, 
                      rgba(0,0,0,1) 80%, 
                      rgba(0,0,0,0.3) 90%, 
                      rgba(0,0,0,0) 100%
                    )
                  `,
                  WebkitMaskImage: `
                    linear-gradient(to bottom, 
                      rgba(0,0,0,0) 0%, 
                      rgba(0,0,0,0.9) 10%, 
                      rgba(0,0,0,1) 20%, 
                      rgba(0,0,0,1) 80%, 
                      rgba(0,0,0,0.9) 90%, 
                      rgba(0,0,0,0) 100%
                    ),
                    linear-gradient(to right, 
                      rgba(0,0,0,0) 0%, 
                      rgba(0,0,0,0.9) 10%, 
                      rgba(0,0,0,1) 20%, 
                      rgba(0,0,0,1) 80%, 
                      rgba(0,0,0,0.9) 90%, 
                      rgba(0,0,0,0) 100%
                    )
                  `,
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in'
                }}
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-black/10 scale-110"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/5 to-transparent scale-110"></div>
        </div>
      ))}

      {/* Content overlay */}
      <div className="relative z-20 h-full flex items-center rounded-[10px] min-h-[70vh]">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-white space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                  <span className="text-sm">
                    믿음과 함께하는 여행
                  </span>
                </div>

                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  성지순례
                  <br />
                  <span className="text-gray-300">
                    전문여행사
                  </span>
                </h1>

                <p className="text-xl text-gray-200 leading-relaxed max-w-lg">
                  30년간 축적된 전문 노하우로 안전하고 의미있는<br />
                  성지순례 여행을 제공합니다.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg"
                  onClick={() => {
                    setCurrentPage("pilgrimage-packages");
                  }}
                >
                  성지순례 일정 보기
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                {/* <Button
                  size="lg"
                  variant="ghost"
                  className="text-white border-white hover:bg-white/20 px-8 py-4 text-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  소개영상 보기
                </Button> */}
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/20">
                <div>
                  <div className="text-3xl font-bold">30+</div>
                  <div className="text-gray-300 text-sm">
                    년 경험
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold">
                    5,000+
                  </div>
                  <div className="text-gray-300 text-sm">
                    만족 고객
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-gray-300 text-sm">
                    성지 코스
                  </div>
                </div>
              </div>
            </div>

            {/* Right content - slide info */}
            <div className="lg:flex lg:justify-end hidden">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-sm">
                <div className="text-white space-y-6">
                  <div>
                    <div className="text-sm text-gray-300 mb-2">
                      {slides[currentSlide].location}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {slides[currentSlide].title}
                    </h3>
                    <p className="text-gray-200">
                      {slides[currentSlide].subtitle}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {slides.map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3"
                      >
                        <button
                          onClick={() => setCurrentSlide(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                            ? "bg-white"
                            : "bg-white/30"
                            }`}
                        />
                        <div
                          className={`text-sm transition-colors duration-300 ${index === currentSlide
                            ? "text-white"
                            : "text-gray-400"
                            }`}
                        >
                          {slides[index].title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom progress bar */}
      {/* <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-white transition-all duration-6000 ease-linear"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div> */}
    </section>
  );
}