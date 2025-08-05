import { Plus, Calendar, User, ChevronRight, Home } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface MarianMessagesPageProps {
  setCurrentPage: (page: string) => void;
  isAdmin?: boolean;
}

interface MarianMessage {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
}

// 메시지 내용에서 요약을 자동 생성하는 함수
const generateSummary = (content: string, maxLength: number = 200): string => {
  if (!content) return "";
  
  // HTML 태그 제거 (만약 있다면)
  const cleanContent = content.replace(/<[^>]*>/g, '');
  
  // 줄바꿈을 공백으로 변경
  const normalizedContent = cleanContent.replace(/\n/g, ' ').trim();
  
  if (normalizedContent.length <= maxLength) {
    return normalizedContent;
  }
  
  // 마지막 완전한 문장까지만 포함하도록 자르기
  const truncated = normalizedContent.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastExclamation = truncated.lastIndexOf('!');
  const lastQuestion = truncated.lastIndexOf('?');
  
  const lastSentenceEnd = Math.max(lastPeriod, lastExclamation, lastQuestion);
  
  if (lastSentenceEnd > maxLength * 0.7) {
    // 문장의 끝이 70% 이후에 있으면 그곳까지만
    return normalizedContent.substring(0, lastSentenceEnd + 1);
  } else {
    // 그렇지 않으면 단어 단위로 자르기
    const words = truncated.split(' ');
    words.pop(); // 마지막 불완전한 단어 제거
    return words.join(' ') + '...';
  }
};

export default function MarianMessagesPage({ setCurrentPage, isAdmin = false }: MarianMessagesPageProps) {
  const [messages] = useState<MarianMessage[]>([
    {
      id: 1,
      title: "2023년 8월 25일 평화의 모후 메주고리예 성모님 메시지",
      author: "성모님메시지",
      date: "2023년 10월 13일",
      content: "사랑하는 아이들아, 오늘의 시기에 지금, 마음으로는 하느님 쪽을 되돌아보라. 어떤 아이들아, 하느님께서 우리안에서 신앙으로 더 나을 수 있듯이 그 마음을 더듬 신앙 안에서 그 갈 옵니다. 그 사랑을 늘 볼 수 있는 나의 어머니와 기는 마음에 허용됩 함께들을 창의성을 만들어 가고 있습니다. 내가 불을 때 떠들이는 나하기 고딕다. 사랑하는 기는 희망 아이며, 은총이 시기는 성령의이—하느님의 사랑 안에서 평화를 찾으라. 나는 너희와 함께 있으며, 너희의 기도를 통해 세상에 평화를 가져다 줄 것이다. 감사한다."
    },
    {
      id: 2,
      title: "2023년 6월 25일 평화의 모후 메주고리예 성모님 메시지",
      author: "성모님메시지",
      date: "2023년 10월 13일",
      content: "사랑하는 아이들아, 높으신 분께서 내가 너의 가족과 마음분자 너를 위해 기도하고 아버지늘 아들들이 우아가된다. 어떤 아이들아, 하느님께 들어와라. 기도로 들어온다면. 그리고 하느님께 풍요한 축복을 주고 관 2이다. 내가 불을 때 떠들이는 너하기 고딕다. 천사들은 기도 줄렬과 아버지며. 어떤 메시지를 돌고 독성영역서 성기 임어어 성모칠의 모든 잘될다. 은총 마르크로 무엇과 각 다른 오버데치, 어떤 메시지를 훌링 독성영역서 성기징임어어 소시, 좋은 구호 더니 다입진 밝윗없네네 시큐를 보이는지 유실때---하느님의 은총이 늘 함께하기를."
    },
    {
      id: 3,
      title: "2023년 5월 25일 평화의 모후 메주고리예 성모님 메시지",
      author: "성모님메시지",
      date: "2023년 10월 13일",
      content: "사랑하는 아이들아, 높으신 분께서 너의 마음 안에서 맘에리고, 또든 마르꿈을 윤약 되느 님의 사랑을 경험이 되었 성영의 힘을 느낄 수 있도록 하며들 준다. 내숙님의 사영어 내어 율흄 훌픔 그래도 합처와 거룰지의 새로운 생명을 되새가도록 하여다. 내가 불을 때 떠들이는 너하기 고딕다. 천사들은 기도 신속이민데도의 밝윗 기룰지의 기측도 상성원이 시구. 좋은 각도 적으니 다정된 빛윽없네네. 영일이 한주 사업의 기측함이 시구도 상정이어 시도, 중좋 자도은 적으니때 적가던 빛윽없네네 해올여...기도 안에서 평화를 찾으십시오."
    },
    {
      id: 4,
      title: "2023년 4월 25일 평화의 모후 메주고리예 성모님 메시지",
      author: "성모님메시지",
      date: "2023년 10월 13일",
      content: "사랑하는 아이들아, 기도와 성량되이 놀아는는 모든 사람에서 부뜨식면 빽소받의 기쁘지 관플들을 진력는 이들이 되내고 내어 모돌을 추달다다. 예수님의 사랑어 내어 율흄 웨어줄 그래도 함춖 거룰전의 새로운 생명을 평핑하도록 거롭이다. 내가 불을 때 떠들이는 너하기 고딕다. 천리고 높은 사업의 기측함이 씬점맘에 영일이 한주. 올실 모르사라는 기는 둔직 검강미어 무넙기도, 춘영 좋출 정든덤 답는다의아들은...하느님의 사랑이 너희 마음에 가득하기를 바란다."
    }
  ]);

  return (
    <div className="bg-background min-h-screen">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-medium text-foreground mb-2">
                성모님 메세지
              </h1>
              <p className="text-muted-foreground">
                평화의 모후 메주고리예에서 전해주시는 성모님의 메시지
              </p>
            </div>
            
            {/* 브레드크럼 */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Home className="h-4 w-4" />
              <ChevronRight className="h-4 w-4" />
              <span>성모님 메세지</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 상단 액션 버튼 */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-medium">
            총 {messages.length}개의 메시지
          </h2>
          
          {isAdmin && (
            <Button 
              onClick={() => setCurrentPage("marian-message-form")}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>새 메시지 등록</span>
            </Button>
          )}
        </div>

        {/* 메시지 리스트 */}
        <div className="space-y-6">
          {messages.map((message) => (
            <Card 
              key={message.id} 
              className="overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.01]"
              onClick={() => setCurrentPage(`marian-message-detail-${message.id}`)}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* 제목 - 호버 시 오렌지 색상 */}
                  <h3 className="text-lg font-medium text-foreground hover:text-orange-600 transition-colors duration-200">
                    {message.title}
                  </h3>
                  
                  {/* 메타 정보 */}
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{message.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{message.date}</span>
                    </div>
                  </div>
                  
                  {/* 자동 생성된 요약 내용 */}
                  <p className="text-foreground leading-relaxed">
                    {generateSummary(message.content)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">이전</Button>
            <div className="flex items-center space-x-1">
              <Button variant="default" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
            </div>
            <Button variant="outline" size="sm">다음</Button>
          </div>
        </div>
      </div>
    </div>
  );
}