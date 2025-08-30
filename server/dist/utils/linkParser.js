"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processSocialMediaLink = exports.extractLinkMetadata = void 0;
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = require("jsdom");
/**
 * URL에서 Open Graph 메타데이터를 추출
 */
const extractLinkMetadata = (url) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log('🔗 링크 메타데이터 추출 시작:', url);
        // User-Agent 설정 (일부 사이트에서 봇 차단 방지)
        const response = yield axios_1.default.get(url, {
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1'
            }
        });
        const html = response.data;
        const dom = new jsdom_1.JSDOM(html);
        const document = dom.window.document;
        // Open Graph 메타데이터 추출
        const metadata = {
            url: url
        };
        // og:title
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            metadata.title = ogTitle.getAttribute('content') || undefined;
        }
        // og:description
        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            metadata.description = ogDescription.getAttribute('content') || undefined;
        }
        // og:image
        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) {
            metadata.image = ogImage.getAttribute('content') || undefined;
        }
        // og:site_name
        const ogSiteName = document.querySelector('meta[property="og:site_name"]');
        if (ogSiteName) {
            metadata.site_name = ogSiteName.getAttribute('content') || undefined;
        }
        // og:type
        const ogType = document.querySelector('meta[property="og:type"]');
        if (ogType) {
            metadata.type = ogType.getAttribute('content') || undefined;
        }
        // Open Graph가 없는 경우 일반 메타데이터 사용
        if (!metadata.title) {
            const title = document.querySelector('title');
            if (title) {
                metadata.title = title.textContent || undefined;
            }
        }
        if (!metadata.description) {
            const description = document.querySelector('meta[name="description"]');
            if (description) {
                metadata.description = description.getAttribute('content') || undefined;
            }
        }
        // 상대 경로 이미지를 절대 경로로 변환
        if (metadata.image && !metadata.image.startsWith('http')) {
            const urlObj = new URL(url);
            metadata.image = `${urlObj.protocol}//${urlObj.host}${metadata.image}`;
        }
        console.log('✅ 링크 메타데이터 추출 완료:', {
            title: ((_a = metadata.title) === null || _a === void 0 ? void 0 : _a.substring(0, 50)) + '...',
            image: metadata.image ? '있음' : '없음',
            description: ((_b = metadata.description) === null || _b === void 0 ? void 0 : _b.substring(0, 50)) + '...'
        });
        return metadata;
    }
    catch (error) {
        console.error('❌ 링크 메타데이터 추출 실패:', url, error);
        // 기본 정보 반환
        return {
            url: url,
            title: '링크 미리보기를 불러올 수 없습니다',
            description: '링크를 클릭하여 원본을 확인해주세요'
        };
    }
});
exports.extractLinkMetadata = extractLinkMetadata;
/**
 * 소셜 미디어 플랫폼별 특별 처리
 */
const processSocialMediaLink = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const urlLower = url.toLowerCase();
    // Instagram 특별 처리
    if (urlLower.includes('instagram.com')) {
        return yield processInstagramLink(url);
    }
    // YouTube 특별 처리
    if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
        return yield processYouTubeLink(url);
    }
    // 지원하지 않는 플랫폼인 경우
    if (urlLower.includes('facebook.com') || urlLower.includes('threads.net')) {
        return {
            url: url,
            title: '지원하지 않는 플랫폼입니다',
            description: 'Instagram 또는 YouTube 링크만 지원됩니다.',
            site_name: '지원하지 않는 플랫폼'
        };
    }
    // 일반 링크 처리
    return yield (0, exports.extractLinkMetadata)(url);
});
exports.processSocialMediaLink = processSocialMediaLink;
/**
 * Instagram 링크 특별 처리
 */
