-- [410] 서브쿼리 - Subqueries
-- 레벨: 2 | 쿼리 안에 또 다른 쿼리를 중첩하는 서브쿼리를 배웁니다

CREATE TEMPORARY TABLE dept (
    dept_id   INT PRIMARY KEY,
    dept_name VARCHAR(30),
    location  VARCHAR(30)
);

CREATE TEMPORARY TABLE emp (
    emp_id    INT AUTO_INCREMENT PRIMARY KEY,
    name      VARCHAR(20),
    dept_id   INT,
    salary    INT,
    hire_year INT
);

INSERT INTO dept VALUES
(1, '개발팀', '서울'), (2, '마케팅', '부산'),
(3, '인사팀', '서울'), (4, '영업팀', '인천');

INSERT INTO emp (name, dept_id, salary, hire_year) VALUES
('김철수', 1, 5000000, 2020), ('이영희', 2, 3800000, 2021),
('박민수', 1, 6200000, 2019), ('최지영', 3, 3500000, 2022),
('정호준', 1, 4800000, 2020), ('한소희', 2, 4100000, 2021),
('오대환', 1, 7000000, 2018), ('신유진', 4, 4500000, 2021),
('강동원', 2, 3900000, 2023), ('박서준', 3, 4200000, 2020);

-- WHERE 서브쿼리: 스칼라 (단일 값)
-- 전체 평균 이상 받는 직원
SELECT name, salary
FROM emp
WHERE salary > (SELECT AVG(salary) FROM emp);

-- WHERE 서브쿼리: IN (여러 값)
-- 서울에 위치한 부서의 직원
SELECT name
FROM emp
WHERE dept_id IN (SELECT dept_id FROM dept WHERE location = '서울');

-- EXISTS: 관련 데이터 존재 여부
SELECT dept_name
FROM dept d
WHERE EXISTS (
    SELECT 1 FROM emp e WHERE e.dept_id = d.dept_id AND e.salary >= 5000000
);

-- FROM 서브쿼리 (인라인 뷰)
-- 부서별 평균 급여와 비교
SELECT
    e.name,
    e.salary,
    dept_avg.avg_salary AS 부서평균,
    e.salary - dept_avg.avg_salary AS 차이
FROM emp e
JOIN (
    SELECT dept_id, ROUND(AVG(salary), 0) AS avg_salary
    FROM emp
    GROUP BY dept_id
) AS dept_avg ON e.dept_id = dept_avg.dept_id
ORDER BY 차이 DESC;

-- SELECT 서브쿼리 (상관 서브쿼리)
SELECT
    name,
    salary,
    (SELECT dept_name FROM dept WHERE dept_id = e.dept_id) AS 부서명,
    (SELECT COUNT(*) FROM emp e2 WHERE e2.dept_id = e.dept_id) AS 부서인원
FROM emp e;

-- TOP N 조회
SELECT name, salary
FROM emp
WHERE salary IN (
    SELECT DISTINCT salary FROM emp ORDER BY salary DESC LIMIT 3
);
