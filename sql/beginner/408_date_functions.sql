-- [408] 날짜/시간 함수 - Date & Time Functions
-- 레벨: 2 | SQL에서 날짜와 시간을 다루는 다양한 함수를 배웁니다

CREATE TEMPORARY TABLE orders (
    order_id   INT AUTO_INCREMENT PRIMARY KEY,
    customer   VARCHAR(20),
    product    VARCHAR(30),
    amount     INT,
    ordered_at DATETIME
);

INSERT INTO orders (customer, product, amount, ordered_at) VALUES
('김철수', '노트북',  1200000, '2025-01-05 09:30:00'),
('이영희', '마우스',    45000, '2025-01-10 14:22:00'),
('박민수', '키보드',   120000, '2025-02-03 11:15:00'),
('최지영', '모니터',   450000, '2025-02-14 16:45:00'),
('정호준', '의자',     380000, '2025-03-01 08:00:00'),
('한소희', '책상',     650000, '2025-03-15 13:30:00');

-- 현재 날짜/시간
SELECT
    NOW()            AS 현재날짜시간,
    CURDATE()        AS 현재날짜,
    CURTIME()        AS 현재시간,
    CURRENT_TIMESTAMP AS 타임스탬프;

-- 날짜 구성 요소 추출
SELECT
    ordered_at,
    YEAR(ordered_at)   AS 연도,
    MONTH(ordered_at)  AS 월,
    DAY(ordered_at)    AS 일,
    HOUR(ordered_at)   AS 시,
    MINUTE(ordered_at) AS 분,
    DAYOFWEEK(ordered_at) AS 요일번호,  -- 1=일, 2=월 ... 7=토
    DAYNAME(ordered_at)   AS 요일이름,
    WEEK(ordered_at)      AS 주차,
    QUARTER(ordered_at)   AS 분기
FROM orders;

-- 날짜 형식 변환
SELECT
    DATE_FORMAT(ordered_at, '%Y년 %m월 %d일') AS 한국형식,
    DATE_FORMAT(ordered_at, '%H:%i:%s')       AS 시간형식,
    DATE_FORMAT(ordered_at, '%Y-%m-%d %p %h:%i') AS 12시간
FROM orders;

-- 날짜 계산
SELECT
    ordered_at,
    DATE_ADD(ordered_at, INTERVAL 30 DAY)    AS 30일후,
    DATE_ADD(ordered_at, INTERVAL 3 MONTH)   AS 3개월후,
    DATE_SUB(ordered_at, INTERVAL 7 DAY)     AS 7일전,
    DATEDIFF(NOW(), ordered_at)              AS 경과일수
FROM orders;

-- 날짜 범위 조회
SELECT customer, product, ordered_at
FROM orders
WHERE ordered_at BETWEEN '2025-02-01' AND '2025-02-28 23:59:59';

-- 월별 집계
SELECT
    DATE_FORMAT(ordered_at, '%Y-%m') AS 월,
    COUNT(*)                          AS 주문수,
    SUM(amount)                       AS 매출합계
FROM orders
GROUP BY DATE_FORMAT(ordered_at, '%Y-%m')
ORDER BY 월;

-- 요일별 분석
SELECT
    DAYNAME(ordered_at) AS 요일,
    COUNT(*) AS 주문수
FROM orders
GROUP BY DAYOFWEEK(ordered_at), DAYNAME(ordered_at)
ORDER BY DAYOFWEEK(ordered_at);
