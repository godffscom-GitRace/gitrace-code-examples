// [310] 파일 입출력 - File I/O
// 레벨: 2 | PHP로 파일을 읽고 쓰는 방법을 배웁니다

<?php
$filename = 'students.txt';

// ===== 파일 쓰기 =====
echo "=== 파일 쓰기 ===\n";

// file_put_contents: 간단한 쓰기
$data = "김철수,88,B\n이영희,95,A\n박민수,72,C\n최지영,91,A\n";
file_put_contents($filename, $data);
echo "파일 생성 완료: $filename\n";

// 추가 쓰기 (FILE_APPEND)
file_put_contents($filename, "정호준,83,B\n", FILE_APPEND);
echo "데이터 추가 완료\n";

// ===== 파일 읽기 =====
echo "\n=== 파일 읽기 ===\n";

// file_get_contents: 전체 읽기
$content = file_get_contents($filename);
echo $content;

// file: 줄 단위 배열로 읽기
echo "=== 줄 단위 처리 ===\n";
$lines = file($filename, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($lines as $idx => $line) {
    [$name, $score, $grade] = explode(',', $line);
    echo ($idx + 1) . ". $name: $score점 ($grade학점)\n";
}

// fopen/fgets: 줄씩 읽기 (대용량 파일)
echo "\n=== fopen 방식 ===\n";
$fp = fopen($filename, 'r');
while (!feof($fp)) {
    $line = fgets($fp);
    if (trim($line)) echo "읽음: " . trim($line) . "\n";
}
fclose($fp);

// 파일 정보
echo "\n=== 파일 정보 ===\n";
echo "파일 크기: " . filesize($filename) . " bytes\n";
echo "마지막 수정: " . date('Y-m-d H:i:s', filemtime($filename)) . "\n";
echo "존재 여부: " . (file_exists($filename) ? '있음' : '없음') . "\n";

// 파일 삭제
unlink($filename);
echo "\n파일 삭제 완료\n";
echo "삭제 후 존재: " . (file_exists($filename) ? '있음' : '없음') . "\n";
