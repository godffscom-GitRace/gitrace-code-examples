-- [413] JOIN - 테이블 조인
-- 레벨: 3 | INNER JOIN, LEFT JOIN, RIGHT JOIN, SELF JOIN을 배웁니다

CREATE TEMPORARY TABLE customers (
    cust_id  INT PRIMARY KEY,
    name     VARCHAR(20),
    grade    VARCHAR(10),
    city     VARCHAR(20)
);

CREATE TEMPORARY TABLE orders_j (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    cust_id  INT,
    product  VARCHAR(30),
    amount   INT,
    status   VARCHAR(20)
);

CREATE TEMPORARY TABLE products_j (
    prod_id  INT PRIMARY KEY,
    name     VARCHAR(30),
    category VARCHAR(20),
    price    INT
);

INSERT INTO customers VALUES
(1,'김철수','GOLD','서울'), (2,'이영희','SILVER','부산'),
(3,'박민수','BRONZE','서울'), (4,'최지영','GOLD','인천'),
(5,'정호준','BRONZE','서울');  -- 주문 없음

INSERT INTO orders_j (cust_id, product, amount, status) VALUES
(1,'노트북',1200000,'완료'), (1,'마우스',45000,'완료'),
(2,'키보드',120000,'배송중'), (3,'모니터',450000,'완료'),
(4,'의자',380000,'취소'), (4,'책상',650000,'완료'),
(99,'가방',50000,'완료');  -- 고객 없음

INSERT INTO products_j VALUES
(1,'노트북','전자',1200000), (2,'마우스','전자',45000),
(3,'키보드','전자',120000), (4,'모니터','전자',450000);

-- INNER JOIN: 두 테이블 모두 존재하는 데이터만
SELECT c.name, o.product, o.amount, o.status
FROM customers c
INNER JOIN orders_j o ON c.cust_id = o.cust_id;

-- LEFT JOIN: 왼쪽(customers) 전체 + 오른쪽 일치하는 것
-- 주문 없는 고객도 포함
SELECT c.name, o.product, o.amount
FROM customers c
LEFT JOIN orders_j o ON c.cust_id = o.cust_id;

-- LEFT JOIN + IS NULL: 주문 없는 고객만
SELECT c.name, c.grade
FROM customers c
LEFT JOIN orders_j o ON c.cust_id = o.cust_id
WHERE o.order_id IS NULL;

-- RIGHT JOIN: 오른쪽(orders) 전체 + 왼쪽 일치하는 것
-- 고객 없는 주문도 포함
SELECT c.name, o.product, o.amount
FROM customers c
RIGHT JOIN orders_j o ON c.cust_id = o.cust_id;

-- 3개 테이블 JOIN
SELECT
    c.name AS 고객명,
    c.grade AS 등급,
    o.product AS 상품,
    o.amount AS 결제금액,
    o.status AS 상태
FROM orders_j o
JOIN customers c ON o.cust_id = c.cust_id
WHERE o.status = '완료'
ORDER BY o.amount DESC;

-- 고객별 주문 통계
SELECT
    c.name,
    c.grade,
    COUNT(o.order_id) AS 주문수,
    COALESCE(SUM(o.amount), 0) AS 총구매액
FROM customers c
LEFT JOIN orders_j o ON c.cust_id = o.cust_id AND o.status = '완료'
GROUP BY c.cust_id, c.name, c.grade
ORDER BY 총구매액 DESC;
