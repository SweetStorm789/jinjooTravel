import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function testGalleryData() {
  let connection;
  
  try {
    console.log('갤러리 데이터 확인 중...');
    
    // 직접 연결
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'jinjoo_travel'
    });

    // 갤러리 포스트 확인
    const [posts] = await connection.execute(`
      SELECT id, title, featured_image, board_type 
      FROM board_posts 
      WHERE board_type = 'gallery'
      ORDER BY id DESC
    `);

    console.log('\n📋 갤러리 포스트 목록:');
    console.log(posts);

    // 첨부 이미지 확인
    const [attachments] = await connection.execute(`
      SELECT post_id, file_path, original_name 
      FROM board_attachments 
      ORDER BY post_id DESC
    `);

    console.log('\n📎 첨부 이미지 목록:');
    console.log(attachments);

    // 특정 갤러리의 이미지 확인
    if ((posts as any[]).length > 0) {
      const firstPostId = (posts as any[])[0].id;
      const [postImages] = await connection.execute(`
        SELECT * FROM board_attachments WHERE post_id = ?
      `, [firstPostId]);

      console.log(`\n🖼️ 갤러리 ID ${firstPostId}의 이미지들:`);
      console.log(postImages);
    }

  } catch (error) {
    console.error('❌ 데이터 확인 오류:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

testGalleryData();






