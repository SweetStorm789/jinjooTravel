import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { ArrowLeft, Calendar, Save, Loader2, AlertCircle } from "lucide-react";
import { BASE_URL } from '@/lib/constants';
import { Alert, AlertDescription } from "./ui/alert";

interface MarianMessageFormPageProps {
  setCurrentPage: (page: string) => void;
  messageId?: string;
}

interface MessageFormData {
  message_date: string;
  content_message: string;
  prayer_priest: string;
  prayer_intent: string;
}

export default function MarianMessageFormPage({ 
  setCurrentPage, 
  messageId 
}: MarianMessageFormPageProps) {
  const isEdit = !!messageId;

  // 현재 달의 25일을 기본값으로 생성하는 함수
  const getDefaultDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const defaultDate = new Date(year, month, 25);
  
    // 로컬 기준 YYYY-MM-DD
    return defaultDate.toLocaleDateString('sv-SE'); // 'sv-SE' → YYYY-MM-DD 형식
  };

  const [formData, setFormData] = useState<MessageFormData>({
    message_date: isEdit ? '' : getDefaultDate(),
    content_message: '',
    prayer_priest: '',
    prayer_intent: ''
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (isEdit) {
      const fetchMessage = async () => {
        try {
          setLoading(true);
          setError(null);

          const response = await fetch(`${BASE_URL}/api/marian-messages/${messageId}`);
          if (!response.ok) {
            throw new Error('메시지를 불러오는데 실패했습니다.');
          }

          const data = await response.json();
          if (data.success) {
            const message = data.data;
            setFormData({
              message_date: message.message_date || '',
              content_message: message.content_message || '',
              prayer_priest: message.prayer_priest || '',
              prayer_intent: message.prayer_intent || ''
            });
          } else {
            setError(data.message || '메시지를 불러오는데 실패했습니다.');
          }
        } catch (error) {
          console.error('메시지 로드 실패:', error);
          setError('서버와의 연결에 문제가 발생했습니다.');
        } finally {
          setLoading(false);
        }
      };

      fetchMessage();
    }
  }, [isEdit, messageId]);

  // 입력 필드 변경 핸들러
  const handleInputChange = (field: keyof MessageFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 성공 메시지 제거
    if (successMessage) {
      setSuccessMessage(null);
    }
  };

  // 폼 검증
  const validateForm = (): string | null => {
    if (!formData.message_date.trim()) {
      return '메시지 일자를 입력해주세요.';
    }
    if (!formData.content_message.trim()) {
      return '성모님 메시지를 입력해주세요.';
    }
    return null;
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccessMessage(null);

      const url = isEdit 
        ? `${BASE_URL}/api/marian-messages/${messageId}`
        : `${BASE_URL}/api/marian-messages`;
      
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('저장에 실패했습니다.');
      }

      const data = await response.json();
      if (data.success) {
        setSuccessMessage(isEdit ? '메시지가 성공적으로 수정되었습니다.' : '메시지가 성공적으로 등록되었습니다.');
        
        // 성공 후 목록 페이지로 이동 (2초 후)
        setTimeout(() => {
          setCurrentPage('marian-messages');
        }, 2000);
      } else {
        setError(data.message || '저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('저장 실패:', error);
      setError('서버와의 연결에 문제가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  // 로딩 중인 경우
  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-muted-foreground">메시지를 불러오는 중...</span>
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
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentPage("marian-messages")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>목록으로 돌아가기</span>
            </Button>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {isEdit ? '메시지 수정' : '새 메시지 등록'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>{isEdit ? '성모님 메시지 수정' : '성모님 메시지 등록'}</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 에러 메시지 */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* 성공 메시지 */}
              {successMessage && (
                <Alert className="border-green-200 bg-green-50 text-green-800">
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}

              {/* 메시지 일자 */}
              <div className="space-y-2">
                <Label htmlFor="message_date" className="text-sm font-medium">
                  메시지 일자 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="message_date"
                  type="date"
                  value={formData.message_date}
                  onChange={(e) => handleInputChange('message_date', e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              {/* 3컬럼 메시지 입력 영역 */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground border-b pb-2">
                  메시지 내용 입력
                </h3>
                
                <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6">
                  {/* 모바일에서는 탭 형태로 보여주기 위한 헤더 (lg 이하에서만) */}
                  <div className="lg:hidden col-span-full mb-4">
                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                      <button 
                        type="button"
                        className="flex-1 py-2 px-3 text-sm font-medium rounded-md bg-white text-blue-600 shadow-sm"
                      >
                        성모님 메시지
                      </button>
                      <button 
                        type="button"
                        className="flex-1 py-2 px-3 text-sm font-medium rounded-md text-gray-500 hover:text-gray-700"
                      >
                        묵상글
                      </button>
                      <button 
                        type="button"
                        className="flex-1 py-2 px-3 text-sm font-medium rounded-md text-gray-500 hover:text-gray-700"
                      >
                        기도 지향
                      </button>
                    </div>
                  </div>
                  {/* 성모님 메시지 */}
                  <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-300 shadow-sm">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="content_message" className="text-base font-semibold flex items-center text-blue-700">
                          <span className="w-4 h-4 bg-blue-500 rounded-full mr-3"></span>
                          성모님 메시지
                        </Label>
                        <span className="text-red-500 text-sm font-medium">필수</span>
                      </div>
                      <Textarea
                        id="content_message"
                        value={formData.content_message}
                        onChange={(e) => handleInputChange('content_message', e.target.value)}
                        placeholder="성모님의 메시지를 입력해주세요..."
                        className="min-h-[350px] resize-vertical border-2 border-blue-300 focus:border-blue-500 bg-white rounded-lg shadow-sm"
                        required
                      />
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-600 font-medium">필수 입력 항목</span>
                        <span className="text-gray-500">{formData.content_message.length}자</span>
                      </div>
                    </div>
                  </div>

                  {/* 묵상글 */}
                  <div className="bg-green-50 rounded-xl p-6 border-2 border-green-300 shadow-sm">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="prayer_priest" className="text-base font-semibold flex items-center text-green-700">
                          <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                          묵상글
                        </Label>
                        <span className="text-gray-400 text-sm">선택사항</span>
                      </div>
                      <Textarea
                        id="prayer_priest"
                        value={formData.prayer_priest}
                        onChange={(e) => handleInputChange('prayer_priest', e.target.value)}
                        placeholder="묵상글이 있다면 입력해주세요..."
                        className="min-h-[350px] resize-vertical border-2 border-green-300 focus:border-green-500 bg-white rounded-lg shadow-sm"
                      />
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600 font-medium">선택 입력 항목</span>
                        <span className="text-gray-500">{formData.prayer_priest.length}자</span>
                      </div>
                    </div>
                  </div>

                  {/* 기도 지향 */}
                  <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-300 shadow-sm">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="prayer_intent" className="text-base font-semibold flex items-center text-purple-700">
                          <span className="w-4 h-4 bg-purple-500 rounded-full mr-3"></span>
                          기도 지향
                        </Label>
                        <span className="text-gray-400 text-sm">선택사항</span>
                      </div>
                      <Textarea
                        id="prayer_intent"
                        value={formData.prayer_intent}
                        onChange={(e) => handleInputChange('prayer_intent', e.target.value)}
                        placeholder="기도 지향이 있다면 입력해주세요..."
                        className="min-h-[350px] resize-vertical border-2 border-purple-300 focus:border-purple-500 bg-white rounded-lg shadow-sm"
                      />
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-600 font-medium">선택 입력 항목</span>
                        <span className="text-gray-500">{formData.prayer_intent.length}자</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 입력 안내 */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div className="text-sm text-amber-800">
                      <p className="font-medium mb-1">입력 안내</p>
                      <p>
                        <span className="font-medium text-blue-600">성모님 메시지</span>는 필수 입력사항입니다. 
                        <span className="font-medium text-green-600">묵상글</span>과 
                        <span className="font-medium text-purple-600">기도 지향</span>은 해당 내용이 있을 때만 입력해주세요.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 제출 버튼 */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentPage("marian-messages")}
                  disabled={saving}
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="flex items-center space-x-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{isEdit ? '수정 중...' : '등록 중...'}</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>{isEdit ? '수정 완료' : '등록 완료'}</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}