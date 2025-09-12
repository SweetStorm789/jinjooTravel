-- pilgrimage_packages 테이블 날짜 컬럼 수정 스크립트
-- 작성일: 2024년
-- 목적: departure_date, arrival_date를 VARCHAR(8) 형식으로 변경

-- 1단계: 컬럼 크기를 먼저 늘려서 데이터 변환 가능하게 만들기
ALTER TABLE pilgrimage_packages 
MODIFY COLUMN departure_date VARCHAR(10),
MODIFY COLUMN arrival_date VARCHAR(10);

-- 2단계: 기존 데이터를 YYYYMMDD 형식으로 변환
UPDATE pilgrimage_packages 
SET departure_date = DATE_FORMAT(STR_TO_DATE(departure_date, '%Y-%m-%d'), '%Y%m%d')
WHERE departure_date LIKE '%-%' AND departure_date IS NOT NULL;

UPDATE pilgrimage_packages 
SET arrival_date = DATE_FORMAT(STR_TO_DATE(arrival_date, '%Y-%m-%d'), '%Y%m%d')
WHERE arrival_date LIKE '%-%' AND arrival_date IS NOT NULL;

-- 3단계: 컬럼 크기를 정확히 VARCHAR(8)로 변경
ALTER TABLE pilgrimage_packages 
MODIFY COLUMN departure_date VARCHAR(8),
MODIFY COLUMN arrival_date VARCHAR(8);

-- 변경 확인
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'pilgrimage_packages' 
AND COLUMN_NAME IN ('departure_date', 'arrival_date');
