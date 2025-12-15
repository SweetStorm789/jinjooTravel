import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// Google Maps API 타입 정의
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface GoogleMapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  markers?: Array<{
    position: { lat: number; lng: number };
    title: string;
    content?: string;
  }>;
  className?: string;
  height?: string;
}

export default function GoogleMap({
  center,
  zoom = 15,
  markers = [],
  className = "",
  height = "400px"
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [map, setMap] = useState<any>(null);

  // Google Maps API 로드
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  // 맵 초기화
  useEffect(() => {
    if (isLoaded && mapRef.current && !map) {
      const googleMap = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        gestureHandling: "greedy", // 스크롤 시 Ctrl 키 없이도 줌 가능
        styles: [
          // 성지순례에 어울리는 깔끔한 맵 스타일
          {
            featureType: "poi.business",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "poi.medical",
            stylers: [{ visibility: "off" }]
          }
        ]
      });

      setMap(googleMap);
    }
  }, [isLoaded, center, zoom, map]);

  // 마커 추가
  useEffect(() => {
    if (map && markers.length > 0) {
      markers.forEach(marker => {
        const mapMarker = new window.google.maps.Marker({
          position: marker.position,
          map: map,
          title: marker.title,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#dc2626">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(30, 30)
          }
        });

        if (marker.content) {
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 12px; max-width: 250px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <h3 style="font-weight: 600; margin: 0 0 8px 0; color: #1f2937; font-size: 14px;">${marker.title}</h3>
                <p style="margin: 0; color: #6b7280; font-size: 12px; line-height: 1.4;">${marker.content}</p>
              </div>
            `,
            maxWidth: 280,
            pixelOffset: new window.google.maps.Size(0, -10)
          });
          // ✅ 지도 로드시 자동으로 InfoWindow 열기
          infoWindow.open(map, mapMarker);

          // ✅ 마커 클릭 시 InfoWindow 열기
          mapMarker.addListener('click', () => {
            infoWindow.open(map, mapMarker);
          });
        }
      });
    }
  }, [map, markers]);

  if (!isLoaded) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center" style={{ height }}>
          <div className="text-center">
            <div className="animate-pulse bg-muted rounded-lg w-full h-full min-h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">지도를 불러오는 중...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-0">
        <div
          ref={mapRef}
          style={{ height, width: '100%' }}
          className="rounded-lg overflow-hidden"
        />
      </CardContent>
    </Card>
  );
}