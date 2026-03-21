-- [406] 테이블 생성과 스키마 - CREATE TABLE
-- 레벨: 1 | 자료형, 제약조건, 인덱스로 테이블을 설계하는 방법을 배웁니다

-- ===== 자료형 =====
-- 정수: TINYINT(1), SMALLINT(2), INT(4), BIGINT(8) bytes
-- 실수: FLOAT, DOUBLE, DECIMAL(정밀도 필요 시)
-- 문자: CHAR(고정길이), VARCHAR(가변길이), TEXT, LONGTEXT
-- 날짜: DATE, TIME, DATETIME, TIMESTAMP
-- 기타: BOOLEAN(TINYINT), JSON, ENUM

-- 기본 테이블 생성
CREATE TABLE IF NOT EXISTS users (
    user_id    BIGINT       AUTO_INCREMENT PRIMARY KEY,  -- 기본키
    username   VARCHAR(50)  NOT NULL UNIQUE,             -- 유니크 제약
    email      VARCHAR(100) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    nickname   VARCHAR(30),
    age        TINYINT      UNSIGNED,                    -- 0~255
    gender     ENUM('M','F','X') DEFAULT 'X',
    point      INT          NOT NULL DEFAULT 0,
    is_active  BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
                                     ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME     NULL
);

-- 외래키 참조 테이블
CREATE TABLE IF NOT EXISTS posts (
    post_id    BIGINT       AUTO_INCREMENT PRIMARY KEY,
    user_id    BIGINT       NOT NULL,
    title      VARCHAR(200) NOT NULL,
    content    TEXT,
    view_count INT          NOT NULL DEFAULT 0,
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- 외래키: posts.user_id → users.user_id
    CONSTRAINT fk_post_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE     -- 사용자 삭제 시 게시글도 삭제
        ON UPDATE CASCADE
);

-- 인덱스 추가 (조회 성능 향상)
CREATE INDEX idx_posts_user_id   ON posts(user_id);
CREATE INDEX idx_posts_created   ON posts(created_at);
CREATE INDEX idx_users_email     ON users(email);

-- 복합 인덱스
CREATE INDEX idx_posts_user_date ON posts(user_id, created_at);

-- 테이블 구조 확인
DESCRIBE users;
DESCRIBE posts;

-- 테이블 수정
ALTER TABLE users ADD COLUMN phone VARCHAR(20) AFTER email;
ALTER TABLE users MODIFY COLUMN age SMALLINT UNSIGNED;
ALTER TABLE users DROP COLUMN phone;

-- 테이블 삭제 (순서 중요: 자식 먼저)
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
