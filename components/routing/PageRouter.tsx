import HeroSection from "../HeroSection";
import FeaturedPackages from "../FeaturedPackages";
import CompanyFeatures from "../CompanyFeatures";
import VaticanPage from "../VaticanPage";
import GreecePage from "../GreecePage";
import SpainPage from "../SpainPage";
import IsraelPage from "../IsraelPage";
import EgyptPage from "../EgyptPage";
import TurkiyePage from "../TurkiyePage";
import FrancePage from "../FrancePage";
import ItalyPage from "../ItalyPage";
import RomePage from "../RomePage";
import AssisiPage from "../AssisiPage";
import SanGiovanniRotondoPage from "../SanGiovanniRotondoPage";
import LorettoPage from "../LorettoPage";
import SienaPage from "../SienaPage";
import OrviettooPage from "../OrviettooPage";
import LancianoPage from "../LancianoPage";
import JapanPage from "../JapanPage";
import PilgrimagePackagesPage from "../PilgrimagePackagesPage";
import PilgrimagePackageDetailPage from "../PilgrimagePackageDetailPage";
import PilgrimagePackageFormPage from "../PilgrimagePackageFormPage";
import FatimaPage from "../marianApparitions/FatimaPage";
import LourdesPage from "../marianApparitions/LourdesPage";
import GuadalupePage from "../marianApparitions/GuadalupePage";
import BanneuxPage from "../marianApparitions/BanneuxPage";
import MedjugorjePage from "../marianApparitions/MedjugorjePage";
import MarianMessagesPageNew from "../MarianMessagesPageNew";
import MarianMessageFormPageNew from "../MarianMessageFormPageNew";
import MarianMessageDetailPageNew from "../MarianMessageDetailPageNew";
import NoticesPage from "../NoticesPage";
import NoticeFormPage from "../NoticeFormPage";
import NoticeDetailPage from "../NoticeDetailPage";
import TravelReviewsPage from "../TravelReviewsPage";
import TravelReviewDetailPage from "../TravelReviewDetailPage";
import TravelReviewFormPage from "../TravelReviewFormPage";
import QnaPage from "../QnaPage";
import QnaDetailPage from "../QnaDetailPage";
import QnaFormPage from "../QnaFormPage";
import FreeBoardPage from "../FreeBoardPage";
import FreeBoardFormPage from "../FreeBoardFormPage";
import FreeBoardDetailPage from "../FreeBoardDetailPage";
import PhotoGalleryPage from "../PhotoGalleryPage";
import PhotoGalleryFormPage from "../PhotoGalleryFormPage";
import PhotoGalleryDetailPage from "../PhotoGalleryDetailPage";
import CompanyHistoryPage from "../CompanyHistoryPage";
import CompanyIntroPage from "../CompanyIntroPage";
import DirectionsPage from "../DirectionsPage";
import TravelTermsPage from "../TravelTermsPage";
import PilgrimagePreparationPage from "../PilgrimagePreparationPage";
import AdminLoginPage from "../AdminLoginPage";
import PrivacyPolicyPage from "../PrivacyPolicyPage";
import ImageLibraryTestPage from "../ImageLibraryTestPage";
import { ROUTE_CONFIGS, matchRoute } from "./routeConfigs";

interface PageRouterProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isAdmin: boolean;
  onAdminLogin?: () => void;
}

