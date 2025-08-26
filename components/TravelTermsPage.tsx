import {
  ChevronRight,
  Home,
  FileText,
  Download,
  Printer,
  Search,
  Scale,
  Shield,
  AlertCircle,
  Calendar,
  CreditCard,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface TravelTermsPageProps {
  setCurrentPage: (page: string) => void;
}

interface TermsSection {
  id: string;
  title: string;
  content: string;
  isImportant?: boolean;
  subsections?: {
    title: string;
    content: string;
  }[];
}

export default function TravelTermsPageFull({
  setCurrentPage,
}: TravelTermsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("domestic");

  // 국내여행 표준약관 전체 데이터
  const domesticTerms: TermsSection[] = [
    {
      id: "domestic-1",
      title: "제1조 (목적)",
      content:
        "이 약관은 ㈜진주여행사(이하 “당사”라 한다.)와 여행자가 체결한 국내여행계약의 세부 이행 및 준수사항을 정함을 목적으로 합니다.",
    },
    {
      id: "domestic-2",
      title: "제2조 (당사와 여행자 의무)",
      content:
        "1. 당사는 여행자에게 안전하고 만족스러운 여행서비스를 제공하기 위하여 여행알선 및 안내,운송,숙박 등 여행계획의 수립 및 실행과정에서 맡은 바 임무를 충실히 수행하여야 합니다.\n\n2. 여행자는 안전하고 즐거운 여행을 위하여 여행자간 화합도모 및 여행업자의 여행질서 유지에 적극 협조하여야 합니다.",
    },
    {
      id: "domestic-3",
      title: "제3조 (용어의 정의)",
      content:
        "여행의 종류 및 정의, 국내여행 수속대행업의 정의는 다음과 같습니다.",
      subsections: [
        {
          title: "1. 기획여행",
          content:
            "당사가 미리 여행목적지 및 관광일정, 여행자에게 제공될 운송 및 숙식서비스 내용(이하 ‘여행서비스’라 함), 여행 요금을 정하여 광고 또는 기타 방법으로 여행자를 모집하여 실시하는 여행.",
        },
        {
          title: "2. 희망여행",
          content:
            "여행자(개인 또는 단체)가 희망하는 여행조건에 따라 당사가 운송,숙식,관광 등 여행에 관한 전반적인 계획을 수립하여 실시하는 여행.",
        },
        {
          title: "3. 위탁모집여행",
          content:
            "여행사가 만든 모집여행상품의 여행자 모집을 타 여행업체에 위탁하여 실시하는 여행",
        },
      ],
    },
    {
      id: "domestic-4",
      title: "제4조 (계약의 구성)",
      content:
        "1. 여행계약은 여행계약서(붙임)와 여행약관,여행일정표(또는 여행설명서)를 계약내용으로 합니다.\n\n2. 여행일정표(또는 여행설명서)에는 여행일자별 여행지와 관광내용,교통수단,쇼핑횟수,숙박장소,식사 등 여행실시일정 및 여행사 제공 서비스 내용과 여행자 유의사항이 포함되어야 합니다.",
    },
    {
      id: "domestic-5",
      title: "제5조 (계약의 성립)",
      content:
        "여행자가 당사에 구두,전화,서신 서류 등에 의한 표시로 국내여행을 신청하고 당사는 소정절차에 따라 이에 대한 신청을 확인한 후 여행자가 제11조 3항에 준하여 계약 체결 시 여행요금 중 계약금으로 별도 고지된 금액을 당사에 지급하면 여행계약이 성립한 것으로 간주합니다. 아울러 여행자는 당사의 여행약관을 주지하여야 합니다.",
      isImportant: true,
    },
    {
      id: "domestic-6",
      title: "제6조 (특약)",
      content:
        "당사와 여행자는 관계법규에 위반되지 않는 범위 내에서 서면으로 특약을 맺을 수 있습니다. 이 경우 표준약관과 다름을 당사는 여행자에게 설명하여야 합니다.",
    },
    {
      id: "domestic-7",
      title: "제7조 (계약서 및 약관 등 교부)",
      content:
        "당사는 여행자와 여행계약을 체결한 경우 계약서와 여행약관, 여행일정표(또는 여행설명서)를 각 1부씩 여행자에게 교부하여야 합니다.",
    },
    {
      id: "domestic-8",
      title: "제8조 (계약서 및 약관 등 교부 간주)",
      content:
        "당사와 여행자는 다음 각 호의 경우 여행계약서와 여행약관 및 여행일정표(또는 여행설명서)가 교부된 것으로 간주합니다.",
      subsections: [
        {
          title: "1. 인터넷 등 전자정보망 이용",
          content:
            "여행자가 인터넷 등 전자정보망으로 제공된 여행계약서, 약관 및 여행일정표(또는 여행설명서)의 내용에 동의하고 여행계약의 체결을 신청한데 대해 당사가 전자정보망이나 기계적 장치 등을 이용하여 여행자에게 승낙의 의사를 통지한 경우",
        },
        {
          title: "2. 팩시밀리 등 기계적 장치 이용",
          content:
            "당사가 팩시밀리 등 기계적 장치를 이용하여 제공한 여행계약서, 약관 및 여행일정표(또는 여행설명서)의 내용에 대하여 여행자가 동의하고 여행계약의 체결을 신청하는 서면을 송부한데 대해 당사가 전자정보망이나 기계적 장치 등을 이용하여 여행자에게 승낙의 의사를 통지한 경우",
        },
      ],
    },
    {
      id: "domestic-9",
      title: "제9조 (최저행사인원 미 충족 시 계약해제)",
      content:
        "1. 당사가 여행참가자 수 미달로 인하여 여행계약을 해제하는 경우 여행개시 7일전까지 여행자에게 통지하여야 합니다.\n\n2. 당사가 여행참가자 수 미달로 전항의 기일내 통지를 하지 아니하고 계약을 해제하는 경우 이미 지급받은 계약금 환급 외에 다음 각 목의 1의 금액을 여행자에게 배상하여야 합니다.\n   가. 여행개시 1일전까지 통지시 : 상품가격의 30%\n   나. 여행당일 통지시 : 상품가격의 50%",
      isImportant: true,
    },
    {
      id: "domestic-10",
      title: "제10조 (계약체결 거절)",
      content:
        "당사는 여행자에게 다음 각 호의 1에 해당하는 사유가 있을 경우에는 여행자와의 계약체결을 거절할 수 있습니다.\n1. 다른 여행자에게 폐를 끼치거나 여행의 원활한 실시에 지장이 있다고 인정될 때\n2. 질병 기타 사유로 여행이 어렵다고 인정될 때\n3. 명시한 최대행사인원이 초과되었을 때\n4. 일정표에 최저행사인원이 미달되었을 때",
    },
    {
      id: "domestic-11",
      title: "제11조 (여행요금)",
      content:
        "① 여행계약서의 여행요금에는 다음 각 호가 포함됩니다. 단, 다음의 1~9호는 여행자 본인이 직접 여행지에서 지불하여야 할 금액이나 당사가 여행자 편의를 위하여 수탁 받아 이를 대신 지불합니다.",
      isImportant: true,
      subsections: [
        {
          title: "포함사항",
          content:
            "1. 항공기, 선박, 철도 등 이용운송기관의 운임(보통운임기준)\n2. 공항, 역, 부두와 호텔사이 등 송영버스요금\n3. 숙박요금 및 식사요금\n4. 안내자경비\n5. 여행 중 필요한 각종세금 및 수화물 운반금\n6. 국내외 공항, 항만세\n7. 관광진흥개발기금\n8. 일정표내 관광지 입장료\n9. 기타 개별계약에 따른 비용\n10. 여행 알선 수수료",
        },
        {
          title: "불포함사항",
          content:
            "② 여행계약서의 여행요금에는 다음 각 호가 불포함됩니다. 단, 희망여행은 당사자간 합의에 따릅니다.\n1. 여행 중 개인적 성질의 제비용(통신료, 관세, 일체의 팁, 세탁비, 개인적으로 추가한 식.음료)\n2. 여행중 여행자나 개인의 질병, 상해 및 그 밖의 사유로 의사의 진단에 따라 지불해야 하는 일체의 비용\n3. 규격이나 규정을 초과하여 발생한 비용(1인 1실 사용 추가요금, 초과 규격의 수화물 운반비 등)\n4. 여행 일정표에 구체적으로 명시되지 않은 비용\n5. 여행 수속 제비용(여권 인지대, 사증료 등)",
        },
        {
          title: "요금의 지급",
          content:
            "③ 여행자는 계약 체결 시 계약금(여행요금 중 계약금으로 별도 고지된 금액)을 당사에게 지급하여야 하며, 계약금은 여행요금 또는 손해배상액의 전부 또는 일부로 취급합니다.\n④ 여행자는 제1항의 여행요금 중 계약금을 제외한 잔금을 여행출발 7일전까지 당사에게 지급하여야 합니다.\n⑤ 여행자는 제1항의 여행요금을 당사가 지정한 방법(지로구좌, 무통장입금 등)으로 지급하여야 합니다.",
        },
      ],
    },
    {
      id: "domestic-12",
      title: "제12조 (여행요금의 변경)",
      content:
        "① 국내여행을 실시함에 있어서 이용운송,숙박기관에 지급하여야 할 요금이 계약체결시보다 5% 이상 증감하거나 여행 요금에 적용된 외화환율이 계약체결시보다 2% 이상 증감한 경우 당사 또는 여행자는 그 증감된 금액 범위 내에서 여행요금의 증감을 상대방에게 청구할 수 있습니다.\n② 당사는 제1항의 규정에 따라 여행요금을 증액하였을 때에는 여행개시 15일전에 여행자에게 통지하여야 합니다.",
    },
    {
      id: "domestic-13",
      title: "제13조 (여행조건의 변경요건 및 요금 등의 정산)",
      content:
        "① 위 제1조 내지 제12조의 여행조건은 다음 각 호의 1의 경우에 한하여 변경될 수 있습니다.\n1. 여행자의 안전과 보호를 위하여 여행자의 요청 또는 현지사정에 의하여 부득이하다고 쌍방이 합의한 경우\n2. 천재지변, 전란, 정부의 명령, 운송,숙박기관 등의 파업,휴업 등으로 여행의 목적을 달성할 수 없는 경우\n② 제1항의 여행조건 변경 및 제12조의 여행요금 변경으로 인하여 제11조제1항의 여행요금에 증감이 생기는 경우에는 여행출발 전 변경분은 여행출발 이전에, 여행 중 변경분은 여행종료 후 10일 이내에 각각 정산(환급)하여야 합니다.\n③ 제1항의 규정에 의하지 아니하고 여행조건이 변경되거나 제15조 또는 제16조의 규정에 의한 계약의 해제,해지로 인하여 손해배상액이 발생한 경우에는 여행출발 전 발생분은 여행출발 이전에, 여행 중 발생분은 여행종료 후 10일 이내에 각각 정산(환급)하여야 합니다.\n④ 여행자는 여행출발 후 자기의 사정으로 숙박, 식사, 관광 등 여행요금에 포함된 서비스를 제공받지 못한 경우 당사에게 그에 상응하는 요금의 환급을 청구할 수 없습니다. 단, 여행이 중도에 종료된 경우에는 제14조에 준하여 처리합니다.",
    },
    {
      id: "domestic-14",
      title: "제14조 (손해배상)",
      content:
        "① 당사는 현지여행업자 등의 고의 또는 과실로 여행자에게 손해를 가한 경우 당사는 여행자에게 손해를 배상하여야 합니다.\n② 당사의 귀책사유로 여행자의 국내여행에 필요한 여권, 사증, 재입국 허가 또는 각종 증명서 등을 취득하지 못하여 여행자의 여행일정에 차질이 생긴 경우 당사는 여행자로부터 절차대행을 위하여 받은 금액 전부 및 그 금액의 100% 상당액을 여행자에게 배상하여야 합니다.\n③ 당사는 항공기, 기차, 선박 등 교통기관의 연발착 또는 교통체증 등으로 인하여 여행자가 입은 손해를 배상하여야 합니다. ( 단, 당사가 고의 또는 과실이 없음을 입증한 때에는 그러하지 아니합니다.)\n④ 당사는 자기나 그 사용인이 여행자의 수하물 수령, 인도, 보관 등에 관하여 주의를 해태(懈怠)하지 아니하였음을 증명 하지 아니하면 여행자의 수하물 멸실, 훼손 또는 연착으로 인한 손해를 배상할 책임을 면하지 못합니다.",
    },
    {
      id: "domestic-15",
      title: "제15조 (여행출발 전 계약해제)",
      content:
        "① 당사 또는 여행자는 여행출발전 이 여행계약을 해제할 수 있습니다. 이 경우 발생하는 손해액은 ‘소비자 분쟁해결 기준‘(공정거래위원회 고시)에 따라 배상합니다.",
      isImportant: true,
      subsections: [
        {
          title:
            "1. 여행자의 여행계약 해제 요청이 있는 경우(여행자의 취소요청시)",
          content:
            "– 여행 개시 30일전(~30)까지 통보시 : 계약금환급\n– 여행 개시 20일전까지(29~20) 통보시 : 상품가격의 10%배상\n– 여행 개시 10일전까지(19~10) 통보시 : 상품가격의 15% 배상\n– 여행 개시 8일 전까지(9~8) 통보시 : 상품가격의 20% 배상\n– 여행 개시 1일 전까지(7~1) 통보시 : 상품가격의 30% 배상\n– 여행 당일 통보시 : 상품가격의 50% 배상",
        },
        {
          title: "2. 당사의 귀책사유로 취소 통보하는 경우",
          content:
            "– 여행 개시 30일전(~30)까지 통보시 : 계약금환급\n– 여행 개시 20일전까지(29~20) 통보시 : 상품가격의 10%배상\n– 여행 개시 10일전까지(19~10) 통보시 : 상품가격의 15% 배상\n– 여행 개시 8일 전까지(9~8) 통보시 : 상품가격의 20% 배상\n– 여행 개시 1일 전까지(7~1) 통보시 : 상품가격의 30% 배상\n– 여행 당일 통보시 : 상품가격의 50% 배상\n단, 최저행사인원이 충족되지 않아 불가피하게 기획여행을 실시할 수 없는 경우에는 제9조(최저행사인원 미충족시 계약해제)의 조항에 의거하여 당사가 여행자에게 배상한다.",
        },
      ],
    },
    {
      id: "domestic-16",
      title: "제16조 (여행출발 후 계약해지)",
      content:
        "① 당사 또는 여행자는 여행출발 후 부득이한 사유가 있는 경우 이 여행계약을 해지할 수 있습니다. 단, 이로 인하여 상대방이 입은 손해를 배상하여야 합니다.\n② 제1항의 규정에 의하여 계약이 해지된 경우 당사는 여행자가 귀국하는데 필요한 사항을 협조하여야 하며, 이에 필요한 비용으로써 당사의 귀책사유에 의하지 아니한 것은 여행자가 부담합니다.",
    },
    {
      id: "domestic-17",
      title: "제17조 (당사의 책임)",
      content:
        "당사는 여행 출발시부터 도착시까지 당사 본인 또는 그 고용인, 현지여행업자 또는 그 고용인 등(이하 ‘사용인’이라 함)이 제2조 제1항에서 규정한 당사 임무와 관련하여 여행자에게 고의 또는 과실로 손해를 가한 경우 책임을 집니다.",
    },
    {
      id: "domestic-18",
      title: "제18조 (여행자의 책임)",
      content:
        "① 여행자는 여행의 원활한 진행을 위하여 여행 출발 7일 이내에 당사의 해당 여행상품 담당자 또는 그 위임인 으로 부터 전화, FAX, E-MAIL 등을 통하여 제11조 1항의 각호를 확인할 책임이 있습니다.\n② 여행자는 여행의 원활한 진행을 위하여 한국 출발 인솔 자 및 현지 여행 안내원의 업무수행에 성실히 협조하여야 합니다.\n③ 여행자의 고의 또는 과실로 당사에 끼친 손해에 대하여 여행자는 당사에 배상 및 보상의 책임을 집니다.\n④ 여행자의 귀중품 및 소지품은 여행자 자신의 책임하에 각자 보관하여야 합니다.\n⑤ 여행자가 여행계약 체결 전에 고지하지 않은 신체의 장해 또는 질병 등으로 발생하는 문제는 여행자가 책임을 집니다.",
    },
    {
      id: "domestic-19",
      title: "제19조 (여행의 시작과 종료)",
      content:
        "여행의 시작은 출발하는 시점부터 시작하며 여행일정이 종료하여 최종목적지에 도착함과 동시에 종료합니다. 다만, 계약 및 일정을 변경할 때에는 예외로 합니다.",
    },
    {
      id: "domestic-20",
      title: "제20조 (설명의무)",
      content:
        "당사는 계약서에 정하여져 있는 중요한 내용 및 그 변경사항을 여행자가 이해할 수 있도록 설명하여야 합니다.",
    },
    {
      id: "domestic-21",
      title: "제21조 (보험가입 등)",
      content:
        "당사는 이 여행과 관련하여 여행자에게 손해가 발생한 경우 여행자에게 보험금을 지급하기 위한 보험 또는 공제에 가입하거나 영업보증금을 예치하여야 합니다.",
    },
    {
      id: "domestic-22",
      title: "제22조 (기타사항)",
      content:
        "① 이 계약에 명시되지 아니한 사항 또는 이 계약의 해석에 관하여 다툼이 있는 경우에는 당사 또는 여행자가 합의하여 결정하되, 합의가 이루어지지 아니한 경우에는 관계법령 및 일반관례에 따릅니다.\n② 특수지역에의 여행으로서 정당한 사유가 있는 경우에는 당사의 여행약관의 내용과 달리 정할 수 있습니다.\n③ 이 약관은 기획여행 상품을 기준으로 적용합니다. 항공권, 호텔, 입장권, 교통권 등 기획여행 외의 상품은 개별 약관 (원제공처의 규정)에 준합니다.",
    },
    {
      id: "domestic-appendix",
      title: "부칙",
      content:
        "1.(개정일) 이 약관은 2018년 1월 1일부터 시행한다.",
    },
  ];

  // 해외여행 표준약관 전체 데이터
  const overseasTerms: TermsSection[] = [
    {
      id: "overseas-1",
      title: "제1조 (목적)",
      content:
        "이 약관은 ㈜진주여행사(이하 “당사”라 한다.)와 여행자가 체결한 국외여행계약의 세부 이행 및 준수사항을 정함을 목적으로 합니다.",
    },
    {
      id: "overseas-2",
      title: "제2조 (당사와 여행자 의무)",
      content:
        "1. 당사는 여행자에게 안전하고 만족스러운 여행서비스를 제공하기 위하여 여행알선 및 안내,운송,숙박 등 여행계획의 수립 및 실행과정에서 맡은 바 임무를 충실히 수행하여야 합니다.\n\n2. 여행자는 안전하고 즐거운 여행을 위하여 여행자간 화합도모 및 여행업자의 여행질서 유지에 적극 협조하여야 합니다.",
    },
    {
      id: "overseas-3",
      title: "제3조 (용어의 정의)",
      content:
        "여행의 종류 및 정의, 해외여행 수속대행업의 정의는 다음과 같습니다.",
      subsections: [
        {
          title: "1. 기획여행",
          content:
            "당사가 미리 여행목적지 및 관광일정, 여행자에게 제공될 운송 및 숙식서비스 내용(이하 ‘여행서비스’라 함), 여행 요금을 정하여 광고 또는 기타 방법으로 여행자를 모집하여 실시하는 여행.",
        },
        {
          title: "2. 희망여행",
          content:
            "여행자(개인 또는 단체)가 희망하는 여행조건에 따라 당사가 운송,숙식,관광 등 여행에 관한 전반적인 계획을 수립하여 실시하는 여행.",
        },
        {
          title: "3. 해외여행 수속대행",
          content:
            "당사가 여행자로부터 소정의 수속대행요금을 받기로 약정하고, 여행자의 위탁 에 따라 다음에 열거하는 업무(이하 수속 대행업무라함)를 대행하는 것.\n1) 여권, 사증, 재입국 허가 및 각종 증명서 취득에 관한 수속\n2) 출입국 수속서류 작성 및 기타 관련업무",
        },
      ],
    },
    {
      id: "overseas-4",
      title: "제4조 (계약의 구성)",
      content:
        "1. 여행계약은 여행계약서(붙임)와 여행약관,여행일정표(또는 여행설명서)를 계약내용으로 합니다.\n\n2. 여행일정표(또는 여행설명서)에는 여행일자별 여행지와 관광내용,교통수단,쇼핑횟수,숙박장소,식사 등 여행실시일정 및 여행사 제공 서비스 내용과 여행자 유의사항이 포함되어야 합니다.",
    },
    {
      id: "overseas-5",
      title: "제5조 (계약의 성립)",
      content:
        "여행자가 당사에 구두,전화,서신 서류 등에 의한 표시로 국외여행을 신청하고 당사는 소정절차에 따라 이에 대한 신청을 확인한 후 여행자가 제11조 3항에 준하여 계약 체결 시 여행요금 중 계약금으로 별도 고지된 금액을 당사에 지급하면 여행계약이 성립한 것으로 간주합니다. 아울러 여행자는 당사의 여행약관을 주지하여야 합니다.",
      isImportant: true,
    },
    {
      id: "overseas-6",
      title: "제6조 (특약)",
      content:
        "당사와 여행자는 관계법규에 위반되지 않는 범위 내에서 서면으로 특약을 맺을 수 있습니다. 이 경우 표준약관과 다름을 당사는 여행자에게 설명하여야 합니다.",
    },
    {
      id: "overseas-7",
      title: "제7조 (계약서 및 약관 등 교부)",
      content:
        "당사는 여행자와 여행계약을 체결한 경우 계약서와 여행약관, 여행일정표(또는 여행설명서)를 각 1부씩 여행자에게 교부하여야 합니다.",
    },
    {
      id: "overseas-8",
      title: "제8조 (계약서 및 약관 등 교부 간주)",
      content:
        "당사와 여행자는 다음 각 호의 경우 여행계약서와 여행약관 및 여행일정표(또는 여행설명서)가 교부된 것으로 간주합니다.",
      subsections: [
        {
          title: "1. 인터넷 등 전자정보망 이용",
          content:
            "여행자가 인터넷 등 전자정보망으로 제공된 여행계약서, 약관 및 여행일정표(또는 여행설명서)의 내용에 동의하고 여행계약의 체결을 신청한데 대해 당사가 전자정보망이나 기계적 장치 등을 이용하여 여행자에게 승낙의 의사를 통지한 경우",
        },
        {
          title: "2. 팩시밀리 등 기계적 장치 이용",
          content:
            "당사가 팩시밀리 등 기계적 장치를 이용하여 제공한 여행계약서, 약관 및 여행일정표(또는 여행설명서)의 내용에 대하여 여행자가 동의하고 여행계약의 체결을 신청하는 서면을 송부한데 대해 당사가 전자정보망이나 기계적 장치 등을 이용하여 여행자에게 승낙의 의사를 통지한 경우",
        },
      ],
    },
    {
      id: "overseas-9",
      title: "제9조 (최저행사인원 미 충족 시 계약해제)",
      content:
        "1. 당사가 여행참가자 수 미달로 인하여 여행계약을 해제하는 경우 여행개시 7일전까지 여행자에게 통지하여야 합니다.\n\n2. 당사가 여행참가자 수 미달로 전항의 기일내 통지를 하지 아니하고 계약을 해제하는 경우 이미 지급받은 계약금 환급 외에 다음 각 목의 1의 금액을 여행자에게 배상하여야 합니다.\n   가. 여행개시 1일전까지 통지시 : 상품가격의 30%\n   나. 여행당일 통지시 : 상품가격의 50%",
      isImportant: true,
    },
    {
      id: "overseas-10",
      title: "제10조 (계약체결 거절)",
      content:
        "당사는 여행자에게 다음 각 호의 1에 해당하는 사유가 있을 경우에는 여행자와의 계약체결을 거절할 수 있습니다.\n1. 다른 여행자에게 폐를 끼치거나 여행의 원활한 실시에 지장이 있다고 인정될 때\n2. 질병 기타 사유로 여행이 어렵다고 인정될 때\n3. 명시한 최대행사인원이 초과되었을 때\n4. 일정표에 최저행사인원이 미달되었을 때",
    },
    {
      id: "overseas-11",
      title: "제11조 (여행요금)",
      content:
        "① 여행계약서의 여행요금에는 다음 각 호가 포함됩니다. 단, 다음의 1~9호는 여행자 본인이 직접 여행지에서 지불하여야 할 금액이나 당사가 여행자 편의를 위하여 수탁 받아 이를 대신 지불합니다.",
      isImportant: true,
      subsections: [
        {
          title: "포함사항",
          content:
            "1. 항공기, 선박, 철도 등 이용운송기관의 운임(보통운임기준)\n2. 공항, 역, 부두와 호텔사이 등 송영버스요금\n3. 숙박요금 및 식사요금\n4. 안내자경비\n5. 여행 중 필요한 각종세금 및 수화물 운반금\n6. 국내외 공항, 항만세\n7. 관광진흥개발기금\n8. 일정표내 관광지 입장료\n9. 기타 개별계약에 따른 비용\n10. 여행 알선 수수료",
        },
        {
          title: "불포함사항",
          content:
            "② 여행계약서의 여행요금에는 다음 각 호가 불포함됩니다. 단, 희망여행은 당사자간 합의에 따릅니다.\n1. 여행 중 개인적 성질의 제비용(통신료, 관세, 일체의 팁, 세탁비, 개인적으로 추가한 식.음료)\n2. 여행중 여행자나 개인의 질병, 상해 및 그 밖의 사유로 의사의 진단에 따라 지불해야 하는 일체의 비용\n3. 규격이나 규정을 초과하여 발생한 비용(1인 1실 사용 추가요금, 초과 규격의 수화물 운반비 등)\n4. 여행 일정표에 구체적으로 명시되지 않은 비용\n5. 여행 수속 제비용(여권 인지대, 사증료 등)",
        },
        {
          title: "요금의 지급",
          content:
            "③ 여행자는 계약 체결 시 계약금(여행요금 중 계약금으로 별도 고지된 금액)을 당사에게 지급하여야 하며, 계약금은 여행요금 또는 손해배상액의 전부 또는 일부로 취급합니다.\n④ 여행자는 제1항의 여행요금 중 계약금을 제외한 잔금을 여행출발 7일전까지 당사에게 지급하여야 합니다.\n⑤ 여행자는 제1항의 여행요금을 당사가 지정한 방법(지로구좌, 무통장입금 등)으로 지급하여야 합니다.",
        },
      ],
    },
    {
      id: "overseas-12",
      title: "제12조 (여행요금의 변경)",
      content:
        "① 국외여행을 실시함에 있어서 이용운송,숙박기관에 지급하여야 할 요금이 계약체결시보다 5% 이상 증감하거나 여행 요금에 적용된 외화환율이 계약체결시보다 2% 이상 증감한 경우 당사 또는 여행자는 그 증감된 금액 범위 내에서 여행요금의 증감을 상대방에게 청구할 수 있습니다.\n② 당사는 제1항의 규정에 따라 여행요금을 증액하였을 때에는 여행개시 15일전에 여행자에게 통지하여야 합니다.",
    },
    {
      id: "overseas-13",
      title: "제13조 (여행조건의 변경요건 및 요금 등의 정산)",
      content:
        "① 위 제1조 내지 제12조의 여행조건은 다음 각 호의 1의 경우에 한하여 변경될 수 있습니다.\n1. 여행자의 안전과 보호를 위하여 여행자의 요청 또는 현지사정에 의하여 부득이하다고 쌍방이 합의한 경우\n2. 천재지변, 전란, 정부의 명령, 운송,숙박기관 등의 파업,휴업 등으로 여행의 목적을 달성할 수 없는 경우\n② 제1항의 여행조건 변경 및 제12조의 여행요금 변경으로 인하여 제11조제1항의 여행요금에 증감이 생기는 경우에는 여행출발 전 변경분은 여행출발 이전에, 여행 중 변경분은 여행종료 후 10일 이내에 각각 정산(환급)하여야 합니다.\n③ 제1항의 규정에 의하지 아니하고 여행조건이 변경되거나 제15조 또는 제16조의 규정에 의한 계약의 해제,해지로 인하여 손해배상액이 발생한 경우에는 여행출발 전 발생분은 여행출발 이전에, 여행 중 발생분은 여행종료 후 10일 이내에 각각 정산(환급)하여야 합니다.\n④ 여행자는 여행출발 후 자기의 사정으로 숙박, 식사, 관광 등 여행요금에 포함된 서비스를 제공받지 못한 경우 당사에게 그에 상응하는 요금의 환급을 청구할 수 없습니다. 단, 여행이 중도에 종료된 경우에는 제14조에 준하여 처리합니다.",
    },
    {
      id: "overseas-14",
      title: "제14조 (손해배상)",
      content:
        "① 당사는 현지여행업자 등의 고의 또는 과실로 여행자에게 손해를 가한 경우 당사는 여행자에게 손해를 배상하여야 합니다.\n② 당사의 귀책사유로 여행자의 국외여행에 필요한 여권, 사증, 재입국 허가 또는 각종 증명서 등을 취득하지 못하여 여행자의 여행일정에 차질이 생긴 경우 당사는 여행자로부터 절차대행을 위하여 받은 금액 전부 및 그 금액의 100% 상당액을 여행자에게 배상하여야 합니다.\n③ 당사는 항공기, 기차, 선박 등 교통기관의 연발착 또는 교통체증 등으로 인하여 여행자가 입은 손해를 배상하여야 합니다.(단, 당사가 고의 또는 과실이 없음을 입증한 때에는 그러하지 아니합니다.)\n④ 당사는 자기나 그 사용인이 여행자의 수하물 수령, 인도, 보관 등에 관하여 주의를 해태(懈怠)하지 아니하였음을 증명 하지 아니하면 여행자의 수하물 멸실, 훼손 또는 연착으로 인한 손해를 배상할 책임을 면하지 못합니다.",
    },
    {
      id: "overseas-15",
      title: "제15조 (여행출발 전 계약해제)",
      content:
        "① 당사 또는 여행자는 여행출발전 이 여행계약을 해제할 수 있습니다. 이 경우 발생하는 손해액은 ‘소비자 분쟁해결 기준‘(공정거래위원회 고시)에 따라 배상합니다.",
      isImportant: true,
      subsections: [
        {
          title:
            "1. 여행자의 여행계약 해제 요청이 있는 경우(여행자의 취소요청시)",
          content:
            "– 여행 개시 30일전(~30)까지 통보시 : 계약금환급\n– 여행 개시 20일전까지(29~20) 통보시 : 상품가격의 10%배상\n– 여행 개시 10일전까지(19~10) 통보시 : 상품가격의 15% 배상\n– 여행 개시 8일 전까지(9~8) 통보시 : 상품가격의 20% 배상\n– 여행 개시 1일 전까지(7~1) 통보시 : 상품가격의 30% 배상\n– 여행 당일 통보시 : 상품가격의 50% 배상",
        },
        {
          title: "2. 당사의 귀책사유로 취소 통보하는 경우",
          content:
            "– 여행 개시 30일전(~30)까지 통보시 : 계약금환급\n– 여행 개시 20일전까지(29~20) 통보시 : 상품가격의 10%배상\n– 여행 개시 10일전까지(19~10) 통보시 : 상품가격의 15% 배상\n– 여행 개시 8일 전까지(9~8) 통보시 : 상품가격의 20% 배상\n– 여행 개시 1일 전까지(7~1) 통보시 : 상품가격의 30% 배상\n– 여행 당일 통보시 : 상품가격의 50% 배상\n단, 최저행사인원이 충족되지 않아 불가피하게 기획여행을 실시할 수 없는 경우에는 제9조(최저행사인원 미충족시 계약해제)의 조항에 의거하여 당사가 여행자에게 배상한다.",
        },
      ],
    },
    {
      id: "overseas-16",
      title: "제16조 (여행출발 후 계약해지)",
      content:
        "① 당사 또는 여행자는 여행출발 후 부득이한 사유가 있는 경우 이 여행계약을 해지할 수 있습니다. 단, 이로 인하여 상대방이 입은 손해를 배상하여야 합니다.\n② 제1항의 규정에 의하여 계약이 해지된 경우 당사는 여행자가 귀국하는데 필요한 사항을 협조하여야 하며, 이에 필요한 비용으로써 당사의 귀책사유에 의하지 아니한 것은 여행자가 부담합니다.",
    },
    {
      id: "overseas-17",
      title: "제17조 (당사의 책임)",
      content:
        "당사는 여행 출발시부터 도착시까지 당사 본인 또는 그 고용인, 현지여행업자 또는 그 고용인 등(이하 ‘사용인’이라 함)이 제2조 제1항에서 규정한 당사 임무와 관련하여 여행자에게 고의 또는 과실로 손해를 가한 경우 책임을 집니다.",
    },
    {
      id: "overseas-18",
      title: "제18조 (여행자의 책임)",
      content:
        "① 여행자는 여행의 원활한 진행을 위하여 여행 출발 7일 이내에 당사의 해당 여행상품 담당자 또는 그 위임인 으로 부터 전화, FAX, E-MAIL 등을 통하여 제11조 1항의 각호를 확인할 책임이 있습니다.\n② 여행자는 여행의 원활한 진행을 위하여 한국 출발 인솔 자 및 현지 여행 안내원의 업무수행에 성실히 협조하여야 합니다.\n③ 여행자의 고의 또는 과실로 당사에 끼친 손해에 대하여 여행자는 당사에 배상 및 보상의 책임을 집니다.\n④ 여행자의 귀중품 및 소지품은 여행자 자신의 책임하에 각자 보관하여야 합니다.\n⑤ 여행자가 여행계약 체결 전에 고지하지 않은 신체의 장해 또는 질병 등으로 발생하는 문제는 여행자가 책임을 집니다.",
    },
    {
      id: "overseas-19",
      title: "제19조 (여행의 시작과 종료)",
      content:
        "여행의 시작은 탑승수속(선박인 경우 승선수속)을 마친 시점으로 하며, 여행의 종료는 여행자가 입국장 보세구역을 벗어나는 시점으로 합니다. 단, 계약내용상 국내이동이 있을 경우에는 최초 출발지에서 이용하는 운송수단의 출발시각과 도착시각으로 합니다.",
      isImportant: true,
    },
    {
      id: "overseas-20",
      title: "제20조 (설명의무)",
      content:
        "당사는 계약서에 정하여져 있는 중요한 내용 및 그 변경사항을 여행자가 이해할 수 있도록 설명하여야 합니다.",
    },
    {
      id: "overseas-21",
      title: "제21조 (보험가입 등)",
      content:
        "당사는 이 여행과 관련하여 여행자에게 손해가 발생한 경우 여행자에게 보험금을 지급하기 위한 보험 또는 공제에 가입하거나 영업보증금을 예치하여야 합니다.",
    },
    {
      id: "overseas-22",
      title: "제22조 (기타사항)",
      content:
        "① 이 계약에 명시되지 아니한 사항 또는 이 계약의 해석에 관하여 다툼이 있는 경우에는 당사 또는 여행자가 합의하여 결정하되, 합의가 이루어지지 아니한 경우에는 관계법령 및 일반관례에 따릅니다.\n② 특수지역에의 여행으로서 정당한 사유가 있는 경우에는 당사의 여행약관의 내용과 달리 정할 수 있습니다.\n③ 이 약관은 기획여행 상품을 기준으로 적용합니다. 항공권, 호텔, 입장권, 교통권 등 기획여행 외의 상품은 개별 약관 (원제공처의 규정)에 준합니다.",
    },
    {
      id: "overseas-appendix",
      title: "부칙",
      content:
        "1.(개정일) 이 약관은 2018년 1월 1일부터 시행한다.",
    },
  ];

  const tableOfContents = [
    { id: "1", title: "목적", section: 1 },
    { id: "2", title: "당사와 여행자 의무", section: 2 },
    { id: "3", title: "용어의 정의", section: 3 },
    { id: "4", title: "계약의 구성", section: 4 },
    { id: "5", title: "계약의 성립", section: 5 },
    { id: "6", title: "특약", section: 6 },
    { id: "7", title: "계약서 등 교부", section: 7 },
    { id: "8", title: "교부 간주", section: 8 },
    { id: "9", title: "최저행사인원 미충족", section: 9 },
    { id: "10", title: "계약체결 거절", section: 10 },
    { id: "11", title: "여행요금", section: 11 },
    { id: "12", title: "여행요금의 변경", section: 12 },
    { id: "13", title: "여행조건 변경 및 정산", section: 13 },
    { id: "14", title: "손해배상", section: 14 },
    { id: "15", title: "출발 전 계약해제", section: 15 },
    { id: "16", title: "출발 후 계약해지", section: 16 },
    { id: "17", title: "당사의 책임", section: 17 },
    { id: "18", title: "여행자의 책임", section: 18 },
    { id: "19", title: "여행의 시작과 종료", section: 19 },
    { id: "20", title: "설명의무", section: 20 },
    { id: "21", title: "보험가입 등", section: 21 },
    { id: "22", title: "기타사항", section: 22 },
  ];

  const currentTerms =
    activeTab === "domestic" ? domesticTerms : overseasTerms;

  const filteredTerms = currentTerms.filter(
    (term) =>
      term.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      term.content
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(
      `${activeTab}-${id}`,
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrint = () => {
    window.print();
  };
  const handleDownload = () => {
    alert("약관 PDF 다운로드 기능은 곧 제공됩니다.");
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-medium text-foreground mb-2">
                여행약관
              </h1>
              <p className="text-muted-foreground">
                진주여행사 국내/해외 여행 표준약관 전문
              </p>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Home className="h-4 w-4" />
              <ChevronRight className="h-4 w-4" />
              <span>회사소개</span>
              <ChevronRight className="h-4 w-4" />
              <span>여행약관</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 사이드바 - 주석처리 (나중에 필요시 활성화)
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
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

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-sm">
                    <Search className="h-4 w-4" />
                    <span>약관 검색</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="조항 내용 검색..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                    className="text-sm"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-sm">
                    <Scale className="h-4 w-4" />
                    <span>전체 목차</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {tableOfContents.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className="w-full text-left text-sm text-muted-foreground hover:text-blue-600 transition-colors p-2 rounded hover:bg-gray-50"
                      >
                        제{item.section}조 {item.title}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-sm text-orange-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>중요 안내</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-xs text-muted-foreground">
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <p className="text-orange-800 font-medium mb-2">
                        취소 수수료 안내
                      </p>
                      <p className="text-orange-700">
                        여행 출발일이 가까울수록 취소 수수료가
                        증가합니다. 자세한 내용은 제15조를
                        확인해주세요.
                      </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-blue-800 font-medium mb-2">
                        보험 가입
                      </p>
                      <p className="text-blue-700">
                        여행자 보험 가입을 권장합니다. 상품에
                        따라 보험이 포함된 경우가 있습니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          */}

                      <div className="lg:col-span-4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-8"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="domestic"
                  className="flex items-center space-x-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>국내여행 표준약관</span>
                </TabsTrigger>
                <TabsTrigger
                  value="overseas"
                  className="flex items-center space-x-2"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>해외여행 표준약관</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="domestic" className="mt-6">
                <div className="mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-900 mb-2">
                      국내여행표준약관
                    </h3>
                    <p className="text-sm text-blue-800">
                      이 약관은 진주여행사와 여행자가 체결한
                      국내여행계약의 세부 이행 및 준수사항을
                      정합니다. 2018년 1월 1일부터 시행되는 최신
                      약관입니다.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="overseas" className="mt-6">
                <div className="mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-medium text-green-900 mb-2">
                      해외여행표준약관
                    </h3>
                    <p className="text-sm text-green-800">
                      이 약관은 진주여행사와 여행자가 체결한
                      국외여행계약의 세부 이행 및 준수사항을
                      정합니다. 2018년 1월 1일부터 시행되는 최신
                      약관입니다.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-4">
              {filteredTerms.length === 0 && searchTerm && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Search className="h-8 w-8 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      '{searchTerm}'에 대한 검색 결과가
                      없습니다.
                    </p>
                  </CardContent>
                </Card>
              )}

              <Accordion type="multiple" value={filteredTerms.map(term => term.id)} className="space-y-4">
                {filteredTerms.map((term, index) => (
                  <AccordionItem
                    key={term.id}
                    value={term.id}
                    id={term.id}
                    className={`border rounded-lg ${
                      term.isImportant
                        ? "border-blue-200 bg-blue-50/30"
                        : "border-border"
                    }`}
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-3">
                          {term.isImportant && (
                            <Badge
                              variant="default"
                              className="bg-blue-600"
                            >
                              중요
                            </Badge>
                          )}
                          <h3 className="font-medium text-left">
                            {term.title}
                          </h3>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-4">
                        <div className="prose prose-sm max-w-none">
                          <div className="text-foreground leading-relaxed whitespace-pre-line">
                            {term.content}
                          </div>
                        </div>

                        {term.subsections && (
                          <div className="space-y-3 mt-6">
                            {term.subsections.map(
                              (subsection, subIndex) => (
                                <div
                                  key={subIndex}
                                  className="bg-gray-50 rounded-lg p-4"
                                >
                                  <h4 className="font-medium text-foreground mb-2">
                                    {subsection.title}
                                  </h4>
                                  <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {subsection.content}
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-orange-600" />
                  <span>여행 취소 수수료 요약 (제15조)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-3 text-left font-medium">
                          취소 시점
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-medium">
                          배상 기준 (여행자/당사 귀책 시 동일)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">
                          여행 개시 30일전까지
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          계약금 환급
                        </td>
                      </tr>
                      <tr className="bg-gray-25">
                        <td className="border border-gray-300 px-4 py-3">
                          여행 개시 20일전까지
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          상품가격의 10% 배상
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">
                          여행 개시 10일전까지
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          상품가격의 15% 배상
                        </td>
                      </tr>
                      <tr className="bg-gray-25">
                        <td className="border border-gray-300 px-4 py-3">
                          여행 개시 8일전까지
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          상품가격의 20% 배상
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">
                          여행 개시 1일전까지
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-orange-600 font-medium">
                          상품가격의 30% 배상
                        </td>
                      </tr>
                      <tr className="bg-red-50">
                        <td className="border border-gray-300 px-4 py-3">
                          여행 당일
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-red-600 font-medium">
                          상품가격의 50% 배상
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>
                    ※ 위 기준은 '소비자 분쟁해결
                    기준'(공정거래위원회 고시)에 따릅니다.
                  </p>
                  <p>
                    ※ 최저행사인원 미충족으로 인한 취소는
                    제9조의 별도 기준이 적용됩니다.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-medium mb-4">
                  약관 관련 문의
                </h3>
                <p className="text-muted-foreground mb-6">
                  여행약관에 대해 궁금한 사항이 있으시면
                  언제든지 문의해주세요.
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