# [711] 에러 처리 - Error Handling
# 레벨: 1 | begin/rescue/ensure로 예외를 처리합니다

# 기본 begin/rescue
begin
  result = 10 / 0
rescue ZeroDivisionError => e
  puts "0으로 나눌 수 없습니다: #{e.message}"
end

# 여러 예외 처리
def parse_input(input)
  begin
    num = Integer(input)
    100 / num
  rescue ArgumentError => e
    puts "잘못된 입력: #{e.message}"
    nil
  rescue ZeroDivisionError
    puts "0은 사용 불가"
    nil
  rescue => e    # 모든 예외
    puts "예상치 못한 오류: #{e.class} - #{e.message}"
    nil
  else
    puts "성공!"  # 예외 없을 때 실행
    num
  ensure
    puts "항상 실행"  # finally와 동일
  end
end

parse_input("5")
parse_input("abc")
parse_input("0")

# 사용자 정의 예외
class ValidationError < StandardError
  attr_reader :field

  def initialize(field, message)
    @field = field
    super("#{field}: #{message}")
  end
end

class AgeError < ValidationError
  def initialize(age)
    super("age", "나이는 0-150 사이여야 합니다 (입력값: #{age})")
  end
end

def validate_user(name, age)
  raise ValidationError.new("name", "이름은 비어 있을 수 없습니다") if name.empty?
  raise AgeError.new(age) unless (0..150).include?(age)
  puts "유효한 사용자: #{name}(#{age})"
end

begin
  validate_user("철수", 25)
  validate_user("", 25)
rescue ValidationError => e
  puts "검증 오류 [#{e.field}]: #{e.message}"
end

begin
  validate_user("영희", 200)
rescue AgeError => e
  puts "나이 오류: #{e.message}"
end

# retry
attempts = 0
begin
  attempts += 1
  raise "연결 실패" if attempts < 3
  puts "연결 성공 (#{attempts}번째 시도)"
rescue RuntimeError => e
  puts "재시도 #{attempts}: #{e.message}"
  retry if attempts < 3
  puts "최대 재시도 횟수 초과"
end

# raise 재발생
def risky_operation
  raise "심각한 오류"
rescue => e
  puts "로그 기록: #{e.message}"
  raise  # 재발생
end

begin
  risky_operation
rescue => e
  puts "상위에서 처리: #{e.message}"
end
