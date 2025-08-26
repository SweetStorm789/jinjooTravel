const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    console.log('데이터베이스 연결 테스트 시작...');
    
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'jinjoo_travel'
    });

    console.log('✅ 데이터베이스 연결 성공!');

    // admin_users 테이블 확인
    const [tables] = await connection.execute('SHOW TABLES LIKE "admin_users"');
    console.log('admin_users 테이블 존재:', tables.length > 0);

    if (tables.length > 0) {
      // admin 사용자 확인
      const [users] = await connection.execute('SELECT * FROM admin_users');
      console.log('admin_users 테이블의 사용자 수:', users.length);
      
      if (users.length > 0) {
        console.log('첫 번째 사용자:', {
          id: users[0].id,
          username: users[0].username,
          email: users[0].email,
          full_name: users[0].full_name,
          role: users[0].role,
          is_active: users[0].is_active
        });
      }
    }

    await connection.end();
    console.log('✅ 테스트 완료!');

  } catch (error) {
    console.error('❌ 데이터베이스 연결 실패:', error.message);
    
    if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('💡 데이터베이스가 존재하지 않습니다. jinjoo_travel 데이터베이스를 생성해주세요.');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('💡 MySQL 서버가 실행되지 않고 있습니다. MySQL을 시작해주세요.');
    }
  }
}

testConnection();
