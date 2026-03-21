-- [418] 저장 프로시저와 함수 - Stored Procedure & Function
-- 레벨: 4 | 서버에 저장되어 재사용하는 프로시저와 함수를 만듭니다

DROP PROCEDURE IF EXISTS GetCustomerSummary;
DROP PROCEDURE IF EXISTS TransferBalance;
DROP FUNCTION  IF EXISTS CalcGrade;

-- ===== 사용자 정의 함수 =====
DELIMITER $$

CREATE FUNCTION CalcGrade(score INT)
RETURNS VARCHAR(2)
DETERMINISTIC
BEGIN
    RETURN CASE
        WHEN score >= 90 THEN 'A'
        WHEN score >= 80 THEN 'B'
        WHEN score >= 70 THEN 'C'
        WHEN score >= 60 THEN 'D'
        ELSE 'F'
    END;
END$$

-- ===== 기본 프로시저 =====
CREATE PROCEDURE GetCustomerSummary(IN p_min_amount INT)
BEGIN
    SELECT
        cust_name          AS 고객명,
        COUNT(*)           AS 주문수,
        SUM(amount)        AS 총구매액,
        MAX(amount)        AS 최대주문,
        CalcGrade(SUM(amount) / COUNT(*) / 10000) AS 등급
    FROM (
        SELECT '김철수' AS cust_name, 1200000 AS amount UNION ALL
        SELECT '김철수', 45000 UNION ALL
        SELECT '이영희', 380000 UNION ALL
        SELECT '박민수', 650000 UNION ALL
        SELECT '박민수', 120000
    ) AS t
    GROUP BY cust_name
    HAVING SUM(amount) >= p_min_amount
    ORDER BY 총구매액 DESC;
END$$

-- ===== OUT 매개변수 =====
CREATE PROCEDURE TransferBalance(
    IN  p_from    INT,
    IN  p_to      INT,
    IN  p_amount  INT,
    OUT p_result  VARCHAR(100)
)
BEGIN
    DECLARE v_balance INT;

    -- 잔액 확인
    SELECT balance INTO v_balance
    FROM accounts_sp
    WHERE account_id = p_from;

    IF v_balance IS NULL THEN
        SET p_result = 'ERROR: 계좌 없음';
    ELSEIF v_balance < p_amount THEN
        SET p_result = CONCAT('ERROR: 잔액 부족 (현재: ', v_balance, ')');
    ELSE
        START TRANSACTION;
        UPDATE accounts_sp SET balance = balance - p_amount WHERE account_id = p_from;
        UPDATE accounts_sp SET balance = balance + p_amount WHERE account_id = p_to;
        COMMIT;
        SET p_result = CONCAT('SUCCESS: ', p_amount, '원 이체 완료');
    END IF;
END$$

DELIMITER ;

-- ===== 실행 =====
-- 함수 사용
SELECT CalcGrade(95), CalcGrade(82), CalcGrade(55);

-- 프로시저 호출
CALL GetCustomerSummary(500000);

-- OUT 매개변수 프로시저
CREATE TEMPORARY TABLE accounts_sp (
    account_id INT PRIMARY KEY, balance INT
);
INSERT INTO accounts_sp VALUES (1, 1000000), (2, 500000);

CALL TransferBalance(1, 2, 300000, @result);
SELECT @result AS 결과;

CALL TransferBalance(2, 1, 9999999, @result);
SELECT @result AS 결과;

-- 프로시저 목록
SHOW PROCEDURE STATUS WHERE Db = DATABASE();

-- 삭제
DROP PROCEDURE IF EXISTS GetCustomerSummary;
DROP PROCEDURE IF EXISTS TransferBalance;
DROP FUNCTION  IF EXISTS CalcGrade;
