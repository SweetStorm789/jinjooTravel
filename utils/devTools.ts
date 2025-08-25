// 개발자 도구 및 디버깅 유틸리티

import { getHistoryInfo } from './history';
import { getBrowserCapabilities } from './sharing';

/**
 * 현재 앱 상태 정보를 콘솔에 출력
 */
export const logAppState = (currentPage: string) => {
  const historyInfo = getHistoryInfo();
  const browserCaps = getBrowserCapabilities();
  
  console.group('🛠️ 진주여행사 앱 상태');
  console.log('📄 현재 페이지:', currentPage);
  console.log('🌐 URL:', window.location.href);
  console.log('📊 히스토리 정보:', historyInfo);
  console.log('🔧 브라우저 기능:', browserCaps);
  console.log('📱 화면 크기:', `${window.innerWidth}x${window.innerHeight}`);
  console.log('📅 로드 시간:', new Date().toLocaleString());
  console.groupEnd();
};

/**
 * 페이지 성능 측정
 */
export const measurePagePerformance = () => {
  if ('performance' in window) {
    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    console.group('⚡ 페이지 성능');
    console.log('🚀 로딩 시간:', `${perfData.loadEventEnd - perfData.fetchStart}ms`);
    console.log('🔄 DOM 준비:', `${perfData.domContentLoadedEventEnd - perfData.fetchStart}ms`);
    console.log('📡 네트워크:', `${perfData.responseEnd - perfData.requestStart}ms`);
    console.groupEnd();
  }
};

/**
 * 브라우저 히스토리 디버깅 정보
 */
export const debugHistory = () => {
  const info = getHistoryInfo();
  
  console.group('🧭 히스토리 디버깅');
  console.log('📚 히스토리 길이:', info.length);
  console.log('📍 현재 페이지:', info.currentPage);
  console.log('⬅️ 뒤로가기 가능:', info.canGoBack);
  console.log('💾 현재 상태:', info.state);
  console.log('🔗 전체 URL:', window.location.href);
  console.log('🏷️ 해시:', window.location.hash);
  console.groupEnd();
};

/**
 * 로컬 스토리지 정보 출력
 */
export const debugLocalStorage = () => {
  console.group('💾 로컬 스토리지');
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      try {
        const value = localStorage.getItem(key);
        console.log(`${key}:`, value);
      } catch (error) {
        console.log(`${key}: (읽기 오류)`);
      }
    }
  }
  
  console.groupEnd();
};

/**
 * 세션 스토리지 정보 출력
 */
export const debugSessionStorage = () => {
  console.group('🔐 세션 스토리지');
  
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key) {
      try {
        const value = sessionStorage.getItem(key);
        console.log(`${key}:`, value);
      } catch (error) {
        console.log(`${key}: (읽기 오류)`);
      }
    }
  }
  
  console.groupEnd();
};

/**
 * 개발자 도구 패널 표시 (개발 환경에서만)
 */
export const showDevPanel = (currentPage: string) => {
  if (import.meta.env.DEV) {
    const panel = document.createElement('div');
    panel.id = 'dev-panel';
    panel.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 15px;
      border-radius: 8px;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      z-index: 9999;
      max-width: 300px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    
    const historyInfo = getHistoryInfo();
    const browserCaps = getBrowserCapabilities();
    
    panel.innerHTML = `
      <div style="margin-bottom: 10px; font-weight: bold; color: #4ade80;">🛠️ 개발자 패널</div>
      <div><strong>페이지:</strong> ${currentPage}</div>
      <div><strong>히스토리:</strong> ${historyInfo.length}</div>
      <div><strong>뒤로가기:</strong> ${historyInfo.canGoBack ? '✅' : '❌'}</div>
      <div><strong>PWA:</strong> ${browserCaps.isPWA ? '✅' : '❌'}</div>
      <div><strong>공유:</strong> ${browserCaps.canShare ? '✅' : '❌'}</div>
      <div style="margin-top: 10px;">
        <button onclick="this.parentElement.parentElement.remove()" 
                style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
          닫기
        </button>
      </div>
    `;
    
    // 기존 패널 제거
    const existingPanel = document.getElementById('dev-panel');
    if (existingPanel) {
      existingPanel.remove();
    }
    
    document.body.appendChild(panel);
    
    // 5초 후 자동 제거
    setTimeout(() => {
      if (document.getElementById('dev-panel')) {
        panel.remove();
      }
    }, 5000);
  }
};

/**
 * 전체 디버깅 정보 출력
 */
export const debugAll = (currentPage: string) => {
  console.log('🚀 진주여행사 디버깅 시작');
  
  logAppState(currentPage);
  measurePagePerformance();
  debugHistory();
  debugLocalStorage();
  debugSessionStorage();
  
  console.log('✅ 디버깅 완료');
};

/**
 * 키보드 단축키로 디버깅 도구 실행 (Ctrl+Shift+D)
 */
export const setupDebugShortcuts = (getCurrentPage: () => string) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.shiftKey && event.key === 'D') {
      event.preventDefault();
      debugAll(getCurrentPage());
      showDevPanel(getCurrentPage());
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
};

// 전역 객체에 디버깅 함수들 추가 (개발 환경에서만)
if (import.meta.env.DEV) {
  (window as any).jinjooDebug = {
    logState: logAppState,
    measurePerf: measurePagePerformance,
    debugHistory,
    debugLocalStorage,
    debugSessionStorage,
    debugAll,
    showPanel: showDevPanel
  };
  
  console.log('🛠️ 디버깅 도구 사용법:');
  console.log('• window.jinjooDebug.debugAll() - 전체 정보 출력');
  console.log('• window.jinjooDebug.showPanel() - 개발자 패널 표시');
  console.log('• Ctrl+Shift+D - 디버깅 정보 출력 및 패널 표시');
}