export default function PageRouter({ currentPage, setCurrentPage, isAdmin, onAdminLogin }: PageRouterProps) {
  // 라우트 매칭 및 렌더링
  const renderPage = () => {
    // Admin 로그인
    if (currentPage === "admin-login") {
      return <AdminLoginPage setCurrentPage={setCurrentPage} onAdminLogin={onAdminLogin} />;
    }

    // 개인정보처리방침
    if (currentPage === "privacy-policy") {
      return <PrivacyPolicyPage setCurrentPage={setCurrentPage} />;
    }

    // 이미지 라이브러리 테스트
    if (currentPage === "image-library-test") {
      return <ImageLibraryTestPage />;
    }

    // 홈페이지는 특별 처리
    if (currentPage === "home") {
      return (
        <>
          <HeroSection setCurrentPage={setCurrentPage} />
          <FeaturedPackages setCurrentPage={setCurrentPage} />
          <CompanyFeatures />
        </>
      );
    }

    // 회사소개
    if (currentPage === "company") {
      return <CompanyIntroPage setCurrentPage={setCurrentPage} />;
    }

    // 가톨릭성지순례 일정 
    if (currentPage === "pilgrimage-packages") {
      return <PilgrimagePackagesPage setCurrentPage={setCurrentPage} isAdmin={isAdmin} />;
    }
    if (currentPage === "pilgrimage-packages-europe") {
      return <PilgrimagePackagesPage setCurrentPage={setCurrentPage} isAdmin={isAdmin} initialRegion="유럽" />;
    }
    if (currentPage === "pilgrimage-packages-asia") {
      return <PilgrimagePackagesPage setCurrentPage={setCurrentPage} isAdmin={isAdmin} initialRegion="아시아" />;
    }
    if (currentPage === "pilgrimage-packages-domestic") {
      return <PilgrimagePackagesPage setCurrentPage={setCurrentPage} isAdmin={isAdmin} initialRegion="국내" />;
    }
    if (currentPage === "pilgrimage-packages-israel") {
      return <PilgrimagePackagesPage setCurrentPage={setCurrentPage} isAdmin={isAdmin} initialRegion="이스라엘" />;
    }

    // 동적 라우트 처리
    const packageDetailMatch = matchRoute(currentPage, "package-detail-{id}");
    if (packageDetailMatch.match) {
      return <PilgrimagePackageDetailPage setCurrentPage={setCurrentPage} packageId={packageDetailMatch.params.id} isAdmin={isAdmin} />;
    }

    if (currentPage === "package-form") {
      return <PilgrimagePackageFormPage setCurrentPage={setCurrentPage} />;
    }

    const packageFormEditMatch = matchRoute(currentPage, "package-form-edit-{id}");
    if (packageFormEditMatch.match) {
      return <PilgrimagePackageFormPage setCurrentPage={setCurrentPage} packageId={packageFormEditMatch.params.id} />;
    }

    // 성모님메시지
    if (currentPage.startsWith("marian-messages")) {
      // URL 파라미터 파싱 (예: marian-messages?page=2&highlight=123&search=query)
      const queryParams = new URLSearchParams(currentPage.split('?')[1] || '');
      const initialPage = parseInt(queryParams.get('page') || '1', 10);
      const highlightId = queryParams.get('highlight') || undefined;
      const initialSearchQuery = queryParams.get('search') || '';

      return <MarianMessagesPageNew setCurrentPage={setCurrentPage} isAdmin={isAdmin} initialPage={initialPage} highlightId={highlightId} initialSearchQuery={initialSearchQuery} />;
    }
    if (currentPage.startsWith("marian-message-form")) {
      // URL 파라미터 파싱
      const queryParams = new URLSearchParams(currentPage.split('?')[1] || '');
      const returnPage = parseInt(queryParams.get('returnPage') || '1', 10);

      // 수정 모드 (ID가 있는 경우)
      const editMatch = matchRoute(currentPage.split('?')[0], "marian-message-form-edit-{id}");
      if (editMatch.match) {
        return <MarianMessageFormPageNew setCurrentPage={setCurrentPage} messageId={editMatch.params.id} returnPage={returnPage} />;
      }

      // 등록 모드
      if (currentPage.split('?')[0] === "marian-message-form") {
        return <MarianMessageFormPageNew setCurrentPage={setCurrentPage} returnPage={returnPage} />;
      }
    }

    const marianMessageDetailMatch = matchRoute(currentPage.split('?')[0], "marian-message-detail-{id}");
    if (marianMessageDetailMatch.match) {
      // URL 파라미터 파싱
      const queryParams = new URLSearchParams(currentPage.split('?')[1] || '');
      const returnPage = parseInt(queryParams.get('returnPage') || '1', 10);
      const searchQuery = queryParams.get('search') || '';

      return <MarianMessageDetailPageNew setCurrentPage={setCurrentPage} messageId={marianMessageDetailMatch.params.id} isAdmin={isAdmin} returnPage={returnPage} searchQuery={searchQuery} />;
    }

    // 공지사항
    if (currentPage === "notices") {
      return <NoticesPage setCurrentPage={setCurrentPage} isAdmin={isAdmin} />;
    }
    if (currentPage === "notice-form") {
      return <NoticeFormPage setCurrentPage={setCurrentPage} />;
    }

    const noticeFormEditMatch = matchRoute(currentPage, "notice-form-edit-{id}");
    if (noticeFormEditMatch.match) {
      return <NoticeFormPage setCurrentPage={setCurrentPage} noticeId={noticeFormEditMatch.params.id} />;
    }

    const noticeDetailMatch = matchRoute(currentPage, "notice-detail-{id}");
    if (noticeDetailMatch.match) {
      return <NoticeDetailPage setCurrentPage={setCurrentPage} noticeId={noticeDetailMatch.params.id} isAdmin={isAdmin} />;
    }

    // 여행후기 (개발 중 - 주석처리)
    if (currentPage === "travel-reviews") {
      return <TravelReviewsPage setCurrentPage={setCurrentPage} />;
    }
    if (currentPage === "travel-reviews-write") {
      return <TravelReviewFormPage setCurrentPage={setCurrentPage} />;
    }

    const travelReviewDetailMatch = matchRoute(currentPage, "travel-reviews-detail-{id}");
    if (travelReviewDetailMatch.match) {
      return <TravelReviewDetailPage setCurrentPage={setCurrentPage} reviewId={travelReviewDetailMatch.params.id} />;
    }

    // 질문답변
    if (currentPage === "qna") {
      return <QnaPage setCurrentPage={setCurrentPage} isAdmin={isAdmin} />;
    }
    if (currentPage === "qna-form") {
      return <QnaFormPage setCurrentPage={setCurrentPage} />;
    }

    const qnaFormEditMatch = matchRoute(currentPage, "qna-form-edit-{id}");
    if (qnaFormEditMatch.match) {
      return <QnaFormPage setCurrentPage={setCurrentPage} qnaId={qnaFormEditMatch.params.id} />;
    }

    const qnaDetailMatch = matchRoute(currentPage, "qna-detail-{id}");
    if (qnaDetailMatch.match) {
      return <QnaDetailPage setCurrentPage={setCurrentPage} qnaId={qnaDetailMatch.params.id} isAdmin={isAdmin} />;
    }

    // 자유게시판
    if (currentPage === "freeboard") {
      return <FreeBoardPage setCurrentPage={setCurrentPage} isAdmin={isAdmin} />;
    }

    if (currentPage === "freeboard-form") {
      return <FreeBoardFormPage setCurrentPage={setCurrentPage} isAdmin={isAdmin} />;
    }

    if (currentPage.startsWith("freeboard-form-edit-")) {
      return <FreeBoardFormPage setCurrentPage={setCurrentPage} isAdmin={isAdmin} />;
    }

    if (currentPage.startsWith("freeboard-detail-")) {
      return <FreeBoardDetailPage setCurrentPage={setCurrentPage} isAdmin={isAdmin} />;
    }

    // 포토갤러리
    if (currentPage === "photo-gallery") {
      return <PhotoGalleryPage setCurrentPage={setCurrentPage} isAdmin={isAdmin} />;
    }

    if (currentPage === "gallery-form") {
      return <PhotoGalleryFormPage setCurrentPage={setCurrentPage} isAdmin={isAdmin} />;
    }

    if (currentPage.startsWith("gallery-form-edit-")) {
      return <PhotoGalleryFormPage setCurrentPage={setCurrentPage} isAdmin={isAdmin} />;
    }

    if (currentPage.startsWith("gallery-detail-")) {
      return <PhotoGalleryDetailPage setCurrentPage={setCurrentPage} isAdmin={isAdmin} />;
    }

    // 회사소개
    if (currentPage === "company-history") {
      return <CompanyHistoryPage setCurrentPage={setCurrentPage} />;
    }
    if (currentPage === "directions") {
      return <DirectionsPage setCurrentPage={setCurrentPage} />;
    }
    if (currentPage === "travel-terms") {
      return <TravelTermsPage setCurrentPage={setCurrentPage} />;
    }
    if (currentPage === "privacy-policy") {
      return <PrivacyPolicyPage setCurrentPage={setCurrentPage} />;
    }

    // 성지순례 준비물
    if (currentPage === "pilgrimage-preparation") {
      return <PilgrimagePreparationPage setCurrentPage={setCurrentPage} />;
    }

    // 성모님발현지
    if (currentPage === "fatima") return <FatimaPage setCurrentPage={setCurrentPage} />;
    if (currentPage === "lourdes") return <LourdesPage setCurrentPage={setCurrentPage} />;
    if (currentPage === "guadalupe") return <GuadalupePage setCurrentPage={setCurrentPage} />;
    if (currentPage === "banneux") return <BanneuxPage setCurrentPage={setCurrentPage} />;
    if (currentPage === "medjugorje") return <MedjugorjePage setCurrentPage={setCurrentPage} />;

    // 성지정보
    if (currentPage === "vatican") return <VaticanPage setCurrentPage={setCurrentPage} />;
    if (currentPage === "greece") return <GreecePage setCurrentPage={setCurrentPage} />;
    if (currentPage === "spain") return <SpainPage setCurrentPage={setCurrentPage} />;
    if (currentPage === "israel") return <IsraelPage setCurrentPage={setCurrentPage} />;
    if (currentPage === "egypt") return <EgyptPage setCurrentPage={setCurrentPage} />;
    if (currentPage === "turkiye") return <TurkiyePage setCurrentPage={setCurrentPage} />;
    if (currentPage === "france") return <FrancePage setCurrentPage={setCurrentPage} />;
    if (currentPage === "italy") return <ItalyPage setCurrentPage={setCurrentPage} />;
    if (currentPage === "rome") return <RomePage setCurrentPage={setCurrentPage} />;
    if (currentPage === "assisi") return <AssisiPage setCurrentPage={setCurrentPage} />;
    if (currentPage === "sangiovannirotondo") return <SanGiovanniRotondoPage setCurrentPage={setCurrentPage} />;
    if (currentPage === "loreto") return <LorettoPage setCurrentPage={setCurrentPage} />;
    if (currentPage === "siena") return <SienaPage setCurrentPage={setCurrentPage} />;
    if (currentPage === "orviettoo") return <OrviettooPage setCurrentPage={setCurrentPage} />;
    if (currentPage === "lanciano") return <LancianoPage setCurrentPage={setCurrentPage} />;
    if (currentPage === "japan") return <JapanPage setCurrentPage={setCurrentPage} />;

    // 기본값 (홈페이지)
    return (
      <>
        <HeroSection setCurrentPage={setCurrentPage} />
        <FeaturedPackages setCurrentPage={setCurrentPage} />
        <CompanyFeatures />
      </>
    );
  };

  return renderPage();
}