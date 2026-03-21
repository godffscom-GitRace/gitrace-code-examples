-- [420] 성능 최적화 - Query Performance
-- 레벨: 4 | EXPLAIN, 인덱스 전략, 쿼리 최적화 기법을 배웁니다

CREATE TABLE IF NOT EXISTS big_orders (
    order_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    cust_id    INT NOT NULL,
    cust_name  VARCHAR(30),
    product    VARCHAR(50),
    category   VARCHAR(20),
    amount     INT,
    status     VARCHAR(20),
    region     VARCHAR(20),
    ordered_at DATETIME
);

-- 샘플 데이터 생성 (프로시저로 대량 삽입)
DROP PROCEDURE IF EXISTS gen_data;
DELIMITER $$
CREATE PROCEDURE gen_data()
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE names VARCHAR(200) DEFAULT '김철수,이영희,박민수,최지영,정호준';
    DECLARE statuses VARCHAR(100) DEFAULT '완료,배송중,취소,처리중';
    DECLARE regions VARCHAR(100) DEFAULT '서울,부산,인천,대구,광주';

    WHILE i <= 1000 DO
        INSERT INTO big_orders (cust_id, cust_name, product, category, amount, status, region, ordered_at)
        VALUES (
            FLOOR(RAND() * 100) + 1,
            ELT(FLOOR(RAND() * 5) + 1, '김철수','이영희','박민수','최지영','정호준'),
            CONCAT('상품', FLOOR(RAND() * 50) + 1),
            ELT(FLOOR(RAND() * 3) + 1, '전자','가구','의류'),
            FLOOR(RAND() * 1000000) + 10000,
            ELT(FLOOR(RAND() * 4) + 1, '완료','배송중','취소','처리중'),
            ELT(FLOOR(RAND() * 5) + 1, '서울','부산','인천','대구','광주'),
            DATE_ADD('2025-01-01', INTERVAL FLOOR(RAND() * 90) DAY)
        );
        SET i = i + 1;
    END WHILE;
END$$
DELIMITER ;

CALL gen_data();

-- ===== EXPLAIN으로 실행 계획 분석 =====
-- 인덱스 없는 쿼리 (Full Table Scan)
EXPLAIN SELECT * FROM big_orders WHERE status = '완료';

-- 인덱스 추가
CREATE INDEX idx_status     ON big_orders(status);
CREATE INDEX idx_cust_id    ON big_orders(cust_id);
CREATE INDEX idx_ordered_at ON big_orders(ordered_at);
CREATE INDEX idx_cust_status ON big_orders(cust_id, status);  -- 복합 인덱스

-- 인덱스 사용하는 쿼리
EXPLAIN SELECT * FROM big_orders WHERE status = '완료';
EXPLAIN SELECT * FROM big_orders WHERE cust_id = 1 AND status = '완료';

-- ===== 안티 패턴과 개선 =====
-- 나쁜 예: 함수 적용 시 인덱스 무효
EXPLAIN SELECT * FROM big_orders WHERE YEAR(ordered_at) = 2025;

-- 좋은 예: 범위 조건으로 인덱스 활용
EXPLAIN SELECT * FROM big_orders
WHERE ordered_at >= '2025-01-01' AND ordered_at < '2026-01-01';

-- 나쁜 예: SELECT *
-- SELECT * FROM big_orders WHERE status = '완료';

-- 좋은 예: 필요한 컬럼만
SELECT cust_name, amount, ordered_at
FROM big_orders WHERE status = '완료' LIMIT 10;

-- ===== 효율적인 페이징 =====
-- 나쁜 예: OFFSET이 클수록 느려짐
SELECT * FROM big_orders ORDER BY order_id LIMIT 900, 100;

-- 좋은 예: 커서 기반 페이징
SELECT * FROM big_orders
WHERE order_id > 900
ORDER BY order_id LIMIT 100;

-- 테이블 통계 확인
SHOW TABLE STATUS LIKE 'big_orders';
SELECT COUNT(*) AS 총건수 FROM big_orders;

DROP PROCEDURE IF EXISTS gen_data;
DROP TABLE IF EXISTS big_orders;
