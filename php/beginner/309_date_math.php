// [309] 날짜/시간과 수학 함수 - Date, Time & Math
// 레벨: 2 | PHP의 날짜 처리와 수학 함수를 배웁니다

<?php
// ===== 날짜와 시간 =====
echo "=== 날짜/시간 ===\n";

// 현재 시간 (Unix 타임스탬프)
$now = time();
echo "타임스탬프: $now\n";

// 형식화
echo "현재 날짜: " . date('Y-m-d') . "\n";
echo "현재 시간: " . date('H:i:s') . "\n";
echo "요일: " . date('l') . "\n";
echo "한국 형식: " . date('Y년 m월 d일 H시 i분') . "\n";

// 특정 날짜 만들기
$birthday = mktime(0, 0, 0, 3, 15, 1999);
echo "\n생일: " . date('Y-m-d', $birthday) . "\n";

// 날짜 계산 (DateTime 클래스)
$today = new DateTime();
$birth = new DateTime('1999-03-15');
$diff  = $today->diff($birth);
echo "나이: " . $diff->y . "세\n";

// 날짜 포맷 변환
$dateStr = '2025-12-25';
$xmas = DateTime::createFromFormat('Y-m-d', $dateStr);
echo "크리스마스: " . $xmas->format('Y년 m월 d일') . "\n";

// 날짜 더하기/빼기
$future = new DateTime();
$future->modify('+30 days');
echo "30일 후: " . $future->format('Y-m-d') . "\n";

// ===== 수학 함수 =====
echo "\n=== 수학 함수 ===\n";
echo "abs(-5) = " . abs(-5) . "\n";
echo "ceil(4.1) = " . ceil(4.1) . "\n";
echo "floor(4.9) = " . floor(4.9) . "\n";
echo "round(4.567, 2) = " . round(4.567, 2) . "\n";
echo "pow(2, 10) = " . pow(2, 10) . "\n";
echo "sqrt(144) = " . sqrt(144) . "\n";
echo "max(3,7,2,9,1) = " . max(3, 7, 2, 9, 1) . "\n";
echo "min(3,7,2,9,1) = " . min(3, 7, 2, 9, 1) . "\n";

// 난수
echo "\n=== 난수 ===\n";
echo "rand(1,100): " . rand(1, 100) . "\n";
$arr = range(1, 10);
shuffle($arr);
echo "셔플: " . implode(", ", $arr) . "\n";

// 숫자 형식
echo "\n=== 숫자 형식 ===\n";
$price = 1234567.89;
echo "가격: " . number_format($price, 0, '.', ',') . "원\n";
echo "퍼센트: " . number_format(0.8567 * 100, 1) . "%\n";
