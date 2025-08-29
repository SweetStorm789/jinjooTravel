-- QnA 카테고리 추가
INSERT INTO board_categories (board_type, name, slug, description, sort_order) VALUES
('qna', '성지순례문의', 'product', '성지순례에 대한 문의', 1),
('qna', '예약문의', 'reservation', '예약 및 일정 관련 문의', 2),
('qna', '일반문의', 'general', '기타 일반적인 문의사항', 3),
('qna', '취소/환불문의', 'cancel-refund', '취소 및 환불 관련 문의', 4);

-- QnA 샘플 데이터 추가
INSERT INTO board_posts (
  board_type, category_id, title, 
  content_html, content_json, content_text, excerpt,
  author_name, author_email, author_phone, author_ip, password, is_member,
  status, allow_comments, is_secret, published_at
) VALUES
-- 상품문의 샘플
(
  'qna', (SELECT id FROM board_categories WHERE board_type='qna' AND slug='product' LIMIT 1), 
  '메주고리예 성지순례 3월 출발 일정 문의드립니다',
  '<p>3월 중순경 메주고리예 성지순례를 계획하고 있습니다.</p><p>현재 예약 가능한 일정과 비용에 대해 자세히 알고 싶습니다.</p><p>또한 포함 사항과 불포함 사항도 알려주시면 감사하겠습니다.</p>',
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"3월 중순경 메주고리예 성지순례를 계획하고 있습니다."}]}]}',
  '3월 중순경 메주고리예 성지순례를 계획하고 있습니다. 현재 예약 가능한 일정과 비용에 대해 자세히 알고 싶습니다.',
  '메주고리예 성지순례 3월 출발 일정과 비용을 문의드립니다.',
  '김순례', 'pilgrim@example.com', '010-1234-5678', '127.0.0.1', '$2y$10$example_hashed_password1', FALSE,
  'published', TRUE, FALSE, NOW()
),

-- 예약문의 샘플
(
  'qna', (SELECT id FROM board_categories WHERE board_type='qna' AND slug='reservation' LIMIT 1),
  '로마 바티칸 성지순례 단체 할인 가능한가요?',
  '<p>본당에서 25명 정도 단체로 로마 바티칸 성지순례를 계획하고 있습니다.</p><p>단체 할인이나 특별 혜택이 있는지 문의드립니다.</p><p>4월 말이나 5월 초 출발을 희망합니다.</p>',
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"본당에서 25명 정도 단체로 로마 바티칸 성지순례를 계획하고 있습니다."}]}]}',
  '본당에서 25명 정도 단체로 로마 바티칸 성지순례를 계획하고 있습니다. 단체 할인이나 특별 혜택이 있는지 문의드립니다.',
  '로마 바티칸 성지순례 단체 할인에 대해 문의드립니다.',
  '박신부', 'priest@example.com', '055-123-4567', '127.0.0.1', '$2y$10$example_hashed_password2', FALSE,
  'published', TRUE, FALSE, NOW()
),

-- 비공개 문의 샘플
(
  'qna', (SELECT id FROM board_categories WHERE board_type='qna' AND slug='cancel-refund' LIMIT 1),
  '개인적인 사정으로 예약 취소 관련 문의',
  '<p>이미 예약한 성지순례를 개인적인 사정으로 취소해야 할 상황입니다.</p><p>취소 수수료와 환불 가능 금액에 대해 문의드립니다.</p>',
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"이미 예약한 성지순례를 개인적인 사정으로 취소해야 할 상황입니다."}]}]}',
  '이미 예약한 성지순례를 개인적인 사정으로 취소해야 할 상황입니다. 취소 수수료와 환불 가능 금액에 대해 문의드립니다.',
  '예약 취소 및 환불 관련 문의',
  '이가톨릭', 'private@example.com', NULL, '127.0.0.1', '$2y$10$example_hashed_password3', FALSE,
  'published', TRUE, TRUE, NOW()
),

