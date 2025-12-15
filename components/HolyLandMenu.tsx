import {
    MapPin,
    ChevronDown,
    ChevronRight,
    ArrowRight,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { useState, useEffect } from "react";

interface MenuItem {
    name: string;
    type: "page" | "parent";
    key?: string;
    children?: { name: string; key: string }[];
}

interface HolyLandMenuProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
}

export default function HolyLandMenu({
    currentPage,
    setCurrentPage,
}: HolyLandMenuProps) {
    const [isItalyExpanded, setIsItalyExpanded] = useState(true);

    const menuItems: MenuItem[] = [
        { name: "바티칸", type: "page", key: "vatican" },
        { name: "그리스", type: "page", key: "greece" },
        { name: "스페인", type: "page", key: "spain" },
        { name: "이스라엘", type: "page", key: "israel" },
        { name: "이집트", type: "page", key: "egypt" },
        {
            name: "이탈리아",
            type: "parent",
            key: "italy",
            children: [
                { name: "로마", key: "rome" },
                { name: "아시시", key: "assisi" },
                { name: "산조반니로톤도", key: "sangiovannirotondo" },
                { name: "로레토", key: "loreto" },
                { name: "시에나", key: "siena" },
                { name: "오르비에또", key: "orviettoo" },
                { name: "란치아노", key: "lanciano" },
            ],
        },
        { name: "튀르키예", type: "page", key: "turkiye" },
        { name: "프랑스", type: "page", key: "france" },
        // { name: "일본", type: "page", key: "japan" },
    ];

    // If current page is a child of Italy, ensure it is expanded
    useEffect(() => {
        const italyItem = menuItems.find(item => item.name === "이탈리아");
        if (italyItem?.children?.some(child => child.key === currentPage)) {
            setIsItalyExpanded(true);
        }
    }, [currentPage]);

    const handlePageClick = (e: React.MouseEvent, key: string) => {
        e.preventDefault();
        if (key === currentPage) return;
        setCurrentPage(key);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>성지정보</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <div key={item.name}>
                            {item.type === "parent" ? (
                                <div className="flex items-center">
                                    <a
                                        href="#"
                                        onClick={(e) => item.key && handlePageClick(e, item.key)}
                                        className="flex-1 px-4 py-3 hover:bg-muted transition-colors"
                                    >
                                        <span className="text-sm">{item.name}</span>
                                    </a>
                                    <button
                                        onClick={() => setIsItalyExpanded(!isItalyExpanded)}
                                        className="px-3 py-3 hover:bg-muted transition-colors"
                                    >
                                        {isItalyExpanded ? (
                                            <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                        ) : (
                                            <ChevronRight className="h-3 w-3 text-muted-foreground" />
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <a
                                    href="#"
                                    onClick={(e) => item.key && handlePageClick(e, item.key)}
                                    className={`flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors group ${item.key === currentPage
                                        ? "bg-primary/5 text-primary border-r-2 border-primary"
                                        : ""
                                        }`}
                                >
                                    <span className="text-sm">{item.name}</span>
                                    {item.key !== currentPage && (
                                        <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                </a>
                            )}

                            {/* 이탈리아 하위 메뉴 */}
                            {item.type === "parent" && isItalyExpanded && (
                                <div className="ml-4 border-l border-border">
                                    {item.children?.map((child) => (
                                        <a
                                            key={child.name}
                                            href="#"
                                            onClick={(e) => handlePageClick(e, child.key)}
                                            className={`flex items-center justify-between px-4 py-2 hover:bg-muted transition-colors group ${child.key === currentPage
                                                ? "bg-primary/5 text-primary border-r-2 border-primary"
                                                : ""
                                                }`}
                                        >
                                            <span
                                                className={`text-sm ${child.key === currentPage
                                                    ? ""
                                                    : "text-muted-foreground"
                                                    }`}
                                            >
                                                {child.name}
                                            </span>
                                            {child.key !== currentPage && (
                                                <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                            )}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </CardContent>
        </Card>
    );
}
