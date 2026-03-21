# [703] 제어 흐름 - Control Flow
# 레벨: 1 | if, unless, case, while, until로 흐름을 제어합니다

# if / elsif / else
score = 85
if score >= 90
  puts "A"
elsif score >= 80
  puts "B"
elsif score >= 70
  puts "C"
else
  puts "F"
end

# unless (if not)
x = 10
unless x > 20
  puts "x는 20 이하입니다"
end

# 한 줄 if / unless
puts "성인입니다" if age >= 18 rescue nil
puts "작은 수" unless x > 100

# 3항 연산자
result = x > 5 ? "크다" : "작다"
puts result

# case/when (switch)
day = 3
case day
when 1 then puts "월요일"
when 2 then puts "화요일"
when 3 then puts "수요일"
when 4, 5 then puts "목/금요일"
when 6..7 then puts "주말"
else puts "알 수 없음"
end

# case 범위 매칭
temp = 25
case temp
when -Float::INFINITY...0 then puts "영하"
when 0...10  then puts "추움"
when 10...25 then puts "적당"
when 25...35 then puts "더움"
else puts "폭염"
end

# while
count = 0
while count < 3
  print "#{count} "
  count += 1
end
puts

# until (while not)
n = 1
until n > 16
  print "#{n} "
  n *= 2
end
puts

# loop + break
i = 0
loop do
  break if i >= 5
  print "#{i} "
  i += 1
end
puts

# times, upto, downto
3.times { |i| print "#{i} " }
puts
1.upto(5) { |i| print "#{i} " }
puts
5.downto(1) { |i| print "#{i} " }
puts

# next (continue), break
(1..10).each do |i|
  next if i.even?
  break if i > 7
  print "#{i} "
end
puts
