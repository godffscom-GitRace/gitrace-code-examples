// [304] 배열 - Arrays
// 레벨: 1 | PHP의 인덱스 배열과 연관 배열을 배웁니다

<?php
// 인덱스 배열
$fruits = ["사과", "바나나", "딸기", "포도"];
echo "첫 번째: " . $fruits[0] . "\n";
echo "개수: " . count($fruits) . "\n";

// 배열 추가 / 삭제
$fruits[] = "수박";         // 끝에 추가
array_push($fruits, "체리"); // 끝에 추가
array_unshift($fruits, "망고"); // 앞에 추가
$popped = array_pop($fruits);   // 끝에서 제거
echo "제거됨: $popped\n";

echo "\n=== 현재 배열 ===\n";
print_r($fruits);

// 정렬
sort($fruits);    // 오름차순
echo "\n정렬 후:\n";
foreach ($fruits as $f) echo "  $f\n";

// 연관 배열 (키-값 쌍)
echo "\n=== 연관 배열 ===\n";
$student = [
    "name"   => "김철수",
    "age"    => 20,
    "score"  => 88.5,
    "grade"  => "B"
];

echo "이름: " . $student["name"] . "\n";
echo "점수: " . $student["score"] . "\n";

// 연관 배열 순회
foreach ($student as $key => $value) {
    echo "  $key: $value\n";
}

// 배열 함수
echo "\n=== 배열 함수 ===\n";
$numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];
echo "합계: " . array_sum($numbers) . "\n";
echo "최대: " . max($numbers) . "\n";
echo "최소: " . min($numbers) . "\n";
echo "유일값: ";
print_r(array_unique($numbers));

// 배열 필터링
$evens = array_filter($numbers, fn($n) => $n % 2 === 0);
echo "짝수: " . implode(", ", $evens) . "\n";

// 배열 변환
$doubled = array_map(fn($n) => $n * 2, $numbers);
echo "2배: " . implode(", ", $doubled) . "\n";

// 다차원 배열
echo "\n=== 다차원 배열 ===\n";
$classroom = [
    ["name" => "김철수", "score" => 88],
    ["name" => "이영희", "score" => 95],
    ["name" => "박민수", "score" => 72],
];
foreach ($classroom as $s) {
    echo "{$s['name']}: {$s['score']}점\n";
}
