-- ========================================
-- 통합 게시판 테이블 설계 (TipTap 에디터용)
-- ========================================

-- 1. 메인 게시판 테이블
CREATE TABLE board_posts (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  
  -- 게시판 분류
  board_type VARCHAR(30) NOT NULL COMMENT '게시판 타입: notice, free, gallery, qna, review, marian_message',
  category_id INT COMMENT '카테고리 ID (선택사항)',
  
  -- 기본 정보
  title VARCHAR(255) NOT NULL COMMENT '제목',
  slug VARCHAR(255) UNIQUE COMMENT 'SEO 친화적 URL',
  
  -- TipTap 에디터 콘텐츠
  content_html LONGTEXT COMMENT 'TipTap에서 생성된 HTML',
  content_json JSON COMMENT 'TipTap 문서 구조 (원본)',
  content_text TEXT COMMENT '검색용 순수 텍스트',
  excerpt TEXT COMMENT '요약/미리보기',
  
  -- 작성자 정보 (비회원 지원)
  author_name VARCHAR(100) NOT NULL COMMENT '작성자명 (필수)',
  author_email VARCHAR(255) COMMENT '작성자 이메일 (선택)',
  author_phone VARCHAR(20) COMMENT '작성자 연락처 (선택)',
  author_ip VARCHAR(45) NOT NULL COMMENT '작성자 IP (보안용)',
  password VARCHAR(255) NOT NULL COMMENT '비회원 게시물 비밀번호 (해시, 수정/삭제용)',
  is_member BOOLEAN DEFAULT FALSE COMMENT '회원 여부',
  
  -- 상태 관리
  status ENUM('draft', 'published', 'private', 'deleted', 'pending') DEFAULT 'published' COMMENT '게시물 상태',
  is_featured BOOLEAN DEFAULT FALSE COMMENT '추천/공지 여부',
  is_notice BOOLEAN DEFAULT FALSE COMMENT '공지사항 여부',
  allow_comments BOOLEAN DEFAULT TRUE COMMENT '댓글 허용',
  is_secret BOOLEAN DEFAULT FALSE COMMENT '비밀글 여부 (질문답변용)',
  requires_approval BOOLEAN DEFAULT FALSE COMMENT '승인 필요 여부',
  
  -- 통계
  view_count INT DEFAULT 0 COMMENT '조회수',
  like_count INT DEFAULT 0 COMMENT '좋아요 수',
  comment_count INT DEFAULT 0 COMMENT '댓글 수',
  
  -- 첨부파일/미디어
  featured_image VARCHAR(500) COMMENT '대표 이미지',
  attachments JSON COMMENT '첨부파일 목록',
  
  -- SEO & 메타데이터
  meta_title VARCHAR(255) COMMENT 'SEO 제목',
  meta_description TEXT COMMENT 'SEO 설명',
  tags JSON COMMENT '태그 배열',
  
  -- 일정 관리 (공지사항 등)
  published_at TIMESTAMP COMMENT '게시 시작일',
  expired_at TIMESTAMP COMMENT '게시 종료일',
  
  -- 시스템 필드
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
  deleted_at TIMESTAMP NULL COMMENT '소프트 삭제일',
  
  -- 인덱스
  INDEX idx_board_type (board_type),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at),
  INDEX idx_published_at (published_at),
  INDEX idx_featured (is_featured),
  INDEX idx_notice (is_notice),
  FULLTEXT INDEX idx_search (title, content_text, excerpt)
) COMMENT='통합 게시판 메인 테이블';

-- 2. 카테고리 테이블
CREATE TABLE board_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  board_type VARCHAR(30) NOT NULL COMMENT '게시판 타입',
  name VARCHAR(100) NOT NULL COMMENT '카테고리명',
  slug VARCHAR(100) NOT NULL COMMENT 'URL 친화적 이름',
  description TEXT COMMENT '카테고리 설명',
  sort_order INT DEFAULT 0 COMMENT '정렬 순서',
  is_active BOOLEAN DEFAULT TRUE COMMENT '활성화 여부',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
  
  UNIQUE KEY unique_category (board_type, slug),
  INDEX idx_board_type (board_type),
  INDEX idx_sort_order (sort_order)
) COMMENT='게시판 카테고리 테이블';

