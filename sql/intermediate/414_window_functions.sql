-- [414] 윈도우 함수 - Window Functions
-- 레벨: 3 | ROW_NUMBER, RANK, LAG, LEAD 등 분석 함수를 배웁니다

CREATE TEMPORARY TABLE sales_data (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    seller     VARCHAR(20),
    department VARCHAR(20),
    amount     INT,
    sale_date  DATE
);

INSERT INTO sales_data (seller, department, amount, sale_date) VALUES
('김철수','개발팀',5200000,'2025-01-05'),('이영희','마케팅',3800000,'2025-01-07'),
('박민수','개발팀',6100000,'2025-01-10'),('최지영','마케팅',4500000,'2025-01-12'),
('정호준','개발팀',4800000,'2025-01-15'),('한소희','영업팀',5500000,'2025-01-18'),
('오대환','개발팀',7200000,'2025-01-20'),('신유진','마케팅',3200000,'2025-01-22'),
('강동원','영업팀',6800000,'2025-01-25'),('박서준','영업팀',5100000,'2025-01-28');

-- ROW_NUMBER(): 순번 부여 (중복 없음)
SELECT
    seller, department, amount,
    ROW_NUMBER() OVER (ORDER BY amount DESC) AS 전체순위
FROM sales_data;

-- RANK(): 순위 (동점 시 같은 순위, 다음 순위 건너뜀)
-- DENSE_RANK(): 순위 (동점 시 같은 순위, 연속 순위)
SELECT
    seller, amount,
    RANK()       OVER (ORDER BY amount DESC) AS RANK순위,
    DENSE_RANK() OVER (ORDER BY amount DESC) AS DENSE_RANK순위
FROM sales_data;

-- PARTITION BY: 부서별 순위
SELECT
    seller, department, amount,
    RANK() OVER (PARTITION BY department ORDER BY amount DESC) AS 부서내순위
FROM sales_data
ORDER BY department, 부서내순위;

-- SUM/AVG OVER: 누적 합계, 이동 평균
SELECT
    seller, amount, sale_date,
    SUM(amount) OVER (ORDER BY sale_date) AS 누적매출,
    AVG(amount) OVER (ORDER BY sale_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS 이동평균3
FROM sales_data;

-- LAG/LEAD: 이전/다음 행 참조
SELECT
    seller, amount, sale_date,
    LAG(amount)  OVER (ORDER BY sale_date) AS 이전매출,
    LEAD(amount) OVER (ORDER BY sale_date) AS 다음매출,
    amount - LAG(amount) OVER (ORDER BY sale_date) AS 증감액
FROM sales_data;

-- NTILE: N등분
SELECT
    seller, amount,
    NTILE(4) OVER (ORDER BY amount DESC) AS 사분위
FROM sales_data;

-- FIRST_VALUE / LAST_VALUE
SELECT
    seller, department, amount,
    FIRST_VALUE(seller) OVER (PARTITION BY department ORDER BY amount DESC) AS 부서최고실적자,
    MAX(amount) OVER (PARTITION BY department) AS 부서최고액
FROM sales_data;
