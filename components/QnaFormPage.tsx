import {
  ArrowLeft,
  Save,
  Lock,
  Unlock,
  FileText,
  AlertTriangle
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { useState, useEffect } from "react";

interface QnaFormPageProps {
  setCurrentPage: (page: string) => void;
  qnaId?: string;
}

interface QnaFormData {
  title: string;
  author: string;
  content: string;
  category: "상품문의" | "예약문의" | "일반문의" | "취소/환불";
  isPrivate: boolean;
  email: string;
  phone: string;
}

export default function QnaFormPage({ 
  setCurrentPage, 
  qnaId 
}: QnaFormPageProps) {
  const isEdit = !!qnaId;
  
  const [formData, setFormData] = useState<QnaFormData>({
    title: "",
    author: "",
    content: "",
    category: "일반문의",
    isPrivate: false,
    email: "",
    phone: ""
  });

  useEffect(() => {
    if (isEdit && qnaId === "1") {
      setFormData({
        title: "메주고리예 성지순례 3월 출발 일정 문의드립니다",
        author: "김순례",
        content: `안녕하세요. 3월 중순경 메주고리예 성지순례를 계획하고 있습니다.

몇 가지 문의사항이 있어서 글을 남깁니다.

1. 3월 15일~25일 사이에 출발하는 일정이 있는지요?
2. 현재 예약 가능한 상황인지요?
3. 총 비용은 얼마 정도 예상해야 하는지요?

빠른 답변 부탁드립니다.`,
        category: "상품문의",
        isPrivate: false,
        email: "kim@example.com",
        phone: "010-1234-5678"
      });
    }
  }, [isEdit, qnaId]);

  const handleInputChange = (field: keyof QnaFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    console.log("저장될 데이터:", formData);
    alert(isEdit ? "질문이 수정되었습니다." : "질문이 등록되었습니다.");
    setCurrentPage("qna");
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
              <div className="space-y-2">
                <Label htmlFor="title">제목 *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="질문 제목을 입력하세요"
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
                  <Label htmlFor="category">문의유형 *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleInputChange("category", value as QnaFormData['category'])}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="상품문의">상품문의</SelectItem>
                      <SelectItem value="예약문의">예약문의</SelectItem>
                      <SelectItem value="일반문의">일반문의</SelectItem>
                      <SelectItem value="취소/환불">취소/환불</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="답변 받을 이메일 주소"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">연락처</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="연락 가능한 전화번호"
                  />
                </div>
              </div>

              {/* 비공개 설정 */}
              <div className="space-y-2">
                <Label htmlFor="isPrivate" className="flex items-center space-x-2">
                  {formData.isPrivate ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                  <span>비공개 질문</span>
                </Label>
                <div className="flex items-center space-x-2 h-10">
                  <Switch
                    id="isPrivate"
                    checked={formData.isPrivate}
                    onCheckedChange={(checked) => handleInputChange("isPrivate", checked)}
                  />
                  <span className="text-sm text-muted-foreground">
                    {formData.isPrivate ? "다른 사용자에게 보이지 않습니다" : "모든 사용자가 볼 수 있습니다"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 질문 내용 */}
          <Card>
            <CardHeader>
              <CardTitle>질문 내용</CardTitle>
              <CardDescription>
                궁금한 사항을 자세히 작성해주세요. 구체적일수록 정확한 답변을 받을 수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="content">질문 내용 *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  placeholder="질문하고 싶은 내용을 자세히 작성해주세요.&#10;&#10;예시:&#10;- 구체적인 여행 일정이나 상품에 대한 문의&#10;- 예약 관련 문의사항&#10;- 개인적인 상황에 따른 맞춤 문의&#10;- 기타 궁금한 사항&#10;&#10;상세한 정보를 제공해주실수록 정확한 답변을 드릴 수 있습니다."
                  rows={15}
                />
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• 개인정보(주민번호, 계좌번호 등)는 비공개 문의로 작성하시거나 직접 연락주세요.</p>
                  <p>• 긴급한 사항은 고객센터 1588-1234로 직접 연락해주세요.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 질문 작성 안내 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-600">
                <AlertTriangle className="h-5 w-5" />
                <span>질문답변 이용 안내</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium mb-2">답변 받기 위한 팁:</p>
                  <ul className="text-green-700 space-y-1">
                    <li>• 구체적인 여행 일정, 인원수, 예산을 명시해주세요</li>
                    <li>• 특별한 요청사항이나 제약사항이 있다면 함께 알려주세요</li>
                    <li>• 연락 가능한 시간대를 함께 적어주시면 도움이 됩니다</li>
                    <li>• 이전 여행 경험이나 선호사항을 알려주시면 맞춤 답변이 가능합니다</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-medium mb-2">답변 일정:</p>
                  <ul className="text-blue-700 space-y-1">
                    <li>• 일반 문의: 영업일 기준 1-2일 내 답변</li>
                    <li>• 상품/예약 문의: 당일 또는 다음 영업일 답변</li>
                    <li>• 취소/환불 문의: 당일 처리 후 답변</li>
                    <li>• 비공개 문의: 개별 연락 또는 이메일 답변</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 하단 액션 버튼 */}
          <div className="flex justify-center space-x-4 pt-6">
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage("qna")}
            >
              취소
            </Button>
            <Button onClick={handleSubmit} className="px-8">
              {isEdit ? "수정 완료" : "질문 등록"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}