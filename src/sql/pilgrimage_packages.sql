CREATE TABLE pilgrimage_packages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '상품 고유 번호',
    title VARCHAR(200) NOT NULL COMMENT '상품명',
    subtitle VARCHAR(300) COMMENT '상품 부제목',
    description TEXT NOT NULL COMMENT '상품 상세 설명',
    region VARCHAR(50) NOT NULL COMMENT '지역 (예: 유럽, 아시아, 국내, 이스라엘)',
    duration VARCHAR(50) NOT NULL COMMENT '여행 기간 (예: 7박 8일)',
    price DECIMAL(10, 2) NOT NULL COMMENT '순례금액',
    departure_date DATE NOT NULL COMMENT '출발일',
    arrival_date DATE NOT NULL COMMENT '도착일',
    max_people INT NOT NULL COMMENT '최대 인원',
    highlights TEXT COMMENT '주요 방문지 목록',
    status ENUM('draft', 'published', 'closed') DEFAULT 'draft' COMMENT '상품 상태 (초안, 게시, 마감)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
    deleted_at TIMESTAMP NULL COMMENT '삭제일'
) COMMENT '성지순례 상품 기본 정보';

CREATE TABLE package_images (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '이미지 고유 번호',
    package_id BIGINT NOT NULL COMMENT '연결된 상품 번호',
    image_url VARCHAR(500) NOT NULL COMMENT '이미지 URL',
    display_order INT NOT NULL COMMENT '이미지 표시 순서',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
    FOREIGN KEY (package_id) REFERENCES pilgrimage_packages(id)
) COMMENT '성지순례 상품 이미지';

CREATE TABLE package_itineraries (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '일정 고유 번호',
    package_id BIGINT NOT NULL COMMENT '연결된 상품 번호',
    day_number INT NOT NULL COMMENT '일차 (숫자)',
    day_label VARCHAR(50) NOT NULL COMMENT '일차 표시 (예: Day 1, Day 2-3)',
    title VARCHAR(200) NOT NULL COMMENT '일정 제목',
    description TEXT COMMENT '일정 상세 설명',
    activities TEXT COMMENT '주요 활동 내용',
    meals VARCHAR(100) COMMENT '식사 정보 (예: 조식, 중식, 석식)',
    accommodation VARCHAR(200) COMMENT '숙박 정보',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
    FOREIGN KEY (package_id) REFERENCES pilgrimage_packages(id)
) COMMENT '성지순례 일정표';

CREATE TABLE package_details (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '상세 정보 고유 번호',
    package_id BIGINT NOT NULL COMMENT '연결된 상품 번호',
    included TEXT COMMENT '포함사항',
    not_included TEXT COMMENT '불포함사항',
    notes TEXT COMMENT '여행자보험 주의사항',
    customer_promise TEXT COMMENT '고객에 대한 약속',
    cancellation_policy TEXT COMMENT '예약 및 취소료 규정',
    other_info TEXT COMMENT '기타 안내사항',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
    FOREIGN KEY (package_id) REFERENCES pilgrimage_packages(id)
) COMMENT '성지순례 상품 상세 정보';

