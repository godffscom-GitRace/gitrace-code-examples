# [705] 배열 - Arrays
# 레벨: 1 | Ruby 배열의 생성, 조작, 고차 함수를 배웁니다

# 배열 생성
fruits = ["사과", "바나나", "체리"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", :sym, true, nil]
empty = Array.new(3, 0)   # [0, 0, 0]
range_arr = (1..5).to_a   # [1, 2, 3, 4, 5]

puts fruits.inspect
puts range_arr.inspect

# 접근
puts fruits[0]        # 첫 번째
puts fruits[-1]       # 마지막
puts fruits[1..2].inspect    # 슬라이싱
puts fruits.first
puts fruits.last

# 수정
fruits.push("망고")
fruits << "딸기"          # push 단축형
fruits.unshift("수박")    # 맨 앞에 추가
puts fruits.pop           # 마지막 제거
puts fruits.shift         # 맨 앞 제거
fruits.insert(1, "포도")
puts fruits.inspect

# 정보
puts fruits.length
puts fruits.size
puts fruits.include?("바나나")
puts fruits.empty?
puts fruits.count { |f| f.length > 2 }

# 변환
nums = [3, 1, 4, 1, 5, 9, 2, 6]
puts nums.sort.inspect
puts nums.sort.reverse.inspect
puts nums.uniq.inspect
puts nums.min, nums.max, nums.sum

# 고차 함수
puts numbers.map { |n| n * n }.inspect
puts numbers.filter { |n| n.odd? }.inspect
puts numbers.select { |n| n > 3 }.inspect
puts numbers.reject { |n| n > 3 }.inspect
puts numbers.reduce(0) { |sum, n| sum + n }
puts numbers.reduce(:+)

# 평탄화
nested = [[1, 2], [3, [4, 5]], [6]]
puts nested.flatten.inspect
puts nested.flatten(1).inspect

# zip, combination
a = [1, 2, 3]
b = ["a", "b", "c"]
puts a.zip(b).inspect
puts [1, 2, 3].combination(2).to_a.inspect
