// [312] 오류 처리 - Error Handling
// 레벨: 2 | try-catch, 사용자 정의 예외, 오류 로깅을 배웁니다

<?php
// 기본 try-catch
echo "=== 기본 예외 처리 ===\n";
try {
    $result = 10 / 0;  // PHP는 이를 예외로 안 던짐 (INF 반환)
    throw new Exception("수동으로 예외 발생!");
} catch (Exception $e) {
    echo "오류: " . $e->getMessage() . "\n";
    echo "파일: " . basename($e->getFile()) . "\n";
    echo "줄: " . $e->getLine() . "\n";
} finally {
    echo "finally: 항상 실행됨\n";
}

// 사용자 정의 예외
class ValidationException extends RuntimeException {
    private array $errors;

    public function __construct(array $errors) {
        parent::__construct("유효성 검사 실패");
        $this->errors = $errors;
    }

    public function getErrors(): array { return $this->errors; }
}

function validateUser(array $data): void {
    $errors = [];
    if (empty($data['name']))
        $errors[] = "이름은 필수입니다";
    if (strlen($data['password'] ?? '') < 8)
        $errors[] = "비밀번호는 8자 이상이어야 합니다";
    if (!filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL))
        $errors[] = "유효하지 않은 이메일";

    if (!empty($errors)) throw new ValidationException($errors);
}

echo "\n=== 사용자 정의 예외 ===\n";
$testCases = [
    ['name' => '', 'password' => '123', 'email' => 'invalid'],
    ['name' => '김철수', 'password' => 'secure123', 'email' => 'kim@example.com'],
];

foreach ($testCases as $data) {
    try {
        validateUser($data);
        echo "유효한 사용자: " . $data['name'] . "\n";
    } catch (ValidationException $e) {
        echo "검증 오류:\n";
        foreach ($e->getErrors() as $err) echo "  - $err\n";
    }
}

// 다중 catch
echo "\n=== 다중 catch ===\n";
function riskyOperation(int $type): string {
    return match($type) {
        1 => throw new InvalidArgumentException("잘못된 인수"),
        2 => throw new RuntimeException("런타임 오류"),
        3 => throw new OverflowException("오버플로우"),
        default => "성공"
    };
}

for ($i = 0; $i <= 3; $i++) {
    try {
        echo "결과: " . riskyOperation($i) . "\n";
    } catch (InvalidArgumentException $e) {
        echo "인수 오류: " . $e->getMessage() . "\n";
    } catch (RuntimeException | OverflowException $e) {
        echo "실행 오류: " . $e->getMessage() . "\n";
    }
}
