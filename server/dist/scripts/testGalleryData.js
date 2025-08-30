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
function testGalleryData() {
    return __awaiter(this, void 0, void 0, function* () {
        let connection;
        try {
            console.log('갤러리 데이터 확인 중...');
            // 직접 연결
            connection = yield promise_1.default.createConnection({
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || '3306'),
                user: process.env.DB_USER || 'root',
                password: process.env.DB_PASSWORD || '',
                database: process.env.DB_NAME || 'jinjoo_travel'
            });
            // 갤러리 포스트 확인
            const [posts] = yield connection.execute(`
      SELECT id, title, featured_image, board_type 
      FROM board_posts 
      WHERE board_type = 'gallery'
      ORDER BY id DESC
    `);
            console.log('\n📋 갤러리 포스트 목록:');
            console.log(posts);
            // 첨부 이미지 확인
            const [attachments] = yield connection.execute(`
      SELECT post_id, file_path, original_name 
      FROM board_attachments 
      ORDER BY post_id DESC
    `);
            console.log('\n📎 첨부 이미지 목록:');
            console.log(attachments);
            // 특정 갤러리의 이미지 확인
            if (posts.length > 0) {
                const firstPostId = posts[0].id;
                const [postImages] = yield connection.execute(`
        SELECT * FROM board_attachments WHERE post_id = ?
      `, [firstPostId]);
                console.log(`\n🖼️ 갤러리 ID ${firstPostId}의 이미지들:`);
                console.log(postImages);
            }
        }
        catch (error) {
            console.error('❌ 데이터 확인 오류:', error);
        }
        finally {
            if (connection) {
                yield connection.end();
            }
        }
    });
}
testGalleryData();
