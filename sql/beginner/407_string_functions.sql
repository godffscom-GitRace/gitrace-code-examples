-- [407] 문자열 함수 - String Functions
-- 레벨: 2 | SQL에서 자주 쓰는 문자열 처리 함수들을 배웁니다

CREATE TEMPORARY TABLE contacts (
    id    INT AUTO_INCREMENT PRIMARY KEY,
    name  VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(20),
    addr  VARCHAR(200)
);

INSERT INTO contacts (name, email, phone, addr) VALUES
('  김 철수  ', 'KIM@EXAMPLE.COM', '010-1234-5678', '서울특별시 강남구 테헤란로 123'),
('이영희',     'lee@example.com',  '010-9876-5432', '부산광역시 해운대구 해운대로 456'),
('박  민수',   'PARK@GMAIL.COM',   '010-1111-2222', '인천광역시 연수구 송도대로 789');

-- 공백 제거
SELECT
    TRIM(name) AS 이름,
    LTRIM('  왼쪽공백') AS 왼쪽제거,
    RTRIM('오른쪽공백  ') AS 오른쪽제거
FROM contacts;

-- 대소문자 변환
SELECT
    LOWER(email) AS 소문자이메일,
    UPPER(name)  AS 대문자이름
FROM contacts;

-- 길이
SELECT
    name,
    LENGTH(email)    AS 바이트길이,
    CHAR_LENGTH(email) AS 문자길이
FROM contacts;

-- 위치 검색
SELECT
    email,
    LOCATE('@', email) AS 골뱅이위치,
    INSTR(email, '.com') AS 닷컴위치
FROM contacts;

-- 잘라내기
SELECT
    email,
    SUBSTRING(email, 1, LOCATE('@', email) - 1) AS 아이디,
    SUBSTRING_INDEX(email, '@', -1) AS 도메인
FROM contacts;

-- 치환 / 제거
SELECT
    REPLACE(phone, '-', '') AS 하이픈제거,
    REPLACE(name, ' ', '')  AS 공백제거
FROM contacts;

-- 연결
SELECT
    CONCAT(TRIM(name), ' (', LOWER(email), ')') AS 표시명
FROM contacts;

SELECT
    CONCAT_WS(' | ', TRIM(name), LOWER(email), phone) AS 통합정보
FROM contacts;

-- 패딩 / 반복
SELECT
    LPAD(id, 5, '0') AS 제로패딩ID,  -- 00001
    RPAD(TRIM(name), 10, '.') AS 이름패딩
FROM contacts;

-- 전화번호 마스킹
SELECT
    phone,
    CONCAT(
        SUBSTRING(phone, 1, 3), '-****-',
        SUBSTRING(phone, 9, 4)
    ) AS 마스킹전화번호
FROM contacts;

-- 주소에서 시/도만 추출
SELECT
    SUBSTRING_INDEX(addr, ' ', 1) AS 시도
FROM contacts;
