# [719] DSL 만들기 - Building DSL
# 레벨: 3 | Ruby로 내부 DSL을 만드는 기법을 배웁니다

# ===== 설정 DSL =====
class AppConfig
  attr_reader :settings

  def initialize(&block)
    @settings = {}
    instance_eval(&block) if block
  end

  def method_missing(name, *args)
    if args.empty?
      @settings[name]
    else
      @settings[name] = args.length == 1 ? args[0] : args
    end
  end
end

config = AppConfig.new do
  app_name    "GitRace"
  version     "2.0.0"
  debug       false
  max_users   1000
  database    host: "localhost", port: 5432
end

puts config.settings.inspect

# ===== 라우터 DSL =====
class Router
  Route = Struct.new(:method, :path, :handler)

  def initialize(&block)
    @routes = []
    instance_eval(&block) if block
  end

  %w[get post put delete].each do |method|
    define_method(method) do |path, &handler|
      @routes << Route.new(method.upcase, path, handler)
    end
  end

  def match(method, path)
    @routes.find { |r| r.method == method.upcase && r.path == path }
  end

  def dispatch(method, path, params = {})
    route = match(method, path)
    route ? route.handler.(params) : "404 Not Found"
  end
end

router = Router.new do
  get("/")        { |_| "홈페이지" }
  get("/users")   { |p| "사용자 목록: #{p}" }
  post("/users")  { |p| "사용자 생성: #{p[:name]}" }
  delete("/users"){ |p| "사용자 삭제: #{p[:id]}" }
end

puts router.dispatch("GET", "/")
puts router.dispatch("GET", "/users", { page: 1 })
puts router.dispatch("POST", "/users", { name: "철수" })
puts router.dispatch("GET", "/missing")

# ===== 검증 DSL =====
class Validator
  def initialize(&block)
    @rules = []
    instance_eval(&block) if block
  end

  def required(field) = @rules << ->(data) {
    data[field].nil? || data[field].to_s.empty? ? "#{field} 필수" : nil
  }

  def min_length(field, len) = @rules << ->(data) {
    val = data[field].to_s
    val.length >= len ? nil : "#{field} 최소 #{len}자"
  }

  def format(field, regex, msg) = @rules << ->(data) {
    data[field].to_s.match?(regex) ? nil : "#{field} #{msg}"
  }

  def validate(data)
    errors = @rules.filter_map { |rule| rule.(data) }
    errors.empty? ? { valid: true } : { valid: false, errors: errors }
  end
end

user_validator = Validator.new do
  required :name
  min_length :name, 2
  required :email
  format :email, /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i, "형식 오류"
  min_length :password, 8
end

puts user_validator.validate({ name: "철수", email: "cs@test.com", password: "password123" }).inspect
puts user_validator.validate({ name: "A", email: "invalid", password: "1234" }).inspect
