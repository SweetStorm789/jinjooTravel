import {
  ArrowLeft,
  Save,
  Star,
  MapPin,
  Calendar,
  User,
  FileText,
  AlertTriangle,
  Upload,
  X,
  Camera,
  Image as ImageIcon
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
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";

interface TravelReviewFormPageProps {
  setCurrentPage: (page: string) => void;
  reviewId?: string;
}

interface TravelReviewFormData {
  title: string;
  author: string;
  content: string;
  rating: number;
  destination: string;
  travelDate: string;
  category: "성지순례" | "개별여행" | "단체여행";
  images: string[];
  mainImageIndex: number;
}

export default function TravelReviewFormPage({ 
  setCurrentPage, 
  reviewId 
}: TravelReviewFormPageProps) {
  const isEdit = !!reviewId;
  
  const [formData, setFormData] = useState<TravelReviewFormData>({
    title: "",
    author: "",
    content: "",
    rating: 5,
    destination: "",
    travelDate: "",
    category: "성지순례",
    images: [],
    mainImageIndex: 0
  });
  
  const [dragActive, setDragActive] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (isEdit && reviewId) {
      if (reviewId === "1") {
        setFormData({
          title: "메주고리예 성지순례 - 평화와 은총이 가득한 여행",
          author: "김가톨릭",
          content: `메주고리예에서의 일주일은 제 신앙생활에 새로운 전환점이 되었습니다. 

**여행 전 기대와 걱정**
처음 성지순례를 떠나면서 많은 기대와 함께 약간의 걱정도 있었습니다.

**메주고리예 도착**
메주고리예에 도착했을 때의 그 평화로운 분위기는 지금도 잊을 수 없습니다.

**성 야고보 성당에서의 미사**
성 야고보 성당에서 드린 미사는 정말 특별했습니다.

이번 성지순례를 함께해주신 진주여행사와 동행 순례자분들께 감사드립니다.`,
          rating: 5,
          destination: "메주고리예",
          travelDate: "2023년 12월",
          category: "성지순례",
          images: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1520637836862-4d197d17c915?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1539650116574-75c0c6d73fb6?w=800&h=600&fit=crop"
          ],
          mainImageIndex: 0
        });
      }
    }
  }, [isEdit, reviewId]);

  const handleInputChange = (field: keyof TravelReviewFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // 유효성 검사
    if (!formData.title.trim() || !formData.content.trim() || !formData.destination.trim()) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    // 실제로는 API로 데이터 전송
    console.log("저장될 데이터:", formData);
    alert(isEdit ? "여행후기가 수정되었습니다." : "여행후기가 등록되었습니다.");
    setCurrentPage("travel-reviews");
  };

  const renderStarRating = () => {
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleInputChange("rating", i + 1)}
            className="focus:outline-none"
          >
            <Star
              className={`h-6 w-6 transition-colors ${
                i < formData.rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300 hover:text-yellow-300'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-muted-foreground">
          ({formData.rating}/5)
        </span>
      </div>
    );
  };

  // 사진 URL 추가
  const addImageUrl = () => {
    if (newImageUrl.trim()) {
      const newImages = [...formData.images, newImageUrl.trim()];
      setFormData(prev => ({
        ...prev,
        images: newImages
      }));
      setNewImageUrl("");
    }
  };

  // 사진 삭제
  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    let newMainIndex = formData.mainImageIndex;
    
    // 대표사진이 삭제된 경우 첫 번째 사진을 대표로 설정
    if (index === formData.mainImageIndex) {
      newMainIndex = 0;
    } else if (index < formData.mainImageIndex) {
      newMainIndex = formData.mainImageIndex - 1;
    }
    
    setFormData(prev => ({
      ...prev,
      images: newImages,
      mainImageIndex: Math.min(newMainIndex, newImages.length - 1)
    }));
  };

  // 대표사진 설정
  const setMainImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      mainImageIndex: index
    }));
  };

  // 드래그 앤 드롭 핸들러
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // 실제 파일 업로드는 여기서 처리
      // 지금은 시뮬레이션을 위해 샘플 URL 추가
      const sampleUrls = [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1520637836862-4d197d17c915?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73fb6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop"
      ];
      
      const randomUrl = sampleUrls[Math.floor(Math.random() * sampleUrls.length)];
      const newImages = [...formData.images, randomUrl];
      setFormData(prev => ({
        ...prev,
        images: newImages
      }));
    }
  };

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
                onClick={() => setCurrentPage(isEdit ? `travel-review-detail-${reviewId}` : "travel-reviews")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>뒤로가기</span>
              </Button>
              <h1 className="text-lg font-medium">
                {isEdit ? "여행후기 수정" : "여행후기 작성"}
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                미리보기
              </Button>
              <Button onClick={handleSubmit} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>{isEdit ? "수정" : "등록"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* 사진 업로드 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5" />
                <span>여행 사진</span>
              </CardTitle>
              <CardDescription>
                여행에서 찍은 사진들을 업로드해주세요. 첫 번째 사진이 대표사진으로 설정됩니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 드래그 앤 드롭 영역 */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center space-y-4">
                  <Upload className="h-12 w-12 text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium">사진을 드래그하여 업로드하세요</p>
                    <p className="text-sm text-muted-foreground">
                      또는 아래에서 이미지 URL을 직접 입력할 수 있습니다
                    </p>
                  </div>
                </div>
              </div>

              {/* URL 입력 */}
              <div className="flex space-x-2">
                <Input
                  placeholder="이미지 URL을 입력하세요"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addImageUrl();
                    }
                  }}
                />
                <Button onClick={addImageUrl} disabled={!newImageUrl.trim()}>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  추가
                </Button>
              </div>

              {/* 업로드된 사진들 */}
              {formData.images.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>업로드된 사진 ({formData.images.length}장)</Label>
                    <Badge variant="outline">
                      대표사진: {formData.mainImageIndex + 1}번째
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div 
                        key={index} 
                        className={`relative group rounded-lg overflow-hidden border-2 transition-all ${
                          index === formData.mainImageIndex 
                            ? 'border-blue-500 ring-2 ring-blue-200' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="aspect-square">
                          <ImageWithFallback
                            src={image}
                            alt={`업로드된 사진 ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* 대표사진 표시 */}
                        {index === formData.mainImageIndex && (
                          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                            대표
                          </div>
                        )}
                        
                        {/* 액션 버튼들 */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                          {index !== formData.mainImageIndex && (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => setMainImage(index)}
                              className="text-xs"
                            >
                              대표설정
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        {/* 사진 번호 */}
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 기본 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>기본 정보</span>
              </CardTitle>
              <CardDescription>여행후기의 기본 정보를 입력하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">후기 제목 *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="여행후기 제목을 입력하세요"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="author">작성자 *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    placeholder="작성자명"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">여행유형 *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleInputChange("category", value as "성지순례" | "개별여행" | "단체여행")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="성지순례">성지순례</SelectItem>
                      <SelectItem value="개별여행">개별여행</SelectItem>
                      <SelectItem value="단체여행">단체여행</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="destination">여행지 *</Label>
                  <Input
                    id="destination"
                    value={formData.destination}
                    onChange={(e) => handleInputChange("destination", e.target.value)}
                    placeholder="예: 메주고리예, 로마/바티칸"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="travelDate">여행일자 *</Label>
                  <Input
                    id="travelDate"
                    value={formData.travelDate}
                    onChange={(e) => handleInputChange("travelDate", e.target.value)}
                    placeholder="예: 2023년 12월"
                  />
                </div>
              </div>

              {/* 별점 평가 */}
              <div className="space-y-2">
                <Label>전체 만족도 *</Label>
                <div className="flex items-center space-x-4">
                  {renderStarRating()}
                </div>
                <p className="text-xs text-muted-foreground">
                  별을 클릭하여 만족도를 평가해주세요
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 여행후기 작성 */}
          <Card>
            <CardHeader>
              <CardTitle>여행후기 내용</CardTitle>
              <CardDescription>
                여행에서 경험하신 소중한 순간들을 자세히 작성해주세요.
                사진과 함께 생생한 후기를 기대합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="content">후기 내용 *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  placeholder="여행에서 경험하신 내용을 자세히 작성해주세요.&#10;&#10;예시:&#10;- 인상 깊었던 장소나 순간&#10;- 현지 문화나 음식 경험&#10;- 가이드나 서비스에 대한 평가&#10;- 다른 여행객들에게 추천하고 싶은 포인트&#10;- 아쉬웠던 점이나 개선 제안&#10;&#10;사진과 함께 설명해주시면 더욱 좋습니다!&#10;**굵은글씨**나 - 리스트 형식으로 작성하시면 더욱 읽기 좋습니다."
                  rows={20}
                  className="font-mono"
                />
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• 업로드한 사진들과 관련된 내용을 포함해주세요.</p>
                  <p>• **텍스트**로 굵은 글씨, - 리스트 등 간단한 마크다운 문법을 사용할 수 있습니다.</p>
                  <p>• 솔직하고 자세한 후기일수록 다른 고객분들께 더 많은 도움이 됩니다.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 사진 업로드 가이드라인 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-600">
                <AlertTriangle className="h-5 w-5" />
                <span>사진 업로드 가이드라인</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-medium mb-2">사진 업로드 팁:</p>
                  <ul className="text-blue-700 space-y-1">
                    <li>• 여행의 하이라이트가 담긴 사진을 대표사진으로 설정해주세요</li>
                    <li>• 사진 개수에 제한은 없으니 자유롭게 업로드해주세요</li>
                    <li>• 성지, 풍경, 음식, 동행 등 다양한 사진을 포함해주세요</li>
                    <li>• 사진 순서는 여행 일정 순으로 정렬하시면 좋습니다</li>
                    <li>• 각 사진에 대한 설명을 후기 내용에 포함해주세요</li>
                  </ul>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800 font-medium mb-2">주의사항:</p>
                  <ul className="text-amber-700 space-y-1">
                    <li>• 개인정보가 식별될 수 있는 사진은 업로드하지 마세요</li>
                    <li>• 저작권이 있는 이미지는 사용하지 마세요</li>
                    <li>• 부적절하거나 선정적인 이미지는 금지됩니다</li>
                    <li>• 타인의 초상권을 침해하지 않도록 주의해주세요</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 하단 액션 버튼 */}
          <div className="flex justify-center space-x-4 pt-6">
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage("travel-reviews")}
            >
              취소
            </Button>
            <Button onClick={handleSubmit} className="px-8">
              {isEdit ? "수정 완료" : "후기 등록"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}