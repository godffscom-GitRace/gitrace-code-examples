// [303] 문자열 처리 - String Functions
// 레벨: 1 | PHP의 풍부한 문자열 함수들을 배웁니다

<?php
$str = "Hello, GitRace!";

// 기본 정보
echo "문자열: $str\n";
echo "길이: " . strlen($str) . "\n";
echo "대문자: " . strtoupper($str) . "\n";
echo "소문자: " . strtolower($str) . "\n";

// 검색
echo "\n=== 검색 ===\n";
echo "위치(strpos): " . strpos($str, "Race") . "\n";  // 8
echo "포함 여부: " . (str_contains($str, "Git") ? "있음" : "없음") . "\n";
echo "시작 확인: " . (str_starts_with($str, "Hello") ? "맞음" : "틀림") . "\n";
echo "끝 확인: " . (str_ends_with($str, "Race!") ? "맞음" : "틀림") . "\n";

// 자르기 / 추출
echo "\n=== 자르기 ===\n";
echo substr($str, 7) . "\n";       // GitRace!
echo substr($str, 7, 7) . "\n";    // GitRace

// 치환
echo "\n=== 치환 ===\n";
echo str_replace("GitRace", "PHP", $str) . "\n";

// 분리 / 합치기
echo "\n=== 분리 / 합치기 ===\n";
$csv = "김철수,이영희,박민수,최지영";
$names = explode(",", $csv);  // 분리
foreach ($names as $name) {
    echo "  - $name\n";
}
echo implode(" | ", $names) . "\n";  // 합치기

// 공백 제거
$messy = "   안녕하세요   ";
echo "trim: '" . trim($messy) . "'\n";

// 반복 / 패딩
echo str_repeat("=-", 10) . "\n";
echo str_pad("100", 6, "0", STR_PAD_LEFT) . "\n";   // 000100

// Heredoc: 여러 줄 문자열
$html = <<<EOT
<div>
    <h1>$str</h1>
    <p>PHP 문자열 예제</p>
</div>
EOT;
echo $html . "\n";

// sprintf: 형식 지정
$formatted = sprintf("이름: %-10s 점수: %03d", "김철수", 95);
echo $formatted . "\n";
