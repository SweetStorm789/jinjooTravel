import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

async function moveGalleryImages() {
  let connection;
  
  try {
    console.log('갤러리 이미지 이동 중...');
    
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
      SELECT ba.id, ba.post_id, ba.stored_name, ba.file_path, ba.original_name
      FROM board_attachments ba
      JOIN board_posts bp ON ba.post_id = bp.id
      WHERE bp.board_type = 'gallery'
      ORDER BY ba.post_id
    `);

    console.log(`\n📋 갤러리 첨부 이미지 ${(attachments as any[]).length}개 발견`);

    const uploadsDir = path.join(__dirname, '../../uploads');
    const galleryDir = path.join(uploadsDir, 'gallery');

    // gallery 폴더가 없으면 생성
    if (!fs.existsSync(galleryDir)) {
      fs.mkdirSync(galleryDir, { recursive: true });
      console.log('📁 gallery 폴더 생성됨');
    }

    let movedCount = 0;
    let errorCount = 0;

    for (const attachment of attachments as any[]) {
      try {
        // 현재 파일 경로 (uploads 폴더)
        const currentPath = path.join(uploadsDir, attachment.stored_name);
        
        // 새 파일 경로 (uploads/gallery 폴더)
        const newPath = path.join(galleryDir, attachment.stored_name);
        
        // 새 파일 경로 (DB용)
        const newFilePath = `/uploads/gallery/${attachment.stored_name}`;

        if (fs.existsSync(currentPath)) {
          // 파일 이동
          fs.copyFileSync(currentPath, newPath);
          
          // DB 업데이트
          await connection.execute(`
            UPDATE board_attachments 
            SET file_path = ? 
            WHERE id = ?
          `, [newFilePath, attachment.id]);

          console.log(`✅ ${attachment.original_name} 이동 완료`);
          movedCount++;
        } else {
          console.log(`⚠️ 파일 없음: ${attachment.stored_name}`);
          errorCount++;
        }
      } catch (error) {
        console.error(`❌ ${attachment.original_name} 이동 실패:`, error);
        errorCount++;
      }
    }

    // 갤러리 포스트의 featured_image도 업데이트
    const [posts] = await connection.execute(`
      SELECT id, featured_image 
      FROM board_posts 
      WHERE board_type = 'gallery' AND featured_image IS NOT NULL
    `);

    for (const post of posts as any[]) {
      if (post.featured_image && post.featured_image.startsWith('/uploads/') && !post.featured_image.startsWith('/uploads/gallery/')) {
        const fileName = path.basename(post.featured_image);
        const newFeaturedImage = `/uploads/gallery/${fileName}`;
        
        await connection.execute(`
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

  } catch (error) {
    console.error('❌ 이미지 이동 오류:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

moveGalleryImages();






