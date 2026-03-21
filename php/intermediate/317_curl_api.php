// [317] cURL과 HTTP 요청 - cURL & HTTP Requests
// 레벨: 3 | cURL로 외부 API를 호출하고 데이터를 처리합니다

<?php
// ===== cURL 기본 래퍼 함수 =====
function httpGet(string $url, array $headers = []): array {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_HTTPHEADER     => $headers,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error    = curl_error($ch);
    curl_close($ch);

    if ($error) throw new RuntimeException("cURL 오류: $error");
    return ['code' => $httpCode, 'body' => $response];
}

function httpPost(string $url, array $data, array $headers = []): array {
    $ch = curl_init();
    $headers[] = 'Content-Type: application/json';
    curl_setopt_array($ch, [
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode($data),
        CURLOPT_HTTPHEADER     => $headers,
        CURLOPT_TIMEOUT        => 10,
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return ['code' => $httpCode, 'body' => $response];
}

// ===== 공개 API 호출 예제 =====
echo "=== GitHub API 호출 예제 ===\n";
echo "(실제 실행 시 네트워크 필요)\n\n";

// 아래 코드는 실제 실행 시 동작하는 패턴
$apiUrl = 'https://api.github.com/users/octocat';

try {
    // $result = httpGet($apiUrl, ['User-Agent: PHP-Example']);
    // $user = json_decode($result['body'], true);
    // echo "이름: " . $user['name'] . "\n";

    // 시뮬레이션
    $mockResponse = [
        'login'       => 'octocat',
        'name'        => 'The Octocat',
        'public_repos'=> 8,
        'followers'   => 12345
    ];
    echo "사용자: " . $mockResponse['name'] . "\n";
    echo "공개 저장소: " . $mockResponse['public_repos'] . "개\n";
    echo "팔로워: " . number_format($mockResponse['followers']) . "명\n";

} catch (RuntimeException $e) {
    echo "오류: " . $e->getMessage() . "\n";
}

// ===== HTTP 상태코드 처리 =====
echo "\n=== HTTP 상태 코드 처리 ===\n";
function handleResponse(int $code, string $body): mixed {
    return match(true) {
        $code === 200 => json_decode($body, true),
        $code === 401 => throw new RuntimeException("인증 오류"),
        $code === 403 => throw new RuntimeException("권한 없음"),
        $code === 404 => throw new RuntimeException("리소스 없음"),
        $code >= 500  => throw new RuntimeException("서버 오류: $code"),
        default       => throw new RuntimeException("알 수 없는 오류: $code")
    };
}

$codes = [200, 401, 404, 500];
foreach ($codes as $code) {
    try {
        $data = handleResponse($code, '{"result":"ok"}');
        echo "HTTP $code: 성공 - " . json_encode($data) . "\n";
    } catch (RuntimeException $e) {
        echo "HTTP $code: " . $e->getMessage() . "\n";
    }
}

// ===== 헤더 설정 예제 =====
echo "\n=== API 인증 헤더 패턴 ===\n";
$authHeaders = [
    'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...',
    'Accept: application/json',
    'X-API-Version: 2025',
];
foreach ($authHeaders as $h) echo "  $h\n";
