// [313] 클래스와 OOP - Classes & OOP
// 레벨: 3 | 클래스, 상속, 인터페이스, 추상 클래스, 트레이트를 배웁니다

<?php
// 인터페이스
interface Printable {
    public function print(): void;
}

interface Serializable {
    public function serialize(): string;
}

// 트레이트: 여러 클래스에서 재사용 가능한 메서드 묶음
trait Timestampable {
    private string $createdAt;
    private string $updatedAt;

    public function setTimestamps(): void {
        $this->createdAt = date('Y-m-d H:i:s');
        $this->updatedAt = date('Y-m-d H:i:s');
    }
    public function getCreatedAt(): string { return $this->createdAt; }
}

// 추상 클래스
abstract class Animal {
    public function __construct(
        protected string $name,
        protected int $age
    ) {}

    abstract public function sound(): string;  // 반드시 구현

    public function introduce(): string {
        return "{$this->name}({$this->age}살): " . $this->sound();
    }
}

// 구체 클래스: 상속 + 인터페이스 + 트레이트
class Dog extends Animal implements Printable, Serializable {
    use Timestampable;

    public function __construct(
        string $name,
        int $age,
        private string $breed
    ) {
        parent::__construct($name, $age);
        $this->setTimestamps();
    }

    public function sound(): string { return "멍멍!"; }

    public function print(): void {
        echo $this->introduce() . " [{$this->breed}]\n";
    }

    public function serialize(): string {
        return json_encode([
            'name'  => $this->name,
            'age'   => $this->age,
            'breed' => $this->breed
        ], JSON_UNESCAPED_UNICODE);
    }
}

// 정적 메서드와 프로퍼티
class Counter {
    private static int $count = 0;

    public static function increment(): void { self::$count++; }
    public static function getCount(): int   { return self::$count; }
    public static function reset(): void     { self::$count = 0; }
}

// 실행
$dog = new Dog("초코", 3, "말티즈");
$dog->print();
echo "JSON: " . $dog->serialize() . "\n";
echo "생성일: " . $dog->getCreatedAt() . "\n";

echo "\n=== 정적 메서드 ===\n";
Counter::increment();
Counter::increment();
Counter::increment();
echo "카운트: " . Counter::getCount() . "\n";
Counter::reset();
echo "리셋 후: " . Counter::getCount() . "\n";

// 매직 메서드
class MagicExample {
    private array $data = [];

    public function __set(string $key, mixed $val): void { $this->data[$key] = $val; }
    public function __get(string $key): mixed { return $this->data[$key] ?? null; }
    public function __toString(): string { return json_encode($this->data, JSON_UNESCAPED_UNICODE); }
    public function __isset(string $key): bool { return isset($this->data[$key]); }
}

echo "\n=== 매직 메서드 ===\n";
$obj = new MagicExample();
$obj->name = "이영희";
$obj->age  = 22;
echo $obj . "\n";
echo "name isset: " . (isset($obj->name) ? "true" : "false") . "\n";
