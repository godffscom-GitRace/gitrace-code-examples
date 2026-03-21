// [308] 배열 함수 심화 - Advanced Array Functions
// 레벨: 2 | array_map, array_filter, array_reduce, usort 등을 배웁니다

<?php
$scores = [85, 92, 78, 96, 88, 72, 65, 91];

echo "원본: " . implode(", ", $scores) . "\n";

// array_map: 각 요소에 함수 적용
$doubled = array_map(fn($n) => $n * 2, $scores);
echo "2배: " . implode(", ", $doubled) . "\n";

// array_filter: 조건에 맞는 요소만
$passing = array_filter($scores, fn($n) => $n >= 80);
echo "80점 이상: " . implode(", ", $passing) . "\n";

// array_reduce: 하나의 값으로 축약
$total = array_reduce($scores, fn($carry, $n) => $carry + $n, 0);
$avg = $total / count($scores);
echo "합계: $total, 평균: " . round($avg, 1) . "\n";

// usort: 커스텀 정렬
$students = [
    ["name" => "김철수", "score" => 88],
    ["name" => "이영희", "score" => 95],
    ["name" => "박민수", "score" => 72],
    ["name" => "최지영", "score" => 91],
];

// 점수 내림차순 정렬
usort($students, fn($a, $b) => $b['score'] - $a['score']);

echo "\n=== 점수 순위 ===\n";
foreach ($students as $idx => $s) {
    echo ($idx + 1) . "위: {$s['name']} ({$s['score']}점)\n";
}

// array_column: 특정 컬럼 추출
$names = array_column($students, 'name');
echo "\n이름만: " . implode(", ", $names) . "\n";

// array_combine: 두 배열을 키-값으로 합치기
$keys = ['국어', '영어', '수학'];
$vals = [85, 92, 78];
$subject = array_combine($keys, $vals);
foreach ($subject as $k => $v) echo "$k: $v점\n";

// array_chunk: 배열 분할
$pages = array_chunk(range(1, 10), 3);
echo "\n=== 페이지 분할 ===\n";
foreach ($pages as $page) {
    echo "[" . implode(", ", $page) . "]\n";
}

// array_flip: 키-값 뒤집기
$langCodes = ['Python' => 'PYT', 'PHP' => 'PHP', 'Java' => 'JAV'];
$flipped = array_flip($langCodes);
echo "\n코드로 언어 찾기: " . $flipped['PYT'] . "\n";
