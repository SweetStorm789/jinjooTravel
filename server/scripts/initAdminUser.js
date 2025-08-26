const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function initAdminUser() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'jinjoo_travel',
    authPlugins: {
      mysql_clear_password: () => () => Buffer.from('')
    }
  });

  try {
    console.log('데이터베이스 연결 성공');

    // admin_users 테이블 생성
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        role ENUM('admin', 'moderator') DEFAULT 'admin',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL
      )
    `;

    await connection.execute(createTableSQL);
    console.log('admin_users 테이블 생성 완료');

    // 기존 admin 사용자 확인
    const [existingUsers] = await connection.execute(
      'SELECT id FROM admin_users WHERE username = ?',
      ['admin']
    );

    if (existingUsers.length === 0) {
      // 비밀번호 해시 생성
      const password = 'admin123';
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // admin 사용자 생성
      const insertSQL = `
        INSERT INTO admin_users (username, password_hash, email, full_name, role) 
        VALUES (?, ?, ?, ?, ?)
      `;

      await connection.execute(insertSQL, [
        'admin',
        passwordHash,
        'admin@jinjootravel.com',
        '관리자',
        'admin'
      ]);

      console.log('Admin 사용자 생성 완료');
      console.log('사용자명: admin');
      console.log('비밀번호: admin123');
    } else {
      console.log('Admin 사용자가 이미 존재합니다');
    }

    // 생성된 사용자 확인
    const [users] = await connection.execute(
      'SELECT id, username, email, full_name, role, is_active FROM admin_users'
    );

    console.log('\n현재 admin_users 테이블의 사용자들:');
    users.forEach(user => {
      console.log(`- ID: ${user.id}, 사용자명: ${user.username}, 이메일: ${user.email}, 이름: ${user.full_name}, 역할: ${user.role}, 활성화: ${user.is_active}`);
    });

  } catch (error) {
    console.error('오류 발생:', error);
  } finally {
    await connection.end();
  }
}

initAdminUser();
