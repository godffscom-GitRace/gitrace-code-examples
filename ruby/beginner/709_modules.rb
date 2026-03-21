# [709] 모듈 - Modules
# 레벨: 1 | mixin으로 코드를 재사용하는 모듈을 배웁니다

# 모듈: 네임스페이스 + mixin
module Greetable
  def greet
    "안녕하세요, #{name}입니다!"
  end

  def farewell
    "안녕히 계세요, #{name}이었습니다!"
  end
end

module Loggable
  def log(message)
    puts "[LOG][#{self.class}] #{message}"
  end

  def log_action(action)
    log("#{action} 시작")
    result = yield
    log("#{action} 완료: #{result}")
    result
  end
end

module Serializable
  def to_json_str
    vars = instance_variables.map do |var|
      "\"#{var.to_s[1..]}\": \"#{instance_variable_get(var)}\""
    end
    "{ #{vars.join(", ")} }"
  end
end

class Person
  include Greetable
  include Loggable
  include Serializable

  attr_reader :name, :age

  def initialize(name, age)
    @name = name
    @age  = age
  end
end

class Robot
  include Greetable
  include Loggable

  attr_reader :name

  def initialize(name)
    @name = name
  end
end

# 네임스페이스
module Payment
  class Card
    def pay(amount) = "카드 #{amount}원 결제"
  end

  class Cash
    def pay(amount) = "현금 #{amount}원 결제"
  end

  module Gateway
    def self.process(method, amount)
      puts "#{method}: #{amount}원 처리 중..."
    end
  end
end

# extend: 인스턴스가 아닌 클래스에 모듈 메서드 추가
module ClassMethods
  def description
    "#{name} 클래스 - #{@description}"
  end
end

class Product
  extend ClassMethods
  @description = "상품 관리 클래스"

  attr_reader :title
  def initialize(title) = @title = title
end

person = Person.new("철수", 25)
puts person.greet
puts person.farewell
puts person.to_json_str
person.log("작업 수행")
person.log_action("데이터 저장") { "성공" }

robot = Robot.new("R2D2")
puts robot.greet

Payment::Gateway.process("신용카드", 50000)
card = Payment::Card.new
puts card.pay(30000)

puts Product.description
puts Person.ancestors.inspect
