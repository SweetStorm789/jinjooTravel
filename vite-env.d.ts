/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GOOGLE_MAPS_API_KEY: string;
    // 필요한 다른 VITE_ 변수들도 여기에 추가
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  