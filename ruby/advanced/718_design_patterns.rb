# [718] 디자인 패턴 - Design Patterns
# 레벨: 3 | Ruby로 구현하는 실용적인 디자인 패턴들

# ===== 데코레이터 패턴 =====
module Logging
  def call(*args)
    puts "[LOG] #{self.class} 호출: #{args.inspect}"
    result = super
    puts "[LOG] 결과: #{result.inspect}"
    result
  end
end

class DataProcessor
  def call(data)
    data.map { |n| n * 2 }
  end
end

class LoggedProcessor < DataProcessor
  prepend Logging
end

processor = LoggedProcessor.new
processor.call([1, 2, 3])

# ===== 옵저버 패턴 (Observable) =====
module Observable
  def self.included(base)
    base.instance_variable_set(:@observers, [])
    base.extend(ClassMethods)
  end

  module ClassMethods
    def observers = @observers
    def add_observer(obs) = @observers << obs
  end

  def notify_observers(event, data = nil)
    self.class.observers.each { |obs| obs.update(event, data) }
  end
end

class EventLogger
  def update(event, data)
    puts "[이벤트] #{event}: #{data.inspect}"
  end
end

class UserStore
  include Observable

  def create(user)
    puts "유저 생성: #{user[:name]}"
    notify_observers(:user_created, user)
  end
end

UserStore.add_observer(EventLogger.new)
store = UserStore.new
store.create({ name: "철수", email: "cs@example.com" })

# ===== 전략 패턴 =====
class Sorter
  def initialize(strategy = method(:default_sort))
    @strategy = strategy
  end

  def sort(data) = @strategy.(data)

  private
  def default_sort(data) = data.sort
end

asc   = ->(data) { data.sort }
desc  = ->(data) { data.sort.reverse }
by_len = ->(data) { data.sort_by(&:length) }

words = %w[banana apple cherry date elderberry]
puts Sorter.new(asc).sort(words).inspect
puts Sorter.new(desc).sort(words).inspect
puts Sorter.new(by_len).sort(words).inspect

# ===== 빌더 패턴 =====
class QueryBuilder
  def initialize(table)
    @table = table
    @conditions = []
    @order = nil
    @limit = nil
  end

  def where(condition)     = tap { @conditions << condition }
  def order(field)         = tap { @order = field }
  def limit(n)             = tap { @limit = n }

  def build
    sql = "SELECT * FROM #{@table}"
    sql += " WHERE #{@conditions.join(" AND ")}" unless @conditions.empty?
    sql += " ORDER BY #{@order}" if @order
    sql += " LIMIT #{@limit}" if @limit
    sql
  end
end

sql = QueryBuilder.new("users")
  .where("age >= 20")
  .where("active = 1")
  .order("score DESC")
  .limit(10)
  .build
puts sql

# ===== Null Object 패턴 =====
class NullUser
  def name    = "익명"
  def email   = "noreply@example.com"
  def admin?  = false
  def null?   = true
  def to_s    = "NullUser"
end

class RealUser
  attr_reader :name, :email
  def initialize(name, email)
    @name, @email = name, email
  end
  def admin? = @email.include?("admin")
  def null?  = false
  def to_s   = "User(#{@name})"
end

def find_user(id)
  id == 1 ? RealUser.new("철수", "cs@example.com") : NullUser.new
end

[1, 99].each do |id|
  user = find_user(id)
  puts "#{user}: admin=#{user.admin?}, null=#{user.null?}"
end
