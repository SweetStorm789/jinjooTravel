-- package_id를 NULL 허용으로 변경
ALTER TABLE package_images MODIFY COLUMN package_id BIGINT NULL;

-- image_type 컬럼 추가
ALTER TABLE package_images ADD COLUMN image_type ENUM('main', 'detail') NOT NULL DEFAULT 'detail' AFTER image_url;

-- display_order 컬럼명 변경 (기존 컬럼이 있다면)
ALTER TABLE package_images CHANGE COLUMN display_order display_order INT NOT NULL;