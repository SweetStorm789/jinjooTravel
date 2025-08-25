-- 여행 후기 게시판 테이블
CREATE TABLE IF NOT EXISTS travel_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  author_name VARCHAR(100) NOT NULL,
  author_email VARCHAR(255),
  author_phone VARCHAR(20),
  author_ip VARCHAR(45),
  password VARCHAR(255) NOT NULL,
  is_member BOOLEAN DEFAULT FALSE,
  
  -- 소셜 미디어 링크
  instagram_url VARCHAR(500),
  youtube_url VARCHAR(500),
  facebook_url VARCHAR(500),
  threads_url VARCHAR(500),
  
  -- 링크 미리보기 정보
  preview_image VARCHAR(500),
  preview_title VARCHAR(255),
  preview_description TEXT,
  
  -- 상태 및 메타데이터
  status ENUM('draft', 'published', 'private', 'deleted', 'pending') DEFAULT 'published',
  view_count INT DEFAULT 0,
  like_count INT DEFAULT 0,
  comment_count INT DEFAULT 0,
  allow_comments BOOLEAN DEFAULT TRUE,
  
  -- 카테고리
  category_id INT,
  category_name VARCHAR(100),
  category_slug VARCHAR(100),
  
  -- 날짜
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_status (status),
  INDEX idx_author (author_name),
  INDEX idx_category (category_id),
  INDEX idx_created_at (created_at),
  INDEX idx_view_count (view_count)
);

-- 여행 후기 카테고리 테이블
CREATE TABLE IF NOT EXISTS travel_review_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_slug (slug),
  INDEX idx_sort_order (sort_order)
);

-- 기본 카테고리 데이터 삽입
INSERT INTO travel_review_categories (name, slug, description, sort_order) VALUES
('국내여행', 'domestic', '국내 여행 후기', 1),
('해외여행', 'international', '해외 여행 후기', 2),
('성지순례', 'pilgrimage', '성지순례 후기', 3),
('맛집탐방', 'food', '맛집 탐방 후기', 4),
('문화체험', 'culture', '문화 체험 후기', 5),
('자연풍경', 'nature', '자연 풍경 후기', 6),
('도시투어', 'city', '도시 투어 후기', 7),
('기타', 'etc', '기타 여행 후기', 8)
ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description);