-- 3. 첨부파일 테이블
CREATE TABLE board_attachments (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  post_id BIGINT NOT NULL COMMENT '게시물 ID',
  
  -- 파일 정보
  original_name VARCHAR(255) NOT NULL COMMENT '원본 파일명',
  stored_name VARCHAR(255) NOT NULL COMMENT '저장된 파일명',
  file_path VARCHAR(500) NOT NULL COMMENT '파일 경로',
  file_size BIGINT NOT NULL COMMENT '파일 크기 (바이트)',
  mime_type VARCHAR(100) COMMENT 'MIME 타입',
  file_extension VARCHAR(10) COMMENT '파일 확장자',
  
  -- 이미지 전용
  width INT COMMENT '이미지 너비',
  height INT COMMENT '이미지 높이',
  alt_text VARCHAR(255) COMMENT '대체 텍스트',
  
  -- 메타데이터
  upload_ip VARCHAR(45) COMMENT '업로드 IP',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '업로드일',
  
  FOREIGN KEY (post_id) REFERENCES board_posts(id) ON DELETE CASCADE,
  INDEX idx_post_id (post_id)
) COMMENT='게시판 첨부파일 테이블';

-- 4. 댓글 테이블 (비회원 지원)
CREATE TABLE board_comments (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  post_id BIGINT NOT NULL COMMENT '게시물 ID',
  parent_id BIGINT NULL COMMENT '대댓글용 부모 댓글 ID',
  
  -- 댓글 내용
  content TEXT NOT NULL COMMENT '댓글 내용',
  
  -- 작성자 정보 (비회원 지원)
  author_name VARCHAR(100) NOT NULL COMMENT '작성자명',
  author_email VARCHAR(255) COMMENT '작성자 이메일',
  author_ip VARCHAR(45) NOT NULL COMMENT '작성자 IP',
  password VARCHAR(255) NOT NULL COMMENT '비회원 댓글 비밀번호 (해시)',
  is_member BOOLEAN DEFAULT FALSE COMMENT '회원 여부',
  
  -- 상태 관리
  is_approved BOOLEAN DEFAULT TRUE COMMENT '승인 여부',
  is_secret BOOLEAN DEFAULT FALSE COMMENT '비밀 댓글 여부',
  is_deleted BOOLEAN DEFAULT FALSE COMMENT '삭제 여부',
  
  -- 시스템 필드
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '작성일',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
  deleted_at TIMESTAMP NULL COMMENT '삭제일',
  
  FOREIGN KEY (post_id) REFERENCES board_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES board_comments(id) ON DELETE CASCADE,
  INDEX idx_post_id (post_id),
  INDEX idx_parent_id (parent_id),
  INDEX idx_approved (is_approved)
) COMMENT='게시판 댓글 테이블 (비회원 지원)';

-- ========================================
-- 기본 카테고리 데이터 삽입
-- ========================================

INSERT INTO board_categories (board_type, name, slug, description, sort_order) VALUES
-- 공지사항 카테고리
('notice', '일반공지', 'general', '일반적인 공지사항', 1),
('notice', '이벤트', 'event', '이벤트 및 프로모션', 2),
('notice', '시스템', 'system', '시스템 점검 및 업데이트', 3),

-- 자유게시판 카테고리
('free', '자유토론', 'discussion', '자유로운 이야기', 1),
('free', '여행팁', 'travel-tips', '여행 관련 팁과 정보', 2),
('free', '질문답변', 'qna', '궁금한 것들을 물어보세요', 3),

-- 포토갤러리 카테고리
('gallery', '국내여행', 'domestic', '국내 여행 사진', 1),
('gallery', '해외여행', 'international', '해외 여행 사진', 2),
('gallery', '성지순례', 'pilgrimage', '성지순례 사진', 3),

-- 성모님 메시지 카테고리
('marian_message', '월례메시지', 'monthly', '매월 25일 메시지', 1),
('marian_message', '특별메시지', 'special', '특별한 날의 메시지', 2);

-- ========================================
-- 샘플 데이터 삽입
-- ========================================

