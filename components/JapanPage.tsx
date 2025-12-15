import {
    MapPin,
    Users,
    Calendar,
    Clock,
    Globe,
    Building,
    Mountain,
    Church,
    Info,
    Crown,
    Cross,
    Columns,
    Star,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import GoogleMap from "./shared/GoogleMap";
import { holyPlacesLocations } from "./constants/holyPlacesLocations";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Placeholder images - using existing ones or generic placeholders for now
// In a real scenario, we would import specific Japan images
import JapanNagasakiImage from "../images/japan/assisi.jpg"; // Using Akita image as placeholder if available, or fallback
import HolyLandMenu from "./HolyLandMenu";

interface JapanPageProps {
    setCurrentPage: (page: string) => void;
}

export default function JapanPage({ setCurrentPage }: JapanPageProps) {


    const keyStats = [
        {
            icon: Globe,
            title: "면적",
            value: "377,975",
            unit: "km²",
            description: "동아시아의 섬나라",
            color: "text-blue-600",
        },
        {
            icon: Users,
            title: "인구",
            value: "1억 2,300",
            unit: "만명",
            description: "세계 11위 인구",
            color: "text-green-600",
        },
        {
            icon: Church,
            title: "가톨릭 인구",
            value: "45",
            unit: "만명",
            description: "전체 인구의 약 0.35%",
            color: "text-purple-600",
        },
        {
            icon: Calendar,
            title: "전래",
            value: "1549년",
            unit: "",
            description: "성 프란치스코 하비에르",
            color: "text-orange-600",
        },
    ];

    const countryInfo = [
        {
            label: "정식 명칭",
            value: "일본국 (Japan)",
        },
        { label: "위치", value: "동아시아" },
        { label: "수도", value: "도쿄 (Tokyo)" },
        { label: "면적", value: "377,975 km²" },
        { label: "인구", value: "약 1억 2,300만명" },
        { label: "종교", value: "신토, 불교, 그리스도교 등" },
        { label: "언어", value: "일본어" },
        { label: "화폐단위", value: "엔 (JPY)" },
        { label: "가톨릭 전래", value: "1549년 (성 프란치스코 하비에르)" },
    ];

    const majorSites = [
        {
            name: "나가사키 (Nagasaki)",
            subtitle: "일본 가톨릭의 중심지",
            description:
                "일본 가톨릭의 역사와 순교의 아픔이 서린 곳이다. 26성인 순교지, 오우라 천주당, 우라카미 천주당 등이 있으며, 박해 시대에도 신앙을 지켜온 '잠복 키리시탄'의 역사를 확인할 수 있다.",
            icon: Cross,
            color: "from-red-100 to-rose-200",
            iconColor: "text-red-700",
            image: JapanNagasakiImage, // Placeholder
        },
        {
            name: "아키타 (Akita)",
            subtitle: "성모 발현지",
            description:
                "1973년 사사가와 수녀에게 성모님이 발현하신 곳으로, 성모상의 눈물 기적으로 유명하다. '아키타의 성모'는 교황청의 인준을 받은 성모 발현지 중 하나이다.",
            icon: Star,
            color: "from-blue-100 to-indigo-200",
            iconColor: "text-blue-700",
            image: JapanNagasakiImage, // Placeholder
        },
        {
            name: "고토 열도 (Goto Islands)",
            subtitle: "신앙을 지켜낸 섬들",
            description:
                "박해를 피해 숨어든 신자들이 신앙을 지켜낸 섬들로, 유네스코 세계문화유산으로 등재된 '나가사키와 아마쿠사 지방의 잠복 키리시탄 관련 유산'의 일부이다. 아름다운 자연 속에 자리 잡은 소박한 성당들이 인상적이다.",
            icon: Church,
            color: "from-green-100 to-emerald-200",
            iconColor: "text-green-700",
            image: JapanNagasakiImage, // Placeholder
        },
    ];

    const historicalInfo = [
        {
            title: "가톨릭 전래",
            period: "1549년",
            description: "예수회 선교사 프란치스코 하비에르 신부가 가고시마에 도착하여 가톨릭을 전파했습니다."
        },
        {
            title: "박해와 순교",
            period: "17세기 - 19세기",
            description: "도요토미 히데요시와 도쿠가와 막부의 금교령으로 수많은 신자들이 순교했습니다. 1597년 나가사키 26성인 순교가 대표적입니다."
        },
        {
            title: "신앙의 자유와 부흥",
            period: "1873년 이후",
            description: "메이지 유신 이후 금교령이 해제되고, 숨어있던 신자(잠복 키리시탄)들이 다시 세상에 나오며 교회가 재건되었습니다."
        },
    ];

    return (
        <div className="bg-background min-h-screen">
            {/* 헤더 섹션 */}
            <div className="bg-card border-b">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="flex items-center justify-between">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Badge
                                    variant="secondary"
                                    className="flex items-center space-x-1"
                                >
                                    <MapPin className="h-3 w-3" />
                                    <span>동아시아</span>
                                </Badge>
                                <Badge variant="outline">성지순례</Badge>
                                <Badge variant="outline">순교지</Badge>
                            </div>
                            <div>
                                <h1 className="text-4xl font-medium text-foreground mb-2">
                                    일본
                                </h1>
                                <p className="text-lg text-muted-foreground max-w-2xl">
                                    박해 속에서도 피어난 신앙의 꽃, 순교자들의 땅
                                </p>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center">
                                <Cross className="h-12 w-12 text-red-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                    {/* 메인 콘텐츠 */}
                    <div className="xl:col-span-3 space-y-8">
                        {/* 주요 통계 */}
                        <section>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {keyStats.map((stat, index) => {
                                    const IconComponent = stat.icon;
                                    return (
                                        <Card
                                            key={index}
                                            className="relative overflow-hidden"
                                        >
                                            <CardHeader className="pb-3">
                                                <div className="flex items-center justify-between">
                                                    <div
                                                        className={`p-2 rounded-lg bg-secondary ${stat.color}`}
                                                    >
                                                        <IconComponent className="h-5 w-5" />
                                                    </div>
                                                </div>
                                                <CardTitle className="text-sm text-muted-foreground">
                                                    {stat.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2">
                                                    <div className="flex items-baseline space-x-1">
                                                        <span className="text-3xl font-medium">
                                                            {stat.value}
                                                        </span>
                                                        <span className="text-sm text-muted-foreground">
                                                            {stat.unit}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">
                                                        {stat.description}
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </section>

                        {/* 국가 정보 */}
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* 국가 정보 */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Building className="h-5 w-5" />
                                        <span>국가 정보</span>
                                    </CardTitle>
                                    <CardDescription>
                                        일본의 기본 정보
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {countryInfo.map((info, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-start py-2"
                                            >
                                                <span className="text-sm text-muted-foreground font-medium min-w-[100px]">
                                                    {info.label}
                                                </span>
                                                <span className="text-sm text-right flex-1">
                                                    {info.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* 지도 영역 (Placeholder) */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <MapPin className="h-5 w-5" />
                                        <span>위치</span>
                                    </CardTitle>
                                    <CardDescription>
                                        일본의 지리적 위치
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {/* TODO: Add Japan coordinates to holyPlacesLocations */}
                                    <div className="w-full h-[400px] bg-muted flex items-center justify-center rounded-md">
                                        <span className="text-muted-foreground">지도 준비 중</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        {/* 주요 성지 */}
                        <section className="space-y-6">
                            <div>
                                <h2 className="text-xl font-medium text-foreground mb-2">
                                    주요 성지
                                </h2>
                                <p className="text-muted-foreground">
                                    일본의 대표적인 가톨릭 성지를 소개합니다.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {majorSites.map((site, index) => (
                                    <Card key={index} className="overflow-hidden">
                                        <div className="relative">
                                            <div className="absolute inset-0"></div>
                                            {/* Placeholder image logic */}
                                            <div className="w-full h-[320px] bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-400">이미지 준비 중</span>
                                            </div>

                                            {/* 오버레이 텍스트 */}
                                            <div className="absolute bottom-3 left-3 right-3">
                                                <div className="bg-white/50 backdrop-blur-sm rounded px-2 py-1 flex justify-center items-center w-full">
                                                    <span className="text-sm font-medium text-gray-800 text-center">
                                                        {site.name}
                                                    </span>
                                                </div>
                                            </div>

                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="text-sm font-medium text-muted-foreground mb-3 border-l-2 border-blue-200 pl-3">
                                                {site.subtitle}
                                            </h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {site.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {/* 일본 가톨릭 역사 */}
                        <section>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Clock className="h-5 w-5" />
                                        <span>일본 가톨릭 역사</span>
                                    </CardTitle>
                                    <CardDescription>전래부터 현재까지</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {historicalInfo.map((info, index) => (
                                        <div key={index} className="border-l-4 border-red-200 pl-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-medium">{info.title}</h4>
                                                <Badge variant="outline" className="text-xs">
                                                    {info.period}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {info.description}
                                            </p>
                                        </div>
                                    ))}

                                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                                        <div className="flex items-start space-x-2">
                                            <Info className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-red-800 leading-relaxed">
                                                    일본 가톨릭 교회는 오랜 박해의 역사 속에서도 신앙을 지켜온 순교자들의 피 위에 세워졌습니다. 특히 나가사키와 고토 열도를 중심으로 한 신앙 공동체는 세계적으로도 유례없는 역사를 간직하고 있습니다.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                    </div>

                    {/* 사이드바 */}
                    <div className="xl:col-span-1">
                        <div className="sticky top-6 space-y-6">
                            {/* 성지정보 메뉴 */}
                            <HolyLandMenu currentPage="japan" setCurrentPage={setCurrentPage} />

                            {/* 빠른 정보 */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>여행 정보</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm text-muted-foreground">
                                            현지 시간
                                        </span>
                                        <Badge variant="secondary">UTC+9</Badge>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm text-muted-foreground">
                                            전압
                                        </span>
                                        <span className="text-sm">100V</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm text-muted-foreground">
                                            화폐
                                        </span>
                                        <span className="text-sm">엔(JPY)</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm text-muted-foreground">
                                            기후
                                        </span>
                                        <span className="text-sm">온대/아한대</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm text-muted-foreground">
                                            베스트 시즌
                                        </span>
                                        <span className="text-sm">3-5월, 10-11월</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
