const bcrypt = require('bcrypt');

async function generateHash() {
  const password = 'admin123'; // 원하는 비밀번호
  const saltRounds = 10;
  
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('비밀번호:', password);
    console.log('해시:', hash);
    console.log('\nSQL INSERT 문:');
    console.log(`INSERT INTO admin_users (username, password_hash, email, full_name, role) VALUES ('admin', '${hash}', 'admin@jinjootravel.com', '관리자', 'admin');`);
  } catch (error) {
    console.error('해시 생성 오류:', error);
  }
}

generateHash();
