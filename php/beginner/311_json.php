// [311] JSON 처리 - JSON Encoding & Decoding
// 레벨: 2 | json_encode와 json_decode로 JSON을 다루는 방법을 배웁니다

<?php
// PHP 배열 → JSON 문자열
echo "=== PHP → JSON ===\n";
$student = [
    "name"    => "김철수",
    "age"     => 20,
    "score"   => 88.5,
    "subjects" => ["수학", "영어", "과학"],
    "address" => ["city" => "서울", "district" => "강남구"],
    "active"  => true
];

$json = json_encode($student, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
echo $json . "\n";

// JSON 문자열 → PHP 배열
echo "\n=== JSON → PHP ===\n";
$jsonStr = '{"name":"이영희","age":22,"scores":[95,88,92],"job":null}';
$data = json_decode($jsonStr, true);  // true: 배열로, false: 객체로

echo "이름: " . $data['name'] . "\n";
echo "나이: " . $data['age'] . "\n";
echo "점수: " . implode(", ", $data['scores']) . "\n";
echo "직업: " . ($data['job'] ?? '없음') . "\n";

// JSON 파일 저장/로드
echo "\n=== JSON 파일 ===\n";
$config = [
    "app_name"    => "GitRace",
    "version"     => "1.0.0",
    "debug"       => false,
    "database"    => ["host" => "localhost", "port" => 3306],
    "allowed_ips" => ["127.0.0.1", "192.168.1.0"]
];

// 저장
file_put_contents('config.json', json_encode($config, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "config.json 저장 완료\n";

// 로드
$loaded = json_decode(file_get_contents('config.json'), true);
echo "앱: " . $loaded['app_name'] . " v" . $loaded['version'] . "\n";
echo "DB 호스트: " . $loaded['database']['host'] . "\n";
echo "허용 IP: " . implode(", ", $loaded['allowed_ips']) . "\n";

// 오류 처리
echo "\n=== JSON 오류 처리 ===\n";
$invalid = '{name: 김철수}';  // 잘못된 JSON
$result = json_decode($invalid, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo "JSON 오류: " . json_last_error_msg() . "\n";
}

unlink('config.json');
