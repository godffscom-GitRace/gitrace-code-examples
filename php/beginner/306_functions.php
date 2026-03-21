// [306] 함수 - Functions
// 레벨: 1 | PHP 함수 정의, 기본값, 가변 인수, 화살표 함수를 배웁니다

<?php
// 기본 함수
function greet(string $name): string {
    return "안녕하세요, {$name}님!";
}
echo greet("김철수") . "\n";

// 기본값 매개변수
function introduce(string $name, int $age = 20, string $job = "학생"): void {
    echo "{$name}({$age}세, {$job})\n";
}
introduce("이영희");
introduce("박민수", 28, "개발자");

// 타입 힌트와 반환 타입
function divide(float $a, float $b): float|string {
    if ($b == 0) return "0으로 나눌 수 없음";
    return $a / $b;
}
echo divide(10, 3) . "\n";
echo divide(10, 0) . "\n";

// 가변 인수 (...$args)
function sum(int ...$nums): int {
    return array_sum($nums);
}
echo "합계: " . sum(1, 2, 3, 4, 5) . "\n";

// 참조 전달 (&)
function increment(int &$val): void {
    $val++;
}
$count = 5;
increment($count);
echo "증가 후: $count\n";  // 6

// 익명 함수 (클로저)
$double = function(int $n): int { return $n * 2; };
echo "double(7): " . $double(7) . "\n";

// 화살표 함수 (PHP 7.4+)
$multiply = fn($x, $y) => $x * $y;
echo "multiply(3, 4): " . $multiply(3, 4) . "\n";

// 클로저로 외부 변수 캡처 (use)
$base = 100;
$addBase = function(int $n) use ($base): int {
    return $n + $base;
};
echo "addBase(50): " . $addBase(50) . "\n";

// 재귀 함수
function factorial(int $n): int {
    if ($n <= 1) return 1;
    return $n * factorial($n - 1);
}
for ($i = 1; $i <= 6; $i++) {
    echo "{$i}! = " . factorial($i) . "\n";
}

// 함수를 변수로 사용
$operations = [
    'add' => fn($a, $b) => $a + $b,
    'sub' => fn($a, $b) => $a - $b,
    'mul' => fn($a, $b) => $a * $b,
];
foreach ($operations as $name => $op) {
    echo "$name(10, 3) = " . $op(10, 3) . "\n";
}
