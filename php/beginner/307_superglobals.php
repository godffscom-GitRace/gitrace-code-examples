// [307] 슈퍼글로벌 - Superglobals
// 레벨: 2 | $_GET, $_POST, $_SERVER, $_SESSION 등 전역 변수를 배웁니다

<?php
// $_SERVER: 서버/환경 정보
echo "=== \$_SERVER ===\n";
echo "스크립트: " . ($_SERVER['SCRIPT_NAME'] ?? 'CLI') . "\n";
echo "서버 소프트웨어: " . ($_SERVER['SERVER_SOFTWARE'] ?? 'CLI 환경') . "\n";
echo "요청 메서드: " . ($_SERVER['REQUEST_METHOD'] ?? 'CLI') . "\n";

// $_GET 시뮬레이션 (URL 파라미터)
echo "\n=== \$_GET 시뮬레이션 ===\n";
// 실제 웹: http://example.com/?name=김철수&age=25
$_GET['name'] = '김철수';
$_GET['age']  = '25';

$name = htmlspecialchars($_GET['name'] ?? '');  // XSS 방지
$age  = (int)($_GET['age'] ?? 0);
echo "이름: $name, 나이: $age\n";

// $_POST 시뮬레이션
echo "\n=== \$_POST 시뮬레이션 ===\n";
$_POST['username'] = 'user@example.com';
$_POST['password'] = 'secret123';

$username = filter_var($_POST['username'] ?? '', FILTER_VALIDATE_EMAIL);
if ($username) {
    echo "유효한 이메일: $username\n";
} else {
    echo "유효하지 않은 이메일\n";
}

// filter_input으로 안전하게 입력 처리
echo "\n=== filter 함수 ===\n";
$testInputs = [
    '정수'     => '42abc',
    '이메일'   => 'kim@example.com',
    '유효URL'  => 'https://gitrace.com',
];
foreach ($testInputs as $type => $val) {
    echo "$type '$val': ";
    echo filter_var($val, FILTER_VALIDATE_INT)   !== false ? "정수 OK " : "";
    echo filter_var($val, FILTER_VALIDATE_EMAIL) !== false ? "이메일 OK " : "";
    echo filter_var($val, FILTER_VALIDATE_URL)   !== false ? "URL OK " : "";
    echo "\n";
}

// $_COOKIE 개념 설명
echo "\n=== 쿠키 개념 ===\n";
// setcookie("username", "김철수", time() + 3600);  // 1시간
// echo $_COOKIE['username'];
echo "쿠키는 브라우저에 저장, 세션은 서버에 저장\n";

// $_GLOBALS: 전역 변수 접근
$globalVar = "전역 변수";
function accessGlobal(): void {
    echo $GLOBALS['globalVar'] . "\n";
}
accessGlobal();
