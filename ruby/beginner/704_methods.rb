# [704] 메서드 - Methods
# 레벨: 1 | Ruby 메서드 정의, 기본값, 가변 인수, 블록을 배웁니다

# 기본 메서드
def greet(name)
  "안녕하세요, #{name}!"
end
puts greet("철수")

# 기본값 매개변수
def greet_with(name, greeting = "안녕하세요")
  "#{greeting}, #{name}!"
end
puts greet_with("영희")
puts greet_with("민수", "Hello")

# 다중 반환값
def min_max(arr)
  [arr.min, arr.max]
end
min, max = min_max([3, 1, 4, 1, 5, 9])
puts "최소: #{min}, 최대: #{max}"

# 가변 인수 (splat *)
def sum(*numbers)
  numbers.sum
end
puts sum(1, 2, 3, 4, 5)

# 키워드 인수
def create_user(name:, age:, role: "user")
  "#{name}(#{age}) - #{role}"
end
puts create_user(name: "철수", age: 25)
puts create_user(name: "관리자", age: 30, role: "admin")

# 블록을 받는 메서드
def repeat(n)
  n.times { yield if block_given? }
end
repeat(3) { print "반복 " }
puts

# &block 명시적 블록
def transform(value, &block)
  block.call(value)
end
puts transform(10) { |v| v * v }

# 메서드 별칭
def hello; "Hello!"; end
alias say_hello hello
puts say_hello

# ? 메서드 (불리언 반환 관례)
def positive?(n)
  n > 0
end
puts positive?(5)   # true
puts positive?(-1)  # false

# ! 메서드 (위험/변형 관례)
str = "hello world"
puts str.upcase    # 원본 유지
str.upcase!        # 원본 변경
puts str
