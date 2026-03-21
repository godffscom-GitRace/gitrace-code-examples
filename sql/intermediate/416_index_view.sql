-- [416] 인덱스와 뷰 - Index & View
-- 레벨: 3 | 조회 성능을 높이는 인덱스와 가상 테이블인 뷰를 배웁니다

CREATE TABLE IF NOT EXISTS orders_iv (
    order_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    cust_id    INT NOT NULL,
    cust_name  VARCHAR(30),
    product    VARCHAR(50),
    category   VARCHAR(20),
    amount     INT,
    status     VARCHAR(20),
    ordered_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO orders_iv (cust_id, cust_name, product, category, amount, status) VALUES
(1,'김철수','노트북','전자',1200000,'완료'),
(2,'이영희','마우스','전자',45000,'완료'),
(1,'김철수','키보드','전자',120000,'배송중'),
(3,'박민수','모니터','전자',450000,'완료'),
(2,'이영희','의자','가구',380000,'취소'),
(4,'최지영','책상','가구',650000,'완료'),
(1,'김철수','마우스','전자',45000,'완료'),
(3,'박민수','노트북','전자',1200000,'배송중');

-- ===== 인덱스 =====
-- 단일 컬럼 인덱스
CREATE INDEX idx_cust_id   ON orders_iv(cust_id);
CREATE INDEX idx_status    ON orders_iv(status);
CREATE INDEX idx_ordered   ON orders_iv(ordered_at);

-- 복합 인덱스 (자주 같이 쓰는 컬럼)
CREATE INDEX idx_cust_status ON orders_iv(cust_id, status);

-- UNIQUE 인덱스
-- CREATE UNIQUE INDEX idx_unique_email ON users(email);

-- 인덱스 확인
SHOW INDEX FROM orders_iv;

-- EXPLAIN으로 실행 계획 확인
EXPLAIN SELECT * FROM orders_iv WHERE cust_id = 1;
EXPLAIN SELECT * FROM orders_iv WHERE cust_id = 1 AND status = '완료';

-- 인덱스 삭제
DROP INDEX idx_status ON orders_iv;

-- ===== 뷰 (VIEW) =====
-- 뷰: 자주 쓰는 복잡한 쿼리를 저장한 가상 테이블

-- 완료된 주문만 보는 뷰
CREATE OR REPLACE VIEW completed_orders AS
SELECT
    order_id, cust_name, product, category, amount,
    DATE_FORMAT(ordered_at, '%Y-%m-%d') AS 주문일
FROM orders_iv
WHERE status = '완료';

-- 뷰 사용 (일반 테이블처럼 조회)
SELECT * FROM completed_orders;
SELECT cust_name, SUM(amount) AS 총구매액 FROM completed_orders GROUP BY cust_name;

-- 고객별 통계 뷰
CREATE OR REPLACE VIEW customer_summary AS
SELECT
    cust_id,
    cust_name,
    COUNT(*) AS 총주문수,
    SUM(CASE WHEN status = '완료' THEN 1 ELSE 0 END) AS 완료수,
    SUM(CASE WHEN status = '완료' THEN amount ELSE 0 END) AS 총구매액
FROM orders_iv
GROUP BY cust_id, cust_name;

SELECT * FROM customer_summary ORDER BY 총구매액 DESC;

-- 뷰 목록 확인
SHOW FULL TABLES WHERE Table_type = 'VIEW';

-- 뷰 삭제
DROP VIEW IF EXISTS completed_orders;
DROP VIEW IF EXISTS customer_summary;
DROP TABLE IF EXISTS orders_iv;
