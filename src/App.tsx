import Header from "../components/Header";
import Footer from "../components/Footer";
import PageRouter from "../components/routing/PageRouter";
import { checkAdminPermission } from "../utils/auth";
import { useState, useEffect } from "react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [isAdmin] = useState<boolean>(checkAdminPermission());

  // 페이지 변경 시 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {/* Header height compensation - approximately 140px for single tier + utility bar */}
      <div className="pt-[140px]">
        <PageRouter 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          isAdmin={isAdmin} 
        />
        <Footer />
      </div>
    </div>
  );
}