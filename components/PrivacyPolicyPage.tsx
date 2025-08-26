import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface PrivacyPolicyPageProps {
  setCurrentPage: (page: string) => void;
}

export default function PrivacyPolicyPage({ setCurrentPage }: PrivacyPolicyPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setCurrentPage("home")}
            className="mb-4 flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>홈으로</span>
          </Button>
          
          <div className="text-sm text-gray-500 mb-2">
            홈 / 개인정보처리방침
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900">
            개인정보처리방침
          </h1>
        </div>

        {/* Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="prose prose-gray max-w-none">
              <p className="text-sm text-gray-600 mb-8">
                (주)진주여행사는 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.
              </p>

              <div className="space-y-8">
                {/* Section 1 */}
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    1. 개인정보 수집 항목 및 수집 방법
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">가. 개인정보 수집항목</h3>
                      <p className="text-gray-700 mb-2">고객 식별 및 여행 서비스 제공을 위해 수집하는 항목과 목적</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        <li><strong>성별, 연락처, 이메일:</strong> 상품 상담 및 예약 내역 확인, 약관 변경 사항, 마케팅 정보 제공 목적</li>
                        <li><strong>영문성명, 여권/비자 소지여부, 여권번호, 여권만료일:</strong> 항공권/호텔 예약 및 출국 가능 여부 파악 목적</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">나. 개인정보 수집방법</h3>
                      <p className="text-gray-700">
                        여행 상품 예약, 항공권, 웹사이트 상담 게시판, 전화, 팩스를 통한 본인 확인 등으로 개인정보를 수집합니다.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 2 */}
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    2. 개인정보의 수집 및 이용 목적
                  </h2>
                  <p className="text-gray-700">
                    수집된 개인정보를 서비스 제공 계약 이행 및 요금 정산, 여행 상품 예약, 여행자 보험 가입, 항공권/호텔 예약, 예약 내역 확인 및 상담, 콘텐츠 제공, 회원 우대, 마일리지 적립, 조회, 사용 및 안내, 항공권 구매 및 요금 결제, 물품 배송 또는 청구지 발송, 본인 인증 및 금융 서비스, 구매 및 요금 결제 등에 활용합니다.
                  </p>
                </section>

                {/* Section 3 */}
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    3. 개인정보의 이용 및 보유기간
                  </h2>
                  <p className="text-gray-700 mb-4">
                    개인정보는 수집 목적 달성 시 파기되지만, 관계 법령에 따라 보존할 필요가 있는 경우 일정 기간 동안 보관합니다.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li><strong>가. 계약 또는 청약철회 등에 관한 기록:</strong> 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                    <li><strong>나. 대금결재 및 재화 등의 공급에 관한 기록:</strong> 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                    <li><strong>다. 소비자의 불만 또는 분쟁처리에 관한 기록:</strong> 3년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                  </ul>
                </section>

                {/* Section 4 */}
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    4. 개인정보 제공 및 공유
                  </h2>
                  <p className="text-gray-700 mb-4">
                    고객 동의 또는 관련 법령 규정에 의한 경우를 제외하고는 개인정보를 '수집 및 이용 목적' 범위를 넘어 타 기업/기관에 제공하거나 이용하지 않습니다.
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-3 text-left">서비스 영역</th>
                          <th className="border border-gray-300 p-3 text-left">제공받는 자</th>
                          <th className="border border-gray-300 p-3 text-left">제공하는 항목</th>
                          <th className="border border-gray-300 p-3 text-left">제공받는 자의 이용목적</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-3">여행, 항공</td>
                          <td className="border border-gray-300 p-3">대한항공, 아시아나항공, 베트남항공 및 국내외 제휴 항공사, 국내외 호텔 및 리조트 숙박업체</td>
                          <td className="border border-gray-300 p-3">영문성명, 생년월일, 여권번호, 연락처, 여권만료일, 성명, 마일리지정보</td>
                          <td className="border border-gray-300 p-3">항공권 및 기타 운송업체 탑승 예약, 숙박 예약, 현지 행사 진행 및 고객 관리, 마일리지 적립/전환, 사용 확인, 회원 할인 및 기타 편의 서비스 제공</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3">보험</td>
                          <td className="border border-gray-300 p-3">국내보험사</td>
                          <td className="border border-gray-300 p-3">성명, 주민등록번호</td>
                          <td className="border border-gray-300 p-3">여행자 보험 가입</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Section 5 */}
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    5. 정보주체의 권리 및 그 행사방법에 관한 사항
                  </h2>
                  <p className="text-gray-700 mb-4">
                    이용자는 개인정보에 대한 열람, 정정, 삭제, 처리정지를 요구할 수 있으며, 개인정보보호책임자에게 서면, 전화, 이메일 등을 통하여 요구할 수 있습니다.
                  </p>
                  <p className="text-gray-700 mb-4">
                    정정을 요구한 경우에는 정정이 완료될 때까지 당해 개인정보를 이용하거나 제공하지 않으며, 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 하겠습니다.
                  </p>
                  <p className="text-gray-700">
                    삭제 또는 처리정지를 요구한 개인정보는 회사가 정한 보유 및 이용기간에 따라 처리되며, 다른 목적으로 이용하지 않습니다.
                  </p>
                </section>

                {/* Section 6 */}
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    6. 개인정보 보호를 위한 안전성 확보조치에 관한 사항
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">가. 기술적 대책</h3>
                      <p className="text-gray-700">
                        개인정보의 안전한 보호를 위해 백신프로그램을 설치하고 주기적으로 업데이트하여 개인정보가 유출되거나 훼손되지 않도록 방지하고 있습니다.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">나. 관리적 대책</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>개인정보에 대한 접근을 최소한의 인원으로 제한하고 있습니다.</li>
                        <li>개인정보를 취급하는 직원을 대상으로 정기적인 보안 교육을 실시하고 있습니다.</li>
                        <li>개인정보 유출방지를 위해 보안서약서를 작성하고 있습니다.</li>
                        <li>개인정보 취급자의 업무 인수인계 시 보안이 유지되도록 관리하고 있습니다.</li>
                        <li>개인정보에 접근한 기록을 남기고 이를 정기적으로 검토하고 있습니다.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 7 */}
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    7. 개인정보의 파기관리
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">가. 파기절차</h3>
                      <p className="text-gray-700">
                        개인정보의 보유기간이 경과하거나 처리목적이 달성된 후에는 내부 방침 및 관련 법령에 따라 지체 없이 파기합니다.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">나. 파기방법</h3>
                      <p className="text-gray-700">
                        종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기하고, 전자적 파일 형태로 저장된 개인정보는 복구 및 재생이 불가능한 방법으로 영구 삭제합니다.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">다. 파기시점</h3>
                      <p className="text-gray-700">
                        예약 고객의 경우 서비스 완료 후, 결제정보의 경우 결제 또는 청구 완료 후 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 8 */}
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    8. 개인정보 민원 안내 및 개인정보보호 책임자 지정
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">가. 개인정보보호책임자</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 mb-2"><strong>전화:</strong> 02-738-0747</p>
                        <p className="text-gray-700 mb-2"><strong>이메일:</strong> master@jjtravel.co.kr</p>
                        <p className="text-gray-700"><strong>성명:</strong> 박영빈</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">나. 개인정보보호 관련 민원</h3>
                      <p className="text-gray-700">
                        개인정보보호에 관한 민원은 개인정보보호책임자 또는 담당부서로 신고하실 수 있으며, 회사는 신고사항에 대해 신속하고 충분한 답변을 드릴 것을 약속드립니다.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 9 */}
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    9. 기타사항
                  </h2>
                  <p className="text-gray-700 mb-4">
                    개인정보 침해에 대한 신고나 상담이 필요하시면 아래 기관에 문의하시기 바랍니다.
                  </p>
                  
                  <div className="space-y-2 text-gray-700">
                    <p><strong>개인정보분쟁조정위원회:</strong> <a href="http://www.1336.or.kr" className="text-blue-600 hover:underline">http://www.1336.or.kr</a> / 1336</p>
                    <p><strong>개인정보보호위원회:</strong> <a href="http://www.eprivacy.or.kr" className="text-blue-600 hover:underline">http://www.eprivacy.or.kr</a> / 02-580-0533~4</p>
                    <p><strong>대검찰청 사이버범죄수사단:</strong> <a href="http://icic.sppo.go.kr" className="text-blue-600 hover:underline">http://icic.sppo.go.kr</a> / 02-3480-3600</p>
                    <p><strong>경찰청 사이버테러대응센터:</strong> <a href="http://www.ctrc.go.kr" className="text-blue-600 hover:underline">http://www.ctrc.go.kr</a> / 02-392-0330</p>
                  </div>
                </section>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}