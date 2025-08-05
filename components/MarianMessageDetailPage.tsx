import { ArrowLeft, Calendar, User, Edit, Share2, Home, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState, useEffect } from "react";

interface MarianMessageDetailPageProps {
  setCurrentPage: (page: string) => void;
  messageId: string;
  isAdmin?: boolean;
}

interface MarianMessage {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
}

export default function MarianMessageDetailPage({ 
  setCurrentPage, 
  messageId,
  isAdmin = false 
}: MarianMessageDetailPageProps) {
  const [message, setMessage] = useState<MarianMessage | null>(null);

  // 메시지 데이터 로드
  useEffect(() => {
    // 실제로는 API에서 데이터를 가져올 예정
    const messages: MarianMessage[] = [
      {
        id: 1,
        title: "2023년 8월 25일 평화의 모후 메주고리예 성모님 메시지",
        author: "성모님메시지",
        date: "2023년 10월 13일",
        content: "사랑하는 아이들아, 오늘의 시기에 지금, 마음으로는 하느님 쪽을 되돌아보라. 어떤 아이들아, 하느님께서 우리안에서 신앙으로 더 나을 수 있듯이 그 마음을 더듬 신앙 안에서 그 갈 옵니다. 그 사랑을 늘 볼 수 있는 나의 어머니와 기는 마음에 허용됩 함께들을 창의성을 만들어 가고 있습니다.\n\n내가 불을 때 떠들이는 나하기 고딕다. 사랑하는 기는 희망 아이며, 은총이 시기는 성령의이—하느님의 사랑 안에서 평화를 찾으라. 나는 너희와 함께 있으며, 너희의 기도를 통해 세상에 평화를 가져다 줄 것이다.\n\n기도하라, 내 사랑하는 아이들아. 기도는 너희를 하느님께 더 가까이 이끌어 줄 것이며, 너희 마음에 평화를 가져다 줄 것이다. 나는 너희 모두를 사랑하며, 너희가 내 아들 예수님의 길을 따르기를 바란다.\n\n감사한다."
      },
      {
        id: 2,
        title: "2023년 6월 25일 평화의 모후 메주고리예 성모님 메시지",
        author: "성모님메시지",
        date: "2023년 10월 13일",
        content: "사랑하는 아이들아, 높으신 분께서 내가 너의 가족과 마음분자 너를 위해 기도하고 아버지늘 아들들이 우아가된다. 어떤 아이들아, 하느님께 들어와라. 기도로 들어온다면. 그리고 하느님께 풍요한 축복을 주고 관 2이다.\n\n내가 불을 때 떠들이는 너하기 고딕다. 천사들은 기도 줄렬과 아버지며. 어떤 메시지를 돌고 독성영역서 성기 임어어 성모칠의 모든 잘될다. 은총 마르크로 무엇과 각 다른 오버데치, 어떤 메시지를 훌링 독성영역서 성기징임어어 소시, 좋은 구호 더니 다입진 밝윗없네네 시큐를 보이는지 유실때---\n\n하느님의 은총이 늘 함께하기를. 나의 사랑하는 아이들아, 너희가 기도 안에서 평화를 찾기를 바란다."
      },
      {
        id: 3,
        title: "2023년 5월 25일 평화의 모후 메주고리예 성모님 메시지",
        author: "성모님메시지",
        date: "2023년 10월 13일",
        content: "사랑하는 아이들아, 높으신 분께서 너의 마음 안에서 맘에리고, 또든 마르꿈을 윤약 되느 님의 사랑을 경험이 되었 성영의 힘을 느낄 수 있도록 하며들 준다. 내숙님의 사영어 내어 율흄 훌픔 그래도 합처와 거룰지의 새로운 생명을 되새가도록 하여다.\n\n내가 불을 때 떠들이는 너하기 고딕다. 천사들은 기도 신속이민데도의 밝윗 기룰지의 기측도 상성원이 시구. 좋은 각도 적으니 다정된 빛윽없네네. 영일이 한주 사업의 기측함이 시구도 상정이어 시도, 중좋 자도은 적으니때 적가던 빛윽없네네 해올여...\n\n기도 안에서 평화를 찾으십시오. 하느님의 사랑이 너희 마음을 가득 채우기를 바랍니다."
      },
      {
        id: 4,
        title: "2023년 4월 25일 평화의 모후 메주고리예 성모님 메시지",
        author: "성모님메시지",
        date: "2023년 10월 13일",
        content: "사랑하는 아이들아, 기도와 성량되이 놀아는는 모든 사람에서 부뜨식면 빽소받의 기쁘지 관플들을 진력는 이들이 되내고 내어 모돌을 추달다다. 예수님의 사랑어 내어 율흄 웨어줄 그래도 함춖 거룰전의 새로운 생명을 평핑하도록 거롭이다.\n\n내가 불을 때 떠들이는 너하기 고딕다. 천리고 높은 사업의 기측함이 씬점맘에 영일이 한주. 올실 모르사라는 기는 둔직 검강미어 무넙기도, 춘영 좋출 정든덤 답는다의아들은...\n\n하느님의 사랑이 너희 마음에 가득하기를 바란다. 평화를 위해 기도하고, 사랑으로 살아가기를 바란다."
      }
    ];

    const foundMessage = messages.find(m => m.id === parseInt(messageId));
    setMessage(foundMessage || null);
  }, [messageId]);

  if (!message) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-4">메시지를 찾을 수 없습니다</h2>
          <Button onClick={() => setCurrentPage("marian-messages")}>
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* 상단 네비게이션 */}
      <div className="bg-card border-b sticky top-[140px] z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentPage("marian-messages")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>목록으로 돌아가기</span>
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>공유</span>
              </Button>
              {isAdmin && (
                <Button 
                  size="sm"
                  onClick={() => setCurrentPage(`marian-message-form-edit-${messageId}`)}
                  className="flex items-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>수정</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* 브레드크럼 */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Home className="h-4 w-4" />
          <ChevronRight className="h-4 w-4" />
          <button 
            onClick={() => setCurrentPage("marian-messages")}
            className="hover:text-blue-600 transition-colors"
          >
            성모님 메세지
          </button>
          <ChevronRight className="h-4 w-4" />
          <span>메시지 상세</span>
        </div>

        {/* 메시지 상세 내용 */}
        <Card>
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* 제목 */}
              <div>
                <h1 className="text-2xl font-medium text-foreground mb-4">
                  {message.title}
                </h1>
                
                {/* 메타 정보 */}
                <div className="flex items-center space-x-6 text-sm text-muted-foreground pb-6 border-b border-border">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{message.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{message.date}</span>
                  </div>
                  <Badge variant="secondary">메주고리예</Badge>
                </div>
              </div>

              {/* 메시지 내용 */}
              <div className="prose prose-lg max-w-none">
                <div className="text-foreground leading-relaxed whitespace-pre-line">
                  {message.content}
                </div>
              </div>

              {/* 하단 액션 */}
              <div className="pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    평화의 모후 메주고리예에서 전해주시는 성모님의 메시지
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      공유하기
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 다른 메시지들 */}
        <div className="mt-12">
          <h3 className="text-lg font-medium mb-6">다른 성모님 메시지</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <h4 className="font-medium text-sm mb-2 hover:text-orange-600 transition-colors">
                  2023년 6월 25일 평화의 모후 메주고리예 성모님 메시지
                </h4>
                <p className="text-xs text-muted-foreground">2023년 10월 13일</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <h4 className="font-medium text-sm mb-2 hover:text-orange-600 transition-colors">
                  2023년 5월 25일 평화의 모후 메주고리예 성모님 메시지
                </h4>
                <p className="text-xs text-muted-foreground">2023년 10월 13일</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}