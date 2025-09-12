-- pilgrimage_packages 테이블의 departure_date, arrival_date 컬럼 정보 확인
DESCRIBE pilgrimage_packages;

-- 또는 더 자세한 정보
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'pilgrimage_packages' 
AND COLUMN_NAME IN ('departure_date', 'arrival_date');
