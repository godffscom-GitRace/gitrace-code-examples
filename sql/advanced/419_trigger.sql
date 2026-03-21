-- [419] 트리거 - Triggers
-- 레벨: 4 | INSERT/UPDATE/DELETE 시 자동 실행되는 트리거를 만듭니다

CREATE TABLE IF NOT EXISTS products_tg (
    prod_id   INT AUTO_INCREMENT PRIMARY KEY,
    name      VARCHAR(50),
    price     INT NOT NULL,
    stock     INT NOT NULL DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stock_log (
    log_id     INT AUTO_INCREMENT PRIMARY KEY,
    prod_id    INT,
    action     VARCHAR(20),
    old_stock  INT,
    new_stock  INT,
    changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    memo       VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS price_history (
    hist_id    INT AUTO_INCREMENT PRIMARY KEY,
    prod_id    INT,
    old_price  INT,
    new_price  INT,
    changed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products_tg (name, price, stock) VALUES
('노트북', 1200000, 10), ('마우스', 45000, 100), ('키보드', 120000, 50);

-- ===== BEFORE 트리거: 유효성 검사 =====
DROP TRIGGER IF EXISTS before_stock_update;

DELIMITER $$
CREATE TRIGGER before_stock_update
BEFORE UPDATE ON products_tg
FOR EACH ROW
BEGIN
    -- 재고는 음수 불가
    IF NEW.stock < 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = '재고는 0 이상이어야 합니다';
    END IF;

    -- 가격은 0보다 커야
    IF NEW.price <= 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = '가격은 0보다 커야 합니다';
    END IF;
END$$

-- ===== AFTER 트리거: 로그 기록 =====
DROP TRIGGER IF EXISTS after_stock_update;

CREATE TRIGGER after_stock_update
AFTER UPDATE ON products_tg
FOR EACH ROW
BEGIN
    -- 재고 변경 시 로그
    IF OLD.stock != NEW.stock THEN
        INSERT INTO stock_log (prod_id, action, old_stock, new_stock, memo)
        VALUES (NEW.prod_id,
                IF(NEW.stock > OLD.stock, '입고', '출고'),
                OLD.stock, NEW.stock,
                CONCAT(ABS(NEW.stock - OLD.stock), '개 ', IF(NEW.stock > OLD.stock, '입고', '출고')));
    END IF;

    -- 가격 변경 시 이력
    IF OLD.price != NEW.price THEN
        INSERT INTO price_history (prod_id, old_price, new_price)
        VALUES (NEW.prod_id, OLD.price, NEW.price);
    END IF;
END$$

-- INSERT 트리거: 초기 재고 로그
DROP TRIGGER IF EXISTS after_product_insert;

CREATE TRIGGER after_product_insert
AFTER INSERT ON products_tg
FOR EACH ROW
BEGIN
    INSERT INTO stock_log (prod_id, action, old_stock, new_stock, memo)
    VALUES (NEW.prod_id, '신규등록', 0, NEW.stock, '초기 재고');
END$$

DELIMITER ;

-- ===== 트리거 테스트 =====
-- 재고 변경
UPDATE products_tg SET stock = 8  WHERE prod_id = 1;  -- 출고
UPDATE products_tg SET stock = 15 WHERE prod_id = 1;  -- 입고
UPDATE products_tg SET price = 1100000 WHERE prod_id = 1;  -- 가격 인하

-- 유효성 검사 트리거 테스트
-- UPDATE products_tg SET stock = -1 WHERE prod_id = 1;  -- 오류 발생

-- 로그 확인
SELECT * FROM stock_log;
SELECT * FROM price_history;
SHOW TRIGGERS;

DROP TABLE IF EXISTS price_history;
DROP TABLE IF EXISTS stock_log;
DROP TABLE IF EXISTS products_tg;
