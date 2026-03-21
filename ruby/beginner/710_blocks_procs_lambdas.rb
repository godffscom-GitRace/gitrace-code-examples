# [710] 블록, Proc, Lambda
# 레벨: 1 | Ruby의 블록, Proc, Lambda로 함수형 프로그래밍을 배웁니다

# ===== 블록 =====
# do...end 블록
[1, 2, 3].each do |n|
  puts n * 2
end

# { } 블록 (한 줄)
[1, 2, 3].each { |n| print "#{n} " }
puts

# yield로 블록 호출
def execute
  puts "전"
  yield if block_given?
  puts "후"
end
execute { puts "블록 실행!" }

# yield에 인수 전달
def transform(value)
  yield(value) if block_given?
end
puts transform(10) { |v| v * v }

# ===== Proc =====
square = Proc.new { |x| x * x }
double = proc { |x| x * 2 }

puts square.call(5)
puts square.(5)     # 다른 호출법
puts square[5]      # 또 다른 호출법
puts double.call(7)

# Proc은 &로 메서드에 전달
nums = [1, 2, 3, 4, 5]
puts nums.map(&square).inspect

# Symbol을 Proc으로 변환
puts nums.map(&:to_s).inspect
puts ["hello", "world"].map(&:upcase).inspect

# ===== Lambda =====
greet  = lambda { |name| "안녕, #{name}!" }
add    = ->(a, b) { a + b }  # 람다 리터럴

puts greet.call("철수")
puts add.call(3, 4)
puts add.(10, 20)

# Proc vs Lambda 차이
# 1. 인수 검사: Lambda는 엄격함
my_proc   = Proc.new { |a, b| "#{a}, #{b}" }
my_lambda = lambda { |a, b| "#{a}, #{b}" }

puts my_proc.call(1)         # nil 무시
# my_lambda.call(1)          # ArgumentError!

# 2. return 동작
def proc_return
  p = Proc.new { return "proc에서 반환" }
  p.call
  "메서드 끝"   # 실행 안 됨
end

def lambda_return
  l = lambda { return "lambda에서 반환" }
  l.call
  "메서드 끝"   # 실행됨!
end

puts proc_return
puts lambda_return

# 클로저 동작
def make_counter
  count = 0
  increment = -> { count += 1; count }
  decrement = -> { count -= 1; count }
  [increment, decrement]
end

inc, dec = make_counter
puts inc.call  # 1
puts inc.call  # 2
puts dec.call  # 1
