# [701] Hello World - 첫 번째 Ruby 프로그램
# 레벨: 1 | Ruby의 기본 구조와 출력 메서드를 배웁니다

# 기본 출력
puts "Hello, World!"
puts "안녕하세요, Ruby!"

# print vs puts vs p
print "Hello "
print "Ruby"
print "\n"

puts "줄바꿈 자동"
p "p는 디버그용 출력"   # "p는 디버그용 출력" (따옴표 포함)

# 문자열 보간법
name = "GitRace"
version = 2
puts "Welcome to #{name} v#{version}!"

# 표현식 삽입
a, b = 10, 20
puts "#{a} + #{b} = #{a + b}"

# 여러 줄 문자열 (heredoc)
text = <<~HEREDOC
  Ruby 특징:
  - 간결하고 우아한 문법
  - 모든 것이 객체
  - 동적 타이핑
HEREDOC
puts text

# 주석
# 한 줄 주석
=begin
  여러 줄 주석
  이렇게 씁니다
=end

puts 42.class        # Integer
puts 3.14.class      # Float
puts "hello".class   # String
puts true.class      # TrueClass
