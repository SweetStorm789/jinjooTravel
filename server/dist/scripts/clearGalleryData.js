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
function clearGalleryData() {
    return __awaiter(this, void 0, void 0, function* () {
        let connection;
        try {
            console.log('🗑️ 갤러리 데이터 삭제 중...');
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
      SELECT ba.id, ba.stored_name, ba.file_path
      FROM board_attachments ba
      JOIN board_posts bp ON ba.post_id = bp.id
      WHERE bp.board_type = 'gallery'
    `);
            console.log(`📋 갤러리 첨부 이미지 ${attachments.length}개 발견`);
            // 첨부 파일들 삭제
            for (const attachment of attachments) {
                try {
                    // uploads 폴더의 파일 삭제
                    const filePath = path_1.default.join(__dirname, '../../uploads', attachment.stored_name);
                    if (fs_1.default.existsSync(filePath)) {
                        fs_1.default.unlinkSync(filePath);
                        console.log(`🗑️ 파일 삭제: ${attachment.stored_name}`);
                    }
                    // uploads/gallery 폴더의 파일도 삭제 (혹시 있을 경우)
                    const galleryFilePath = path_1.default.join(__dirname, '../../uploads/gallery', attachment.stored_name);
                    if (fs_1.default.existsSync(galleryFilePath)) {
                        fs_1.default.unlinkSync(galleryFilePath);
                        console.log(`🗑️ gallery 파일 삭제: ${attachment.stored_name}`);
                    }
                }
                catch (error) {
                    console.error(`❌ 파일 삭제 실패: ${attachment.stored_name}`, error);
                }
            }
            // DB에서 갤러리 관련 데이터 삭제
            yield connection.execute('DELETE FROM board_attachments WHERE post_id IN (SELECT id FROM board_posts WHERE board_type = "gallery")');
            console.log('🗑️ 갤러리 첨부파일 DB 데이터 삭제 완료');
            yield connection.execute('DELETE FROM board_posts WHERE board_type = "gallery"');
            console.log('🗑️ 갤러리 포스트 DB 데이터 삭제 완료');
            // uploads/gallery 폴더 정리
            const galleryDir = path_1.default.join(__dirname, '../../uploads/gallery');
            if (fs_1.default.existsSync(galleryDir)) {
                const files = fs_1.default.readdirSync(galleryDir);
                for (const file of files) {
                    const filePath = path_1.default.join(galleryDir, file);
                    fs_1.default.unlinkSync(filePath);
                    console.log(`🗑️ gallery 폴더 파일 삭제: ${file}`);
                }
            }
            console.log('🎉 갤러리 데이터 삭제 완료!');
        }
        catch (error) {
            console.error('❌ 데이터 삭제 오류:', error);
        }
        finally {
            if (connection) {
                yield connection.end();
            }
        }
    });
}
clearGalleryData();
