# [702] 변수와 자료형 - Variables & Types
# 레벨: 1 | Ruby의 변수 종류와 기본 자료형을 배웁니다

# 지역 변수 (소문자 또는 _로 시작)
name = "Ruby"
age = 30
height = 175.5
is_active = true

puts "#{name}, #{age}, #{height}, #{is_active}"

# 상수 (대문자로 시작)
MAX_SIZE = 100
PI = 3.14159
puts "MAX: #{MAX_SIZE}, PI: #{PI}"

# 전역 변수 ($)
$global = "전역 변수"
def show_global
  puts $global
end
show_global

# 심볼 (불변 문자열, 메모리 효율적)
status = :active
direction = :north
puts status.class    # Symbol
puts status == :active  # true

# 숫자
puts 1_000_000       # 가독성을 위한 _
puts 0xFF            # 16진수: 255
puts 0b1010          # 2진수: 10
puts 1.0e3           # 지수: 1000.0

# 문자열
str = "Hello, Ruby!"
puts str.length
puts str.upcase
puts str.reverse
puts str.include?("Ruby")
puts str[0..4]       # "Hello" (슬라이싱)

# 타입 변환
puts "42".to_i       # 문자열 → 정수
puts "3.14".to_f     # 문자열 → 실수
puts 42.to_s         # 정수 → 문자열
puts nil.to_i        # nil → 0
puts nil.to_s        # nil → ""

# 다중 할당
x, y, z = 1, 2, 3
puts "#{x}, #{y}, #{z}"

a, b = b, a          # 값 교환
puts "a=#{a}, b=#{b}"
