import { Button } from "./ui/button";
import { Phone, Menu, X, ChevronRight, Share2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { copyCurrentURL, shareCurrentPage } from "../utils/sharing";
import Logo from "./Logo";

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isAdmin?: boolean;
  onAdminLogout?: () => void;
  logoVariant?: 'gradient' | 'classic' | 'modern' | 'elegant' | 'premium';
}

export default function Header({
  currentPage,
  setCurrentPage,
  isAdmin = false,
  onAdminLogout,
  logoVariant = 'gradient'
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMainCategory, setActiveMainCategory] = useState("가톨릭성지순례");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredSubCategory, setHoveredSubCategory] = useState<string | null>(null);
  const [shareMessage, setShareMessage] = useState<string>("");

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const subHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 헤더 전체 스마트 onMouseLeave용
  const headerWrapRef = useRef<HTMLElement | null>(null);

  const mainCategories = [
    "HOME",
    "가톨릭성지순례",
    "성지정보",
    "성모님발현지",
    "성모님메시지",
    "게시판",
    "회사소개",
  ];

  const subCategories = {
    HOME: [],
    가톨릭성지순례: [
      { name: "유럽", hasSubMenu: false },
      { name: "이스라엘", hasSubMenu: false },
      { name: "아시아", hasSubMenu: false },
      { name: "국내", hasSubMenu: false },
    ],
    성지정보: [
      { name: "바티칸", hasSubMenu: false },
      { name: "그리스", hasSubMenu: false },
      { name: "스페인", hasSubMenu: false },
      { name: "이스라엘", hasSubMenu: false },
      { name: "이집트", hasSubMenu: false },
      { name: "이탈리아", hasSubMenu: true },
      { name: "튀르키예", hasSubMenu: false },
      { name: "프랑스", hasSubMenu: false },
    ],
    성모님발현지: [
      { name: "파티마", hasSubMenu: false },
      { name: "루르드", hasSubMenu: false },
      { name: "과달루페", hasSubMenu: false },
      { name: "바뇌", hasSubMenu: false },
      { name: "메주고리예", hasSubMenu: false },
    ],
    성모님메시지: [],
    게시판: [
      { name: "공지사항", hasSubMenu: false },
      // { name: "여행후기", hasSubMenu: false },
      { name: "질문답변", hasSubMenu: false },
      { name: "자유게시판", hasSubMenu: false },
      { name: "포토갤러리", hasSubMenu: false },
    ],
    회사소개: [
      { name: "회사소개", hasSubMenu: false },
      { name: "오시는길", hasSubMenu: false },
      { name: "여행약관", hasSubMenu: false },
      { name: "개인정보처리방침", hasSubMenu: false },
    ],
  };

  // 3depth 메뉴 데이터
  const thirdDepthCategories = {
    이탈리아: ["로마", "아시시", "산죠반니로톤도", "로레또", "시에나", "오르비에또", "란치아노"],
  };

  const handleMenuEnter = (category: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredCategory(category);
  };

  const handleMenuLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
      setHoveredSubCategory(null);
    }, 300);
  };

  const handleSubMenuEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleSubMenuLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
      setHoveredSubCategory(null);
    }, 300);
  };

  const handleSubItemEnter = (subCategory: string) => {
    if (subHoverTimeoutRef.current) {
      clearTimeout(subHoverTimeoutRef.current);
      subHoverTimeoutRef.current = null;
    }
    setHoveredSubCategory(subCategory);
  };

  const handleSubItemLeave = () => {
    subHoverTimeoutRef.current = setTimeout(() => {
      setHoveredSubCategory(null);
    }, 300);
  };

  const handleThirdDepthEnter = () => {
    if (subHoverTimeoutRef.current) {
      clearTimeout(subHoverTimeoutRef.current);
      subHoverTimeoutRef.current = null;
    }
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleThirdDepthLeave = () => {
    subHoverTimeoutRef.current = setTimeout(() => {
      setHoveredSubCategory(null);
    }, 300);
  };

  // 페이지 공유 기능
  const handleShare = async () => {
    const success = await shareCurrentPage();
    if (success) {
      setShareMessage("공유되었습니다! 📋");
    } else {
      const copied = await copyCurrentURL();
      if (copied) {
        setShareMessage("URL이 복사되었습니다! 📋");
      } else {
        setShareMessage("공유에 실패했습니다 ❌");
      }
    }
    setTimeout(() => setShareMessage(""), 3000);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (subHoverTimeoutRef.current) clearTimeout(subHoverTimeoutRef.current);
    };
  }, []);

  return (
    <header
      ref={headerWrapRef}
      className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-[100] shadow-sm"
      onMouseEnter={() => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
      }}
      onMouseLeave={(e) => {
        const next = e.relatedTarget;
        // 포인터가 여전히 헤더 내부의 다른 요소로 이동하는 중이면 닫지 않음
        if (next && next instanceof Node && headerWrapRef.current?.contains(next)) return;
        // 진짜로 헤더 바깥으로 나갔을 때만 닫기
        hoverTimeoutRef.current = setTimeout(() => {
          setHoveredCategory(null);
          setHoveredSubCategory(null);
        }, 300);
      }}
    >
      {/* Top utility bar */}
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-2 md:space-x-6">
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">전화번호 </span>
              <span className="text-xs sm:text-sm">02-738-0747</span>
            </div>
            <span className="text-gray-300 hidden md:inline">|</span>
            <div className="flex items-center text-gray-600">
              <span className="hidden sm:inline">✉️ </span>
              <span className="text-xs sm:text-sm">master@jjtravel.co.kr</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-xs sm:text-sm flex items-center space-x-1 px-2 sm:px-3"
              >
                <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">공유</span>
              </Button>
              {shareMessage && (
                <div className="absolute top-full right-0 mt-1 px-3 py-1 bg-green-600 text-white text-xs rounded shadow-lg whitespace-nowrap z-50">
                  {shareMessage}
                </div>
              )}
            </div>
            <span className="text-gray-300 hidden md:inline">|</span>
            {isAdmin ? (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs sm:text-sm px-2 sm:px-3"
                  onClick={() => setCurrentPage("image-library-test")}
                >
                  <span className="hidden sm:inline">이미지라이브러리</span>
                  <span className="sm:hidden">이미지</span>
                </Button>
                <span className="text-gray-300 hidden md:inline">|</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs sm:text-sm px-2 sm:px-3"
                  onClick={onAdminLogout}
                >
                  <span className="hidden sm:inline">로그아웃</span>
                  <span className="sm:hidden">로그아웃</span>
                </Button>
              </>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-xs sm:text-sm px-2 sm:px-3"
                onClick={() => setCurrentPage("admin-login")}
              >
                <span className="hidden sm:inline">관리자</span>
                <span className="sm:hidden">관리자</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main header with logo, navigation, and CTA */}
      <div className="px-4 sm:px-6 md:px-10 py-2 sm:py-0 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          {/* <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-xl text-white">⛪</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">진주여행사</h1>
                <span className="text-sm text-gray-500">성지순례 전문여행사</span>
              </div>
            </div>
          </div> */}
          {/* Logo */}
          <div className="flex items-center">
            {/* 로고 - 이미지 로고 사용 */}
            <Logo variant="image" size="md" setCurrentPage={setCurrentPage} />
          </div>
          {/* Logo */}

          {/* Desktop Navigation menu */}
          <nav className="hidden xl:flex items-center space-x-1 relative">
            {mainCategories.map((category) => (
              <div
                key={category}
                className="relative"
                onMouseEnter={() => handleMenuEnter(category)}
                // ⛔ 개별 onMouseLeave 제거 (닫힘 트리거 원인)
                // onMouseLeave={handleMenuLeave}
              >
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (category === "HOME") {
                      setCurrentPage("home");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else if (category === "가톨릭성지순례") {
                      setCurrentPage("pilgrimage-packages");
                      setHoveredCategory(null);
                      setHoveredSubCategory(null);
                    } else if (category === "성지정보") {
                      setCurrentPage("vatican");
                      setHoveredCategory(null);
                      setHoveredSubCategory(null);
                    } else if (category === "성모님발현지") {
                      setCurrentPage("fatima");
                      setHoveredCategory(null);
                      setHoveredSubCategory(null);
                    } else if (category === "성모님메시지") {
                      setCurrentPage("marian-messages");
                      setHoveredCategory(null);
                      setHoveredSubCategory(null);
                    } else if (category === "게시판") {
                      setCurrentPage("notices");
                      setHoveredCategory(null);
                      setHoveredSubCategory(null);
                    } else if (category === "회사소개") {
                      setCurrentPage("company");
                      setHoveredCategory(null);
                      setHoveredSubCategory(null);
                    }
                  }}
                  className={`px-4 py-3 text-sm font-medium transition-colors duration-200 hover:text-blue-600 hover:bg-gray-50 rounded-lg ${
                    hoveredCategory === category ? "text-blue-600 bg-gray-50" : "text-gray-700"
                  }`}
                >
                  {category}
                </a>
              </div>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Button 
              className="md:hidden bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm"
              onClick={() => window.location.href = 'tel:02-738-0747'}
            >
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">상담문의</span>
              <span className="sm:hidden">문의</span>
            </Button>
            <Button
              className="xl:hidden"
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Second tier - Sub categories (디자인 그대로) */}
      {hoveredCategory &&
        subCategories[hoveredCategory as keyof typeof subCategories].length > 0 && (
          <div
            className="hidden xl:block bg-gray-50 relative"
            onMouseEnter={handleSubMenuEnter}
            onMouseLeave={handleSubMenuLeave}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 95,        // 디자인 유지. 필요 시 105로 조정 가능
              marginTop: "-1px", // 시각적 틈 유지
              paddingTop: "1px",
            }}
          >
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center flex-wrap justify-center relative">
                {subCategories[hoveredCategory as keyof typeof subCategories].map((subItem) => (
                  <div
                    key={subItem.name}
                    className="relative"
                    onMouseEnter={() => (subItem.hasSubMenu ? handleSubItemEnter(subItem.name) : undefined)}
                    onMouseLeave={() => (subItem.hasSubMenu ? handleSubItemLeave() : undefined)}
                  >
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        // 가톨릭성지순례
                        if (hoveredCategory === "가톨릭성지순례") {
                          if (subItem.name === "유럽") setCurrentPage("pilgrimage-packages-europe");
                          else if (subItem.name === "아시아") setCurrentPage("pilgrimage-packages-asia");
                          else if (subItem.name === "국내") setCurrentPage("pilgrimage-packages-domestic");
                          else if (subItem.name === "이스라엘") setCurrentPage("pilgrimage-packages-israel");
                          setHoveredCategory(null);
                          setHoveredSubCategory(null);
                        }
                        // 성지정보
                        else if (hoveredCategory === "성지정보") {
                          if (subItem.name === "바티칸") setCurrentPage("vatican");
                          else if (subItem.name === "그리스") setCurrentPage("greece");
                          else if (subItem.name === "스페인") setCurrentPage("spain");
                          else if (subItem.name === "이스라엘") setCurrentPage("israel");
                          else if (subItem.name === "이집트") setCurrentPage("egypt");
                          else if (subItem.name === "이탈리아") setCurrentPage("italy");
                          else if (subItem.name === "튀르키예") setCurrentPage("turkiye");
                          else if (subItem.name === "프랑스") setCurrentPage("france");
                          setHoveredCategory(null);
                          setHoveredSubCategory(null);
                        }
                        // 성모님발현지
                        else if (hoveredCategory === "성모님발현지") {
                          if (subItem.name === "파티마") setCurrentPage("fatima");
                          else if (subItem.name === "루르드") setCurrentPage("lourdes");
                          else if (subItem.name === "과달루페") setCurrentPage("guadalupe");
                          else if (subItem.name === "바뇌") setCurrentPage("banneux");
                          else if (subItem.name === "메주고리예") setCurrentPage("medjugorje");
                          setHoveredCategory(null);
                          setHoveredSubCategory(null);
                        }
                        // 게시판
                        else if (hoveredCategory === "게시판") {
                          if (subItem.name === "공지사항") setCurrentPage("notices");
                          else if (subItem.name === "여행후기") setCurrentPage("travel-reviews");
                          else if (subItem.name === "질문답변") setCurrentPage("qna");
                          else if (subItem.name === "자유게시판") setCurrentPage("freeboard");
                          else if (subItem.name === "포토갤러리") setCurrentPage("photo-gallery");
                          setHoveredCategory(null);
                          setHoveredSubCategory(null);
                        }
                        // 회사소개
                        else if (hoveredCategory === "회사소개") {
                          if (subItem.name === "회사소개") setCurrentPage("company");
                          else if (subItem.name === "오시는길") setCurrentPage("directions");
                          else if (subItem.name === "여행약관") setCurrentPage("travel-terms");
                          else if (subItem.name === "개인정보처리방침") setCurrentPage("privacy-policy");
                          setHoveredCategory(null);
                          setHoveredSubCategory(null);
                        }
                      }}
                      className={`flex items-center px-4 py-3 text-sm transition-colors duration-200 border-r border-gray-300 last:border-r-0 ${
                        hoveredSubCategory === subItem.name
                          ? "text-blue-600 bg-white"
                          : "text-gray-600 hover:text-blue-600 hover:bg-white"
                      } rounded`}
                    >
                      {subItem.name}
                      {subItem.hasSubMenu && <ChevronRight className="w-3 h-3 ml-1 text-gray-400" />}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      {/* Third tier - Detail categories */}
      {hoveredSubCategory &&
        thirdDepthCategories[hoveredSubCategory as keyof typeof thirdDepthCategories] && (
          <div
            className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-[110]"
            onMouseEnter={handleThirdDepthEnter}
            onMouseLeave={handleThirdDepthLeave}
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="grid grid-cols-4 gap-4">
                {thirdDepthCategories[hoveredSubCategory as keyof typeof thirdDepthCategories].map(
                  (thirdItem) => (
                    <a
                      key={thirdItem}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (thirdItem === "로마") setCurrentPage("rome");
                        else if (thirdItem === "아시시") setCurrentPage("assisi");
                        else if (thirdItem === "산죠반니로톤도") setCurrentPage("sangiovannirotondo");
                        else if (thirdItem === "로레또") setCurrentPage("loreto");
                        else if (thirdItem === "시에나") setCurrentPage("siena");
                        else if (thirdItem === "오르비에또") setCurrentPage("orviettoo");
                        else if (thirdItem === "란치아노") setCurrentPage("lanciano");
                        // else console.log(`${thirdItem} 페이지는 아직 구현되지 않았습니다.`);
                        setHoveredCategory(null);
                        setHoveredSubCategory(null);
                      }}
                      className="text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition-colors duration-200"
                    >
                      {thirdItem}
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
        )}

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-200 shadow-lg absolute top-full left-0 right-0 z-[90]">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="space-y-4">
              {mainCategories.map((category) => (
                <div key={category} className="space-y-2">
                  {category === "HOME" ? (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage("home");
                        setIsMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="block w-full text-left font-medium text-gray-900 py-2 px-3 rounded-lg hover:bg-gray-100"
                    >
                      {category}
                    </a>
                  ) : category === "가톨릭성지순례" ? (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage("pilgrimage-packages");
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left font-medium text-gray-900 py-2 px-3 rounded-lg hover:bg-gray-100"
                    >
                      {category}
                    </a>
                  ) : category === "성모님메시지" ? (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage("marian-messages");
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left font-medium text-gray-900 py-2 px-3 rounded-lg hover:bg-gray-100"
                    >
                      {category}
                    </a>
                  ) : category === "성지정보" ? (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage("vatican");
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left font-medium text-gray-900 py-2 px-3 rounded-lg hover:bg-gray-100"
                    >
                      {category}
                    </a>
                  ) : category === "성모님발현지" ? (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage("fatima");
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left font-medium text-gray-900 py-2 px-3 rounded-lg hover:bg-gray-100"
                    >
                      {category}
                    </a>
                  ) : category === "게시판" ? (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage("notices");
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left font-medium text-gray-900 py-2 px-3 rounded-lg hover:bg-gray-100"
                    >
                      {category}
                    </a>
                  ) : category === "회사소개" ? (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage("company");
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left font-medium text-gray-900 py-2 px-3 rounded-lg hover:bg-gray-100"
                    >
                      {category}
                    </a>
                  ) : (
                    <button
                      onClick={() =>
                        setActiveMainCategory(activeMainCategory === category ? "" : category)
                      }
                      className="w-full text-left font-medium text-gray-900 py-2 px-3 rounded-lg hover:bg-gray-100"
                    >
                      {category}
                    </button>
                  )}

                  {activeMainCategory === category &&
                    subCategories[category as keyof typeof subCategories].length > 0 && (
                      <div className="pl-4 space-y-1 border-l-2 border-blue-200">
                        {subCategories[category as keyof typeof subCategories].map((subItem) => (
                          <a
                            key={subItem.name}
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (category === "가톨릭성지순례") {
                                if (subItem.name === "유럽") setCurrentPage("pilgrimage-packages-europe");
                                else if (subItem.name === "아시아") setCurrentPage("pilgrimage-packages-asia");
                                else if (subItem.name === "국내") setCurrentPage("pilgrimage-packages-domestic");
                                else if (subItem.name === "이스라엘") setCurrentPage("pilgrimage-packages-israel");
                                setIsMobileMenuOpen(false);
                              } else if (category === "성지정보") {
                                if (subItem.name === "바티칸") setCurrentPage("vatican");
                                else if (subItem.name === "그리스") setCurrentPage("greece");
                                else if (subItem.name === "스페인") setCurrentPage("spain");
                                else if (subItem.name === "이스라엘") setCurrentPage("israel");
                                else if (subItem.name === "이집트") setCurrentPage("egypt");
                                else if (subItem.name === "이탈리아") setCurrentPage("italy");
                                else if (subItem.name === "튀르키예") setCurrentPage("turkiye");
                                else if (subItem.name === "프랑스") setCurrentPage("france");
                                setIsMobileMenuOpen(false);
                              } else if (category === "성모님발현지") {
                                if (subItem.name === "파티마") setCurrentPage("fatima");
                                else if (subItem.name === "루르드") setCurrentPage("lourdes");
                                else if (subItem.name === "과달루페") setCurrentPage("guadalupe");
                                else if (subItem.name === "바뇌") setCurrentPage("banneux");
                                else if (subItem.name === "메주고리예") setCurrentPage("medjugorje");
                                setIsMobileMenuOpen(false);
                              } else if (category === "게시판") {
                                if (subItem.name === "공지사항") setCurrentPage("notices");
                                else if (subItem.name === "여행후기") setCurrentPage("travel-reviews");
                                else if (subItem.name === "질문답변") setCurrentPage("qna");
                                else if (subItem.name === "자유게시판") setCurrentPage("freeboard");
                                else if (subItem.name === "포토갤러리") setCurrentPage("photo-gallery");
                                setIsMobileMenuOpen(false);
                              } else if (category === "회사소개") {
                                if (subItem.name === "회사소개") setCurrentPage("company");
                                else if (subItem.name === "오시는길") setCurrentPage("directions");
                                else if (subItem.name === "여행약관") setCurrentPage("travel-terms");
                                else if (subItem.name === "개인정보처리방침") setCurrentPage("privacy-policy");
                                setIsMobileMenuOpen(false);
                              }
                            }}
                            className="block text-gray-600 hover:text-blue-600 py-2 px-3 rounded text-sm"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
