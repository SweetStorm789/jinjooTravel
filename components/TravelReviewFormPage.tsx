import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Instagram, Youtube, Facebook, MessageCircle, Link as LinkIcon, AlertCircle } from 'lucide-react';

//const BASE_URL = 'http://localhost:5000';
import { BASE_URL } from "../src/lib/constants";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface TravelReviewFormPageProps {
  setCurrentPage: (page: string) => void;
}

const TravelReviewFormPage: React.FC<TravelReviewFormPageProps> = ({ setCurrentPage }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [previewData, setPreviewData] = useState<any>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  // 폼 데이터
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author_name: '',
    author_email: '',
    author_phone: '',
    password: '',
    password_confirm: '',
    category_id: '',
    social_media_url: ''
  });

  // 카테고리 목록 조회
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/travel-reviews/categories`);
      const data = await response.json();

      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('카테고리 목록 조회 실패:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 폼 데이터 변경 핸들러
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // URL 유효성 검사 함수
  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Instagram ID 추출 함수
  const extractInstagramId = (url: string): string | null => {
    const match = url.match(/instagram\.com\/([^\/\?]+)/);
    if (match && match[1] && !match[1].includes('p')) {
      return match[1];
    }
    return null;
  };

  // 링크 입력 시 자동 미리보기
  const handleSocialMediaUrlChange = async (value: string) => {
    setFormData(prev => ({ ...prev, social_media_url: value }));
    
    if (value && isValidUrl(value)) {
      setIsLoadingPreview(true);
      try {
        const response = await fetch(`${BASE_URL}/api/travel-reviews/preview`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: value }),
        });

        const data = await response.json();
        
        if (data.success) {
          setPreviewData(data.data);
          
          // Instagram ID를 작성자명으로 자동 설정
          if (data.data.author && data.data.author !== 'undefined' && !formData.author_name) {
            console.log('백엔드에서 추출한 Instagram ID:', data.data.author);
            handleInputChange('author_name', data.data.author);
          } else if (!formData.author_name) {
            // 백엔드에서 추출하지 못한 경우 URL에서 직접 추출
            const instagramId = extractInstagramId(value);
            if (instagramId) {
              console.log('URL에서 직접 추출한 Instagram ID:', instagramId);
              handleInputChange('author_name', instagramId);
            } else {
              console.log('Instagram ID 추출 실패');
            }
          }
          
          // Instagram 내용을 자동으로 내용 필드에 설정
          if (data.data.description && data.data.description !== 'undefined' && !formData.content) {
            // Instagram 설명이 충분히 길면 내용으로 사용
            if (data.data.description.length > 20) {
              // Instagram 설명에서 해시태그나 불필요한 문자 정리
              let cleanDescription = data.data.description;
              
              // Instagram 특유의 문자 정리
              cleanDescription = cleanDescription
                .replace(/\.\.\.$/, '') // 끝의 ... 제거
                .replace(/\s+/g, ' ') // 연속된 공백을 하나로
                .trim();
              
              handleInputChange('content', cleanDescription);
            }
          }
          
          // 제목 자동 설정
          if (data.data.title && data.data.title !== 'undefined' && !formData.title) {
            handleInputChange('title', data.data.title);
          }
        }
      } catch (error) {
        console.error('미리보기 로드 실패:', error);
      } finally {
        setIsLoadingPreview(false);
      }
    } else {
      setPreviewData(null);
    }
  };

  // 폼 제출 - SNS 링크만 있어도 가능하도록 수정
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.social_media_url.trim()) {
      setError('소셜 미디어 링크를 입력해주세요.');
      return;
    }

    // 제목이 없으면 SNS에서 가져온 제목 사용
    const finalTitle = formData.title.trim() || previewData?.title || 'SNS 여행 후기';
    
    // 작성자명 우선순위: 1. 수동 입력 2. Instagram ID 3. 기본값
    let finalAuthorName = formData.author_name.trim();
    if (!finalAuthorName && previewData?.author && previewData.author !== 'undefined') {
      finalAuthorName = previewData.author;
    }
    if (!finalAuthorName) {
      // URL에서 직접 Instagram ID 추출 시도
      const instagramId = extractInstagramId(formData.social_media_url);
      if (instagramId) {
        finalAuthorName = instagramId;
      } else {
        finalAuthorName = '익명 사용자';
      }
    }
    
    // 비밀번호가 없으면 자동 생성
    const finalPassword = formData.password || Math.random().toString(36).substring(2, 8);

    // 소셜 미디어 플랫폼 감지
    const url = formData.social_media_url.toLowerCase();
    let instagram_url = null;
    let youtube_url = null;
    let facebook_url = null;
    let threads_url = null;

    if (url.includes('instagram.com')) {
      instagram_url = formData.social_media_url;
    } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
      youtube_url = formData.social_media_url;
    } else if (url.includes('facebook.com')) {
      facebook_url = formData.social_media_url;
    } else if (url.includes('threads.net')) {
      threads_url = formData.social_media_url;
    }

    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}/api/travel-reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: finalTitle,
          content: formData.content.trim() || previewData?.description || '',
          author_name: finalAuthorName,
          author_email: formData.author_email.trim() || null,
          author_phone: formData.author_phone.trim() || null,
          password: finalPassword,
          category_id: formData.category_id || null,
          instagram_url,
          youtube_url,
          facebook_url,
          threads_url
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('여행 후기가 성공적으로 등록되었습니다!');
        setTimeout(() => {
          setCurrentPage(`travel-reviews-detail-${data.data.id}`);
        }, 2000);
      } else {
        setError(data.message || '여행 후기 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('여행 후기 등록 오류:', error);
      setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">여행 후기 작성</h1>
        <p className="text-gray-600">소셜 미디어 링크만 입력해도 자동으로 정보를 가져옵니다</p>
      </div>

      {/* 알림 메시지 */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-6">
            {/* SNS 링크 (가장 중요) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5" />
                  소셜 미디어 링크 *
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="social_media_url" className="text-sm font-medium">
                    소셜 미디어 링크 *
                  </Label>
                  <Input
                    id="social_media_url"
                    type="url"
                    placeholder="Instagram 또는 YouTube 링크를 입력하세요"
                    value={formData.social_media_url}
                    onChange={(e) => handleSocialMediaUrlChange(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Instagram 또는 YouTube 링크만 지원됩니다. Facebook은 현재 지원하지 않습니다.
                  </p>
                </div>

                <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <p className="font-medium mb-1">💡 지원하는 플랫폼</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="flex items-center gap-1 px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs">
                      <Instagram size={12} />
                      Instagram
                    </span>
                    <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                      <Youtube size={12} />
                      YouTube
                    </span>
                  </div>
                  <p className="mt-2">• 링크만 입력하면 자동으로 제목과 내용을 가져옵니다.</p>
                  <p>• 작성자명과 비밀번호는 선택사항입니다.</p>
                </div>
              </CardContent>
            </Card>

            {/* 미리보기 정보 */}
            {isLoadingPreview && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm text-gray-600">SNS 정보를 가져오는 중...</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {previewData && (
              <Card>
                <CardHeader>
                  <CardTitle>미리보기 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {previewData.image && previewData.image !== 'undefined' ? (
                    <div className="relative h-48 overflow-hidden rounded-lg bg-gray-100">
                      <img 
                        src={`${BASE_URL}/api/travel-reviews/proxy-image?url=${encodeURIComponent(previewData.image)}`}
                        alt="미리보기" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // 이미지 로드 실패 시 플레이스홀더 표시
                          e.currentTarget.style.display = 'none';
                          const placeholder = e.currentTarget.parentElement?.querySelector('.image-placeholder');
                          if (placeholder) {
                            (placeholder as HTMLElement).style.display = 'flex';
                          }
                        }}
                      />
                      <div className="image-placeholder hidden absolute inset-0 items-center justify-center bg-gray-100">
                        <div className="text-center text-gray-500">
                          <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-sm">이미지를 불러올 수 없습니다</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-sm">미리보기 이미지 없음</p>
                      </div>
                    </div>
                  )}
                  <div>
                    <Label className="text-sm font-medium">제목</Label>
                    <p className="text-sm text-gray-600">
                      {previewData.title && previewData.title !== 'undefined' 
                        ? previewData.title 
                        : '제목을 가져올 수 없습니다'}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">설명</Label>
                    <p className="text-sm text-gray-600">
                      {previewData.description && previewData.description !== 'undefined' 
                        ? previewData.description 
                        : '설명을 가져올 수 없습니다'}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">플랫폼</Label>
                    <p className="text-sm text-gray-600">
                      {previewData.site_name && previewData.site_name !== 'undefined' 
                        ? previewData.site_name 
                        : '알 수 없음'}
                    </p>
                  </div>
                  {previewData.author && previewData.author !== 'undefined' && (
                    <div>
                      <Label className="text-sm font-medium">Instagram ID</Label>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-600">@{previewData.author}</p>
                        {previewData.author_url && (
                          <a
                            href={previewData.author_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 text-xs"
                          >
                            프로필 보기
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {previewData.description && previewData.description !== 'undefined' && (
                    <div>
                      <Label className="text-sm font-medium">내용 미리보기</Label>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                        {previewData.description}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* 추가 정보 (선택사항) */}
            <Card>
              <CardHeader>
                <CardTitle>추가 정보 (선택사항)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">제목 수정</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="제목을 수정하거나 직접 입력하세요"
                    maxLength={100}
                  />
                </div>

                <div>
                  <Label htmlFor="content">내용 추가</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="추가 설명이나 개인적인 경험을 입력하세요"
                    rows={4}
                    maxLength={1000}
                  />
                </div>

                <div>
                  <Label htmlFor="category">카테고리</Label>
                  <Select value={formData.category_id} onValueChange={(value) => handleInputChange('category_id', value)}>
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
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 작성자 정보 (선택사항) */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>작성자 정보 (선택사항)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="author_name">작성자명</Label>
                  <Input
                    id="author_name"
                    type="text"
                    placeholder="작성자명 (Instagram ID가 자동으로 채워집니다)"
                    value={formData.author_name}
                    onChange={(e) => handleInputChange('author_name', e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Instagram 링크를 입력하면 작성자 ID가 자동으로 설정됩니다.
                  </p>
                </div>

                <div>
                  <Label htmlFor="author_email">이메일</Label>
                  <Input
                    id="author_email"
                    type="email"
                    value={formData.author_email}
                    onChange={(e) => handleInputChange('author_email', e.target.value)}
                    placeholder="이메일 주소 (선택사항)"
                  />
                </div>

                <div>
                  <Label htmlFor="author_phone">연락처</Label>
                  <Input
                    id="author_phone"
                    value={formData.author_phone}
                    onChange={(e) => handleInputChange('author_phone', e.target.value)}
                    placeholder="연락처 (선택사항)"
                  />
                </div>

                <div>
                  <Label htmlFor="password">비밀번호</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="비밀번호 (비워두면 자동 생성)"
                    minLength={4}
                  />
                </div>

                <div>
                  <Label htmlFor="password_confirm">비밀번호 확인</Label>
                  <Input
                    id="password_confirm"
                    type="password"
                    value={formData.password_confirm}
                    onChange={(e) => handleInputChange('password_confirm', e.target.value)}
                    placeholder="비밀번호 확인 (선택사항)"
                    minLength={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 작성 안내 */}
            <Card>
              <CardHeader>
                <CardTitle>간편 작성 안내</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>소셜 미디어 링크만 입력하면 자동으로 정보를 가져옵니다.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>작성자명과 비밀번호는 선택사항입니다.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>제목과 내용은 SNS에서 가져온 후 수정 가능합니다.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>개인정보는 공개되지 않습니다.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-end gap-4 mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentPage('travel-reviews')}
          >
            취소
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="min-w-32"
          >
            {loading ? '등록 중...' : '여행 후기 등록'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TravelReviewFormPage;