-- 게시판 테이블에 고정 게시글과 순서 컬럼 추가
-- 이미 존재하는 컬럼은 무시됩니다

-- board_posts 테이블에 is_pinned 컬럼 추가 (고정 게시글 여부)
ALTER TABLE board_posts 
ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN DEFAULT FALSE COMMENT '고정 게시글 여부';

-- board_posts 테이블에 display_order 컬럼 추가 (표시 순서)
ALTER TABLE board_posts 
ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0 COMMENT '표시 순서';

-- 인덱스 추가 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_board_posts_is_pinned ON board_posts(is_pinned);
CREATE INDEX IF NOT EXISTS idx_board_posts_display_order ON board_posts(display_order);
CREATE INDEX IF NOT EXISTS idx_board_posts_board_type_status ON board_posts(board_type, status);

-- 기존 게시글들의 display_order를 created_at 기준으로 설정
UPDATE board_posts 
SET display_order = (
  SELECT COUNT(*) + 1 
  FROM board_posts b2 
  WHERE b2.board_type = board_posts.board_type 
    AND b2.status = board_posts.status
    AND b2.created_at < board_posts.created_at
)
WHERE display_order = 0;
