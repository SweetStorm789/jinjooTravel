import Header from "../components/Header";
import Footer from "../components/Footer";
import PageRouter from "../components/routing/PageRouter";
import { isAdminLoggedIn, verifyAdminToken, adminLogout, getAdminToken } from "../utils/adminAuth";
import { 
  getPageFromURL, 
  pushPageToHistory, 
  replacePageInHistory, 
  updatePageMeta, 
  setupHistoryListener 
} from "../utils/history";
import { setupKeyboardShortcuts } from "../utils/keyboard";
import { useState, useEffect, useCallback } from "react";

export default function App() {
  // URL에서 초기 페이지 상태를 가져옴
  const [currentPage, setCurrentPage] = useState<string>(() => getPageFromURL());
  const [isAdmin, setIsAdmin] = useState<boolean>(isAdminLoggedIn());

  // 히스토리를 관리하는 페이지 변경 함수
  const setCurrentPageWithHistory = useCallback((page: string, replace: boolean = false) => {
    setCurrentPage(page);
    updatePageMeta(page);
    
    if (replace) {
      replacePageInHistory(page);
    } else {
      pushPageToHistory(page);
    }
  }, []);

  // 초기 페이지 로드 시 히스토리 설정
  useEffect(() => {
    const initialPage = getPageFromURL();
    if (initialPage !== currentPage) {
      setCurrentPage(initialPage);
    }
    updatePageMeta(initialPage);
    replacePageInHistory(initialPage); // 초기 로드는 replace 사용
  }, [currentPage]);

  // 브라우저 뒤로가기/앞으로가기 이벤트 리스너 설정
  useEffect(() => {
    const cleanup = setupHistoryListener(setCurrentPage);
    return cleanup;
  }, []);

  // 키보드 단축키 설정
  useEffect(() => {
    const cleanup = setupKeyboardShortcuts(setCurrentPageWithHistory);
    return cleanup;
  }, [setCurrentPageWithHistory]);

  // Admin 토큰 검증
  useEffect(() => {
    const checkAdminStatus = async () => {
      // 토큰이 있을 때만 검증 시도
      const token = getAdminToken();
      if (token) {
        const isValid = await verifyAdminToken();
        if (!isValid) {
          setIsAdmin(false);
          // 유효하지 않은 토큰 제거
          adminLogout();
        }
      } else {
        // 토큰이 없으면 관리자 상태 해제
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, []);

  // Admin 로그아웃 핸들러
  const handleAdminLogout = () => {
    adminLogout();
    setIsAdmin(false);
    setCurrentPageWithHistory("home", true);
  };



  // 페이지 변경 시 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-white">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPageWithHistory} 
        isAdmin={isAdmin}
        onAdminLogout={handleAdminLogout}
      />
      {/* Header height compensation - approximately 140px for single tier + utility bar */}
      <div className="pt-[140px]">
        <PageRouter 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPageWithHistory} 
          isAdmin={isAdmin} 
          onAdminLogin={() => setIsAdmin(true)}
        />
        <Footer setCurrentPage={setCurrentPageWithHistory} />
      </div>
    </div>
  );
}