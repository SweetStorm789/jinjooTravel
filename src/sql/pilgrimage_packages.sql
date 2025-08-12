-- jinjootravel.pilgrimage_packages definition

CREATE TABLE `pilgrimage_packages` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '상품 고유 번호',
  `title` varchar(200) NOT NULL COMMENT '상품명',
  `subtitle` varchar(300) DEFAULT NULL COMMENT '상품 부제목',
  `description` text NOT NULL COMMENT '상품 상세 설명',
  `region` varchar(50) NOT NULL COMMENT '지역 (예: 유럽, 아시아, 국내, 이스라엘)',
  `duration` varchar(50) NOT NULL COMMENT '여행 기간 (예: 7박 8일)',
  `price` decimal(15,2) NOT NULL COMMENT '순례금액',
  `departure_date` date NOT NULL COMMENT '출발일',
  `arrival_date` date NOT NULL COMMENT '도착일',
  `max_people` int(11) NOT NULL COMMENT '최대 인원',
  `highlights` text DEFAULT NULL COMMENT '주요 방문지 목록',
  `status` enum('draft','published','closed') DEFAULT 'draft' COMMENT '상품 상태 (초안, 게시, 마감)',
  `created_at` timestamp NULL DEFAULT current_timestamp() COMMENT '등록일',
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '수정일',
  `deleted_at` timestamp NULL DEFAULT NULL COMMENT '삭제일',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='성지순례 상품 기본 정보';

-- jinjootravel.package_images definition

CREATE TABLE `package_images` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '이미지 고유 번호',
  `package_id` bigint(20) DEFAULT NULL COMMENT '연결된 상품 번호',
  `image_url` varchar(500) NOT NULL COMMENT '이미지 URL',
  `image_type` enum('main','detail') NOT NULL DEFAULT 'detail' COMMENT '이미지 타입',
  `display_order` int(11) NOT NULL COMMENT '이미지 표시 순서',
  `created_at` timestamp NULL DEFAULT current_timestamp() COMMENT '등록일',
  PRIMARY KEY (`id`),
  KEY `package_id` (`package_id`),
  CONSTRAINT `package_images_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `pilgrimage_packages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='성지순례 상품 이미지';

-- jinjootravel.package_itineraries definition

CREATE TABLE `package_itineraries` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '일정 고유 번호',
  `package_id` bigint(20) NOT NULL COMMENT '연결된 상품 번호',
  `day_number` int(11) DEFAULT NULL COMMENT '일차 (숫자)',
  `day_label` varchar(50) NOT NULL COMMENT '일차 표시 (예: Day 1, Day 2-3)',
  `title` varchar(200) NOT NULL COMMENT '일정 제목',
  `description` text DEFAULT NULL COMMENT '일정 상세 설명',
  `activities` text DEFAULT NULL COMMENT '주요 활동 내용',
  `meals` varchar(100) DEFAULT NULL COMMENT '식사 정보 (예: 조식, 중식, 석식)',
  `accommodation` varchar(200) DEFAULT NULL COMMENT '숙박 정보',
  `created_at` timestamp NULL DEFAULT current_timestamp() COMMENT '등록일',
  PRIMARY KEY (`id`),
  KEY `package_id` (`package_id`),
  CONSTRAINT `package_itineraries_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `pilgrimage_packages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='성지순례 일정표';

-- jinjootravel.package_details definition

CREATE TABLE `package_details` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '상세 정보 고유 번호',
  `package_id` bigint(20) NOT NULL COMMENT '연결된 상품 번호',
  `included` text DEFAULT NULL COMMENT '포함사항',
  `not_included` text DEFAULT NULL COMMENT '불포함사항',
  `insurance_notes` text DEFAULT NULL COMMENT '여행자보험 주의사항',
  `customer_promise` text DEFAULT NULL COMMENT '고객에 대한 약속',
  `cancellation_policy` text DEFAULT NULL COMMENT '예약 및 취소료 규정',
  `other_info` text DEFAULT NULL COMMENT '기타 안내사항',
  `created_at` timestamp NULL DEFAULT current_timestamp() COMMENT '등록일',
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '수정일',
  PRIMARY KEY (`id`),
  KEY `package_id` (`package_id`),
  CONSTRAINT `package_details_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `pilgrimage_packages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='성지순례 상품 상세 정보';

