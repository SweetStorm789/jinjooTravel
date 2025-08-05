import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface LocationMapProps {
  placeName: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  address?: string;
  className?: string;
}

export default function LocationMap({ 
  placeName, 
  coordinates, 
  address, 
  className = "" 
}: LocationMapProps) {
  // Google Maps Embed URL 생성
  const getEmbedUrl = () => {
    if (coordinates) {
      return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${coordinates.lat},${coordinates.lng}&zoom=15`;
    } else {
      // 장소명으로 검색
      const query = encodeURIComponent(`${placeName} ${address || ''}`);
      return `https://www.google.com/maps/embed/v1/search?key=YOUR_API_KEY&q=${query}&zoom=15`;
    }
  };

  // API 키가 없는 경우 iframe src 생성 (제한적이지만 작동)
  const getBasicEmbedUrl = () => {
    const query = encodeURIComponent(`${placeName} ${address || ''}`);
    return `https://www.google.com/maps?q=${query}&output=embed`;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          📍 {placeName} 위치
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            src={getBasicEmbedUrl()}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${placeName} 지도`}
          />
        </div>
        {address && (
          <div className="mt-4 text-sm text-muted-foreground">
            <p>📍 {address}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}