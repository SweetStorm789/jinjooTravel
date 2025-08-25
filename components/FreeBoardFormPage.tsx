import { ArrowLeft, Save, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Alert, AlertDescription } from "./ui/alert";
import TipTapEditor from "./ui/TipTapEditor";
import { useState, useEffect } from "react";
import { BASE_URL } from "../src/lib/constants";

interface FreeBoardFormPageProps {
  setCurrentPage: (page: string) => void;
  isAdmin?: boolean;
}

interface FreeBoardFormData {
  title: string;
  content_html: string;
  content_json: any;
  content_text: string;
  excerpt: string;
  author_name: string;
  author_email: string;
  author_phone: string;
  password: string;
  confirm_password: string;
  category_id: number;
  featured_image: string;
}

interface FreeBoardCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export default function FreeBoardFormPage({ setCurrentPage, isAdmin = false }: FreeBoardFormPageProps) {
  const [formData, setFormData] = useState<FreeBoardFormData>({
    title: "",
    content_html: "",
    content_json: null,
    content_text: "",
    excerpt: "",
    author_name: "",
    author_email: "",
    author_phone: "",
    password: "",
    confirm_password: "",
    category_id: 0,
    featured_image: ""
  });

  const [categories, setCategories] = useState<FreeBoardCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // URL에서 ID 추출 (수정 모드인지 확인)
  const getCurrentPage = () => {
    const hash = window.location.hash.substring(1);
    return hash || 'home';
  };
  
  const getEditIdFromCurrentPage = () => {
    const currentPage = getCurrentPage();
    const match = currentPage.match(/freeboard-form-edit-(\d+)/);
    return match ? match[1] : null;
  };
  
  const editId = getEditIdFromCurrentPage();
  const isEditMode = !!editId;

