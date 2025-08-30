-- 이미지 라이브러리 테이블 생성
CREATE TABLE IF NOT EXISTS image_library (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL COMMENT '저장된 파일명',
  original_name VARCHAR(255) NOT NULL COMMENT '원본 파일명',
  file_path VARCHAR(500) NOT NULL COMMENT '파일 경로',
  file_size INT NOT NULL COMMENT '파일 크기 (bytes)',
  mime_type VARCHAR(100) NOT NULL COMMENT 'MIME 타입',
  category VARCHAR(100) DEFAULT 'general' COMMENT '이미지 카테고리 (예: pilgrimage, scenery, food 등)',
  tags JSON COMMENT '이미지 태그 (JSON 배열)',
  usage_count INT DEFAULT 0 COMMENT '사용 횟수',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_category (category),
  INDEX idx_usage_count (usage_count),
  INDEX idx_created_at (created_at),
  INDEX idx_filename (filename)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='이미지 라이브러리';

-- 기존 업로드된 이미지들을 라이브러리에 추가하는 스크립트 (선택사항)
-- INSERT INTO image_library (filename, original_name, file_path, file_size, mime_type, category)
-- SELECT 
--   SUBSTRING_INDEX(file_path, '/', -1) as filename,
--   SUBSTRING_INDEX(file_path, '/', -1) as original_name,
--   file_path,
--   0 as file_size,
--   'image/jpeg' as mime_type,
--   'pilgrimage' as category
-- FROM package_images 
-- WHERE file_path IS NOT NULL;
