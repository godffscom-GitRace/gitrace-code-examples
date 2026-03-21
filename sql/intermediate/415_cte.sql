-- [415] CTE (WITH) - Common Table Expressions
-- 레벨: 3 | WITH 절로 복잡한 쿼리를 단계별로 분리하는 방법을 배웁니다

CREATE TEMPORARY TABLE employees_cte (
    emp_id    INT PRIMARY KEY,
    name      VARCHAR(20),
    dept      VARCHAR(20),
    salary    INT,
    manager_id INT
);

INSERT INTO employees_cte VALUES
(1,'김철수','개발',7000000, NULL),
(2,'이영희','마케팅',5500000, NULL),
(3,'박민수','개발',5200000, 1),
(4,'최지영','개발',4800000, 1),
(5,'정호준','마케팅',4100000, 2),
(6,'한소희','개발',4500000, 3),
(7,'오대환','마케팅',3900000, 2),
(8,'신유진','개발',4200000, 3);

-- 기본 CTE
WITH dept_stats AS (
    SELECT
        dept,
        COUNT(*) AS 인원수,
        AVG(salary) AS 평균급여,
        MAX(salary) AS 최고급여
    FROM employees_cte
    GROUP BY dept
)
SELECT * FROM dept_stats ORDER BY 평균급여 DESC;

-- 여러 CTE 조합
WITH
dept_avg AS (
    SELECT dept, AVG(salary) AS avg_sal FROM employees_cte GROUP BY dept
),
high_earners AS (
    SELECT e.*, da.avg_sal
    FROM employees_cte e
    JOIN dept_avg da ON e.dept = da.dept
    WHERE e.salary > da.avg_sal
)
SELECT name, dept, salary, ROUND(avg_sal, 0) AS 부서평균
FROM high_earners
ORDER BY salary DESC;

-- 재귀 CTE: 조직도 (상하 관계)
WITH RECURSIVE org_chart AS (
    -- 기저: 최상위 관리자 (manager_id가 NULL)
    SELECT emp_id, name, dept, salary, manager_id, 0 AS level,
           CAST(name AS CHAR(200)) AS path
    FROM employees_cte
    WHERE manager_id IS NULL

    UNION ALL

    -- 재귀: 각 관리자의 부하직원
    SELECT e.emp_id, e.name, e.dept, e.salary, e.manager_id,
           oc.level + 1,
           CONCAT(oc.path, ' > ', e.name)
    FROM employees_cte e
    JOIN org_chart oc ON e.manager_id = oc.emp_id
)
SELECT
    CONCAT(REPEAT('  ', level), name) AS 조직도,
    dept, salary, path
FROM org_chart
ORDER BY path;

-- 재귀 CTE: 피보나치 수열
WITH RECURSIVE fib AS (
    SELECT 1 AS n, 0 AS a, 1 AS b
    UNION ALL
    SELECT n + 1, b, a + b FROM fib WHERE n < 10
)
SELECT n AS 순서, a AS 피보나치 FROM fib;

-- CTE로 페이징 처리
WITH ranked AS (
    SELECT *, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rn
    FROM employees_cte
)
SELECT name, dept, salary, rn AS 순위
FROM ranked
WHERE rn BETWEEN 3 AND 5;  -- 3~5위
