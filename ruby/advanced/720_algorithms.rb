# [720] 알고리즘 - Algorithms
# 레벨: 3 | Ruby로 정렬, 탐색, 자료구조 알고리즘을 구현합니다

# ===== 정렬 =====
def quick_sort(arr)
  return arr if arr.length <= 1
  pivot = arr[arr.length / 2]
  left   = arr.select { |x| x <  pivot }
  middle = arr.select { |x| x == pivot }
  right  = arr.select { |x| x >  pivot }
  quick_sort(left) + middle + quick_sort(right)
end

def merge_sort(arr)
  return arr if arr.length <= 1
  mid   = arr.length / 2
  left  = merge_sort(arr[0...mid])
  right = merge_sort(arr[mid..])
  merge(left, right)
end

def merge(left, right)
  result = []
  until left.empty? || right.empty?
    result << (left.first <= right.first ? left.shift : right.shift)
  end
  result + left + right
end

# ===== 탐색 =====
def binary_search(arr, target)
  lo, hi = 0, arr.length - 1
  while lo <= hi
    mid = (lo + hi) / 2
    case arr[mid] <=> target
    when 0  then return mid
    when -1 then lo = mid + 1
    when 1  then hi = mid - 1
    end
  end
  -1
end

# ===== 연결 리스트 =====
class Node
  attr_accessor :value, :next_node
  def initialize(value) = (@value = value; @next_node = nil)
end

class LinkedList
  include Enumerable

  def initialize = @head = nil

  def prepend(value)
    node       = Node.new(value)
    node.next_node = @head
    @head      = node
    self
  end

  def append(value)
    node = Node.new(value)
    if @head.nil? then @head = node
    else
      curr = @head
      curr = curr.next_node until curr.next_node.nil?
      curr.next_node = node
    end
    self
  end

  def each
    curr = @head
    while curr
      yield curr.value
      curr = curr.next_node
    end
  end

  def reverse!
    prev, curr = nil, @head
    while curr
      nxt         = curr.next_node
      curr.next_node = prev
      prev        = curr
      curr        = nxt
    end
    @head = prev
    self
  end

  def to_s = to_a.join(" → ")
end

# ===== 스택 / 큐 =====
class Stack
  def initialize = @data = []
  def push(v)  = @data.push(v)
  def pop       = @data.pop
  def peek      = @data.last
  def empty?    = @data.empty?
  def to_s      = @data.inspect
end

class Queue
  def initialize = (@inbox = []; @outbox = [])
  def enqueue(v) = @inbox.push(v)
  def dequeue
    @outbox = @inbox.reverse.tap { @inbox = [] } if @outbox.empty?
    @outbox.pop
  end
  def empty? = @inbox.empty? && @outbox.empty?
end

# ===== 실행 =====
arr = [64, 34, 25, 12, 22, 11, 90]
puts "원본: #{arr.inspect}"
puts "퀵정렬: #{quick_sort(arr).inspect}"
puts "병합정렬: #{merge_sort(arr).inspect}"

sorted = merge_sort(arr)
puts "이진탐색(25): 인덱스 #{binary_search(sorted, 25)}"
puts "이진탐색(99): 인덱스 #{binary_search(sorted, 99)}"

puts "\n=== 연결 리스트 ==="
list = LinkedList.new
[1, 2, 3, 4, 5].each { |n| list.append(n) }
puts "원본: #{list}"
list.reverse!
puts "역순: #{list}"

puts "\n=== 스택 ==="
stack = Stack.new
[1, 2, 3, 4, 5].each { |n| stack.push(n) }
print "pop: "
print "#{stack.pop} " until stack.empty?
puts

puts "\n=== 큐 ==="
queue = Queue.new
[1, 2, 3, 4, 5].each { |n| queue.enqueue(n) }
print "dequeue: "
print "#{queue.dequeue} " until queue.empty?
puts
