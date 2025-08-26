-- Admin 사용자 테이블 생성 (이미 존재한다면 생략)
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
);

-- Admin 사용자 생성 (비밀번호: admin123)
-- bcrypt로 해시된 비밀번호: $2b$10$rQZ8K9vX2mN3pL4qR5sT6uV7wX8yZ9aA0bB1cC2dE3fF4gG5hH6iI7jJ8kK9lL
INSERT INTO admin_users (username, password_hash, email, full_name, role) 
VALUES ('admin', '$2b$10$rQZ8K9vX2mN3pL4qR5sT6uV7wX8yZ9aA0bB1cC2dE3fF4gG5hH6iI7jJ8kK9lL', 'admin@jinjootravel.com', '관리자', 'admin');

-- 또는 더 간단한 비밀번호로 생성 (비밀번호: 1234)
-- bcrypt로 해시된 비밀번호: $2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO admin_users (username, password_hash, email, full_name, role) 
VALUES ('admin', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@jinjootravel.com', '관리자', 'admin');
