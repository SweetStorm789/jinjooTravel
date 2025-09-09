-- 성지순례 상품 테이블에 고정 상품과 순서 컬럼 추가
-- 이미 존재하는 컬럼은 무시됩니다

-- pilgrimage_packages 테이블에 is_pinned 컬럼 추가 (고정 상품 여부)
ALTER TABLE pilgrimage_packages 
ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN DEFAULT FALSE COMMENT '고정 상품 여부';

-- pilgrimage_packages 테이블에 display_order 컬럼 추가 (표시 순서)
ALTER TABLE pilgrimage_packages 
ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0 COMMENT '표시 순서';

-- 인덱스 추가 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_pilgrimage_packages_is_pinned ON pilgrimage_packages(is_pinned);
CREATE INDEX IF NOT EXISTS idx_pilgrimage_packages_display_order ON pilgrimage_packages(display_order);
CREATE INDEX IF NOT EXISTS idx_pilgrimage_packages_region_status ON pilgrimage_packages(region, status);

-- 기존 상품들의 display_order를 created_at 기준으로 설정
UPDATE pilgrimage_packages 
SET display_order = (
  SELECT COUNT(*) + 1 
  FROM pilgrimage_packages p2 
  WHERE p2.region = pilgrimage_packages.region 
    AND p2.status = pilgrimage_packages.status
    AND p2.created_at < pilgrimage_packages.created_at
)
WHERE display_order = 0;
