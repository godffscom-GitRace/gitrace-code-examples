# [712] 이터레이터와 Enumerable
# 레벨: 1 | Ruby의 강력한 이터레이터와 Enumerable 모듈을 배웁니다

# 기본 이터레이터
puts "=== each ==="
[1, 2, 3].each { |n| print "#{n} " }
puts

puts "\n=== each_with_index ==="
["a", "b", "c"].each_with_index { |v, i| puts "#{i}: #{v}" }

puts "\n=== each_with_object ==="
result = [1, 2, 3, 4, 5].each_with_object([]) do |n, arr|
  arr << n * n if n.odd?
end
puts result.inspect

# map / collect
puts "\n=== map ==="
puts (1..5).map { |n| n ** 2 }.inspect

# select / reject / filter
puts "\n=== select/reject ==="
nums = (1..10).to_a
puts nums.select { |n| n.even? }.inspect
puts nums.reject { |n| n.even? }.inspect

# find / detect
puts "\n=== find ==="
puts nums.find { |n| n > 5 }
puts nums.find_index { |n| n > 5 }

# reduce / inject
puts "\n=== reduce ==="
puts nums.reduce(0) { |sum, n| sum + n }
puts nums.reduce(:+)
puts nums.inject { |product, n| product * n }

# group_by
puts "\n=== group_by ==="
puts nums.group_by { |n| n % 3 }.inspect

# partition
even, odd = nums.partition { |n| n.even? }
puts "짝수: #{even.inspect}"
puts "홀수: #{odd.inspect}"

# flat_map
puts "\n=== flat_map ==="
puts [[1,2],[3,4],[5]].flat_map { |a| a.map { |n| n * 2 } }.inspect

# zip
puts "\n=== zip ==="
puts [1,2,3].zip([4,5,6], [7,8,9]).inspect

# chunk
puts "\n=== chunk ==="
[1,1,2,2,3,1,1].chunk { |n| n }.each { |key, arr| puts "#{key}: #{arr}" }

# Enumerable 직접 구현
class NumberRange
  include Enumerable

  def initialize(from, to)
    @from, @to = from, to
  end

  def each
    current = @from
    while current <= @to
      yield current
      current += 1
    end
  end
end

range = NumberRange.new(1, 10)
puts "\n=== 커스텀 Enumerable ==="
puts range.map { |n| n * 2 }.inspect
puts range.select(&:odd?).inspect
puts range.sum
puts range.min, range.max
puts range.sort_by { |n| -n }.first(3).inspect
