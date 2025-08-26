const bcrypt = require('bcrypt');

async function updateAdminPassword() {
  try {
    const newPassword = 'jjtravel2025!!';
    const saltRounds = 10;
    
    const newHash = await bcrypt.hash(newPassword, saltRounds);
    
    console.log('새 비밀번호:', newPassword);
    console.log('새 해시:', newHash);
    console.log('\nSQL UPDATE 문:');
    console.log(`UPDATE admin_users SET password_hash = '${newHash}' WHERE username = 'admin';`);
    
  } catch (error) {
    console.error('해시 생성 오류:', error);
  }
}

updateAdminPassword();
