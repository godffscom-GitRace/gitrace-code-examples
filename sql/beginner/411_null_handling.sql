-- [411] NULL 처리 - NULL Handling
-- 레벨: 2 | SQL에서 NULL의 특성과 처리 방법을 배웁니다

CREATE TEMPORARY TABLE survey (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    name      VARCHAR(20),
    age       INT,
    city      VARCHAR(30),
    score     INT,
    comment   TEXT
);

INSERT INTO survey (name, age, city, score, comment) VALUES
('김철수', 25, '서울',   88, '좋아요'),
('이영희', NULL, '부산', 95, NULL),
('박민수', 30, NULL,     NULL, '보통입니다'),
('최지영', 22, '인천',   91, '매우 좋음'),
('정호준', NULL, NULL,   NULL, NULL),
('한소희', 28, '서울',   83, '');

-- NULL 조회: IS NULL / IS NOT NULL
SELECT * FROM survey WHERE age IS NULL;
SELECT * FROM survey WHERE comment IS NOT NULL;

-- COALESCE: 첫 번째 NULL이 아닌 값 반환
SELECT
    name,
    COALESCE(age, 0) AS 나이,
    COALESCE(city, '미등록') AS 도시,
    COALESCE(score, 0) AS 점수,
    COALESCE(comment, '(의견없음)') AS 의견
FROM survey;

-- IFNULL: MySQL 전용 (값이 NULL이면 대체)
SELECT
    name,
    IFNULL(score, 0) AS 점수,
    IFNULL(city, '미입력') AS 도시
FROM survey;

-- NULLIF: 두 값이 같으면 NULL 반환 (0 나눔 방지)
SELECT
    name,
    score,
    NULLIF(score, 0) AS 점수_0제외  -- score가 0이면 NULL
FROM survey;

-- NULL과 집계 함수 (NULL은 무시됨)
SELECT
    COUNT(*)     AS 전체행,
    COUNT(age)   AS 나이입력수,    -- NULL 제외
    COUNT(score) AS 점수입력수,
    AVG(score)   AS 점수평균,      -- NULL 제외하고 계산
    SUM(score)   AS 점수합계
FROM survey;

-- NULL 포함 평균 (NULL을 0으로 처리)
SELECT
    AVG(COALESCE(score, 0)) AS NULL포함평균
FROM survey;

-- NULL 정렬 (기본: 오름차순 시 NULL 먼저)
SELECT name, score FROM survey ORDER BY score;           -- NULL 먼저
SELECT name, score FROM survey ORDER BY score DESC;      -- NULL 마지막
SELECT name, score FROM survey ORDER BY score IS NULL, score;  -- NULL 뒤로

-- CASE로 빈 문자열과 NULL 통합 처리
SELECT
    name,
    CASE
        WHEN comment IS NULL OR comment = '' THEN '(없음)'
        ELSE comment
    END AS 의견
FROM survey;
