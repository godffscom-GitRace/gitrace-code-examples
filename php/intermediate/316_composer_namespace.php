// [316] 네임스페이스와 Composer - Namespace & Composer
// 레벨: 3 | 네임스페이스로 코드를 체계적으로 구성하는 방법을 배웁니다

<?php
// ===== 네임스페이스 정의 =====
namespace App\Models;

class User {
    public function __construct(
        private int    $id,
        private string $name,
        private string $email
    ) {}

    public function getId(): int    { return $this->id; }
    public function getName(): string  { return $this->name; }
    public function getEmail(): string { return $this->email; }

    public function toArray(): array {
        return ['id' => $this->id, 'name' => $this->name, 'email' => $this->email];
    }

    public function __toString(): string {
        return "User({$this->id}, {$this->name})";
    }
}

namespace App\Services;

use App\Models\User;

class UserService {
    private array $users = [];
    private int $nextId = 1;

    public function create(string $name, string $email): User {
        $user = new User($this->nextId++, $name, $email);
        $this->users[$user->getId()] = $user;
        return $user;
    }

    public function find(int $id): ?User {
        return $this->users[$id] ?? null;
    }

    public function findAll(): array {
        return array_values($this->users);
    }

    public function delete(int $id): bool {
        if (isset($this->users[$id])) {
            unset($this->users[$id]);
            return true;
        }
        return false;
    }
}

namespace App\Utils;

class Validator {
    public static function email(string $email): bool {
        return (bool)filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    public static function minLength(string $str, int $min): bool {
        return mb_strlen($str) >= $min;
    }
}

// ===== 실행 =====
namespace App;

use App\Services\UserService;
use App\Utils\Validator;

$service = new UserService();

// 유효성 검사 후 생성
$inputs = [
    ['name' => '김철수', 'email' => 'kim@example.com'],
    ['name' => '이영희', 'email' => 'invalid-email'],
    ['name' => '박',    'email' => 'park@example.com'],
];

echo "=== 사용자 생성 ===\n";
foreach ($inputs as $input) {
    if (!Validator::minLength($input['name'], 2)) {
        echo "오류: 이름이 너무 짧음 ({$input['name']})\n";
        continue;
    }
    if (!Validator::email($input['email'])) {
        echo "오류: 이메일 형식 오류 ({$input['email']})\n";
        continue;
    }
    $user = $service->create($input['name'], $input['email']);
    echo "생성: $user\n";
}

echo "\n=== 전체 사용자 ===\n";
foreach ($service->findAll() as $user) {
    print_r($user->toArray());
}

$service->delete(1);
echo "삭제 후 사용자 수: " . count($service->findAll()) . "\n";
