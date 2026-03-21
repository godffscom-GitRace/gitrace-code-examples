-- [412] UNION과 집합 연산 - UNION & Set Operations
-- 레벨: 2 | UNION, UNION ALL, INTERSECT, EXCEPT로 결과를 합치는 방법을 배웁니다

CREATE TEMPORARY TABLE online_members (
    id    INT, name VARCHAR(20), email VARCHAR(50), city VARCHAR(20)
);
CREATE TEMPORARY TABLE offline_members (
    id    INT, name VARCHAR(20), email VARCHAR(50), city VARCHAR(20)
);

INSERT INTO online_members VALUES
(1, '김철수', 'kim@example.com',  '서울'),
(2, '이영희', 'lee@example.com',  '부산'),
(3, '박민수', 'park@example.com', '서울'),
(4, '최지영', 'choi@example.com', '인천');

INSERT INTO offline_members VALUES
(3, '박민수', 'park@example.com', '서울'),
(4, '최지영', 'choi@example.com', '인천'),
(5, '정호준', 'jung@example.com', '서울'),
(6, '한소희', 'han@example.com',  '부산');

-- UNION: 두 결과 합치기 (중복 제거)
SELECT name, email, '온라인' AS 유형 FROM online_members
UNION
SELECT name, email, '오프라인' AS 유형 FROM offline_members;

-- UNION ALL: 중복 포함
SELECT name, '온라인' FROM online_members
UNION ALL
SELECT name, '오프라인' FROM offline_members;

-- UNION으로 교집합 구현 (MySQL INTERSECT 대안)
-- 온라인+오프라인 모두 가입한 회원
SELECT name, email FROM online_members
WHERE email IN (SELECT email FROM offline_members);

-- UNION으로 차집합 구현 (MySQL EXCEPT 대안)
-- 온라인에만 가입한 회원
SELECT name, email FROM online_members
WHERE email NOT IN (SELECT email FROM offline_members);

-- 도시별 통합 집계
SELECT city, COUNT(*) AS 회원수, '온라인' AS 채널 FROM online_members  GROUP BY city
UNION ALL
SELECT city, COUNT(*) AS 회원수, '오프라인' AS 채널 FROM offline_members GROUP BY city
ORDER BY city, 채널;

-- 월별 데이터 합치기 예시
CREATE TEMPORARY TABLE jan_sales (product VARCHAR(20), amount INT);
CREATE TEMPORARY TABLE feb_sales (product VARCHAR(20), amount INT);

INSERT INTO jan_sales VALUES ('노트북', 1200000), ('마우스', 45000), ('키보드', 120000);
INSERT INTO feb_sales VALUES ('노트북', 900000),  ('모니터', 450000), ('마우스', 90000);

-- 전체 기간 상품별 합계
SELECT product, SUM(amount) AS 총매출
FROM (
    SELECT product, amount FROM jan_sales
    UNION ALL
    SELECT product, amount FROM feb_sales
) AS all_sales
GROUP BY product
ORDER BY 총매출 DESC;
