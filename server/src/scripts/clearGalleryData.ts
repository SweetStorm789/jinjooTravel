import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

async function clearGalleryData() {
  let connection;

  try {
    // console.log('🗑️ 갤러리 데이터 삭제 중...');

    // 직접 연결
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'jinjoo_travel'
    });

    // 갤러리 포스트의 첨부 이미지들 조회
    const [attachments] = await connection.execute(`
      SELECT ba.id, ba.stored_name, ba.file_path
      FROM board_attachments ba
      JOIN board_posts bp ON ba.post_id = bp.id
      WHERE bp.board_type = 'gallery'
    `);

    // console.log(`📋 갤러리 첨부 이미지 ${(attachments as any[]).length}개 발견`);

    // 첨부 파일들 삭제
    for (const attachment of attachments as any[]) {
      try {
        // uploads 폴더의 파일 삭제
        const filePath = path.join(__dirname, '../../uploads', attachment.stored_name);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          // console.log(`🗑️ 파일 삭제: ${attachment.stored_name}`);
        }

        // uploads/gallery 폴더의 파일도 삭제 (혹시 있을 경우)
        const galleryFilePath = path.join(__dirname, '../../uploads/gallery', attachment.stored_name);
        if (fs.existsSync(galleryFilePath)) {
          fs.unlinkSync(galleryFilePath);
          // console.log(`🗑️ gallery 파일 삭제: ${attachment.stored_name}`);
        }
      } catch (error) {
        console.error(`❌ 파일 삭제 실패: ${attachment.stored_name}`, error);
      }
    }

    // DB에서 갤러리 관련 데이터 삭제
    await connection.execute('DELETE FROM board_attachments WHERE post_id IN (SELECT id FROM board_posts WHERE board_type = "gallery")');
    // console.log('🗑️ 갤러리 첨부파일 DB 데이터 삭제 완료');

    await connection.execute('DELETE FROM board_posts WHERE board_type = "gallery"');
    // console.log('🗑️ 갤러리 포스트 DB 데이터 삭제 완료');

    // uploads/gallery 폴더 정리
    const galleryDir = path.join(__dirname, '../../uploads/gallery');
    if (fs.existsSync(galleryDir)) {
      const files = fs.readdirSync(galleryDir);
      for (const file of files) {
        const filePath = path.join(galleryDir, file);
        fs.unlinkSync(filePath);
        // console.log(`🗑️ gallery 폴더 파일 삭제: ${file}`);
      }
    }

    console.log('🎉 갤러리 데이터 삭제 완료!');

  } catch (error) {
    console.error('❌ 데이터 삭제 오류:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

clearGalleryData();






