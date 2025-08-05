import { 
  ChevronRight, 
  Home, 
  FileText, 
  Download, 
  Printer, 
  Search,
  Shield,
  AlertCircle,
  Database,
  Eye,
  Lock,
  Trash2,
  Phone,
  Mail,
  User,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface PrivacyPolicyPageProps {
  setCurrentPage: (page: string) => void;
}

interface PolicySection {
  id: string;
  title: string;
  content: string;
  isImportant?: boolean;
  subsections?: {
    title: string;
    content: string;
  }[];
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export default function PrivacyPolicyPage({ setCurrentPage }: PrivacyPolicyPageProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // 개인정보처리방침 데이터
  const policyData: PolicySection[] = [
    {
      id: "collection-items",
      title: "1. 개인정보의 수집 항목 및 수집 방법",
      content: "가. 개인정보 수집항목\n회사가 개인의 식별, 여행 서비스 제공을 위해 수집하는 항목은 목적에 따라 구분됩니다.",
      subsections: [
        {
          title: "1) 여행, 관광지, 이벤트 · 상품정보등 회사가 제공하는 안내와 관광의 주요 편의서비스, 기타 마케팅 정보 등을 제공",
          content: ""
        },
        {
          title: "2) 업무상의, 여가/휴식 소그룹, 여행문화, 여권만료: 출입국/초류롭 예약에 출국기능 어려워함 목적",
          content: ""
        },
        {
          title: "나. 개인정보 수집방법",
          content: "여행상품계약, 홈페이지, 홈페이지에서 상품신청, 전화, 팩스, 온라인 등의 방법으로 개인정보를 수집합니다."
        }
      ],
      isImportant: true
    },
    {
      id: "collection-purpose",
      title: "2. 개인정보의 수집 및 이용 목적",
      content: "회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.",
      subsections: [
        {
          title: "가. 서비스 제공에 관한 계약 이행 및 서비스 제공을 따른 요금정산",
          content: ""
        },
        {
          title: "여행상품 예약, 여행 이행 및 서비스 제공을 따른 요금정산",
          content: "여행상품 예약, 여행상품 및 기타 업무상품 등의 예약, 안전정보 직원, 조회, 초록 및 여해 관련 업내, 마일리지 적립, 포토, 소셜 및 이벤트 관련 업내, 요금정리 및 대금 요금 정산, 물품배송 또는 청구지 정산"
        }
      ],
      isImportant: true
    },
    {
      id: "retention-period",
      title: "3. 개인정보의 이용 및 보유기간",
      content: "회사는 원칙적으로 개인정보를 3년간 수집 목적을 달성하면 해당정보를 즉시이자 파기합니다. 다. 관계법령의 규정에 의하여 보존하여야 하는 정보 및 보유자제에 정한 보유기간 만큼 정보를 보유합니다.",
      subsections: [
        {
          title: "가. 계약은 전자회계 준칙 관련 기록 : 5년 (전자상거래 등에서의 소비자보호에 관한 법률)",
          content: ""
        },
        {
          title: "나. 대금결제 및 재화 등의 공급에 관한 기록 : 5년 (전자상거래 등에서의 소비자보호에 관한 법률)",
          content: ""
        },
        {
          title: "다. 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년 (전자상거래 등에서의 소비자보호에 관한 법률)",
          content: ""
        }
      ]
    },
    {
      id: "sharing-provision",
      title: "4. 개인정보 제공 및 공유",
      content: "가. 회사는 고객님의 동의가 있거나 관련 법령에 의한 경우를 제외하고는 어떠한 경우에도 '개인정보의 수집 및 이용목적'에서 고지된 범위를 넘어 개인정보를 이용하거나 타인 또는 타기업·기관에 제공하지 않습니다. 다. 고객님의 개인정보를 공유하는 경우 다음과 같습니다.",
      table: {
        headers: ["서비스 영역", "제공받는 자", "제공하는 항목", "제공받는 자의 이용목적"],
        rows: [
          ["여행 항공", "대한항공, 아시아나항공, 에어프랑스 등 국내외 제휴 공사/국내편 항공 및 각 교통수단", "예약정보, 성명, 여권번호, 연락처, 입금상황, 성별, 마일리지 적립 / 석식, 마일리지, 우편물 위협정보 및 기타 편의 서비스제공", "항공권 및 기타편승권발급, 숙박예약, 숙박업 현지 숙박시설 및 기타 편의 서비스제공"],
          ["호텔", "국내외호텔사", "성명, 주민등록번호", "여행자보험가입"]
        ]
      }
    },
    {
      id: "rights-exercise",
      title: "5. 정보주체의 권리 및 그 행사방법에 관한 사항",
      content: "이용자는 정보주체로서 개인정보의 열람 및 정정·삭제 또는 처리정지를 요구하고자 하는 권리가 있으며다 권리의 행사는 다른 법률에 따라 개인정보의 처리에 대하여 다음과 같은 권리를 가집니다.",
      subsections: [
        {
          title: "가. 기타정보 처리에 대하여 업무받는 보안업무 및 신고권리를 제한하겠단 당사의 위례로 인하여 업소는 모든 개인정보 보호법 제38조에 따라 다음의 위탁업무 및 신고는 수 있습니다.",
          content: ""
        }
      ]
    },
    {
      id: "security-measures",
      title: "6. 개인정보 보호를 위한 안전성 확보조치에 관한 사항",
      content: "가. 기술적 대책\n회사는 고객님의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적 대책을 강구하고 있습니다.",
      subsections: [
        {
          title: "나. 관리적 대책",
          content: "회사는 고객님의 개인정보에 대한 접근권한을 최소한의 인원으로 제한하고 있습니다. 그 최소한의 인원에 다음과 같은 자가 해당됩니다:\n1) 이용자를 직접 상대로 하여 업무를 수행하는 자\n2) 개인정보보호업무를 담당하는 자 및 개인정보보호 책임자 등 개인정보관리업무를 담당하는 자\n3) 기타 업무상 개인정보의 처리가 불가피한 자\n4) 개인정보를 취급하는 직원의 업무 및 개인정보 보호 업무 인식 향상을 위한 내부방침을 정기적으로 실시하고 있습니다.\n5) 입사시 개 직원의 보안서약서에서 동의서를 통해 사원에 의한 개인정보유출을 사전에 방지하고 개인정보보호정책에 대한 이행사항 및 직원의 준수사항을 주지시키고 있습니다.\n6) 개인정보 관련 취급자의 업무 인계가 이루어지는 경우에는 안전하게 이루어 지도록 하고 있으며, 입사 및 퇴사 후 개인정보 사고에 대한 책임을 명확화 하고 있습니다.\n7) 회사는 이용자 개인의 실수나 기본적인 인터넷의 위험성 때문에 일어나는 일들에 대해 책임을 지지 않습니다. 회원 개인정보의 비밀번호는 본인만이 알 수 있도록 하고, 개인정보를 입력할 때 다른 사람이 지켜보거나 엿볼 수 없도록 주의하시기 바랍니다.\n8) 그 외 내부 관리자의 실수나 기술관리상의 사고로 인해 개인정보의 상실, 유출, 변조, 훼손이 유발될 경우 즉시 이용자에게 사실을 알리고 적절한 대책과 보상을 강구하도록 하겠습니다."
        }
      ]
    },
    {
      id: "destruction-procedure",
      title: "7. 개인정보의 파기절차",
      content: "회사는 수집한 개인정보의 이용목적이 달성된 후에는 이를 즉시 파기하고 개인정보 파기절차 및 방법은 다음과 같습니다.",
      subsections: [
        {
          title: "가. 파기절차",
          content: "1) 고객님이 여행서비스 이용 등을 위해 기입한 개인정보는 이용목적이 달성된 후 내부 방침에 따라 일정 기간 보관된 후 파기됩니다.\n나. 파기방법\n1) 종이에 출력된 개인정보: 분쇄기를 이용하여 분쇄\n2) 전자적 파일형태로 저장된 개인정보: 기록을 재생할 수 없는 방법으로 삭제"
        },
        {
          title: "다. 파기시점",
          content: "1) 해당고객의 경우 : 서비스 수신 종료시 즉시 삭제\n2) 대금결제정보등의 경우 : 대금의 완전지급일로부터 5년후\n단, 수사목적으로 제공한 경우 해당 사건의 완료일로부터 일정 시점에 모든 및 취급의 위험성 때문에 일어나는 일들에 대한 보상처리를 위하여 보관할 수 있습니다."
        }
      ]
    },
    {
      id: "complaints-contact",
      title: "8. 개인정보 민원 및 개인정보보호 책임자 지정",
      content: "가. 당사는 고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보관리책임자를 지정하고 있습니다.",
      subsections: [
        {
          title: "연락처",
          content: "• 전화번호 : 02-738-0747\n• 이메일 : jinju@jinju-travel.co.kr\n• 개인정보관리책임자 직책 : 부장님"
        }
      ]
    },
    {
      id: "miscellaneous",
      title: "9. 기타사항",
      content: "기타 개인정보보호에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.",
      subsections: [
        {
          title: "관련 기관 연락처",
          content: "• 개인정보보호위원회 (http://www.1336.or.kr / 전화: 1336)\n• 정보보호마크인증위원회 (http://www.eprivacy.or.kr / 전화: 02-580-0533-4)\n• 대검찰청 인터넷범죄수사센터 (http://icic.sppo.go.kr / 전화: 02-3480-3600)\n• 경찰청 사이버테러대응센터 (http://www.ctrc.go.kr / 전화: 02-392-0330)"
        }
      ]
    }
  ];

  const tableOfContents = [
    { id: "collection-items", title: "개인정보 수집 항목 및 방법", section: 1 },
    { id: "collection-purpose", title: "수집 및 이용 목적", section: 2 },
    { id: "retention-period", title: "이용 및 보유기간", section: 3 },
    { id: "sharing-provision", title: "제공 및 공유", section: 4 },
    { id: "rights-exercise", title: "정보주체 권리", section: 5 },
    { id: "security-measures", title: "안전성 확보조치", section: 6 },
    { id: "destruction-procedure", title: "파기절차", section: 7 },
    { id: "complaints-contact", title: "민원 및 책임자", section: 8 },
    { id: "miscellaneous", title: "기타사항", section: 9 }
  ];

  const filteredData = policyData.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert("개인정보처리방침 PDF 다운로드 기능은 곧 제공됩니다.");
  };

  return (
    <div className="bg-background min-h-screen">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-medium text-foreground mb-2">
                개인정보처리방침
              </h1>
              <p className="text-muted-foreground">
                진주여행사 개인정보 보호 및 처리 방침 전문
              </p>
            </div>
            
            {/* 브레드크럼 */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Home className="h-4 w-4" />
              <ChevronRight className="h-4 w-4" />
              <span>회사소개</span>
              <ChevronRight className="h-4 w-4" />
              <span>개인정보처리방침</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 사이드바 */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* 도구 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-sm">
                    <FileText className="h-4 w-4" />
                    <span>문서 도구</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={handlePrint}
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    인쇄하기
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={handleDownload}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    PDF 다운로드
                  </Button>
                </CardContent>
              </Card>

              {/* 검색 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-sm">
                    <Search className="h-4 w-4" />
                    <span>내용 검색</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="개인정보 관련 내용 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-sm"
                  />
                </CardContent>
              </Card>

              {/* 목차 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-sm">
                    <Database className="h-4 w-4" />
                    <span>주요 항목</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {tableOfContents.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className="w-full text-left text-sm text-muted-foreground hover:text-blue-600 transition-colors p-2 rounded hover:bg-gray-50"
                      >
                        {item.section}. {item.title}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 개인정보 보호 안내 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-sm text-green-600">
                    <Shield className="h-4 w-4" />
                    <span>개인정보 보호</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-xs text-muted-foreground">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-green-800 font-medium mb-2">수집 목적</p>
                      <p className="text-green-700">
                        여행 서비스 제공 및 고객 상담을 위한 최소한의 개인정보만 수집합니다.
                      </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-blue-800 font-medium mb-2">보관 기간</p>
                      <p className="text-blue-700">
                        관련 법령에 따라 필요한 기간 동안만 보관 후 안전하게 파기합니다.
                      </p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <p className="text-orange-800 font-medium mb-2">문의처</p>
                      <p className="text-orange-700">
                        개인정보 관련 문의: 02-738-0747
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-3">
            {/* 개인정보처리방침 소개 */}
            <div className="mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-6 w-6 text-green-600" />
                      <h2 className="text-xl font-medium">개인정보처리방침</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      ㈜진주여행사(이하 "회사")는 고객의 개인정보보호를 매우 중요시하며, 
                      『개인정보보호법』을 준수하고 있습니다. 회사는 개인정보보호 관련 각종 
                      법률을 지키며 고객의 개인정보가 어떠한 용도와 방식으로 이용되고 있고, 
                      개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        <strong>시행일자:</strong> 본 개인정보처리방침은 2018년 1월 1일부터 시행됩니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 개인정보처리방침 내용 */}
            <div className="space-y-4">
              {filteredData.length === 0 && searchTerm && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Search className="h-8 w-8 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      '{searchTerm}'에 대한 검색 결과가 없습니다.
                    </p>
                  </CardContent>
                </Card>
              )}

              <Accordion type="multiple" className="space-y-4">
                {filteredData.map((item, index) => (
                  <AccordionItem 
                    key={item.id} 
                    value={item.id}
                    id={item.id}
                    className={`border rounded-lg ${item.isImportant ? 'border-green-200 bg-green-50/30' : 'border-border'}`}
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-3">
                          {item.isImportant && (
                            <Badge variant="default" className="bg-green-600">
                              중요
                            </Badge>
                          )}
                          <h3 className="font-medium text-left">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-4">
                        <div className="prose prose-sm max-w-none">
                          <div className="text-foreground leading-relaxed whitespace-pre-line">
                            {item.content}
                          </div>
                        </div>
                        
                        {item.subsections && (
                          <div className="space-y-3 mt-6">
                            {item.subsections.map((subsection, subIndex) => (
                              <div key={subIndex} className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-medium text-foreground mb-2">
                                  {subsection.title}
                                </h4>
                                {subsection.content && (
                                  <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {subsection.content}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {item.table && (
                          <div className="mt-6">
                            <div className="overflow-x-auto">
                              <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                  <tr className="bg-gray-50">
                                    {item.table.headers.map((header, headerIndex) => (
                                      <th key={headerIndex} className="border border-gray-300 px-3 py-2 text-left font-medium text-sm">
                                        {header}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {item.table.rows.map((row, rowIndex) => (
                                    <tr key={rowIndex} className={rowIndex % 2 === 1 ? 'bg-gray-25' : ''}>
                                      {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="border border-gray-300 px-3 py-2 text-sm leading-relaxed">
                                          {cell}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* 개인정보 보호 연락처 */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-green-600" />
                  <span>개인정보 보호 연락처</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">개인정보관리책임자</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>직책: 부장님</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>전화: 02-738-0747</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>이메일: jinju@jinju-travel.co.kr</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">관련 기관</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div>• 개인정보보호위원회: 1336</div>
                      <div>• 정보보호마크인증위원회: 02-580-0533</div>
                      <div>• 대검찰청 인터넷범죄수사센터: 02-3480-3600</div>
                      <div>• 경찰청 사이버테러대응센터: 02-392-0330</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 개인정보 처리현황 요약 */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  <span>개인정보 처리현황 요약</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Database className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                    <div className="font-medium text-blue-900">수집 항목</div>
                    <div className="text-sm text-blue-700">필수 최소한</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Clock className="h-8 w-8 mx-auto text-green-600 mb-2" />
                    <div className="font-medium text-green-900">보관 기간</div>
                    <div className="text-sm text-green-700">법정 기간</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Lock className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                    <div className="font-medium text-purple-900">보안 조치</div>
                    <div className="text-sm text-purple-700">암호화 저장</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <Trash2 className="h-8 w-8 mx-auto text-red-600 mb-2" />
                    <div className="font-medium text-red-900">파기 절차</div>
                    <div className="text-sm text-red-700">완전 삭제</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 하단 문의 섹션 */}
            <Card className="mt-8">
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-medium mb-4">개인정보 관련 문의</h3>
                <p className="text-muted-foreground mb-6">
                  개인정보 보호와 관련하여 궁금한 사항이 있으시면 언제든지 문의해주세요.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button onClick={() => setCurrentPage("qna")}>
                    질문답변 게시판
                  </Button>
                  <Button variant="outline">
                    전화 상담: 02-738-0747
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}