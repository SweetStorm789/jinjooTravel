-- 여행 후기 게시판 테이블
CREATE TABLE IF NOT EXISTS travel_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT '고유 ID',
  title VARCHAR(255) NOT NULL COMMENT '제목',
  content TEXT COMMENT '내용',
  author_name VARCHAR(100) NOT NULL COMMENT '작성자 이름',
  author_email VARCHAR(255) COMMENT '작성자 이메일',
  author_phone VARCHAR(20) COMMENT '작성자 전화번호',
  author_ip VARCHAR(45) COMMENT '작성자 IP 주소',
  password VARCHAR(255) NOT NULL COMMENT '비밀번호 (해시)',
  is_member BOOLEAN DEFAULT FALSE COMMENT '회원 여부',
  
  -- 소셜 미디어 링크
  instagram_url VARCHAR(500) COMMENT '인스타그램 링크',
  youtube_url VARCHAR(500) COMMENT '유튜브 링크',
  facebook_url VARCHAR(500) COMMENT '페이스북 링크',
  threads_url VARCHAR(500) COMMENT '스레드 링크',
  
  -- 링크 미리보기 정보
  preview_image VARCHAR(500) COMMENT '미리보기 이미지 URL',
  preview_title VARCHAR(255) COMMENT '미리보기 제목',
  preview_description TEXT COMMENT '미리보기 설명',
  
  -- 상태 및 메타데이터
  status ENUM('draft', 'published', 'private', 'deleted', 'pending') DEFAULT 'published' COMMENT '게시물 상태',
  view_count INT DEFAULT 0 COMMENT '조회수',
  like_count INT DEFAULT 0 COMMENT '좋아요 수',
  comment_count INT DEFAULT 0 COMMENT '댓글 수',
  allow_comments BOOLEAN DEFAULT TRUE COMMENT '댓글 허용 여부',
  
  -- 카테고리
  category_id INT COMMENT '카테고리 ID',
  category_name VARCHAR(100) COMMENT '카테고리 이름',
  category_slug VARCHAR(100) COMMENT '카테고리 슬러그',
  
  -- 날짜
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '발행일',
  
  INDEX idx_status (status) COMMENT '상태 인덱스',
  INDEX idx_author (author_name) COMMENT '작성자 인덱스',
  INDEX idx_category (category_id) COMMENT '카테고리 인덱스',
  INDEX idx_created_at (created_at) COMMENT '생성일 인덱스',
  INDEX idx_view_count (view_count) COMMENT '조회수 인덱스'
) COMMENT '여행 후기 게시판';

-- 여행 후기 카테고리 테이블
CREATE TABLE IF NOT EXISTS travel_review_categories (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT '카테고리 고유 ID',
  name VARCHAR(100) NOT NULL COMMENT '카테고리 이름',
  slug VARCHAR(100) NOT NULL UNIQUE COMMENT '카테고리 슬러그',
  description TEXT COMMENT '카테고리 설명',
  sort_order INT DEFAULT 0 COMMENT '정렬 순서',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
  
  INDEX idx_slug (slug) COMMENT '슬러그 인덱스',
  INDEX idx_sort_order (sort_order) COMMENT '정렬 순서 인덱스'
) COMMENT '여행 후기 카테고리';

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