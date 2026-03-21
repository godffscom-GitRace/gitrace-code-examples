-- [404] 집계 함수 - Aggregate Functions
-- 레벨: 1 | COUNT, SUM, AVG, MAX, MIN으로 통계를 구합니다

CREATE TEMPORARY TABLE sales (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    product     VARCHAR(30),
    category    VARCHAR(20),
    quantity    INT,
    unit_price  INT,
    sale_date   DATE,
    seller      VARCHAR(20)
);

INSERT INTO sales (product, category, quantity, unit_price, sale_date, seller) VALUES
('노트북',    '전자', 2, 1200000, '2025-01-05', '김철수'),
('마우스',    '전자', 5,   45000, '2025-01-07', '이영희'),
('키보드',    '전자', 3,  120000, '2025-01-10', '김철수'),
('모니터',    '전자', 1,  450000, '2025-01-12', '박민수'),
('책상',      '가구', 2,  380000, '2025-01-15', '이영희'),
('의자',      '가구', 3,  280000, '2025-01-18', '김철수'),
('책상 매트', '가구', 10,  28000, '2025-01-20', '박민수'),
('노트북',    '전자', 1, 1200000, '2025-01-22', '이영희'),
('마우스',    '전자', 8,   45000, '2025-01-25', '김철수');

-- COUNT: 행 수
SELECT COUNT(*) AS 총판매건수 FROM sales;
SELECT COUNT(DISTINCT product) AS 판매상품종류 FROM sales;
SELECT COUNT(DISTINCT seller) AS 판매직원수 FROM sales;

-- SUM: 합계
SELECT SUM(quantity) AS 총판매수량 FROM sales;
SELECT SUM(quantity * unit_price) AS 총매출액 FROM sales;

-- AVG: 평균
SELECT ROUND(AVG(unit_price), 0) AS 평균단가 FROM sales;
SELECT ROUND(AVG(quantity), 1) AS 평균수량 FROM sales;

-- MAX / MIN
SELECT MAX(unit_price) AS 최고단가, MIN(unit_price) AS 최저단가 FROM sales;
SELECT MAX(sale_date) AS 최근판매일, MIN(sale_date) AS 첫판매일 FROM sales;

-- GROUP BY: 그룹별 집계
SELECT
    category,
    COUNT(*) AS 판매건수,
    SUM(quantity) AS 총수량,
    SUM(quantity * unit_price) AS 매출합계,
    ROUND(AVG(unit_price), 0) AS 평균단가
FROM sales
GROUP BY category;

-- 판매직원별 실적
SELECT
    seller AS 판매직원,
    COUNT(*) AS 판매건수,
    SUM(quantity * unit_price) AS 총매출
FROM sales
GROUP BY seller
ORDER BY 총매출 DESC;

-- HAVING: 그룹 조건 (WHERE은 행 조건, HAVING은 그룹 조건)
SELECT seller, SUM(quantity * unit_price) AS 총매출
FROM sales
GROUP BY seller
HAVING 총매출 >= 2000000;
