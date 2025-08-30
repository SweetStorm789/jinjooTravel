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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
function moveGalleryImages() {
    return __awaiter(this, void 0, void 0, function* () {
        let connection;
        try {
            console.log('갤러리 이미지 이동 중...');
            // 직접 연결
            connection = yield promise_1.default.createConnection({
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || '3306'),
                user: process.env.DB_USER || 'root',
                password: process.env.DB_PASSWORD || '',
                database: process.env.DB_NAME || 'jinjoo_travel'
            });
            // 갤러리 포스트의 첨부 이미지들 조회
            const [attachments] = yield connection.execute(`
      SELECT ba.id, ba.post_id, ba.stored_name, ba.file_path, ba.original_name
      FROM board_attachments ba
      JOIN board_posts bp ON ba.post_id = bp.id
      WHERE bp.board_type = 'gallery'
      ORDER BY ba.post_id
    `);
            console.log(`\n📋 갤러리 첨부 이미지 ${attachments.length}개 발견`);
            const uploadsDir = path_1.default.join(__dirname, '../../uploads');
            const galleryDir = path_1.default.join(uploadsDir, 'gallery');
            // gallery 폴더가 없으면 생성
            if (!fs_1.default.existsSync(galleryDir)) {
                fs_1.default.mkdirSync(galleryDir, { recursive: true });
                console.log('📁 gallery 폴더 생성됨');
            }
            let movedCount = 0;
            let errorCount = 0;
            for (const attachment of attachments) {
                try {
                    // 현재 파일 경로 (uploads 폴더)
                    const currentPath = path_1.default.join(uploadsDir, attachment.stored_name);
                    // 새 파일 경로 (uploads/gallery 폴더)
                    const newPath = path_1.default.join(galleryDir, attachment.stored_name);
                    // 새 파일 경로 (DB용)
                    const newFilePath = `/uploads/gallery/${attachment.stored_name}`;
                    if (fs_1.default.existsSync(currentPath)) {
                        // 파일 이동
                        fs_1.default.copyFileSync(currentPath, newPath);
                        // DB 업데이트
                        yield connection.execute(`
            UPDATE board_attachments 
            SET file_path = ? 
            WHERE id = ?
          `, [newFilePath, attachment.id]);
                        console.log(`✅ ${attachment.original_name} 이동 완료`);
                        movedCount++;
                    }
                    else {
                        console.log(`⚠️ 파일 없음: ${attachment.stored_name}`);
                        errorCount++;
                    }
                }
                catch (error) {
                    console.error(`❌ ${attachment.original_name} 이동 실패:`, error);
                    errorCount++;
                }
            }
            // 갤러리 포스트의 featured_image도 업데이트
            const [posts] = yield connection.execute(`
      SELECT id, featured_image 
      FROM board_posts 
      WHERE board_type = 'gallery' AND featured_image IS NOT NULL
    `);
            for (const post of posts) {
                if (post.featured_image && post.featured_image.startsWith('/uploads/') && !post.featured_image.startsWith('/uploads/gallery/')) {
                    const fileName = path_1.default.basename(post.featured_image);
                    const newFeaturedImage = `/uploads/gallery/${fileName}`;
                    yield connection.execute(`
          UPDATE board_posts 
          SET featured_image = ? 
          WHERE id = ?
        `, [newFeaturedImage, post.id]);
                    console.log(`✅ 갤러리 ${post.id} 대표 이미지 경로 업데이트`);
                }
            }
            console.log(`\n🎉 완료!`);
            console.log(`✅ 이동된 이미지: ${movedCount}개`);
            console.log(`❌ 오류: ${errorCount}개`);
        }
        catch (error) {
            console.error('❌ 이미지 이동 오류:', error);
        }
        finally {
            if (connection) {
                yield connection.end();
            }
        }
    });
}
moveGalleryImages();
