# [707] 문자열 - Strings
# 레벨: 1 | Ruby 문자열 조작과 정규표현식을 배웁니다

# 문자열 생성
single = 'single quote: 보간 불가 #{1+1}'
double = "double quote: 보간 가능 #{1+1}"
heredoc = <<~TEXT
  heredoc 문자열
  들여쓰기 제거됨
TEXT

puts single
puts double
puts heredoc

# 기본 조작
str = "Hello, Ruby World!"
puts str.length
puts str.upcase
puts str.downcase
puts str.reverse
puts str.swapcase
puts str.capitalize

# 검색
puts str.include?("Ruby")
puts str.start_with?("Hello")
puts str.end_with?("!")
puts str.index("Ruby")
puts str.count("l")

# 치환
puts str.gsub("Ruby", "Python")
puts str.sub("l", "L")        # 첫 번째만
puts str.delete("aeiou")
puts str.squeeze("l")          # 연속 중복 제거

# 분리/결합
words = "one two three".split(" ")
puts words.inspect
puts words.join("-")
puts "  hello  ".strip
puts "  hello  ".lstrip
puts "  hello  ".rstrip

# 포맷
name = "철수"
score = 95.567
puts "이름: %-10s 점수: %6.2f" % [name, score]
puts format("이름: %s, 점수: %.1f", name, score)

# 정규표현식
email = "user@example.com"
puts email.match?(/\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i)

phone = "010-1234-5678"
puts phone.gsub(/\D/, "")   # 숫자만 추출

text = "2024년 3월 21일"
if m = text.match(/(\d+)년 (\d+)월 (\d+)일/)
  puts "년: #{m[1]}, 월: #{m[2]}, 일: #{m[3]}"
end

# 문자열 반복
puts "ha" * 3
puts "-" * 20

# frozen_string_literal
str2 = "immutable".freeze
puts str2.frozen?
