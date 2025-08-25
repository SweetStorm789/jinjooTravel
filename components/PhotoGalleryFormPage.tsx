import { ArrowLeft, Save, AlertCircle, CheckCircle, Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Alert, AlertDescription } from "./ui/alert";
import TipTapEditor from "./ui/TipTapEditor";
import { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../src/lib/constants";

interface PhotoGalleryFormPageProps {
  setCurrentPage: (page: string) => void;
  isAdmin?: boolean;
}

interface GalleryFormData {
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

interface GalleryCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export default function PhotoGalleryFormPage({ setCurrentPage, isAdmin = false }: PhotoGalleryFormPageProps) {
  const [formData, setFormData] = useState<GalleryFormData>({
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

  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // URL에서 ID 추출 (수정 모드인지 확인)
  const getCurrentPage = () => {
    const hash = window.location.hash.substring(1);
    return hash || 'home';
  };
  
  const getEditIdFromCurrentPage = () => {
    const currentPage = getCurrentPage();
    const match = currentPage.match(/gallery-form-edit-(\d+)/);
    return match ? match[1] : null;
  };
  
  const editId = getEditIdFromCurrentPage();
  const isEditMode = !!editId;

  // 카테고리 목록 조회
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/gallery/categories`);
      
      if (!response.ok) {
        throw new Error('카테고리를 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      
      if (data.success) {
        // 성지순례를 맨 위로 정렬
        const sortedCategories = data.data.sort((a: GalleryCategory, b: GalleryCategory) => {
          if (a.name === '성지순례') return -1;
          if (b.name === '성지순례') return 1;
          return a.name.localeCompare(b.name);
        });
        
        setCategories(sortedCategories);
        
        // 성지순례 카테고리를 찾아서 기본값으로 설정
        const pilgrimageCategory = sortedCategories.find((cat: GalleryCategory) => cat.name === '성지순례');
        if (pilgrimageCategory && formData.category_id === 0 && !editId) {
          setFormData(prev => ({ ...prev, category_id: pilgrimageCategory.id }));
        }
      }
    } catch (err) {
      console.error('카테고리 조회 오류:', err);
    }
  };

  // 기존 갤러리 데이터 조회 (수정 모드)
  const fetchGalleryData = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/gallery/${id}`);
      
      if (!response.ok) {
        throw new Error('갤러리를 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      
      if (data.success) {
        const post = data.data.post;
        const images = data.data.images || [];
        
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
        
        // 기존 이미지들 설정
        setExistingImages(images);
      }
    } catch (err) {
      console.error('갤러리 조회 오류:', err);
      setError(err instanceof Error ? err.message : '갤러리를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchCategories();
    if (isEditMode && editId) {
      fetchGalleryData(editId);
    }
  }, [isEditMode, editId]);

  // 폼 데이터 변경 핸들러
  const handleInputChange = (field: keyof GalleryFormData, value: string | number) => {
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

  // 이미지 선택 핸들러
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // 이미지 파일만 필터링
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== files.length) {
      alert('이미지 파일만 업로드할 수 있습니다.');
    }

    // 기존 이미지와 합쳐서 최대 10개까지만
    const totalImages = selectedImages.length + imageFiles.length;
    if (totalImages > 10) {
      alert('최대 10개의 이미지까지만 업로드할 수 있습니다.');
      return;
    }

    setSelectedImages(prev => [...prev, ...imageFiles]);

    // 미리보기 URL 생성
    const newPreviewUrls = imageFiles.map(file => URL.createObjectURL(file));
    setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };

  // 이미지 제거 핸들러
  const handleImageRemove = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    
    // 미리보기 URL 해제 및 제거
    URL.revokeObjectURL(imagePreviewUrls[index]);
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  // 기존 이미지 제거
  const removeExistingImage = (index: number) => {
    const imageToRemove = existingImages[index];
    if (imageToRemove && imageToRemove.id) {
      setDeletedImageIds(prev => [...prev, imageToRemove.id]);
    }
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  // 폼 검증
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) {
      errors.title = '제목을 입력해주세요.';
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

    if (!isEditMode && selectedImages.length === 0) {
      errors.images = '최소 1개의 이미지를 업로드해주세요.';
    }

    if (isEditMode && selectedImages.length === 0 && existingImages.length === 0) {
      errors.images = '최소 1개의 이미지가 필요합니다.';
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

      // 이미지 업로드가 있는 경우 FormData 사용
      const formDataToSend = new FormData();
      
      // 기본 폼 데이터 추가
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formDataToSend.append(key, value.toString());
        }
      });

      // 이미지 파일들 추가
      selectedImages.forEach((file, index) => {
        formDataToSend.append(`images`, file);
      });

      // 삭제된 이미지 ID들 추가 (수정 모드)
      if (isEditMode && deletedImageIds.length > 0) {
        formDataToSend.append('deletedImageIds', JSON.stringify(deletedImageIds));
      }

      const url = isEditMode 
        ? `${BASE_URL}/api/gallery/${editId}`
        : `${BASE_URL}/api/gallery`;
      
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend, // FormData는 Content-Type 헤더를 자동으로 설정
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(isEditMode ? '갤러리가 성공적으로 수정되었습니다!' : '갤러리가 성공적으로 등록되었습니다!');
        
        // 성공 시 목록 페이지로 이동
        setTimeout(() => {
          setCurrentPage("photo-gallery");
        }, 1500);
      } else {
        throw new Error(data.message || `갤러리 ${isEditMode ? '수정' : '등록'}에 실패했습니다.`);
      }

    } catch (err) {
      console.error('갤러리 제출 오류:', err);
      setError(err instanceof Error ? err.message : `갤러리 ${isEditMode ? '수정' : '등록'}에 실패했습니다.`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">갤러리를 불러오는 중...</p>
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
              onClick={() => setCurrentPage("photo-gallery")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>목록으로</span>
            </Button>
            <h1 className="text-2xl font-medium">
              {isEditMode ? '포토갤러리 수정' : '포토갤러리 등록'}
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
              <CardTitle>갤러리 정보</CardTitle>
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
                  placeholder="갤러리 제목을 입력하세요"
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

              {/* 이미지 업로드 */}
              <div className="space-y-2">
                {/* 기존 이미지 (수정 모드) */}
                {isEditMode && existingImages.length > 0 && (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      기존 이미지 ({existingImages.length}개)
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {existingImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={`${BASE_URL}${image.file_path}`}
                            alt={image.original_name}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeExistingImage(index)}
                            className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                          <div className="absolute bottom-1 left-1 right-1 bg-black bg-opacity-50 text-white text-xs p-1 rounded truncate">
                            {image.original_name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* 새 이미지 업로드 */}
              {(!isEditMode || (isEditMode && existingImages.length < 10)) && (
                <div className="space-y-2">
                  <Label className={isEditMode ? "text-sm text-muted-foreground" : ""}>
                    {isEditMode ? "새 이미지 추가" : "이미지 업로드 * (최대 10개)"}
                  </Label>
                  <div className="space-y-4">
                    {/* 업로드 버튼 */}
                    <div className="flex items-center space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center space-x-2"
                      >
                        <Upload className="h-4 w-4" />
                        <span>이미지 선택</span>
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        {selectedImages.length}/10 개 선택됨
                      </span>
                    </div>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />

                    {/* 이미지 미리보기 */}
                    {imagePreviewUrls.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {imagePreviewUrls.map((url, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={url}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => handleImageRemove(index)}
                              className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {validationErrors.images && (
                    <p className="text-sm text-red-600">{validationErrors.images}</p>
                  )}
                </div>
              )}
            </div>

              {/* 설명 */}
              <div className="space-y-2">
                <Label>설명</Label>
                <div className="border rounded-lg border-gray-200">
                  <TipTapEditor
                    content={formData.content_html}
                    onChange={handleEditorChange}
                    placeholder="갤러리에 대한 설명을 작성해주세요... (선택사항)"
                  />
                </div>
              </div>

              {/* 제출 버튼 */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentPage("photo-gallery")}
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

        {/* 업로드 안내 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">
            이미지 업로드 안내
          </h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• 최대 10개의 이미지를 업로드할 수 있습니다.</p>
            <p>• 지원 형식: JPG, PNG, GIF (최대 20MB per file)</p>
            <p>• 고해상도 이미지를 업로드하시면 더욱 선명하게 보실 수 있습니다.</p>
            <p>• 저작권이 있는 이미지는 업로드하지 마세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
