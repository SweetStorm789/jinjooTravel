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
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = promise_1.default.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'jinjoo_travel',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    authPlugins: {
        mysql_clear_password: () => () => Buffer.from(process.env.DB_PASSWORD || '')
    }
});
function updateGalleryFeaturedImages() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('기존 갤러리들의 대표 이미지를 업데이트합니다...');
            // featured_image가 null인 갤러리 포스트들 조회
            const [posts] = yield db.execute(`
      SELECT id FROM board_posts 
      WHERE board_type = 'gallery' 
      AND (featured_image IS NULL OR featured_image = '')
    `);
            console.log(`${posts.length}개의 갤러리 포스트를 업데이트합니다.`);
            for (const post of posts) {
                const postId = post.id;
                // 해당 포스트의 첫 번째 첨부 이미지 조회
                const [attachments] = yield db.execute(`
        SELECT file_path FROM board_attachments 
        WHERE post_id = ? 
        ORDER BY id ASC 
        LIMIT 1
      `, [postId]);
                if (attachments.length > 0) {
                    const firstImagePath = attachments[0].file_path;
                    // 대표 이미지 업데이트
                    yield db.execute(`
          UPDATE board_posts 
          SET featured_image = ? 
          WHERE id = ?
        `, [firstImagePath, postId]);
                    console.log(`✅ 갤러리 ID ${postId} 대표 이미지 업데이트: ${firstImagePath}`);
                }
                else {
                    console.log(`⚠️ 갤러리 ID ${postId}에 첨부 이미지가 없습니다.`);
                }
            }
            console.log('\n🎉 갤러리 대표 이미지 업데이트가 완료되었습니다!');
        }
        catch (error) {
            console.error('❌ 갤러리 대표 이미지 업데이트 오류:', error);
        }
        finally {
            yield db.end();
        }
    });
}
// 스크립트 실행
updateGalleryFeaturedImages();
