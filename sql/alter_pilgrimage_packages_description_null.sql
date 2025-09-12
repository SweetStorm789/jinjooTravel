-- pilgrimage_packages 테이블의 description 컬럼을 null 허용으로 변경
-- 작성일: 2024년
-- 목적: 상품설명을 필수가 아닌 선택사항으로 변경

-- description 컬럼을 null 허용으로 변경
ALTER TABLE pilgrimage_packages 
ALTER COLUMN description DROP NOT NULL;

-- 변경 확인을 위한 쿼리 (선택사항)
-- SELECT column_name, is_nullable, data_type 
-- FROM information_schema.columns 
-- WHERE table_name = 'pilgrimage_packages' 
-- AND column_name = 'description';
