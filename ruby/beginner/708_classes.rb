# [708] 클래스 - Classes
# 레벨: 1 | Ruby 클래스, 상속, 접근 제어를 배웁니다

class Animal
  attr_accessor :name, :age   # getter/setter 자동 생성
  attr_reader   :species       # getter만

  @@count = 0   # 클래스 변수

  def initialize(name, age, species)
    @name    = name    # 인스턴스 변수
    @age     = age
    @species = species
    @@count  += 1
  end

  def self.count    # 클래스 메서드
    @@count
  end

  def speak
    "#{@name}: ..."
  end

  def to_s
    "#{@species}(#{@name}, #{@age}세)"
  end

  def <=>(other)
    @age <=> other.age
  end

  include Comparable
end

class Dog < Animal
  def initialize(name, age)
    super(name, age, "강아지")
  end

  def speak
    "#{@name}: 멍멍!"
  end

  def fetch(item)
    "#{@name}가 #{item}을 가져옵니다!"
  end
end

class Cat < Animal
  def initialize(name, age)
    super(name, age, "고양이")
  end

  def speak
    "#{@name}: 야옹~"
  end
end

# 접근 제어
class BankAccount
  def initialize(owner, balance)
    @owner   = owner
    @balance = balance
  end

  def deposit(amount)
    @balance += validate_amount(amount)
    puts "입금: #{amount}원 → 잔액: #{@balance}원"
  end

  def balance_info
    "#{@owner}의 잔액: #{mask_balance}원"
  end

  private

  def validate_amount(amount)
    raise ArgumentError, "금액은 양수여야 합니다" unless amount > 0
    amount
  end

  def mask_balance
    @balance > 0 ? @balance : 0
  end
end

dog = Dog.new("바둑이", 3)
cat = Cat.new("나비", 5)

puts dog
puts cat
puts dog.speak
puts cat.speak
puts dog.fetch("공")

dog.name = "흰둥이"
puts dog.name

puts Animal.count

animals = [dog, cat, Dog.new("초코", 1)]
puts animals.sort.map(&:to_s).inspect
puts animals.min

account = BankAccount.new("철수", 50000)
account.deposit(10000)
puts account.balance_info
