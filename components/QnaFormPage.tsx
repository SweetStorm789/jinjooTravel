import {
  ArrowLeft,
  Save,
  Lock,
  Unlock,
  FileText,
  AlertTriangle,
  Loader2
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { useState, useEffect } from "react";
import { BASE_URL } from "../src/lib/constants";
import TipTapEditor from "./ui/TipTapEditor";

interface QnaFormPageProps {
  setCurrentPage: (page: string) => void;
  qnaId?: string;
}

interface QnaFormData {
  title: string;
  author_name: string;
  content_html: string;
  content_json: any;
  content_text: string;
  excerpt: string;
  category_id: number;
  is_secret: boolean;
  author_email: string;
  author_phone: string;
  password: string;
}

interface QnaCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export default function QnaFormPage({ 
  setCurrentPage, 
  qnaId 
}: QnaFormPageProps) {
  const isEdit = !!qnaId;
  
  const [formData, setFormData] = useState<QnaFormData>({
    title: "",
    author_name: "",
    content_html: "",
    content_json: null,
    content_text: "",
    excerpt: "",
    category_id: 0,
    is_secret: false,
    author_email: "",
    author_phone: "",
    password: "",
  });

  const [categories, setCategories] = useState<QnaCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // 카테고리 목록 조회
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/qna/categories`);
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data);
        // 첫 번째 카테고리를 기본값으로 설정 (편집 모드가 아닐 때만)
        if (data.data.length > 0 && formData.category_id === 0 && !qnaId) {
          setFormData(prev => ({ ...prev, category_id: data.data[0].id }));
        }
      }
    } catch (error) {
      console.error('카테고리 조회 오류:', error);
    }
  };

  // 기존 QnA 데이터 로드 (편집 모드)
  const fetchQnaData = async () => {
    if (!qnaId) return;
    
    try {
      setLoadingData(true);
      const response = await fetch(`${BASE_URL}/api/qna/${qnaId}`);
      const data = await response.json();
      
      if (data.success) {
        const qna = data.data.post;
        setFormData({
          title: qna.title,
          author_name: qna.author_name,
          content_html: qna.content_html,
          content_json: qna.content_json ? JSON.parse(qna.content_json) : null,
          content_text: qna.content_text,
          excerpt: qna.excerpt || "",
          category_id: qna.category_id || 0,
          is_secret: qna.is_secret,
          author_email: qna.author_email || "",
          author_phone: qna.author_phone || "",
          password: "", // 보안상 비밀번호는 빈 상태로
        });
      }
    } catch (error) {
      console.error('QnA 데이터 조회 오류:', error);
      setErrors({ submit: 'QnA 정보를 불러오는데 실패했습니다.' });
    } finally {
      setLoadingData(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchQnaData();
    }
  }, [isEdit, qnaId]);

  // TipTap 에디터에서 내용 변경 시
  const handleContentChange = (content: { html: string; json: any; text: string }) => {
    setFormData(prev => ({
      ...prev,
      content_html: content.html,
      content_json: content.json,
      content_text: content.text,
      excerpt: content.text.slice(0, 200) // 처음 200자를 요약으로
    }));
  };

  // 입력값 변경 핸들러
  const handleInputChange = (field: keyof QnaFormData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 에러 메시지 제거
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const url = isEdit ? `${BASE_URL}/api/qna/${qnaId}` : `${BASE_URL}/api/qna`;
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '요청 처리에 실패했습니다.');
      }

      if (data.success) {
        alert(isEdit ? "질문이 수정되었습니다." : "질문이 등록되었습니다.");
        setCurrentPage("qna");
      } else {
        throw new Error(data.message || '처리에 실패했습니다.');
      }
    } catch (error) {
      console.error("제출 오류:", error);
      setErrors({ submit: error instanceof Error ? error.message : "처리에 실패했습니다." });
    } finally {
      setLoading(false);
    }
  };

  // 폼 유효성 검사
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요.";
    }
    if (!formData.author_name.trim()) {
      newErrors.author_name = "작성자명을 입력해주세요.";
    }
    if (!formData.content_html.trim()) {
      newErrors.content = "내용을 입력해주세요.";
    }
    if (!formData.author_email.trim()) {
      newErrors.author_email = "이메일을 입력해주세요.";
    } else if (!/\S+@\S+\.\S+/.test(formData.author_email)) {
      newErrors.author_email = "올바른 이메일 형식을 입력해주세요.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (formData.password.length < 4) {
      newErrors.password = "비밀번호는 최소 4자 이상이어야 합니다.";
    }
    if (formData.password !== passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }
    if (!formData.category_id) {
      newErrors.category_id = "카테고리를 선택해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (loadingData) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>QnA 정보를 불러오는 중...</p>
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
                onClick={() => setCurrentPage(isEdit ? `qna-detail-${qnaId}` : "qna")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>뒤로가기</span>
              </Button>
              <h1 className="text-lg font-medium">
                {isEdit ? "질문 수정" : "질문하기"}
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                onClick={handleSubmit} 
                disabled={loading}
                className="flex items-center space-x-2"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>{loading ? "처리중..." : (isEdit ? "수정" : "등록")}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 에러 메시지 */}
          {errors.submit && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
                <p className="text-red-600">{errors.submit}</p>
              </div>
            </div>
          )}

          {/* 기본 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>질문 정보</span>
              </CardTitle>
              <CardDescription>질문의 기본 정보를 입력하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 제목 */}
              <div className="space-y-2">
                <Label htmlFor="title">제목 *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="질문의 제목을 입력하세요"
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* 카테고리 */}
              <div className="space-y-2">
                <Label htmlFor="category">카테고리 *</Label>
                <Select
                  value={formData.category_id.toString()}
                  onValueChange={(value) => handleInputChange('category_id', parseInt(value))}
                >
                  <SelectTrigger className={errors.category_id ? 'border-red-500' : ''}>
                    <SelectValue placeholder="카테고리를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category_id && (
                  <p className="text-sm text-red-600">{errors.category_id}</p>
                )}
              </div>

              {/* 비공개 설정 */}
              <div className="flex items-center space-x-3">
                <Switch
                  id="is_secret"
                  checked={formData.is_secret}
                  onCheckedChange={(checked) => handleInputChange('is_secret', checked)}
                />
                <div className="flex items-center space-x-2">
                  {formData.is_secret ? (
                    <Lock className="h-4 w-4 text-amber-600" />
                  ) : (
                    <Unlock className="h-4 w-4 text-green-600" />
                  )}
                  <Label htmlFor="is_secret" className="cursor-pointer">
                    {formData.is_secret ? "비공개 질문" : "공개 질문"}
                  </Label>
                </div>
              </div>
              
              {formData.is_secret && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    비공개 질문은 작성자와 관리자만 볼 수 있습니다.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 내용 */}
          <Card>
            <CardHeader>
              <CardTitle>질문 내용 *</CardTitle>
              <CardDescription>궁금한 점을 자세히 작성해주세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <TipTapEditor
                content={formData.content_html}
                onChange={handleContentChange}
                placeholder="질문 내용을 입력하세요..."
              />
              {errors.content && (
                <p className="text-sm text-red-600 mt-2">{errors.content}</p>
              )}
            </CardContent>
          </Card>

          {/* 작성자 정보 */}
          <Card>
            <CardHeader>
              <CardTitle>작성자 정보</CardTitle>
              <CardDescription>답변을 받기 위한 연락처 정보를 입력하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 작성자명 */}
                <div className="space-y-2">
                  <Label htmlFor="author_name">작성자명 *</Label>
                  <Input
                    id="author_name"
                    value={formData.author_name}
                    onChange={(e) => handleInputChange('author_name', e.target.value)}
                    placeholder="이름을 입력하세요"
                    className={errors.author_name ? 'border-red-500' : ''}
                  />
                  {errors.author_name && (
                    <p className="text-sm text-red-600">{errors.author_name}</p>
                  )}
                </div>

                {/* 이메일 */}
                <div className="space-y-2">
                  <Label htmlFor="author_email">이메일 *</Label>
                  <Input
                    id="author_email"
                    type="email"
                    value={formData.author_email}
                    onChange={(e) => handleInputChange('author_email', e.target.value)}
                    placeholder="example@email.com"
                    className={errors.author_email ? 'border-red-500' : ''}
                  />
                  {errors.author_email && (
                    <p className="text-sm text-red-600">{errors.author_email}</p>
                  )}
                </div>
              </div>

              {/* 연락처 */}
              <div className="space-y-2">
                <Label htmlFor="author_phone">연락처</Label>
                <Input
                  id="author_phone"
                  value={formData.author_phone}
                  onChange={(e) => handleInputChange('author_phone', e.target.value)}
                  placeholder="010-1234-5678 (선택사항)"
                />
              </div>

              {/* 비밀번호 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호 *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="수정/삭제용 비밀번호"
                    className={errors.password ? 'border-red-500' : ''}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordConfirm">비밀번호 확인 *</Label>
                  <Input
                    id="passwordConfirm"
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder="비밀번호를 다시 입력하세요"
                    className={errors.passwordConfirm ? 'border-red-500' : ''}
                  />
                  {errors.passwordConfirm && (
                    <p className="text-sm text-red-600">{errors.passwordConfirm}</p>
                  )}
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  * 비밀번호는 나중에 질문을 수정하거나 삭제할 때 필요합니다.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 안내사항 */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              질문 작성 안내
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• 성지순례 및 여행 관련 모든 문의를 환영합니다.</p>
              <p>• 개인정보가 포함된 문의는 비공개로 작성해주세요.</p>
              <p>• 답변은 영업일 기준 1-2일 내에 등록됩니다.</p>
              <p>• 긴급한 사항은 고객센터(1588-1234)로 직접 연락해주세요.</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
