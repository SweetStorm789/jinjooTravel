import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'jinjoo_travel',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from([process.env.DB_PASSWORD || ''])
  }
});

async function updateGalleryFeaturedImages() {
  try {
    console.log('기존 갤러리들의 대표 이미지를 업데이트합니다...');

    // featured_image가 null인 갤러리 포스트들 조회
    const [posts] = await db.execute(`
      SELECT id FROM board_posts 
      WHERE board_type = 'gallery' 
      AND (featured_image IS NULL OR featured_image = '')
    `);

    console.log(`${(posts as any[]).length}개의 갤러리 포스트를 업데이트합니다.`);

    for (const post of posts as any[]) {
      const postId = post.id;

      // 해당 포스트의 첫 번째 첨부 이미지 조회
      const [attachments] = await db.execute(`
        SELECT file_path FROM board_attachments 
        WHERE post_id = ? 
        ORDER BY id ASC 
        LIMIT 1
      `, [postId]);

      if ((attachments as any[]).length > 0) {
        const firstImagePath = (attachments as any[])[0].file_path;

        // 대표 이미지 업데이트
        await db.execute(`
          UPDATE board_posts 
          SET featured_image = ? 
          WHERE id = ?
        `, [firstImagePath, postId]);

        console.log(`✅ 갤러리 ID ${postId} 대표 이미지 업데이트: ${firstImagePath}`);
      } else {
        console.log(`⚠️ 갤러리 ID ${postId}에 첨부 이미지가 없습니다.`);
      }
    }

    console.log('\n🎉 갤러리 대표 이미지 업데이트가 완료되었습니다!');

  } catch (error) {
    console.error('❌ 갤러리 대표 이미지 업데이트 오류:', error);
  } finally {
    await db.end();
  }
}

// 스크립트 실행
updateGalleryFeaturedImages();
