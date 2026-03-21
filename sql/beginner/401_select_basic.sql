-- [401] SELECT 기본 - Basic SELECT
-- 레벨: 1 | 테이블에서 데이터를 조회하는 가장 기본적인 방법을 배웁니다

-- 실습용 테이블 및 데이터 생성
CREATE TEMPORARY TABLE students (
    id    INT AUTO_INCREMENT PRIMARY KEY,
    name  VARCHAR(20),
    age   INT,
    score INT,
    city  VARCHAR(20)
);

INSERT INTO students (name, age, score, city) VALUES
('김철수', 20, 88, '서울'),
('이영희', 22, 95, '부산'),
('박민수', 21, 72, '서울'),
('최지영', 23, 91, '인천'),
('정호준', 20, 65, '서울'),
('한소희', 22, 83, '부산'),
('오대환', 21, 77, '대구');

-- 모든 컬럼 조회 (*은 전체)
SELECT * FROM students;

-- 특정 컬럼만 조회
SELECT name, score FROM students;

-- 컬럼 별칭 (AS)
SELECT
    name  AS 이름,
    age   AS 나이,
    score AS 점수
FROM students;

-- 계산식 사용
SELECT
    name,
    score,
    score * 0.1 AS 가산점,
    score + (score * 0.1) AS 최종점수
FROM students;

-- DISTINCT: 중복 제거
SELECT DISTINCT city FROM students;

-- LIMIT: 행 수 제한
SELECT * FROM students LIMIT 3;

-- LIMIT offset, count: 페이징
SELECT * FROM students LIMIT 2, 3;  -- 3번째 행부터 3개
