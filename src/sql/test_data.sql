-- 성지순례 상품 기본 정보
INSERT INTO pilgrimage_packages (
    title, subtitle, description, region, duration, price,
    departure_date, arrival_date, max_people, highlights, status
) VALUES 
-- 바티칸 & 로마 성지순례
(
    '바티칸 & 로마 성지순례',
    '가톨릭의 중심지에서 만나는 신앙의 뿌리',
    '베드로 대성당, 시스티나 성당, 바티칸 박물관과 로마의 주요 성지들을 방문하는 특별한 순례로, 2천 년 가톨릭 역사의 심장부에서 신앙을 깊게 하는 거룩한 여정입니다.',
    '유럽',
    '7박 8일',
    2890000,
    '2024-03-15',
    '2024-03-22',
    25,
    '베드로 대성당\n시스티나 성당\n산 조반니 라테라노 대성당\n산타 마리아 마조레 대성당',
    'published'
),
-- 이스라엘 성지순례
(
    '이스라엘 성지순례',
    '예수님의 발자취를 따라가는 거룩한 여정',
    '예수님의 탄생지 베들레헴부터 공생활 무대였던 갈릴래아, 수난과 부활의 현장 예루살렘까지, 성경 속 장소들을 직접 순례하며 깊은 신앙체험을 하는 여정입니다.',
    '이스라엘',
    '8박 9일',
    3490000,
    '2024-04-10',
    '2024-04-18',
    30,
    '베들레헴 예수 탄생 성당\n나자렛 성모영보 성당\n예루살렘 성묘교회\n갈릴래아 호수',
    'published'
),
-- 파티마 & 루르드 성지순례
(
    '파티마 & 루르드 성지순례',
    '성모님 발현 성지를 찾아가는 은총의 순례',
    '성모님께서 발현하신 파티마와 루르드를 순례하며, 성모님의 메시지를 깊이 묵상하고 은총을 체험하는 특별한 여정입니다.',
    '유럽',
    '9박 10일',
    3890000,
    '2024-05-20',
    '2024-05-29',
    25,
    '파티마 성모 발현 성지\n루르드 성모 발현 성지\n성 야고보 성당\n몽생미셸 수도원',
    'published'
);

-- 상품 이미지
INSERT INTO package_images (
    package_id, image_url, display_order
) VALUES 
(1, '/images/vatican/st-peters-basilica.jpg', 1),
(1, '/images/vatican/st-peters-basilica2.jpg', 2),
(1, '/images/rome/st-peters-basilica.jpg', 3),
(2, '/images/holy-land/bethlehem-nativity.jpg', 1),
(2, '/images/holy-land/jerusalem-holy-sepulchre.jpg', 2),
(2, '/images/holy-land/nazareth-annunciation.jpg', 3),
(3, '/images/fatima/fatima-sanctuary.jpg', 1),
(3, '/images/lourdes/Lourdes1.jpg', 2),
(3, '/images/lourdes/Lourdes2.jpg', 3);

-- 일정표 (첫 번째 상품의 일정만 예시로 작성)
INSERT INTO package_itineraries (
    package_id, day_number, day_label, title, description, activities, meals, accommodation
) VALUES 
-- 바티칸 & 로마 성지순례 일정
(1, 1, 'Day 1', '인천 출발 → 로마 도착',
 '인천국제공항 출발, 로마 레오나르도 다 빈치 공항 도착 후 호텔 체크인',
 '인천국제공항 출발 (KE927편)\n로마 레오나르도 다 빈치 공항 도착\n호텔 체크인 및 휴식',
 '기내식, 석식',
 'Rome Marriott Grand Hotel Flora (4성급)'),
(1, 2, 'Day 2', '바티칸 성지순례',
 '가톨릭의 중심지 바티칸에서 베드로 대성당과 시스티나 성당 참배',
 '바티칸 박물관 관람\n시스티나 성당 미사 참례\n베드로 대성당 참배\n베드로 묘소 참배',
 '조식, 중식, 석식',
 'Rome Marriott Grand Hotel Flora (4성급)'),
(1, 3, 'Day 3', '로마 4대 성당 순례',
 '로마의 4대 성당을 차례로 방문하며 가톨릭 역사를 체험',
 '산 조반니 라테라노 대성당 (교황좌 성당)\n산타 마리아 마조레 대성당 (구유 성유물)\n산 바오로 푸오리 레 무라 대성당\n성계단 기도',
 '조식, 중식, 석식',
 'Rome Marriott Grand Hotel Flora (4성급)');

-- 상품 상세 정보
INSERT INTO package_details (
    package_id, included, not_included, customer_promise, cancellation_policy, other_info
) VALUES 
(1, -- 바티칸 & 로마 성지순례
'왕복 항공료 (대한항공 직항)\n전 일정 숙박비 (4성급 호텔)\n전 일정 식사\n전용 차량 및 현지 가이드\n바티칸 박물관 입장료\n성지 입장료 및 미사 참례',
'개인 경비\n여권 발급비\n선택관광비\n개인 여행자보험\n팁 (가이드, 기사, 호텔)\n개인적인 쇼핑 및 음료',
'- 카드 결제로 인한 추가 요금 NO! 상품가 보장!\n- 단체별 무조건 전문 인솔자 동반하여 출발 보장!\n- 안정적인 현지일정 및 체계적인 관리',
'이 상품은 취소시 공정거래 위원회 여행약관(2019년 12월19일 변경공시)과 (주)진주여행사의 특별약관 규정에 기준하여 취소수수료가 발생할 수 있습니다.',
'* NO 필수옵션\n* 지도신부님, 인솔자 동반\n* 선별된 우수가이드\n* 한식 특식\n* 1억원 여행자 보험'
),
(2, -- 이스라엘 성지순례
'왕복 항공료 (대한항공)\n전 일정 숙박비 (4성급 호텔)\n전 일정 식사\n전용 차량 및 현지 가이드\n성지 입장료',
'개인 경비\n여권 발급비\n선택관광비\n개인 여행자보험\n팁 (가이드, 기사, 호텔)',
'- 성경 속 장소들을 직접 방문하는 감동\n- 현지 전문 가이드의 상세한 설명\n- 쾌적한 이동을 위한 고급 차량',
'이 상품은 취소시 공정거래 위원회 여행약관에 따라 취소수수료가 발생할 수 있습니다.',
'* 성지별 미사 봉헌\n* 지도신부님 동반\n* 성경 해설 제공'
),
(3, -- 파티마 & 루르드 성지순례
'왕복 항공료\n전 일정 숙박비 (4성급 호텔)\n전 일정 식사\n전용 차량\n성지 입장료',
'개인 경비\n여권 발급비\n선택관광비\n개인 여행자보험\n팁',
'- 성모님 발현 성지에서의 특별한 은총\n- 전문 가이드의 영성적인 해설\n- 편안한 일정과 숙박',
'이 상품은 취소시 공정거래 위원회 여행약관에 따라 취소수수료가 발생할 수 있습니다.',
'* 매일 미사 봉헌\n* 묵주기도 봉헌\n* 성모님 발현 성지 해설');
