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
const database_1 = __importDefault(require("../config/database"));
function initBoardData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('게시판 초기 데이터를 생성합니다...');
            // 자유게시판 카테고리 추가
            const freeboardCategories = [
                { name: '자유토론', slug: 'free-talk', description: '자유로운 주제로 이야기를 나누는 공간' },
                { name: '여행팁', slug: 'travel-tips', description: '유용한 여행 팁과 노하우 공유' },
                { name: '질문답변', slug: 'qna', description: '여행 관련 궁금한 점을 묻고 답하는 공간' },
                { name: '정보공유', slug: 'info-share', description: '여행 정보와 소식을 공유하는 공간' }
            ];
            console.log('자유게시판 카테고리 추가 중...');
            for (const category of freeboardCategories) {
                const [existing] = yield database_1.default.execute('SELECT id FROM board_categories WHERE board_type = ? AND slug = ?', ['free', category.slug]);
                if (existing.length === 0) {
                    yield database_1.default.execute(`
          INSERT INTO board_categories (board_type, name, slug, description, is_active, sort_order, created_at)
          VALUES (?, ?, ?, ?, ?, ?, NOW())
        `, ['free', category.name, category.slug, category.description, true, freeboardCategories.indexOf(category) + 1]);
                    console.log(`✅ 자유게시판 카테고리 생성: ${category.name}`);
                }
                else {
                    console.log(`⏭️ 자유게시판 카테고리 이미 존재: ${category.name}`);
                }
            }
            // 포토갤러리 카테고리 추가
            const galleryCategories = [
                { name: '국내여행', slug: 'domestic', description: '국내 여행지 사진' },
                { name: '해외여행', slug: 'international', description: '해외 여행지 사진' },
                { name: '성지순례', slug: 'pilgrimage', description: '성지순례 여행 사진' },
                { name: '자연풍경', slug: 'nature', description: '아름다운 자연 풍경 사진' }
            ];
            console.log('포토갤러리 카테고리 추가 중...');
            for (const category of galleryCategories) {
                const [existing] = yield database_1.default.execute('SELECT id FROM board_categories WHERE board_type = ? AND slug = ?', ['gallery', category.slug]);
                if (existing.length === 0) {
                    yield database_1.default.execute(`
          INSERT INTO board_categories (board_type, name, slug, description, is_active, sort_order, created_at)
          VALUES (?, ?, ?, ?, ?, ?, NOW())
        `, ['gallery', category.name, category.slug, category.description, true, galleryCategories.indexOf(category) + 1]);
                    console.log(`✅ 포토갤러리 카테고리 생성: ${category.name}`);
                }
                else {
                    console.log(`⏭️ 포토갤러리 카테고리 이미 존재: ${category.name}`);
                }
            }
            // 샘플 자유게시판 글 추가
            console.log('샘플 자유게시판 글 추가 중...');
            const [freeCategories] = yield database_1.default.execute('SELECT id, name FROM board_categories WHERE board_type = ? ORDER BY sort_order', ['free']);
            const sampleFreePosts = [
                {
                    title: '첫 유럽 여행 후기 - 파리, 로마, 바르셀로나',
                    content_html: '<p>3주간의 유럽 여행을 다녀왔습니다! 파리의 에펠탑부터 로마의 콜로세움, 바르셀로나의 사그라다 파밀리아까지... 정말 잊을 수 없는 여행이었어요.</p><p>각 도시마다 특색이 달라서 지루할 틈이 없었고, 특히 현지 음식들이 정말 맛있었습니다. 다음에는 독일과 체코도 가보고 싶어요!</p>',
                    content_text: '3주간의 유럽 여행을 다녀왔습니다! 파리의 에펠탑부터 로마의 콜로세움, 바르셀로나의 사그라다 파밀리아까지... 정말 잊을 수 없는 여행이었어요. 각 도시마다 특색이 달라서 지루할 틈이 없었고, 특히 현지 음식들이 정말 맛있었습니다. 다음에는 독일과 체코도 가보고 싶어요!',
                    author_name: '여행러버'
                },
                {
                    title: '제주도 3박4일 알찬 코스 추천드려요',
                    content_html: '<p>제주도 여행 계획 세우시는 분들께 도움이 되길 바라며 코스를 공유합니다.</p><h3>1일차</h3><p>- 공항 → 성산일출봉 → 섭지코지 → 숙소</p><h3>2일차</h3><p>- 한라산 트레킹 → 동문시장 → 흑돼지 맛집</p><h3>3일차</h3><p>- 서귀포 → 천지연폭포 → 정방폭포 → 올레시장</p><p>렌터카 필수이고, 날씨 체크 꼭 하세요!</p>',
                    content_text: '제주도 여행 계획 세우시는 분들께 도움이 되길 바라며 코스를 공유합니다. 1일차: 공항 → 성산일출봉 → 섭지코지 → 숙소. 2일차: 한라산 트레킹 → 동문시장 → 흑돼지 맛집. 3일차: 서귀포 → 천지연폭포 → 정방폭포 → 올레시장. 렌터카 필수이고, 날씨 체크 꼭 하세요!',
                    author_name: '제주도마니아'
                }
            ];
            for (let i = 0; i < sampleFreePosts.length; i++) {
                const post = sampleFreePosts[i];
                const category = freeCategories[i % freeCategories.length];
                const [existing] = yield database_1.default.execute('SELECT id FROM board_posts WHERE title = ? AND board_type = ?', [post.title, 'free']);
                if (existing.length === 0) {
                    yield database_1.default.execute(`
          INSERT INTO board_posts (
            board_type, category_id, title, content_html, content_text, excerpt,
            author_name, author_ip, password, is_member, status, allow_comments,
            published_at, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `, [
                        'free', category.id, post.title, post.content_html, post.content_text,
                        post.content_text.slice(0, 100) + '...', post.author_name, '127.0.0.1',
                        '$2b$10$dummy.hash.for.sample.post', false, 'published', true
                    ]);
                    console.log(`✅ 샘플 자유게시판 글 생성: ${post.title}`);
                }
            }
            // 샘플 포토갤러리 글 추가
            console.log('샘플 포토갤러리 글 추가 중...');
            const [galleryCategories2] = yield database_1.default.execute('SELECT id, name FROM board_categories WHERE board_type = ? ORDER BY sort_order', ['gallery']);
            const sampleGalleryPosts = [
                {
                    title: '제주도 성산일출봉 일출 사진',
                    content_html: '<p>새벽 5시부터 올라가서 찍은 성산일출봉 일출 사진입니다. 날씨가 좋아서 정말 아름다운 일출을 볼 수 있었어요!</p>',
                    content_text: '새벽 5시부터 올라가서 찍은 성산일출봉 일출 사진입니다. 날씨가 좋아서 정말 아름다운 일출을 볼 수 있었어요!',
                    author_name: '사진작가김씨'
                },
                {
                    title: '이탈리아 로마 콜로세움 야경',
                    content_html: '<p>로마 여행 중 콜로세움의 아름다운 야경을 담았습니다. 조명이 켜진 콜로세움의 모습이 정말 장관이었어요!</p>',
                    content_text: '로마 여행 중 콜로세움의 아름다운 야경을 담았습니다. 조명이 켜진 콜로세움의 모습이 정말 장관이었어요!',
                    author_name: '로마여행자'
                }
            ];
            for (let i = 0; i < sampleGalleryPosts.length; i++) {
                const post = sampleGalleryPosts[i];
                const category = galleryCategories2[i % galleryCategories2.length];
                const [existing] = yield database_1.default.execute('SELECT id FROM board_posts WHERE title = ? AND board_type = ?', [post.title, 'gallery']);
                if (existing.length === 0) {
                    yield database_1.default.execute(`
          INSERT INTO board_posts (
            board_type, category_id, title, content_html, content_text, excerpt,
            author_name, author_ip, password, is_member, status, allow_comments,
            published_at, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `, [
                        'gallery', category.id, post.title, post.content_html, post.content_text,
                        post.content_text.slice(0, 100) + '...', post.author_name, '127.0.0.1',
                        '$2b$10$dummy.hash.for.sample.post', false, 'published', true
                    ]);
                    console.log(`✅ 샘플 포토갤러리 글 생성: ${post.title}`);
                }
            }
            console.log('\n🎉 게시판 초기 데이터 생성이 완료되었습니다!');
            console.log('📝 자유게시판 카테고리:', freeboardCategories.length, '개');
            console.log('📷 포토갤러리 카테고리:', galleryCategories.length, '개');
            console.log('📄 샘플 게시글:', sampleFreePosts.length + sampleGalleryPosts.length, '개');
        }
        catch (error) {
            console.error('❌ 게시판 초기 데이터 생성 오류:', error);
        }
        finally {
            yield database_1.default.end();
        }
    });
}
// 스크립트 실행
initBoardData();
