// [320] 모던 PHP - Modern PHP (PHP 8.x)
// 레벨: 4 | PHP 8.0~8.3의 최신 문법과 기능을 배웁니다

<?php
// ===== 열거형 (Enum) - PHP 8.1 =====
enum Status: string {
    case Active   = 'active';
    case Inactive = 'inactive';
    case Pending  = 'pending';

    public function label(): string {
        return match($this) {
            Status::Active   => '활성',
            Status::Inactive => '비활성',
            Status::Pending  => '대기중',
        };
    }

    public function isActive(): bool {
        return $this === Status::Active;
    }
}

echo "=== Enum (PHP 8.1) ===\n";
$status = Status::Active;
echo "상태: " . $status->label() . " (" . $status->value . ")\n";
echo "활성?: " . ($status->isActive() ? "예" : "아니오") . "\n";

$from = Status::from('pending');
echo "from(): " . $from->label() . "\n";

// ===== 읽기 전용 프로퍼티 (Readonly) - PHP 8.1 =====
class Point {
    public function __construct(
        public readonly float $x,
        public readonly float $y,
        public readonly float $z = 0.0
    ) {}

    public function distanceTo(Point $other): float {
        return sqrt(
            ($this->x - $other->x) ** 2 +
            ($this->y - $other->y) ** 2 +
            ($this->z - $other->z) ** 2
        );
    }

    public function __toString(): string {
        return "Point({$this->x}, {$this->y}, {$this->z})";
    }
}

echo "\n=== Readonly Properties (PHP 8.1) ===\n";
$p1 = new Point(0.0, 0.0);
$p2 = new Point(3.0, 4.0);
echo "$p1 ~ $p2 거리: " . $p1->distanceTo($p2) . "\n";

// ===== Fibers - PHP 8.1 =====
echo "\n=== Fibers (PHP 8.1) ===\n";
$fiber = new Fiber(function(): void {
    $val = Fiber::suspend('첫 번째 중단');
    echo "재개됨, 받은 값: $val\n";
    Fiber::suspend('두 번째 중단');
    echo "완료\n";
});

$result1 = $fiber->start();
echo "Fiber 중단: $result1\n";
$result2 = $fiber->resume('안녕!');
echo "Fiber 중단: $result2\n";
$fiber->resume();

// ===== 교차 타입 & never - PHP 8.1 =====
interface Stringable2 {
    public function __toString(): string;
}

interface Countable2 {
    public function count(): int;
}

class Collection implements Stringable2, Countable2 {
    private array $items;
    public function __construct(mixed ...$items) { $this->items = $items; }
    public function __toString(): string { return implode(', ', $this->items); }
    public function count(): int { return count($this->items); }
}

function processCollection(Stringable2&Countable2 $col): void {
    echo "컬렉션($col): " . $col->count() . "개\n";
}

echo "\n=== 교차 타입 ===\n";
processCollection(new Collection('PHP', 'Python', 'Java'));

// ===== match + 복잡한 조건 =====
echo "\n=== match 표현식 활용 ===\n";
$scores = [100, 95, 82, 73, 61, 45];
foreach ($scores as $score) {
    $grade = match(true) {
        $score === 100 => '만점!',
        $score >= 90   => 'A',
        $score >= 80   => 'B',
        $score >= 70   => 'C',
        $score >= 60   => 'D',
        default        => 'F',
    };
    echo "$score점 → $grade\n";
}
