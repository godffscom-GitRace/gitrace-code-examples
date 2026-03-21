-- [417] 트랜잭션 - Transactions
-- 레벨: 3 | COMMIT, ROLLBACK으로 데이터 무결성을 보장하는 방법을 배웁니다

CREATE TABLE IF NOT EXISTS accounts (
    account_id INT PRIMARY KEY,
    owner      VARCHAR(20),
    balance    INT NOT NULL DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_balance CHECK (balance >= 0)
);

CREATE TABLE IF NOT EXISTS transfer_log (
    log_id     INT AUTO_INCREMENT PRIMARY KEY,
    from_id    INT,
    to_id      INT,
    amount     INT,
    status     VARCHAR(20),
    memo       VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO accounts VALUES
(1001, '김철수', 1000000, NOW()),
(1002, '이영희', 500000,  NOW()),
(1003, '박민수', 200000,  NOW());

-- ===== 기본 트랜잭션 =====
-- 자동 커밋 끄기
SET autocommit = 0;

-- 성공 케이스: 김철수 → 이영희로 300,000원 이체
START TRANSACTION;

UPDATE accounts SET balance = balance - 300000 WHERE account_id = 1001;
UPDATE accounts SET balance = balance + 300000 WHERE account_id = 1002;
INSERT INTO transfer_log (from_id, to_id, amount, status, memo)
    VALUES (1001, 1002, 300000, '성공', '생일 선물');

COMMIT;  -- 모든 변경 확정
SELECT * FROM accounts;

-- ===== ROLLBACK =====
START TRANSACTION;

UPDATE accounts SET balance = balance - 100000 WHERE account_id = 1002;
UPDATE accounts SET balance = balance + 100000 WHERE account_id = 1003;

-- 실수 발견! 취소
ROLLBACK;
SELECT * FROM accounts;  -- 변경 전 상태로 복구

-- ===== SAVEPOINT: 부분 롤백 =====
START TRANSACTION;

UPDATE accounts SET balance = balance - 50000 WHERE account_id = 1001;
SAVEPOINT after_deduct;  -- 체크포인트 저장

UPDATE accounts SET balance = balance + 50000 WHERE account_id = 1002;
SAVEPOINT after_credit;

-- 여기서 오류 발생 시뮬레이션
INSERT INTO transfer_log (from_id, to_id, amount, status) VALUES (1001, 1002, 50000, '처리중');

ROLLBACK TO SAVEPOINT after_credit;  -- after_credit 이후만 취소
-- after_deduct ~ after_credit 구간은 유지됨

COMMIT;

-- ===== 격리 수준 확인 =====
SELECT @@transaction_isolation;
-- READ UNCOMMITTED | READ COMMITTED | REPEATABLE READ | SERIALIZABLE

-- 자동 커밋 복구
SET autocommit = 1;

SELECT * FROM accounts;
SELECT * FROM transfer_log;

DROP TABLE IF EXISTS transfer_log;
DROP TABLE IF EXISTS accounts;