-- 일반문의 샘플
(
  'qna', (SELECT id FROM board_categories WHERE board_type='qna' AND slug='general' LIMIT 1),
  '파티마 성지순례 때 준비물이 따로 있나요?',
  '<p>처음 성지순례를 가게 되어서 무엇을 준비해야 할지 잘 모르겠습니다.</p><p>특별히 챙겨가야 할 물건들이 있을까요?</p><p>옷차림은 어떻게 해야 하는지도 궁금합니다.</p>',
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"처음 성지순례를 가게 되어서 무엇을 준비해야 할지 잘 모르겠습니다."}]}]}',
  '처음 성지순례를 가게 되어서 무엇을 준비해야 할지 잘 모르겠습니다. 특별히 챙겨가야 할 물건들이 있을까요?',
  '파티마 성지순례 준비물에 대해 문의드립니다.',
  '최마리아', 'maria@example.com', '010-9876-5432', '127.0.0.1', '$2y$10$example_hashed_password4', FALSE,
  'published', TRUE, FALSE, NOW()
),

-- 고령자 문의 샘플
(
  'qna', (SELECT id FROM board_categories WHERE board_type='qna' AND slug='general' LIMIT 1),
  '고령자도 성지순례 참가 가능한가요?',
  '<p>75세 고령자인데 성지순례 참가가 가능한지 궁금합니다.</p><p>특별히 주의해야 할 사항들이 있는지 알고 싶습니다.</p><p>의료진 동행이나 특별한 배려사항이 있는지도 문의드립니다.</p>',
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"75세 고령자인데 성지순례 참가가 가능한지 궁금합니다."}]}]}',
  '75세 고령자인데 성지순례 참가가 가능한지, 특별히 주의해야 할 사항들이 있는지 궁금합니다.',
  '고령자 성지순례 참가 가능 여부를 문의드립니다.',
  '정할머니', 'grandma@example.com', '055-987-6543', '127.0.0.1', '$2y$10$example_hashed_password5', FALSE,
  'published', TRUE, FALSE, NOW()
);

-- 샘플 답변들 추가
INSERT INTO board_comments (
  post_id, content, author_name, author_email, author_ip, 
  password, is_member, is_approved
) VALUES
-- 첫 번째 QnA에 대한 답변
(
  (SELECT id FROM board_posts WHERE board_type='qna' AND title LIKE '%메주고리예%' LIMIT 1),
  '<p>안녕하세요. 진주여행사입니다.</p><p>메주고리예 성지순례 3월 출발 일정은 다음과 같습니다:</p><ul><li>3월 15일 출발 (5박 7일) - 잔여석 3석</li><li>3월 22일 출발 (5박 7일) - 예약 가능</li></ul><p>상세한 일정표와 견적서를 이메일로 발송해드리겠습니다.</p><p>추가 문의사항은 언제든 연락주세요.</p>',
  '관리자', 'admin@jinjootravel.com', '127.0.0.1',
  'admin_no_password', TRUE, TRUE
),

-- 두 번째 QnA에 대한 답변
(
  (SELECT id FROM board_posts WHERE board_type='qna' AND title LIKE '%로마 바티칸%' LIMIT 1),
  '<p>안녕하세요. 단체 문의 감사드립니다.</p><p>25명 단체의 경우 다음과 같은 혜택을 제공합니다:</p><ul><li>15% 단체 할인</li><li>인솔자 1명 무료</li><li>단체 미사 주선</li></ul><p>4-5월 출발 가능 일정을 확인해드리겠습니다.</p><p>본당 담당자님과 직접 상담을 원하시면 연락주세요.</p>',
  '관리자', 'admin@jinjootravel.com', '127.0.0.1',
  'admin_no_password', TRUE, TRUE
),

-- 네 번째 QnA에 대한 답변
(
  (SELECT id FROM board_posts WHERE board_type='qna' AND title LIKE '%파티마%준비물%' LIMIT 1),
  '<p>파티마 성지순례 준비물 안내해드립니다:</p><h3>필수 준비물:</h3><ul><li>여권 (유효기간 6개월 이상)</li><li>편한 운동화</li><li>가디건 또는 얇은 외투</li><li>개인 상비약</li></ul><h3>권장 준비물:</h3><ul><li>묵주</li><li>기도서</li><li>선글라스</li><li>우산</li></ul><p>자세한 준비물 체크리스트를 이메일로 발송해드리겠습니다.</p>',
  '관리자', 'admin@jinjootravel.com', '127.0.0.1',
  'admin_no_password', TRUE, TRUE
);

-- 댓글 수 업데이트
UPDATE board_posts 
SET comment_count = (
  SELECT COUNT(*) 
  FROM board_comments 
  WHERE post_id = board_posts.id AND is_approved = TRUE AND is_deleted = FALSE
)
WHERE board_type = 'qna';

