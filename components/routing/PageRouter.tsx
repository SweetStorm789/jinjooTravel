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
import PilgrimagePackagesPage from "../PilgrimagePackagesPage";
import PilgrimagePackageDetailPage from "../PilgrimagePackageDetailPage";
import PilgrimagePackageFormPage from "../PilgrimagePackageFormPage";
import FatimaPage from "../marianApparitions/FatimaPage";
import LourdesPage from "../marianApparitions/LourdesPage";
import GuadalupePage from "../marianApparitions/GuadalupePage";
import BanneuxPage from "../marianApparitions/BanneuxPage";
import MedjugorjePage from "../marianApparitions/MedjugorjePage";
import MarianMessagesPage from "../MarianMessagesPage";
import MarianMessageFormPage from "../MarianMessageFormPage";
import MarianMessageDetailPage from "../MarianMessageDetailPage";
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
import PhotoGalleryPage from "../PhotoGalleryPage";
import CompanyHistoryPage from "../CompanyHistoryPage";
import DirectionsPage from "../DirectionsPage";
import TravelTermsPage from "../TravelTermsPage";
import PrivacyPolicyPage from "../PrivacyPolicyPage";
import { ROUTE_CONFIGS, matchRoute } from "./routeConfigs";

interface PageRouterProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isAdmin: boolean;
}

export default function PageRouter({ currentPage, setCurrentPage, isAdmin }: PageRouterProps) {
  // 라우트 매칭 및 렌더링
  const renderPage = () => {
    // 홈페이지는 특별 처리
    if (currentPage === "home") {
      return (
        <>
          <HeroSection />
          <FeaturedPackages />
          <CompanyFeatures />
        </>
      );
    }

    // 가톨릭성지순례 상품
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

    // 성모님메세지
    if (currentPage === "marian-messages") {
      return <MarianMessagesPage setCurrentPage={setCurrentPage} isAdmin={isAdmin} />;
    }
    if (currentPage === "marian-message-form") {
      return <MarianMessageFormPage setCurrentPage={setCurrentPage} />;
    }

    const marianMessageFormEditMatch = matchRoute(currentPage, "marian-message-form-edit-{id}");
    if (marianMessageFormEditMatch.match) {
      return <MarianMessageFormPage setCurrentPage={setCurrentPage} messageId={marianMessageFormEditMatch.params.id} />;
    }

    const marianMessageDetailMatch = matchRoute(currentPage, "marian-message-detail-{id}");
    if (marianMessageDetailMatch.match) {
      return <MarianMessageDetailPage setCurrentPage={setCurrentPage} messageId={marianMessageDetailMatch.params.id} isAdmin={isAdmin} />;
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

    // 여행후기
    if (currentPage === "travel-reviews") {
      return <TravelReviewsPage setCurrentPage={setCurrentPage} isAdmin={isAdmin} />;
    }
    if (currentPage === "travel-review-form") {
      return <TravelReviewFormPage setCurrentPage={setCurrentPage} />;
    }

    const travelReviewFormEditMatch = matchRoute(currentPage, "travel-review-form-edit-{id}");
    if (travelReviewFormEditMatch.match) {
      return <TravelReviewFormPage setCurrentPage={setCurrentPage} reviewId={travelReviewFormEditMatch.params.id} />;
    }

    const travelReviewDetailMatch = matchRoute(currentPage, "travel-review-detail-{id}");
    if (travelReviewDetailMatch.match) {
      return <TravelReviewDetailPage setCurrentPage={setCurrentPage} reviewId={travelReviewDetailMatch.params.id} isAdmin={isAdmin} />;
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

    // 포토갤러리
    if (currentPage === "photo-gallery") {
      return <PhotoGalleryPage setCurrentPage={setCurrentPage} isAdmin={isAdmin} />;
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

    // 기본값 (홈페이지)
    return (
      <>
        <HeroSection />
        <FeaturedPackages />
        <CompanyFeatures />
      </>
    );
  };

  return renderPage();
}