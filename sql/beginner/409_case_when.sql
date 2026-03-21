-- [409] CASE WHEN - 조건 분기
-- 레벨: 2 | CASE WHEN으로 SQL에서 조건부 값을 반환하는 방법을 배웁니다

CREATE TEMPORARY TABLE exam_results (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(20),
    korean   INT,
    english  INT,
    math     INT,
    science  INT
);

INSERT INTO exam_results (name, korean, english, math, science) VALUES
('김철수', 85, 92, 78, 88),
('이영희', 95, 88, 96, 91),
('박민수', 72, 65, 80, 70),
('최지영', 91, 87, 93, 95),
('정호준', 60, 55, 62, 68),
('한소희', 83, 79, 85, 81);

-- 단순 CASE: 값 비교
SELECT
    name,
    CASE DAYOFWEEK(NOW())
        WHEN 1 THEN '일요일'
        WHEN 2 THEN '월요일'
        WHEN 7 THEN '토요일'
        ELSE '평일'
    END AS 오늘요일;

-- 검색 CASE: 조건 비교
SELECT
    name,
    math,
    CASE
        WHEN math >= 90 THEN 'A'
        WHEN math >= 80 THEN 'B'
        WHEN math >= 70 THEN 'C'
        WHEN math >= 60 THEN 'D'
        ELSE 'F'
    END AS 수학학점
FROM exam_results;

-- 총점과 평균, 종합 등급
SELECT
    name,
    korean + english + math + science AS 총점,
    ROUND((korean + english + math + science) / 4.0, 1) AS 평균,
    CASE
        WHEN (korean + english + math + science) / 4.0 >= 90 THEN '우수'
        WHEN (korean + english + math + science) / 4.0 >= 80 THEN '양호'
        WHEN (korean + english + math + science) / 4.0 >= 70 THEN '보통'
        ELSE '노력필요'
    END AS 종합평가
FROM exam_results
ORDER BY 총점 DESC;

-- CASE로 피벗 (행 → 열 변환)
SELECT
    name,
    MAX(CASE WHEN subject = 'korean'  THEN score END) AS 국어,
    MAX(CASE WHEN subject = 'english' THEN score END) AS 영어,
    MAX(CASE WHEN subject = 'math'    THEN score END) AS 수학
FROM (
    SELECT name, 'korean'  AS subject, korean  AS score FROM exam_results UNION ALL
    SELECT name, 'english' AS subject, english AS score FROM exam_results UNION ALL
    SELECT name, 'math'    AS subject, math    AS score FROM exam_results
) AS unpivoted
GROUP BY name;

-- CASE in WHERE / ORDER BY
SELECT name, math
FROM exam_results
ORDER BY
    CASE WHEN math >= 80 THEN 0 ELSE 1 END,  -- 80점 이상 먼저
    math DESC;
