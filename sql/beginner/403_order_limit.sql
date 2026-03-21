-- [403] 정렬과 페이징 - ORDER BY & LIMIT
-- 레벨: 1 | 결과를 정렬하고 페이징하는 방법을 배웁니다

CREATE TEMPORARY TABLE products (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(50),
    category VARCHAR(20),
    price    INT,
    stock    INT,
    rating   DECIMAL(3,1)
);

INSERT INTO products (name, category, price, stock, rating) VALUES
('노트북 Pro',   '전자제품', 1500000, 15, 4.8),
('무선 마우스',  '전자제품',   45000, 200, 4.3),
('기계식 키보드','전자제품',  120000,  80, 4.6),
('모니터 27인치','전자제품',  450000,  30, 4.7),
('USB 허브',    '전자제품',   35000, 300, 4.1),
('책상 매트',   '가구',        28000, 150, 4.2),
('의자',        '가구',       380000,  20, 4.9),
('스탠딩 책상', '가구',       650000,  10, 4.5);

-- 오름차순 (ASC, 기본값)
SELECT name, price FROM products ORDER BY price ASC;

-- 내림차순 (DESC)
SELECT name, price FROM products ORDER BY price DESC;

-- 여러 컬럼 정렬
SELECT name, category, price
FROM products
ORDER BY category ASC, price DESC;

-- 별칭으로 정렬
SELECT
    name,
    price,
    stock,
    price * stock AS total_value
FROM products
ORDER BY total_value DESC;

-- LIMIT + ORDER BY (상위 N개)
SELECT name, rating
FROM products
ORDER BY rating DESC
LIMIT 3;

-- 페이징 예시 (1페이지: 0,3 / 2페이지: 3,3 / 3페이지: 6,3)
-- 1페이지 (1~3번째)
SELECT name, price FROM products ORDER BY id LIMIT 0, 3;

-- 2페이지 (4~6번째)
SELECT name, price FROM products ORDER BY id LIMIT 3, 3;

-- FIELD()로 커스텀 정렬
SELECT name, category
FROM products
ORDER BY FIELD(category, '전자제품', '가구');
