// [318] 제너레이터 - Generators
// 레벨: 4 | yield로 메모리 효율적인 이터레이터를 만듭니다

<?php
// 기본 제너레이터
function numberRange(int $start, int $end, int $step = 1): Generator {
    for ($i = $start; $i <= $end; $i += $step) {
        yield $i;  // 값을 하나씩 반환, 실행 중단 후 대기
    }
}

echo "=== 기본 제너레이터 ===\n";
foreach (numberRange(1, 10) as $n) {
    echo "$n ";
}
echo "\n";

// 짝수만
foreach (numberRange(2, 20, 2) as $n) {
    echo "$n ";
}
echo "\n";

// 키-값 yield
function indexedItems(array $items): Generator {
    foreach ($items as $idx => $item) {
        yield $idx => strtoupper($item);
    }
}

echo "\n=== 키-값 yield ===\n";
foreach (indexedItems(['php', 'python', 'java']) as $k => $v) {
    echo "$k: $v\n";
}

// 무한 수열 (메모리 효율)
function fibonacci(): Generator {
    [$a, $b] = [0, 1];
    while (true) {
        yield $a;
        [$a, $b] = [$b, $a + $b];
    }
}

echo "\n=== 피보나치 (무한 수열) ===\n";
$fib = fibonacci();
for ($i = 0; $i < 10; $i++) {
    echo $fib->current() . " ";
    $fib->next();
}
echo "\n";

// 메모리 비교: 배열 vs 제너레이터
function rangeArray(int $n): array {
    return range(1, $n);
}

function rangeGenerator(int $n): Generator {
    for ($i = 1; $i <= $n; $i++) yield $i;
}

echo "\n=== 메모리 사용량 비교 ===\n";
$n = 100000;

$before = memory_get_usage();
$arr = rangeArray($n);
$sum1 = array_sum($arr);
$arrayMem = memory_get_usage() - $before;

$before = memory_get_usage();
$sum2 = 0;
foreach (rangeGenerator($n) as $val) $sum2 += $val;
$genMem = memory_get_usage() - $before;

echo "배열 합계: $sum1, 메모리: " . number_format($arrayMem) . " bytes\n";
echo "제너레이터 합계: $sum2, 메모리: " . number_format($genMem) . " bytes\n";

// 파이프라인 (제너레이터 체이닝)
function csvReader(string $filename): Generator {
    $lines = ["김철수,88", "이영희,95", "박민수,72"];
    foreach ($lines as $line) yield str_getcsv($line);
}

function filterPassing(Generator $rows): Generator {
    foreach ($rows as $row) {
        if ((int)$row[1] >= 80) yield $row;
    }
}

echo "\n=== 제너레이터 파이프라인 ===\n";
foreach (filterPassing(csvReader('data.csv')) as [$name, $score]) {
    echo "$name: $score점 (합격)\n";
}
