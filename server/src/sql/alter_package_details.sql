-- package_details 테이블의 notes 컬럼을 insurance_notes로 변경
ALTER TABLE package_details CHANGE COLUMN notes insurance_notes TEXT;

