-- [405] INSERT / UPDATE / DELETE - 데이터 조작
-- 레벨: 1 | 데이터를 추가, 수정, 삭제하는 DML 문을 배웁니다

CREATE TEMPORARY TABLE members (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    username   VARCHAR(30) UNIQUE,
    email      VARCHAR(100),
    point      INT DEFAULT 0,
    grade      VARCHAR(10) DEFAULT 'BRONZE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ===== INSERT =====
-- 단건 삽입 (컬럼 명시)
INSERT INTO members (username, email) VALUES ('kim_cs', 'kim@example.com');

-- 여러 건 한 번에
INSERT INTO members (username, email, point) VALUES
('lee_yh', 'lee@example.com',  500),
('park_ms', 'park@example.com', 1200),
('choi_jy', 'choi@example.com', 3000),
('jung_hj', 'jung@example.com', 750);

-- INSERT IGNORE: 중복 오류 무시
INSERT IGNORE INTO members (username, email) VALUES ('kim_cs', 'dup@example.com');

-- ON DUPLICATE KEY UPDATE: 중복 시 업데이트
INSERT INTO members (username, email, point)
VALUES ('park_ms', 'park@example.com', 500)
ON DUPLICATE KEY UPDATE point = point + 500;

SELECT * FROM members;

-- ===== UPDATE =====
-- 단건 수정
UPDATE members SET point = 2000 WHERE username = 'kim_cs';

-- 조건부 수정
UPDATE members SET grade = 'SILVER' WHERE point >= 500;
UPDATE members SET grade = 'GOLD'   WHERE point >= 1000;
UPDATE members SET grade = 'PLATINUM' WHERE point >= 2000;

-- 여러 컬럼 동시 수정
UPDATE members
SET point = point + 100, grade = 'GOLD'
WHERE username = 'lee_yh';

SELECT username, point, grade FROM members ORDER BY point DESC;

-- ===== DELETE =====
-- 조건부 삭제
DELETE FROM members WHERE point < 100;

-- 전체 삭제 (TRUNCATE가 더 빠름, AUTO_INCREMENT 초기화)
-- DELETE FROM members;
-- TRUNCATE TABLE members;

SELECT COUNT(*) AS 남은회원수 FROM members;