INSERT INTO board_posts (
  board_type, category_id, title, 
  content_html, content_json, content_text, excerpt,
  author_name, author_email, author_phone, author_ip, password, is_member,
  status, is_featured, is_notice, allow_comments, is_secret, requires_approval,
  view_count, like_count, comment_count, featured_image, attachments, 
  meta_title, meta_description, tags, published_at, expired_at
) VALUES
-- 공지사항 샘플 (관리자)
(
  'notice', 1, '진주여행사 홈페이지 리뉴얼 안내',
  '<h2>🎉 홈페이지가 새롭게 단장했습니다!</h2><p><strong>더 편리하고 아름다운</strong> 홈페이지로 여러분을 만나게 되었습니다.</p><ul><li>새로운 디자인</li><li>향상된 사용성</li><li>모바일 최적화</li></ul>',
  '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"🎉 홈페이지가 새롭게 단장했습니다!"}]}]}',
  '홈페이지가 새롭게 단장했습니다! 더 편리하고 아름다운 홈페이지로 여러분을 만나게 되었습니다.',
  '진주여행사 홈페이지가 리뉴얼되어 더욱 편리해졌습니다.',
  '관리자', 'admin@jinjootravel.com', '055-123-4567', '127.0.0.1', '$2y$10$example_admin_password', TRUE,
  'published', TRUE, TRUE, TRUE, FALSE, FALSE,
  0, 0, 0, NULL, NULL, 
  NULL, NULL, '["공지사항","리뉴얼","홈페이지"]', NOW(), NULL
),

-- 자유게시판 샘플 (비회원)
(
  'free', 2, '제주도 3박4일 여행 후기',
  '<h2>✈️ 제주도 여행 후기</h2><p>정말 <strong>멋진</strong> 여행이었습니다! 특히 성산일출봉에서 본 일출은 잊을 수 없어요.</p><p>추천 코스:</p><ol><li>성산일출봉</li><li>우도</li><li>한라산</li></ol>',
  '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"✈️ 제주도 여행 후기"}]}]}',
  '제주도 여행 후기 정말 멋진 여행이었습니다! 특히 성산일출봉에서 본 일출은 잊을 수 없어요.',
  '제주도 3박4일 여행을 다녀온 후기를 공유합니다.',
  '여행러버', 'travel@example.com', '010-1234-5678', '127.0.0.1', '$2y$10$example_hashed_password', FALSE,
  'published', FALSE, FALSE, TRUE, FALSE, FALSE,
  0, 0, 0, NULL, NULL, 
  NULL, NULL, '["제주도","여행","후기"]', NOW(), NOW()
),

-- 질문답변 샘플 (비회원, 비밀글)
(
  'free', 3, '유럽여행 비자 문의드립니다',
  '<h3>🤔 유럽여행 비자 관련 문의</h3><p>안녕하세요. 유럽여행을 계획 중인데 <strong>비자 준비</strong>는 어떻게 해야 하나요?</p><p>특히 다음이 궁금합니다:</p><ul><li>쉥겐비자 신청 방법</li><li>필요한 서류</li><li>처리 기간</li></ul><p>답변 부탁드립니다!</p>',
  '{"type":"doc","content":[{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"🤔 유럽여행 비자 관련 문의"}]}]}',
  '유럽여행 비자 관련 문의 안녕하세요. 유럽여행을 계획 중인데 비자 준비는 어떻게 해야 하나요?',
  '유럽여행 비자 신청 방법에 대해 문의드립니다.',
  '김여행', 'question@example.com', NULL, '127.0.0.1', '$2y$10$example_hashed_password2', FALSE,
  'published', FALSE, FALSE, TRUE, TRUE, FALSE,
  0, 0, 0, NULL, NULL, 
  NULL, NULL, '["유럽","비자","문의"]', NOW(), NOW()
),

-- 포토갤러리 샘플 (비회원)
(
  'gallery', 1, '부산 여행 사진모음',
  '<h2>📸 부산 여행 사진</h2><p>지난주 부산 여행에서 찍은 사진들입니다!</p><div class="gallery"><p>해운대 해수욕장, 광안대교, 감천문화마을 등...</p></div>',
  '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"📸 부산 여행 사진"}]}]}',
  '부산 여행 사진 지난주 부산 여행에서 찍은 사진들입니다!',
  '부산 여행에서 찍은 아름다운 사진들을 공유합니다.',
  '사진작가', 'photo@example.com', NULL, '127.0.0.1', '$2y$10$example_hashed_password3', FALSE,
  'published', FALSE, FALSE, TRUE, FALSE, FALSE,
  0, 0, 0, '/uploads/busan-main.jpg', '["busan-1.jpg","busan-2.jpg","busan-3.jpg"]', 
  NULL, NULL, '["부산","여행","사진"]', NOW(), NOW()
);

