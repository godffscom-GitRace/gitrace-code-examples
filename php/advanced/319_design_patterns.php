// [319] 디자인 패턴 - Design Patterns
// 레벨: 4 | 싱글톤, 팩토리, 옵저버 패턴을 PHP로 구현합니다

<?php
// ===== 싱글톤 패턴 =====
class Database {
    private static ?Database $instance = null;
    private int $queryCount = 0;

    private function __construct(private string $dsn) {
        echo "DB 연결: $dsn\n";
    }

    public static function getInstance(string $dsn = 'mysql:localhost'): self {
        if (self::$instance === null) {
            self::$instance = new self($dsn);
        }
        return self::$instance;
    }

    public function query(string $sql): string {
        $this->queryCount++;
        return "결과(#{$this->queryCount}): $sql";
    }

    public function getQueryCount(): int { return $this->queryCount; }
}

echo "=== 싱글톤 ===\n";
$db1 = Database::getInstance('mysql:localhost');
$db2 = Database::getInstance('mysql:other');  // 새 인스턴스 생성 안 됨
echo ($db1 === $db2 ? "같은 인스턴스\n" : "다른 인스턴스\n");
echo $db1->query("SELECT * FROM users") . "\n";
echo $db2->query("SELECT * FROM orders") . "\n";
echo "총 쿼리: " . $db1->getQueryCount() . "\n";

// ===== 팩토리 패턴 =====
interface Logger {
    public function log(string $msg): void;
}

class FileLogger implements Logger {
    public function log(string $msg): void {
        echo "[FILE] " . date('H:i:s') . " $msg\n";
    }
}

class ConsoleLogger implements Logger {
    public function log(string $msg): void {
        echo "[CONSOLE] $msg\n";
    }
}

class DatabaseLogger implements Logger {
    public function log(string $msg): void {
        echo "[DB] INSERT INTO logs VALUES('$msg')\n";
    }
}

class LoggerFactory {
    public static function create(string $type): Logger {
        return match($type) {
            'file'    => new FileLogger(),
            'console' => new ConsoleLogger(),
            'db'      => new DatabaseLogger(),
            default   => throw new InvalidArgumentException("알 수 없는 타입: $type")
        };
    }
}

echo "\n=== 팩토리 패턴 ===\n";
foreach (['console', 'file', 'db'] as $type) {
    $logger = LoggerFactory::create($type);
    $logger->log("사용자 로그인 성공");
}

// ===== 옵저버 패턴 =====
interface Observer {
    public function update(string $event, mixed $data): void;
}

class EventEmitter {
    private array $listeners = [];

    public function on(string $event, Observer $observer): void {
        $this->listeners[$event][] = $observer;
    }

    public function emit(string $event, mixed $data = null): void {
        foreach ($this->listeners[$event] ?? [] as $observer) {
            $observer->update($event, $data);
        }
    }
}

class EmailNotifier implements Observer {
    public function update(string $event, mixed $data): void {
        echo "이메일 발송: [{$event}] " . json_encode($data, JSON_UNESCAPED_UNICODE) . "\n";
    }
}

class SlackNotifier implements Observer {
    public function update(string $event, mixed $data): void {
        echo "슬랙 알림: [{$event}] " . json_encode($data, JSON_UNESCAPED_UNICODE) . "\n";
    }
}

echo "\n=== 옵저버 패턴 ===\n";
$emitter = new EventEmitter();
$emitter->on('user.login',    new EmailNotifier());
$emitter->on('user.login',    new SlackNotifier());
$emitter->on('user.purchase', new EmailNotifier());

$emitter->emit('user.login',    ['user' => '김철수', 'ip' => '127.0.0.1']);
$emitter->emit('user.purchase', ['user' => '이영희', 'item' => '상품A', 'price' => 29000]);
