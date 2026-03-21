-- [402] WHERE 조건 필터링 - WHERE Clause
-- 레벨: 1 | WHERE로 원하는 조건의 데이터만 가져오는 방법을 배웁니다

CREATE TEMPORARY TABLE employees (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(20),
    department VARCHAR(20),
    salary     INT,
    hire_date  DATE
);

INSERT INTO employees (name, department, salary, hire_date) VALUES
('김철수', '개발팀', 4500000, '2020-03-15'),
('이영희', '마케팅', 3800000, '2021-07-01'),
('박민수', '개발팀', 5200000, '2019-01-10'),
('최지영', '인사팀', 3500000, '2022-05-20'),
('정호준', '개발팀', 4800000, '2020-11-30'),
('한소희', '마케팅', 4100000, '2021-03-08'),
('오대환', '개발팀', 6000000, '2018-06-15');

-- 비교 연산자
SELECT * FROM employees WHERE salary >= 4500000;
SELECT * FROM employees WHERE department = '개발팀';
SELECT * FROM employees WHERE salary != 4500000;

-- AND / OR / NOT
SELECT * FROM employees
WHERE department = '개발팀' AND salary >= 5000000;

SELECT * FROM employees
WHERE department = '마케팅' OR department = '인사팀';

SELECT * FROM employees
WHERE NOT department = '개발팀';

-- BETWEEN: 범위 조건
SELECT name, salary FROM employees
WHERE salary BETWEEN 4000000 AND 5000000;

-- IN: 여러 값 중 하나
SELECT * FROM employees
WHERE department IN ('개발팀', '마케팅');

-- IS NULL / IS NOT NULL
SELECT * FROM employees WHERE hire_date IS NOT NULL;

-- LIKE: 패턴 매칭
-- %: 0개 이상의 임의 문자, _: 정확히 1개 문자
SELECT * FROM employees WHERE name LIKE '김%';     -- 김으로 시작
SELECT * FROM employees WHERE name LIKE '%수';     -- 수로 끝남
SELECT * FROM employees WHERE name LIKE '_영%';   -- 두번째 글자가 영

-- 날짜 조건
SELECT * FROM employees WHERE hire_date >= '2021-01-01';
SELECT * FROM employees WHERE YEAR(hire_date) = 2020;
