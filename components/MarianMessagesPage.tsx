import { Plus, Calendar, User, ChevronRight, Home, Loader2, AlertCircle, ChevronLeft } from "lucide-react";
import { BASE_URL } from '@/lib/constants';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { useState, useEffect } from "react";

interface MarianMessagesPageProps {
  setCurrentPage: (page: string) => void;
  isAdmin?: boolean;
}

interface MarianMessage {
  id: string;
  message_date: string;
  content_message: string;
  prayer_priest: string;
  prayer_intent: string;
  created_at: string;
  updated_at: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
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

// 날짜 포맷팅 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 제목 생성 함수 (날짜 기반)
const generateTitle = (messageDate: string) => {
  const formattedDate = formatDate(messageDate);
  return `${formattedDate} 평화의 모후 메주고리예 성모님 메시지`;
};

export default function MarianMessagesPage({ setCurrentPage, isAdmin = false }: MarianMessagesPageProps) {
  const [messages, setMessages] = useState<MarianMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  // DB에서 메시지 목록 가져오기 (페이징 포함)
  const fetchMessages = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      setError(null);

      // 먼저 페이징 파라미터 없이 시도, 실패하면 전체 데이터 가져와서 클라이언트 페이징
      let response;
      try {
        response = await fetch(`${BASE_URL}/api/marian-messages?page=${page}&limit=${limit}`);
      } catch {
        response = await fetch(`${BASE_URL}/api/marian-messages`);
      }

      if (!response.ok) {
        throw new Error('메시지 목록을 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      if (data.success) {
        const allMessages = data.data || [];
        
        // 서버에서 페이징 정보를 제공하는 경우
        if (data.pagination) {
          setMessages(allMessages);
          setPagination({
            currentPage: data.pagination.currentPage,
            totalPages: data.pagination.totalPages,
            totalItems: data.pagination.totalItems,
            itemsPerPage: data.pagination.itemsPerPage
          });
        } else {
          // 서버에서 페이징을 지원하지 않는 경우 클라이언트에서 처리
          const totalItems = allMessages.length;
          const totalPages = Math.ceil(totalItems / limit);
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          const paginatedMessages = allMessages.slice(startIndex, endIndex);

          setMessages(paginatedMessages);
          setPagination({
            currentPage: page,
            totalPages: totalPages,
            totalItems: totalItems,
            itemsPerPage: limit
          });
        }
      } else {
        setError(data.message || '메시지 목록을 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('메시지 목록 로드 실패:', error);
      setError('서버와의 연결에 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages && page !== pagination.currentPage) {
      fetchMessages(page, pagination.itemsPerPage);
      
      // 페이지 변경 시 화면 상단으로 스크롤
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchMessages();
  }, []);

  // 로딩 중인 경우
  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-muted-foreground">메시지 목록을 불러오는 중...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-medium text-foreground mb-2">
                성모님 메시지
              </h1>
              <p className="text-muted-foreground">
                평화의 모후 메주고리예에서 전해주시는 성모님의 메시지
              </p>
            </div>
            
            {/* 브레드크럼 */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Home className="h-4 w-4" />
              <ChevronRight className="h-4 w-4" />
              <span>성모님 메시지</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 에러 메시지 */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* 상단 액션 버튼 */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-medium">
              총 {pagination.totalItems}개의 메시지
            </h2>
            {pagination.totalItems > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {pagination.currentPage}페이지 / {pagination.totalPages}페이지 
                ({((pagination.currentPage - 1) * pagination.itemsPerPage) + 1}-
                {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)}번째)
              </p>
            )}
          </div>
          
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

        {/* 메시지가 없는 경우 */}
        {messages.length === 0 && !loading && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">등록된 메시지가 없습니다</h3>
                  <p className="text-gray-500 mt-1">첫 번째 성모님 메시지를 등록해보세요</p>
                </div>
                {isAdmin && (
                  <Button onClick={() => setCurrentPage("marian-message-form")} className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    메시지 등록하기
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

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
                    {generateTitle(message.message_date)}
                  </h3>
                  
                  {/* 메타 정보 */}
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>성모님메시지</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(message.created_at).toLocaleDateString('ko-KR')}</span>
                    </div>
                  </div>
                  
                  {/* 자동 생성된 요약 내용 */}
                  <p className="text-foreground leading-relaxed">
                    {generateSummary(message.content_message)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 페이지네이션 */}
        {pagination.totalItems > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-2">
              {/* 이전 페이지 버튼 */}
              {pagination.totalPages > 1 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={pagination.currentPage === 1}
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  className="flex items-center space-x-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>이전</span>
                </Button>
              )}

              {/* 페이지 번호들 */}
              <div className="flex items-center space-x-1">
                {(() => {
                  const pages: any[] = [];
                  const maxVisiblePages = 5;
                  let startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
                  let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);
                  
                  // 끝 페이지 기준으로 시작 페이지 재조정
                  if (endPage - startPage + 1 < maxVisiblePages) {
                    startPage = Math.max(1, endPage - maxVisiblePages + 1);
                  }

                  // 첫 페이지
                  if (startPage > 1) {
                    pages.push(
                      <Button 
                        key={1}
                        variant={1 === pagination.currentPage ? "default" : "outline"} 
                        size="sm"
                        onClick={() => handlePageChange(1)}
                        className="min-w-[40px]"
                      >
                        1
                      </Button>
                    );
                    if (startPage > 2) {
                      pages.push(<span key="ellipsis1" className="px-2 text-muted-foreground">...</span>);
                    }
                  }

                  // 중간 페이지들
                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <Button 
                        key={i}
                        variant={i === pagination.currentPage ? "default" : "outline"} 
                        size="sm"
                        onClick={() => handlePageChange(i)}
                        className="min-w-[40px]"
                      >
                        {i}
                      </Button>
                    );
                  }

                  // 마지막 페이지
                  if (endPage < pagination.totalPages) {
                    if (endPage < pagination.totalPages - 1) {
                      pages.push(<span key="ellipsis2" className="px-2 text-muted-foreground">...</span>);
                    }
                    pages.push(
                      <Button 
                        key={pagination.totalPages}
                        variant={pagination.totalPages === pagination.currentPage ? "default" : "outline"} 
                        size="sm"
                        onClick={() => handlePageChange(pagination.totalPages)}
                        className="min-w-[40px]"
                      >
                        {pagination.totalPages}
                      </Button>
                    );
                  }

                  return pages;
                })()}
              </div>

              {/* 다음 페이지 버튼 */}
              {pagination.totalPages > 1 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={pagination.currentPage === pagination.totalPages}
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  className="flex items-center space-x-1"
                >
                  <span>다음</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}