  // 카테고리 목록 조회
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/freeboard/categories`);
      
      if (!response.ok) {
        throw new Error('카테고리를 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data);
        // 첫 번째 카테고리를 기본값으로 설정
        if (data.data.length > 0 && formData.category_id === 0 && !editId) {
          setFormData(prev => ({ ...prev, category_id: data.data[0].id }));
        }
      }
    } catch (err) {
      console.error('카테고리 조회 오류:', err);
    }
  };

  // 기존 게시글 데이터 조회 (수정 모드)
  const fetchPostData = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/freeboard/${id}`);
      
      if (!response.ok) {
        throw new Error('게시글을 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      
      if (data.success) {
        const post = data.data.post;
        setFormData({
          title: post.title || "",
          content_html: post.content_html || "",
          content_json: post.content_json ? JSON.parse(post.content_json) : null,
          content_text: post.content_text || "",
          excerpt: post.excerpt || "",
          author_name: post.author_name || "",
          author_email: post.author_email || "",
          author_phone: post.author_phone || "",
          password: "",
          confirm_password: "",
          category_id: post.category_id || 0,
          featured_image: post.featured_image || ""
        });
      }
    } catch (err) {
      console.error('게시글 조회 오류:', err);
      setError(err instanceof Error ? err.message : '게시글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchCategories();
    if (isEditMode && editId) {
      fetchPostData(editId);
    }
  }, [isEditMode, editId]);

  // 폼 데이터 변경 핸들러
  const handleInputChange = (field: keyof FreeBoardFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 해당 필드의 검증 오류 제거
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // 에디터 내용 변경 핸들러
  const handleEditorChange = (content: { html: string; json: any; text: string }) => {
    const safeText = content.text || '';
    setFormData(prev => ({
      ...prev,
      content_html: content.html || '',
      content_json: content.json,
      content_text: safeText,
      excerpt: safeText.substring(0, 150) // 첫 150자를 요약으로 사용
    }));
    
    if (validationErrors.content_html) {
      setValidationErrors(prev => ({ ...prev, content_html: '' }));
    }
  };

  // 폼 검증
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) {
      errors.title = '제목을 입력해주세요.';
    }

    if (!formData.content_html.trim()) {
      errors.content_html = '내용을 입력해주세요.';
    }

    if (!formData.author_name.trim()) {
      errors.author_name = '작성자명을 입력해주세요.';
    }

    if (!formData.password) {
      errors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 4) {
      errors.password = '비밀번호는 4자 이상 입력해주세요.';
    }

    if (formData.password !== formData.confirm_password) {
      errors.confirm_password = '비밀번호가 일치하지 않습니다.';
    }

    if (formData.category_id === 0) {
      errors.category_id = '카테고리를 선택해주세요.';
    }

    // 이메일 형식 검증 (입력된 경우만)
    if (formData.author_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.author_email)) {
      errors.author_email = '올바른 이메일 형식을 입력해주세요.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const url = isEditMode 
        ? `${BASE_URL}/api/freeboard/${editId}`
        : `${BASE_URL}/api/freeboard`;
      
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(isEditMode ? '게시글이 성공적으로 수정되었습니다!' : '게시글이 성공적으로 등록되었습니다!');
        
        // 성공 시 목록 페이지로 이동
        setTimeout(() => {
          setCurrentPage("freeboard");
        }, 1500);
      } else {
        throw new Error(data.message || `게시글 ${isEditMode ? '수정' : '등록'}에 실패했습니다.`);
      }

    } catch (err) {
      console.error('게시글 제출 오류:', err);
      setError(err instanceof Error ? err.message : `게시글 ${isEditMode ? '수정' : '등록'}에 실패했습니다.`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">게시글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage("freeboard")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>목록으로</span>
            </Button>
            <h1 className="text-2xl font-medium">
              {isEditMode ? '자유게시판 수정' : '자유게시판 작성'}
            </h1>
          </div>
        </div>

        {/* 메시지 */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-600">{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">{success}</AlertDescription>
          </Alert>
        )}

        {/* 폼 */}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>게시글 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 카테고리 선택 */}
              <div className="space-y-2">
                <Label htmlFor="category">카테고리 *</Label>
                <Select 
                  value={formData.category_id.toString()} 
                  onValueChange={(value) => handleInputChange('category_id', parseInt(value))}
                >
                  <SelectTrigger>
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
                {validationErrors.category_id && (
                  <p className="text-sm text-red-600">{validationErrors.category_id}</p>
                )}
              </div>

              {/* 제목 */}
              <div className="space-y-2">
                <Label htmlFor="title">제목 *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="게시글 제목을 입력하세요"
                  className={validationErrors.title ? 'border-red-300' : ''}
                />
                {validationErrors.title && (
                  <p className="text-sm text-red-600">{validationErrors.title}</p>
                )}
              </div>

              {/* 작성자 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author_name">작성자명 *</Label>
                  <Input
                    id="author_name"
                    value={formData.author_name}
                    onChange={(e) => handleInputChange('author_name', e.target.value)}
                    placeholder="이름을 입력하세요"
                    className={validationErrors.author_name ? 'border-red-300' : ''}
                  />
                  {validationErrors.author_name && (
                    <p className="text-sm text-red-600">{validationErrors.author_name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="author_email">이메일</Label>
                  <Input
                    id="author_email"
                    type="email"
                    value={formData.author_email}
                    onChange={(e) => handleInputChange('author_email', e.target.value)}
                    placeholder="example@email.com (선택사항)"
                    className={validationErrors.author_email ? 'border-red-300' : ''}
                  />
                  {validationErrors.author_email && (
                    <p className="text-sm text-red-600">{validationErrors.author_email}</p>
                  )}
                </div>
              </div>

              {/* 비밀번호 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호 *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="4자 이상 입력하세요"
                    className={validationErrors.password ? 'border-red-300' : ''}
                  />
                  {validationErrors.password && (
                    <p className="text-sm text-red-600">{validationErrors.password}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm_password">비밀번호 확인 *</Label>
                  <Input
                    id="confirm_password"
                    type="password"
                    value={formData.confirm_password}
                    onChange={(e) => handleInputChange('confirm_password', e.target.value)}
                    placeholder="비밀번호를 다시 입력하세요"
                    className={validationErrors.confirm_password ? 'border-red-300' : ''}
                  />
                  {validationErrors.confirm_password && (
                    <p className="text-sm text-red-600">{validationErrors.confirm_password}</p>
                  )}
                </div>
              </div>

              {/* 내용 */}
              <div className="space-y-2">
                <Label>내용 *</Label>
                <div className={`border rounded-lg ${validationErrors.content_html ? 'border-red-300' : 'border-gray-200'}`}>
                  <TipTapEditor
                    content={formData.content_html}
                    onChange={handleEditorChange}
                    placeholder="게시글 내용을 작성해주세요..."
                  />
                </div>
                {validationErrors.content_html && (
                  <p className="text-sm text-red-600">{validationErrors.content_html}</p>
                )}
              </div>

              {/* 제출 버튼 */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentPage("freeboard")}
                  disabled={loading}
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex items-center space-x-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  <span>{loading ? '처리 중...' : isEditMode ? '수정하기' : '등록하기'}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>

        {/* 작성 안내 */}
        <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-purple-900 mb-4">
            게시글 작성 안내
          </h3>
          <div className="space-y-2 text-sm text-purple-800">
            <p>• 건전하고 유익한 내용으로 작성해주세요.</p>
            <p>• 개인정보나 연락처는 게시하지 마세요.</p>
            <p>• 저작권이 있는 이미지나 내용은 사용하지 마세요.</p>
            <p>• 광고성 게시글은 사전 통보 없이 삭제될 수 있습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
