import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { ArrowLeft, Calendar, Save, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import TipTapEditor from "./ui/TipTapEditor";

interface MarianMessageFormPageProps {
  setCurrentPage: (page: string) => void;
  messageId?: string;
}

interface MarianMessageFormData {
  title: string;
  message_date: string;
  content_html: string;
  content_json: any;
  content_text: string;
  author_email: string;
  author_phone: string;
}

export default function MarianMessageFormPageNew({ 
  setCurrentPage, 
  messageId 
}: MarianMessageFormPageProps) {
  const [formData, setFormData] = useState<MarianMessageFormData>({
    title: '',
    message_date: getDefaultDate(),
    content_html: '',
    content_json: null,
    content_text: '',
    author_email: '',
    author_phone: ''
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isEdit = !!messageId;

  // 기본 날짜 (현재 월의 25일)
  function getDefaultDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const defaultDate = new Date(year, month, 25);
    return defaultDate.toLocaleDateString('sv-SE'); // YYYY-MM-DD 형식
  }

  // 제목 자동 생성
  const generateTitle = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일 평화의 모후 메주고리예 성모님 메시지`;
  };

  // 날짜 변경 시 제목 자동 업데이트
  useEffect(() => {
    if (formData.message_date) {
      const newTitle = generateTitle(formData.message_date);
      setFormData(prev => ({
        ...prev,
        title: newTitle
      }));
    }
  }, [formData.message_date]);

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (isEdit) {
      const fetchMessage = async () => {
        try {
          setLoading(true);
          setError(null);

          const response = await fetch(`http://localhost:5000/api/board/${messageId}`);
          if (!response.ok) {
            throw new Error('성모님 메시지를 불러오는데 실패했습니다.');
          }

          const data = await response.json();
          if (data.success) {
            const message = data.data;
            setFormData({
              title: message.title || '',
              message_date: message.published_at ? message.published_at.split('T')[0] : getDefaultDate(),
              content_html: message.content_html || '',
              content_json: message.content_json ? JSON.parse(message.content_json) : null,
              content_text: message.content_text || '',
              author_email: message.author_email || '',
              author_phone: message.author_phone || ''
            });
          } else {
            setError(data.message || '성모님 메시지를 불러오는데 실패했습니다.');
          }
        } catch (error) {
          console.error('성모님 메시지 로드 실패:', error);
          setError('서버와의 연결에 문제가 발생했습니다.');
        } finally {
          setLoading(false);
        }
      };

      fetchMessage();
    }
  }, [isEdit, messageId]);

  // 입력 필드 변경 핸들러
  const handleInputChange = (field: keyof MarianMessageFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // TipTap 에디터 변경 핸들러
  const handleEditorChange = (content: { html: string; json: any; text: string }) => {
    setFormData(prev => ({
      ...prev,
      content_html: content.html,
      content_json: content.json,
      content_text: content.text
    }));
  };

  // 폼 검증
  const validateForm = (): string | null => {
    if (!formData.title.trim()) {
      return '제목을 입력해주세요.';
    }
    if (!formData.message_date) {
      return '메시지 날짜를 선택해주세요.';
    }
    if (!formData.content_html.trim() || formData.content_html === '<p></p>') {
      return '내용을 입력해주세요.';
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

      const submitData = {
        board_type: 'marian_message',
        ...formData,
        author_name: '성모님메시지', // 성모님 메시지는 항상 "성모님메시지"로 설정
        category_id: null,
        is_member: true,
        // 성모님 메시지 기본 설정
        is_featured: false,
        is_notice: false,
        allow_comments: false,
        is_secret: false,
        featured_image: null,
        meta_title: null,
        meta_description: null,
        tags: null,
        published_at: formData.message_date + 'T00:00:00',
        expired_at: null
      };

      const url = isEdit 
        ? `http://localhost:5000/api/board/${messageId}`
        : 'http://localhost:5000/api/board';
      
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      if (!response.ok) {
        throw new Error('저장에 실패했습니다.');
      }

      const data = await response.json();
      if (data.success) {
        setSuccessMessage(`성모님 메시지가 성공적으로 ${isEdit ? '수정' : '등록'}되었습니다.`);
        setTimeout(() => {
          setCurrentPage('marian-messages');
        }, 1500);
      } else {
        throw new Error(data.message || '저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('저장 실패:', error);
      setError('저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSaving(false);
    }
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-muted-foreground">성모님 메시지를 불러오는 중...</span>
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
            <div className="text-sm text-muted-foreground">
              성모님 메시지 {isEdit ? '수정' : '등록'}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>성모님 메시지 {isEdit ? '수정' : '등록'}</span>
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

              {/* 메시지 날짜 */}
              <div className="space-y-2">
                <Label htmlFor="message_date" className="text-sm font-medium">
                  메시지 날짜 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="message_date"
                  type="date"
                  value={formData.message_date}
                  onChange={(e) => handleInputChange('message_date', e.target.value)}
                  required
                />
              </div>

              {/* 자동 생성된 제목 */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  제목 (자동 생성)
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="날짜를 선택하면 자동으로 생성됩니다"
                  className="bg-muted"
                />
              </div>

              {/* 작성자 */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  작성자
                </Label>
                <div className="px-3 py-2 bg-muted text-muted-foreground rounded-md border">
                  성모님메시지
                </div>
              </div>

              {/* 내용 - TipTap 에디터 */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  내용 <span className="text-red-500">*</span>
                </Label>
                <TipTapEditor
                  content={formData.content_html}
                  onChange={handleEditorChange}
                  placeholder="성모님 메시지, 묵상글, 기도 지향 등을 자유롭게 작성해주세요..."
                  className="min-h-[500px]"
                />
              </div>

              {/* 연락처 정보 (선택사항) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author_email" className="text-sm font-medium">
                    이메일 (선택사항)
                  </Label>
                  <Input
                    id="author_email"
                    type="email"
                    value={formData.author_email}
                    onChange={(e) => handleInputChange('author_email', e.target.value)}
                    placeholder="이메일 주소"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author_phone" className="text-sm font-medium">
                    연락처 (선택사항)
                  </Label>
                  <Input
                    id="author_phone"
                    type="tel"
                    value={formData.author_phone}
                    onChange={(e) => handleInputChange('author_phone', e.target.value)}
                    placeholder="연락처"
                  />
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
                      <span>{isEdit ? '수정' : '등록'} 중...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>{isEdit ? '수정' : '등록'}하기</span>
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

