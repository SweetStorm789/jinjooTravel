import {
  ArrowLeft,
  Save,
  Calendar,
  User,
  FileText,
  AlertTriangle,
  Pin
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

interface NoticeFormPageProps {
  setCurrentPage: (page: string) => void;
  noticeId?: string;
}

interface NoticeFormData {
  title: string;
  author: string;
  content: string;
  category: "공지" | "안내" | "이벤트";
  isPinned: boolean;
}

export default function NoticeFormPage({ 
  setCurrentPage, 
  noticeId 
}: NoticeFormPageProps) {
  const isEdit = !!noticeId;
  
  const [formData, setFormData] = useState<NoticeFormData>({
    title: "",
    author: "관리자",
    content: "",
    category: "공지",
    isPinned: false
  });

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (isEdit && noticeId) {
      // 실제로는 API에서 데이터를 가져올 예정
      if (noticeId === "1") {
        setFormData({
          title: "2024년 설날 연휴 영업시간 안내",
          author: "관리자",
          content: `안녕하세요, 진주여행사입니다.

2024년 설날 연휴 기간 중 영업시간 변경에 대해 안내드립니다.

**휴무 기간**
- 2024년 2월 9일(금) ~ 2월 12일(월)

**정상 영업 재개**
- 2024년 2월 13일(화)부터 정상 영업

휴무 기간 중에는 전화 상담이 불가하며, 홈페이지를 통한 문의는 정상 영업일에 순차적으로 답변드리겠습니다.

고객 여러분의 양해를 부탁드리며, 새해 복 많이 받으시기 바랍니다.

감사합니다.`,
          category: "공지",
          isPinned: true
        });
      }
    }
  }, [isEdit, noticeId]);

  const handleInputChange = (field: keyof NoticeFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // 유효성 검사
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    // 실제로는 API로 데이터 전송
    console.log("저장될 데이터:", formData);
    alert(isEdit ? "공지사항이 수정되었습니다." : "공지사항이 등록되었습니다.");
    setCurrentPage("notices");
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
                onClick={() => setCurrentPage(isEdit ? `notice-detail-${noticeId}` : "notices")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>뒤로가기</span>
              </Button>
              <h1 className="text-lg font-medium">
                {isEdit ? "공지사항 수정" : "공지사항 작성"}
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
          {/* 기본 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>기본 정보</span>
              </CardTitle>
              <CardDescription>공지사항의 기본 정보를 입력하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">제목 *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="공지사항 제목을 입력하세요"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="author">작성자</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    placeholder="작성자"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">카테고리 *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleInputChange("category", value as "공지" | "안내" | "이벤트")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="공지">공지</SelectItem>
                      <SelectItem value="안내">안내</SelectItem>
                      <SelectItem value="이벤트">이벤트</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="isPinned" className="flex items-center space-x-2">
                    <Pin className="h-4 w-4" />
                    <span>상단 고정</span>
                  </Label>
                  <div className="flex items-center space-x-2 h-10">
                    <Switch
                      id="isPinned"
                      checked={formData.isPinned}
                      onCheckedChange={(checked) => handleInputChange("isPinned", checked)}
                    />
                    <span className="text-sm text-muted-foreground">
                      {formData.isPinned ? "고정됨" : "일반"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 내용 작성 */}
          <Card>
            <CardHeader>
              <CardTitle>공지사항 내용</CardTitle>
              <CardDescription>
                공지사항의 상세 내용을 작성하세요. 
                <br />
                <strong>에디터 업그레이드 권장:</strong> 현재는 기본 텍스트 편집기를 사용하고 있습니다. 
                더 나은 편집 경험을 위해 react-quill 같은 WYSIWYG 에디터 도입을 권장합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="content">내용 *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  placeholder="공지사항 내용을 입력하세요&#10;&#10;**굵은글씨** 처럼 간단한 마크다운 문법을 사용할 수 있습니다.&#10;- 리스트 항목&#10;- 리스트 항목&#10;&#10;향후 WYSIWYG 에디터로 업그레이드 예정입니다."
                  rows={15}
                  className="font-mono"
                />
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• 현재는 기본 텍스트 편집기를 사용하고 있습니다.</p>
                  <p>• **텍스트**로 굵은 글씨, - 리스트 등 간단한 마크다운 문법을 사용할 수 있습니다.</p>
                  <p>• 향후 react-quill을 도입하여 더 풍부한 편집 기능을 제공할 예정입니다.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 에디터 업그레이드 안내 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-amber-600">
                <AlertTriangle className="h-5 w-5" />
                <span>에디터 업그레이드 계획</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p><strong>현재 상태:</strong> 기본 Textarea 편집기</p>
                <p><strong>권장 업그레이드:</strong> react-quill WYSIWYG 에디터</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-blue-800 font-medium mb-2">react-quill 도입 시 추가될 기능:</p>
                  <ul className="text-blue-700 space-y-1">
                    <li>• 텍스트 서식 (굵게, 기울임, 밑줄)</li>
                    <li>• 링크 삽입 및 관리</li>
                    <li>• 이미지 업로드 및 삽입</li>
                    <li>• 리스트 및 표 작성</li>
                    <li>• 실시간 미리보기</li>
                    <li>• HTML 출력으로 저장</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 작성 안내 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-amber-600">
                <AlertTriangle className="h-5 w-5" />
                <span>작성 안내</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• 공지사항은 정확하고 명확한 내용으로 작성해주세요.</p>
                <p>• 중요한 공지사항은 상단 고정 기능을 활용하세요.</p>
                <p>• 카테고리를 적절히 선택하여 고객이 쉽게 찾을 수 있도록 해주세요.</p>
                <p>• 연락처나 링크 정보는 정확히 입력해주세요.</p>
              </div>
            </CardContent>
          </Card>

          {/* 하단 액션 버튼 */}
          <div className="flex justify-center space-x-4 pt-6">
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage("notices")}
            >
              취소
            </Button>
            <Button onClick={handleSubmit} className="px-8">
              {isEdit ? "수정 완료" : "등록 완료"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}