const processInstagramLink = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const metadata = yield (0, exports.extractLinkMetadata)(url);
        // Instagram 기본 정보 추가
        if (!metadata.site_name) {
            metadata.site_name = 'Instagram';
        }
        // Instagram 게시자 정보 추출 (작성자 ID)
        const usernameMatch = url.match(/instagram\.com\/([^\/\?]+)/);
        if (usernameMatch && usernameMatch[1] && !usernameMatch[1].includes('p')) {
            const username = usernameMatch[1];
            metadata.author = username; // @ 제거하고 순수 ID만 사용
            metadata.author_url = `https://www.instagram.com/${username}/`;
        }
        // Instagram 게시물 URL에서 사용자명 추출 시도
        if (!metadata.author) {
            const postMatch = url.match(/instagram\.com\/p\/[^\/]+\/?(?:\?.*)?$/);
            if (postMatch) {
                // 게시물 URL인 경우, URL에서 사용자명을 추출할 수 없으므로
                // og:title에서 사용자명 추출 시도
                if (metadata.title && metadata.title.includes('님의')) {
                    const titleMatch = metadata.title.match(/([^님]+)님의/);
                    if (titleMatch && titleMatch[1]) {
                        metadata.author = titleMatch[1].trim();
                        metadata.author_url = `https://www.instagram.com/${metadata.author}/`;
                    }
                }
            }
        }
        // Instagram에서 제목이나 설명이 없으면 기본값 제공
        if (!metadata.title || metadata.title === 'Instagram') {
            if (metadata.author) {
                metadata.title = `${metadata.author}님의 Instagram 여행 게시물`;
            }
            else {
                metadata.title = 'Instagram 여행 게시물';
            }
        }
        // Instagram 설명 개선
        if (!metadata.description || metadata.description === 'undefined') {
            if (metadata.author) {
                metadata.description = `${metadata.author}님의 Instagram에서 여행 경험을 확인해보세요`;
            }
            else {
                metadata.description = 'Instagram에서 여행 경험을 확인해보세요';
            }
        }
        // Instagram 이미지 처리 개선
        if (!metadata.image) {
            // Instagram 게시물 ID 추출 시도
            const postIdMatch = url.match(/\/p\/([^\/\?]+)/);
            if (postIdMatch) {
                const postId = postIdMatch[1];
                // 여러 이미지 URL 시도
                const possibleImageUrls = [
                    `https://www.instagram.com/p/${postId}/media/?size=l`,
                    `https://www.instagram.com/p/${postId}/media/?size=m`,
                    `https://www.instagram.com/p/${postId}/media/?size=t`
                ];
                metadata.image = possibleImageUrls[0]; // 첫 번째 URL 사용
            }
        }
        // Instagram 이미지가 여전히 없으면 og:image에서 추출 시도
        if (!metadata.image) {
            try {
                // Instagram 페이지에서 og:image 다시 추출 시도
                const response = yield axios_1.default.get(url, {
                    timeout: 10000,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'DNT': '1',
                        'Connection': 'keep-alive',
                        'Upgrade-Insecure-Requests': '1'
                    }
                });
                const html = response.data;
                const dom = new jsdom_1.JSDOM(html);
                const document = dom.window.document;
                // og:image 추출
                const ogImage = document.querySelector('meta[property="og:image"]');
                if (ogImage) {
                    const imageUrl = ogImage.getAttribute('content');
                    if (imageUrl && imageUrl !== 'undefined') {
                        metadata.image = imageUrl;
                    }
                }
            }
            catch (error) {
                console.error('Instagram 이미지 재추출 실패:', error);
            }
        }
        // Instagram 내용 추출 시도 (og:description이 있으면 사용)
        if (metadata.description && metadata.description.length > 10) {
            // Instagram 설명이 충분히 길면 내용으로 사용
            metadata.description = metadata.description.replace(/\.\.\.$/, ''); // 끝의 ... 제거
        }
        return metadata;
    }
    catch (error) {
        console.error('Instagram 링크 처리 실패:', error);
        return {
            url: url,
            title: 'Instagram 여행 게시물',
            description: 'Instagram에서 여행 경험을 확인해보세요',
            site_name: 'Instagram'
        };
    }
});
/**
 * YouTube 링크 특별 처리
 */
const processYouTubeLink = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const metadata = yield (0, exports.extractLinkMetadata)(url);
        // YouTube 기본 정보 추가
        if (!metadata.site_name) {
            metadata.site_name = 'YouTube';
        }
        // YouTube 채널 정보 추출 시도
        const channelMatch = url.match(/youtube\.com\/(?:channel\/|c\/|user\/|@)([^\/\?]+)/);
        if (channelMatch && channelMatch[1]) {
            metadata.author = `@${channelMatch[1]}`;
            metadata.author_url = `https://www.youtube.com/${channelMatch[1]}`;
        }
        return metadata;
    }
    catch (error) {
        console.error('YouTube 링크 처리 실패:', error);
        return {
            url: url,
            title: 'YouTube 동영상',
            description: 'YouTube에서 동영상을 확인하세요',
            site_name: 'YouTube'
        };
    }
});
