// [305] 조건문과 반복문 - Control Flow
// 레벨: 1 | if/switch/for/while/foreach를 배웁니다

<?php
// if-elseif-else
$score = 85;
echo "=== 조건문 ===\n";
if ($score >= 90) {
    echo "A학점\n";
} elseif ($score >= 80) {
    echo "B학점\n";
} elseif ($score >= 70) {
    echo "C학점\n";
} else {
    echo "F학점\n";
}

// 삼항 연산자
$result = ($score >= 60) ? "합격" : "불합격";
echo "결과: $result\n";

// Null 병합 연산자 (??)
$username = $_GET['name'] ?? "게스트";
echo "사용자: $username\n";

// match 표현식 (PHP 8.0+)
$grade = match(true) {
    $score >= 90 => 'A',
    $score >= 80 => 'B',
    $score >= 70 => 'C',
    default      => 'F'
};
echo "학점(match): $grade\n";

// switch
echo "\n=== switch ===\n";
$day = 3;
switch ($day) {
    case 1: echo "월요일\n"; break;
    case 2: echo "화요일\n"; break;
    case 3: echo "수요일\n"; break;
    case 4: echo "목요일\n"; break;
    case 5: echo "금요일\n"; break;
    default: echo "주말\n";
}

// for 반복문
echo "\n=== for ===\n";
for ($i = 1; $i <= 5; $i++) {
    echo "$i ";
}
echo "\n";

// while
echo "\n=== while ===\n";
$n = 1;
while ($n <= 32) {
    echo "$n ";
    $n *= 2;
}
echo "\n";

// foreach (배열 순회)
echo "\n=== foreach ===\n";
$langs = ["PHP", "Python", "JavaScript", "Java"];
foreach ($langs as $idx => $lang) {
    echo "$idx: $lang\n";
}

// 연관 배열 foreach
$person = ["이름" => "이영희", "나이" => 22, "직업" => "개발자"];
foreach ($person as $key => $val) {
    echo "$key: $val\n";
}

// break / continue
echo "\n=== break / continue ===\n";
for ($i = 1; $i <= 10; $i++) {
    if ($i % 2 === 0) continue;  // 짝수 건너뜀
    if ($i > 7) break;           // 7 초과 중단
    echo "$i ";
}
echo "\n";
