import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Heart,
  Phone,
  Mail,
  Globe
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { getMarianSitesWithActive } from "../constants/marianSites";

interface MarianSitesSidebarProps {
  currentSiteId: string;
  setCurrentPage: (page: string) => void;
  visitInfo: {
    location: string;
    locationDetail: string;
    mainFeast: string;
    feastDetail: string;
    openingHours: string;
    hoursDetail: string;
    pilgrims: string;
    pilgrimsDetail: string;
  };
  statistics: Array<{
    label: string;
    value: string;
  }>;
  specialContent?: React.ReactNode;
}

export default function MarianSitesSidebar({ 
  currentSiteId, 
  setCurrentPage, 
  visitInfo,
  statistics,
  specialContent
}: MarianSitesSidebarProps) {
  const marianSites = getMarianSitesWithActive(currentSiteId);

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-[200px] space-y-8">
        {/* 성모님발현지 메뉴 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="h-5 w-5 mr-2 text-red-500" />
              성모님발현지
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {marianSites.map((site) => (
              <button
                key={site.id}
                onClick={() => site.id !== currentSiteId && setCurrentPage(site.id)}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  site.active
                    ? "font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{site.name}</span>
                  <span className="text-xs">{site.country}</span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* 방문 정보 */}
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-4">방문 정보</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-medium">{visitInfo.location}</p>
                  <p className="text-muted-foreground">{visitInfo.locationDetail}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-medium">{visitInfo.mainFeast}</p>
                  <p className="text-muted-foreground">{visitInfo.feastDetail}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-medium">{visitInfo.openingHours}</p>
                  <p className="text-muted-foreground">{visitInfo.hoursDetail}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-medium">{visitInfo.pilgrims}</p>
                  <p className="text-muted-foreground">{visitInfo.pilgrimsDetail}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* 순례 문의 */}
          <div>
            <h3 className="font-medium mb-4">순례 문의</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                전화 상담
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                이메일 문의
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                순례 일정
              </Button>
            </div>
          </div>

          <Separator />

          {/* 통계 정보 */}
          <div>
            <h3 className="font-medium mb-4">통계</h3>
            <div className="space-y-3 text-sm">
              {statistics.map((stat, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-muted-foreground">{stat.label}</span>
                  <span className="font-medium">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 특별 콘텐츠 */}
          {specialContent && (
            <>
              <Separator />
              {specialContent}
            </>
          )}
        </div>
      </div>
    </div>
  );
}