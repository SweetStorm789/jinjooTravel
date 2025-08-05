import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Church,
  Heart,
  Phone,
  Mail,
  Globe,
  Quote
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface FatimaPageProps {
  setCurrentPage: (page: string) => void;
}

export default function FatimaPage({ setCurrentPage }: FatimaPageProps) {
  const marianSites = [
    { id: "fatima", name: "파티마", country: "포르투갈", active: true },
    { id: "lourdes", name: "루르드", country: "프랑스", active: false },
    { id: "guadalupe", name: "과달루페", country: "멕시코", active: false },
    { id: "medjugorje", name: "메주고리예", country: "보스니아", active: false },
    { id: "knock", name: "녹", country: "아일랜드", active: false },
    { id: "banneux", name: "반뇌", country: "벨기에", active: false },
    { id: "ponmain", name: "퐁맹", country: "프랑스", active: false }
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* 메인 컨텐츠 (3/4) */}
          <div className="lg:col-span-3">
            {/* 헤더 섹션 - 신문 스타일 */}
            <header className="border-b-2 border-foreground pb-8 mb-12">
              <div className="text-center mb-6">
                <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">
                  성모님 발현지 특집
                </p>
                <h1 className="text-6xl md:text-7xl tracking-tight mb-4">
                  파티마
                </h1>
                <p className="text-xl text-muted-foreground italic">
                  Fátima, Portugal • 1917년 성모님 발현의 성지
                </p>
              </div>
              
              <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
                <span>포르투갈 레이리아</span>
                <span>•</span>
                <span>연간 순례자 600만 명</span>
                <span>•</span>
                <span>세계 3대 성지</span>
              </div>
            </header>

            {/* 리드 이미지 */}
            <div className="mb-12">
              <div className="aspect-[21/9] overflow-hidden mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1400&auto=format&fit=crop"
                  alt="파티마 대성당"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-muted-foreground italic text-center">
                파티마 묵주기도의 모후 대성당 전경. 1917년 성모님이 발현하신 자리에 세워진 성지의 중심입니다.
              </p>
            </div>

            {/* 리드 문단 */}
            <div className="mb-12">
              <div className="bg-muted/30 p-8 border-l-4 border-foreground">
                <p className="text-lg leading-relaxed">
                  <span className="text-6xl float-left mr-3 mt-1 leading-none">1</span>
                  917년 5월 13일, 포르투갈의 작은 마을 파티마에서 일어난 일은 
                  가톨릭교회 역사상 가장 중요한 사건 중 하나가 되었습니다. 
                  세 명의 목동 어린이들에게 성모 마리아께서 여섯 차례에 걸쳐 발현하시며 
                  평화와 회개의 메시지를 전하셨고, 이는 오늘날까지 전 세계 
                  가톨릭 신자들의 신앙과 희망의 원천이 되고 있습니다.
                </p>
              </div>
            </div>

            {/* 본문 - 멀티 컬럼 */}
            <article className="space-y-16">
              {/* 발현의 역사 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">발현의 역사</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <p>
                      <span className="text-3xl float-left mr-2 mt-1 leading-none">파</span>
                      티마의 발현은 1916년 평화의 천사가 세 목동 어린이들에게 나타난 것으로 시작되었습니다. 
                      루치아 도스 산토스(10세), 프란치스코 마르토(9세), 히야친타 마르토(7세)는 
                      코바 다 이리아에서 양을 치며 평범한 일상을 보내고 있었습니다.
                    </p>
                    <p>
                      1917년 5월 13일, 세 어린이는 번개가 치는 것을 보고 집으로 돌아가려 했습니다. 
                      그때 작은 참나무 위에서 "천국에서 온" 아름다운 부인이 나타나 
                      매월 13일 이곳으로 와서 기도하라고 말씀하셨습니다.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      성모님께서는 죄인들의 회개를 위해 기도하고, 러시아를 당신의 성심에 봉헌하면 
                      평화가 올 것이라고 말씀하셨습니다. 또한 매일 묵주기도를 바치라고 당부하셨습니다.
                    </p>
                    <p>
                      발현 소식이 퍼지면서 점점 더 많은 사람들이 모여들었고, 
                      마지막 발현인 10월 13일에는 약 7만 명의 군중이 모여 
                      역사상 유명한 '태양의 기적'을 목격했습니다.
                    </p>
                  </div>
                </div>

                {/* 인용구 */}
                <blockquote className="bg-muted/50 p-8 my-8 border-l-4 border-primary italic text-center">
                  <Quote className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg mb-4">
                    "매일 묵주기도를 바치십시오. 죄인들의 회개와 세상의 평화를 위해서입니다."
                  </p>
                  <footer className="text-sm text-muted-foreground">
                    — 파티마의 성모님, 1917년
                  </footer>
                </blockquote>
              </section>

              {/* 세 목동 성인들 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">세 목동 어린이들</h2>
                
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-muted">
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop&crop=face"
                          alt="루치아 도스 산토스"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium mb-2">루치아 도스 산토스</h3>
                      <p className="text-sm text-muted-foreground mb-2">1907-2005 • 가경자</p>
                      <p className="text-sm">세 목동 중 유일하게 성모님의 음성을 들을 수 있었던 주요 목격자</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-muted">
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop&crop=face"
                          alt="성 프란치스코 마르토"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium mb-2">성 프란치스코 마르토</h3>
                      <p className="text-sm text-muted-foreground mb-2">1908-1919 • 성인</p>
                      <p className="text-sm">성모님을 볼 수 있었지만 음성은 들을 수 없었던 순수한 영혼</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-muted">
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=400&auto=format&fit=crop&crop=face"
                          alt="성 히야친타 마르토"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium mb-2">성 히야친타 마르토</h3>
                      <p className="text-sm text-muted-foreground mb-2">1910-1920 • 성인</p>
                      <p className="text-sm">가장 어린 목동으로 성모님을 보고 들을 수 있었던 희생의 증인</p>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-6">
                    <h4 className="font-medium mb-4">세 어린이의 운명</h4>
                    <p className="text-sm leading-relaxed">
                      성모님께서는 프란치스코와 히야친타를 곧 천국으로 데려가실 것이라고 말씀하셨습니다. 
                      실제로 두 어린이는 1918년 스페인 독감으로 세상을 떠났으며, 2017년 교황 프란치스코에 의해 
                      시성되었습니다. 루치아는 2005년까지 살며 파티마의 메시지를 전 세계에 전파했습니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* 연표 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">파티마 연대기</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="border-l-2 border-muted pl-6">
                      <h4 className="font-medium">1916년</h4>
                      <p className="text-sm text-muted-foreground">평화의 천사가 목동들에게 발현</p>
                    </div>
                    
                    <div className="border-l-2 border-primary pl-6">
                      <h4 className="font-medium">1917년 5월-10월</h4>
                      <p className="text-sm text-muted-foreground">성모님 6차례 발현, 태양의 기적</p>
                    </div>
                    
                    <div className="border-l-2 border-muted pl-6">
                      <h4 className="font-medium">1920년</h4>
                      <p className="text-sm text-muted-foreground">교회의 공식 승인</p>
                    </div>
                    
                    <div className="border-l-2 border-muted pl-6">
                      <h4 className="font-medium">1928년</h4>
                      <p className="text-sm text-muted-foreground">묵주기도의 모후 대성당 기공식</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="border-l-2 border-muted pl-6">
                      <h4 className="font-medium">1967년</h4>
                      <p className="text-sm text-muted-foreground">교황 바오로 6세 파티마 방문</p>
                    </div>
                    
                    <div className="border-l-2 border-muted pl-6">
                      <h4 className="font-medium">1982년</h4>
                      <p className="text-sm text-muted-foreground">교황 요한 바오로 2세 감사 순례</p>
                    </div>
                    
                    <div className="border-l-2 border-muted pl-6">
                      <h4 className="font-medium">2000년</h4>
                      <p className="text-sm text-muted-foreground">프란치스코와 히야친타 시복</p>
                    </div>
                    
                    <div className="border-l-2 border-primary pl-6">
                      <h4 className="font-medium">2017년</h4>
                      <p className="text-sm text-muted-foreground">프란치스코와 히야친타 시성식</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 주요 성지들 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">주요 성지</h2>
                
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-medium mb-4">발현 소성당</h3>
                      <p className="text-sm leading-relaxed mb-4">
                        성모님이 발현하신 바로 그 자리에 세워진 작은 성당입니다. 
                        참나무가 있던 곳에 제대를 설치했으며, 전 세계 순례자들이 
                        24시간 기도를 바치는 파티마 성지의 심장부입니다.
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 24시간 기도 가능</li>
                        <li>• 국제 미사 봉헌</li>
                        <li>• 촛불 봉헌소</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-medium mb-4">묵주기도의 모후 대성당</h3>
                      <p className="text-sm leading-relaxed mb-4">
                        1928년 기공하여 1953년 축성된 파티마의 주 성당입니다. 
                        성 프란치스코와 성 히야친타의 무덤이 있으며, 
                        15단 묵주기도가 성당 내부에 아름답게 조각되어 있습니다.
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 높이 67m의 종탑</li>
                        <li>• 성인들의 무덤</li>
                        <li>• 15단 묵주 조각</li>
                      </ul>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-medium mb-4">지극히 거룩하신 삼위일체 대성당</h3>
                      <p className="text-sm leading-relaxed mb-4">
                        2007년 완공된 현대적인 대성당으로 8,633명을 수용할 수 있습니다. 
                        대규모 국제 순례와 특별한 전례를 위해 건립되었으며, 
                        파티마 성지의 새로운 중심 역할을 하고 있습니다.
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 8,633명 수용</li>
                        <li>• 현대 건축 양식</li>
                        <li>• 대규모 순례 미사</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-medium mb-4">발리뇨스</h3>
                      <p className="text-sm leading-relaxed mb-4">
                        네 번째 발현이 일어난 곳으로, 목동들이 관리들에게 체포되어 
                        8월 13일 발현을 놓친 후 8월 19일에 이곳에서 성모님을 뵈었습니다. 
                        십자가의 길과 천사의 발현지가 있습니다.
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 십자가의 길</li>
                        <li>• 천사의 바위</li>
                        <li>• 목동들의 생가</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 파티마의 메시지 */}
              <section>
                <h2 className="text-3xl mb-8 pb-4 border-b border-muted">파티마의 메시지</h2>
                
                <div className="bg-muted/50 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                      <h4 className="font-medium mb-4">기도</h4>
                      <p className="text-sm leading-relaxed">
                        매일 묵주기도를 바치며 죄인들의 회개와 세상의 평화를 위해 기도할 것
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-4">희생</h4>
                      <p className="text-sm leading-relaxed">
                        죄인들의 구원을 위해 기꺼이 희생하고 보속을 행할 것
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-4">봉헌</h4>
                      <p className="text-sm leading-relaxed">
                        러시아를 성모님의 티 없으신 성심에 봉헌하여 평화를 이룰 것
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </article>
          </div>

          {/* 사이드바 (1/4) */}
          <div className="lg:col-span-1">
            <div className="sticky top-[200px] space-y-8">
              {/* 성모님발현지 메뉴 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-red-500" />
                    성모님발현지
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {marianSites.map((site) => (
                    <button
                      key={site.id}
                      onClick={() => site.id !== "fatima" && setCurrentPage(site.id)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                        site.active
                          ? "font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{site.name}</span>
                        <span className="text-xs">{site.country}</span>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* 방문 정보 */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">방문 정보</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-medium">위치</p>
                        <p className="text-muted-foreground">포르투갈 파티마<br />리스본에서 130km</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-medium">주요 축일</p>
                        <p className="text-muted-foreground">매월 13일<br />5월 13일, 10월 13일</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-medium">미사 시간</p>
                        <p className="text-muted-foreground">매일 여러 차례<br />한국어 미사 별도</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Users className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-medium">순례객</p>
                        <p className="text-muted-foreground">연간 600만 명<br />세계 3대 성지</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* 순례 문의 */}
                <div>
                  <h3 className="font-medium mb-4">순례 문의</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      전화 상담
                    </Button>
                    <Button className="w-full justify-start" variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      이메일 문의
                    </Button>
                    <Button className="w-full justify-start" variant="outline" size="sm">
                      <Globe className="h-4 w-4 mr-2" />
                      순례 일정
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* 파티마 기도문 */}
                <div>
                  <h3 className="font-medium mb-4">파티마 기도문</h3>
                  <div className="text-sm leading-relaxed p-4 bg-muted/30 italic">
                    <p className="mb-2">
                      "오, 내 예수님, 저희의 죄를 용서하시고 저희를 지옥의 불에서 구하시며..."
                    </p>
                    <p className="text-xs text-muted-foreground text-right">
                      - 파티마의 기도
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}