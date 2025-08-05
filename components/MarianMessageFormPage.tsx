import {
  ArrowLeft,
  Save,
  Calendar,
  User,
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
import { useState, useEffect } from "react";

interface MarianMessageFormPageProps {
  setCurrentPage: (page: string) => void;
  messageId?: string;
}

interface MessageFormData {
  title: string;
  author: string;
  date: string;
  content: string;
}

export default function MarianMessageFormPage({ 
  setCurrentPage, 
  messageId 
}: MarianMessageFormPageProps) {
  const isEdit = !!messageId;
  
  const [formData, setFormData] = useState<MessageFormData>({
    title: "",
    author: "성모님메시지",
    date: "",
    content: ""
  });

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (isEdit && messageId) {
      // 실제로는 API에서 데이터를 가져올 예정
      // 현재는 샘플 데이터로 테스트
      if (messageId === "1") {
        setFormData({
          title: "2023년 8월 25일 평화의 모후 메주고리예 성모님 메시지",
          author: "성모님메시지",
          date: "2023-10-13",
          content: "사랑하는 아이들아, 오늘의 시기에 지금, 마음으로는 하느님 쪽을 되돌아보라. 어떤 아이들아, 하느님께서 우리안에서 신앙으로 더 나을 수 있듯이 그 마음을 더듬 신앙 안에서 그 갈 옵니다. 그 사랑을 늘 볼 수 있는 나의 어머니와 기는 마음에 허용됩 함께들을 창의성을 만들어 가고 있습니다. 내가 불을 때 떠들이는 나하기 고딕다. 사랑하는 기는 희망 아이며, 은총이 시기는 성령의이..."
        });
      }
    } else {
      // 새 등록시 오늘 날짜 설정
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, date: today }));
    }
  }, [isEdit, messageId]);

  const handleInputChange = (field: keyof MessageFormData, value: string) => {
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
    alert(isEdit ? "메시지가 수정되었습니다." : "메시지가 등록되었습니다.");
    setCurrentPage("marian-messages");
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
                onClick={() => setCurrentPage(isEdit ? `marian-message-detail-${messageId}` : "marian-messages")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>뒤로가기</span>
              </Button>
              <h1 className="text-lg font-medium">
                {isEdit ? "성모님 메시지 수정" : "성모님 메시지 등록"}
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
              <CardDescription>성모님 메시지의 기본 정보를 입력하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">제목 *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="예: 2023년 8월 25일 평화의 모후 메주고리예 성모님 메시지"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="author">작성자</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    placeholder="성모님메시지"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">날짜 *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 메시지 내용 */}
          <Card>
            <CardHeader>
              <CardTitle>메시지 내용</CardTitle>
              <CardDescription>성모님의 메시지 내용을 입력하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="content">메시지 내용 *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  placeholder="성모님의 메시지 내용을 입력하세요"
                  rows={12}
                />
                <p className="text-xs text-muted-foreground">
                  목록 페이지에서는 처음 200자 정도가 미리보기로 표시됩니다.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 주의사항 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-amber-600">
                <AlertTriangle className="h-5 w-5" />
                <span>작성 안내</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• 성모님 메시지는 정확하고 진실된 내용으로 작성해주세요.</p>
                <p>• 날짜는 실제 메시지를 받은 날짜로 입력해주세요.</p>
                <p>• 목록에서는 메시지의 처음 부분이 자동으로 요약되어 표시됩니다.</p>
                <p>• 원문을 정확히 옮겨 적어주세요.</p>
              </div>
            </CardContent>
          </Card>

          {/* 하단 액션 버튼 */}
          <div className="flex justify-center space-x-4 pt-6">
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage("marian-messages")}
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