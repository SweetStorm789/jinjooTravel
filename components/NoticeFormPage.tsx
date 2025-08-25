import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";

import { ArrowLeft, Calendar, Save, Loader2, AlertCircle } from "lucide-react";
import { BASE_URL } from '@/lib/constants';
import { Alert, AlertDescription } from "./ui/alert";
import TipTapEditor from "./ui/TipTapEditor";

interface NoticeFormPageProps {
  setCurrentPage: (page: string) => void;
  noticeId?: string;
}



interface NoticeFormData {
  title: string;
  content_html: string;
  content_json: any;
  content_text: string;
  author_email: string;
  author_phone: string;
  password: string;
}

export default function NoticeFormPage({ 
  setCurrentPage, 
  noticeId 
}: NoticeFormPageProps) {
  const [formData, setFormData] = useState<NoticeFormData>({
    title: '',
    content_html: '',
    content_json: null,
    content_text: '',
    author_email: '',
    author_phone: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isEdit = !!noticeId;

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {

    if (isEdit) {
      const fetchNotice = async () => {
        try {
          setLoading(true);
          setError(null);

          const response = await fetch(`${BASE_URL}/api/board/${noticeId}`);
          if (!response.ok) {
            throw new Error('공지사항을 불러오는데 실패했습니다.');
          }

          const data = await response.json();
          if (data.success) {
            const notice = data.data;
            setFormData({
              title: notice.title || '',
              content_html: notice.content_html || '',
              content_json: notice.content_json ? JSON.parse(notice.content_json) : null,
              content_text: notice.content_text || '',
              author_email: notice.author_email || '',
              author_phone: notice.author_phone || '',
              password: '' // 비밀번호는 보안상 비워둠
            });
          } else {
            setError(data.message || '공지사항을 불러오는데 실패했습니다.');
          }
        } catch (error) {
          console.error('공지사항 로드 실패:', error);
          setError('서버와의 연결에 문제가 발생했습니다.');
        } finally {
          setLoading(false);
        }
      };

      fetchNotice();
    }
  }, [isEdit, noticeId]);

  // 입력 필드 변경 핸들러
  const handleInputChange = (field: keyof NoticeFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 성공 메시지 제거
    if (successMessage) {
      setSuccessMessage(null);
    }
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

      const { password, ...formDataWithoutPassword } = formData;
      
      const submitData = {
        board_type: 'notice',
        ...formDataWithoutPassword,
        author_name: '진주여행사', // 공지사항은 항상 "진주여행사"로 강제 설정
        category_id: null, // 공지사항은 카테고리 없음
        is_member: true, // 관리자는 회원으로 처리
        // 공지사항 기본 설정
        is_featured: false,
        is_notice: true,
        allow_comments: false, // 공지사항은 댓글 비허용
        is_secret: false,
        featured_image: null,
        meta_title: null,
        meta_description: null,
        tags: null,
        published_at: null,
        expired_at: null
      };

      const url = isEdit 
        ? `${BASE_URL}/api/board/${noticeId}`
        : `${BASE_URL}/api/board`;
      
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error('저장에 실패했습니다.');
      }

      const data = await response.json();
      if (data.success) {
        setSuccessMessage(isEdit ? '공지사항이 성공적으로 수정되었습니다.' : '공지사항이 성공적으로 등록되었습니다.');
        
        // 성공 후 목록 페이지로 이동 (2초 후)
        setTimeout(() => {
          setCurrentPage('notices');
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
          <span className="text-muted-foreground">공지사항을 불러오는 중...</span>
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
              onClick={() => setCurrentPage("notices")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>목록으로 돌아가기</span>
            </Button>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {isEdit ? '공지사항 수정' : '새 공지사항 등록'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>{isEdit ? '공지사항 수정' : '공지사항 등록'}</span>
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

              {/* 기본 정보 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 제목 */}
                <div className="lg:col-span-2 space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    제목 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="공지사항 제목을 입력하세요"
                    className="w-full"
                    required
                  />
                </div>



                {/* 작성자 */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    작성자
                  </Label>
                  <div className="px-3 py-2 bg-muted text-muted-foreground rounded-md border">
                    진주여행사
                  </div>
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
                  placeholder="공지사항 내용을 입력하세요..."
                  className="min-h-[400px]"
                />
              </div>



              {/* 제출 버튼 */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentPage("notices")}
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