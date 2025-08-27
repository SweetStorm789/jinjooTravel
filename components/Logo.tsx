import { Cross, Church, Compass, Heart, Star, Crown, Shield } from "lucide-react";

interface LogoProps {
  variant?: 'gradient' | 'classic' | 'modern' | 'elegant' | 'premium' | 'image';
  size?: 'sm' | 'md' | 'lg';
  setCurrentPage: (page: string) => void;
}

export default function Logo({ variant = 'gradient', size = 'md', setCurrentPage }: LogoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14', 
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  // 옵션 1: 그라디언트 + 다중 아이콘 (기본)
  if (variant === 'gradient') {
    return (
      <div className="flex items-center space-x-3 group">
        <div className="relative">
          <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 overflow-hidden`}>
            {/* 배경 십자가 패턴 */}
            <div className="absolute inset-0 opacity-20">
              <Cross className="w-4 h-4 text-white absolute top-1 left-1 rotate-12" />
              <Cross className="w-3 h-3 text-white absolute bottom-1 right-1 -rotate-12" />
            </div>
            
            {/* 메인 아이콘 */}
            <div className="relative z-10 flex items-center justify-center">
              <Church className="w-7 h-7 text-white group-hover:text-yellow-200 transition-colors duration-300" />
            </div>
            
            {/* 작은 나침반 아이콘 */}
            <Compass className="w-3 h-3 text-yellow-300 absolute bottom-1 right-1 opacity-80 group-hover:rotate-45 transition-transform duration-300" />
          </div>
          
          {/* 반짝이는 효과 */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse">
            <Star className="w-2 h-2 text-white m-0.5" />
          </div>
        </div>
        
        <div>
          <h1 className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300`}>
            진주여행사
          </h1>
          <div className="flex items-center space-x-1">
            <Cross className="w-3 h-3 text-blue-600" />
            <span className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
              성지순례 전문여행사
            </span>
            <Heart className="w-3 h-3 text-red-400 opacity-60" />
          </div>
        </div>
      </div>
    );
  }

  // 옵션 2: 클래식 원형 로고
  if (variant === 'classic') {
    return (
      <div className="flex items-center space-x-3 group">
        <div className="relative">
          <div className={`${sizeClasses[size]} bg-white border-4 border-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
            <div className="relative">
              <Cross className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                <Church className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-blue-300 opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-125 transition-all duration-300"></div>
        </div>
        
        <div>
          <h1 className={`${textSizeClasses[size]} font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300`}>
            진주여행사
          </h1>
          <span className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
            성지순례 전문여행사
          </span>
        </div>
      </div>
    );
  }

  // 옵션 3: 모던 미니멀
  if (variant === 'modern') {
    return (
      <div className="flex items-center space-x-3 group">
        <div className="relative">
          <div className={`${sizeClasses[size]} bg-gradient-to-tr from-slate-800 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-1`}>
            <div className="relative flex items-center justify-center">
              <Cross className="w-6 h-6 text-white group-hover:text-blue-200 transition-colors duration-300" />
              <div className="absolute w-2 h-2 bg-blue-400 rounded-full -top-1 -right-1 group-hover:bg-blue-300 transition-colors duration-300"></div>
            </div>
          </div>
        </div>
        
        <div>
          <h1 className={`${textSizeClasses[size]} font-bold text-slate-800 group-hover:text-slate-600 transition-colors duration-300`}>
            진주여행사
          </h1>
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-500 group-hover:text-slate-600 transition-colors duration-300">
              성지순례 전문여행사
            </span>
            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // 옵션 4: 우아한 골드 테마
  if (variant === 'elegant') {
    return (
      <div className="flex items-center space-x-3 group">
        <div className="relative">
          <div className={`${sizeClasses[size]} bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-amber-300 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
            <div className="relative">
              <Church className="w-7 h-7 text-amber-700 group-hover:text-amber-800 transition-colors duration-300" />
              <Crown className="w-3 h-3 text-amber-600 absolute -top-1 -right-1 group-hover:text-amber-700 transition-colors duration-300" />
            </div>
          </div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-200 to-yellow-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </div>
        
        <div>
          <h1 className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent group-hover:from-amber-600 group-hover:to-amber-800 transition-all duration-300`}>
            진주여행사
          </h1>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-amber-500" />
            <span className="text-sm text-amber-600 group-hover:text-amber-700 transition-colors duration-300">
              성지순례 전문여행사
            </span>
            <Star className="w-3 h-3 text-amber-500" />
          </div>
        </div>
      </div>
    );
  }

  // 옵션 5: 프리미엄 실버/네이비
  if (variant === 'premium') {
    return (
      <div className="flex items-center space-x-3 group">
        <div className="relative">
          <div className={`${sizeClasses[size]} bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 border border-slate-600`}>
            <div className="relative">
              <Shield className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors duration-300" />
              <Cross className="w-4 h-4 text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:text-blue-300 transition-colors duration-300" />
            </div>
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>
        
        <div>
          <h1 className={`${textSizeClasses[size]} font-bold text-slate-800 group-hover:text-slate-700 transition-colors duration-300`}>
            진주여행사
          </h1>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-0.5">
              <div className="w-1 h-3 bg-blue-600 rounded-full"></div>
              <div className="w-1 h-3 bg-indigo-600 rounded-full"></div>
              <div className="w-1 h-3 bg-slate-600 rounded-full"></div>
            </div>
            <span className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
              성지순례 전문여행사
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 옵션 6: 이미지 로고
  if (variant === 'image') {
    const imageSizeClasses = {
      sm: 'w-32 h-16',
      md: 'w-48 h-24', 
      lg: 'w-64 h-32'
    };

    return (
      <div className="flex items-center">
        <img 
          onClick={() => {
            setCurrentPage("home");
          }}
          src="/images/logo/jinjoo-logo.png" 
          alt="JINJOO travel co. ltd" 
          className={`${imageSizeClasses[size]} object-contain`}
          style={{ cursor: 'pointer' }}
        />
      </div>
    );
  }

  return null;
}