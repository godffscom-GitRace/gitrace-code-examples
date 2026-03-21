# [706] 해시 - Hashes
# 레벨: 1 | Ruby의 키-값 자료구조인 해시를 배웁니다

# 해시 생성
person = { "name" => "철수", "age" => 25, "city" => "서울" }
scores = { alice: 90, bob: 85, charlie: 92 }  # 심볼 키 (권장)

puts person.inspect
puts scores.inspect

# 접근
puts person["name"]
puts scores[:alice]
puts scores.fetch(:bob)
puts scores.fetch(:unknown, 0)   # 기본값

# 수정
scores[:dave] = 88
scores[:alice] = 95
scores.delete(:bob)
puts scores.inspect

# 정보
puts scores.length
puts scores.key?(:alice)
puts scores.value?(92)
puts scores.empty?

# 순회
scores.each do |name, score|
  puts "#{name}: #{score}"
end

scores.each_key   { |k| print "#{k} " }; puts
scores.each_value { |v| print "#{v} " }; puts

# 변환
puts scores.keys.inspect
puts scores.values.inspect
puts scores.map { |k, v| [k, v * 1.1] }.to_h.inspect
puts scores.select { |_, v| v >= 90 }.inspect
puts scores.reject { |_, v| v < 90 }.inspect
puts scores.min_by { |_, v| v }.inspect
puts scores.max_by { |_, v| v }.inspect
puts scores.sort_by { |_, v| v }.inspect

# 병합
h1 = { a: 1, b: 2 }
h2 = { b: 3, c: 4 }
puts h1.merge(h2).inspect         # h2가 우선
puts h1.merge(h2) { |_, v1, v2| v1 + v2 }.inspect  # 충돌 시 합산

# 변환 유틸
puts scores.any?  { |_, v| v > 90 }
puts scores.all?  { |_, v| v > 80 }
puts scores.count { |_, v| v >= 90 }
puts scores.sum   { |_, v| v }
puts scores.values.sum.to_f / scores.size   # 평균

# 중첩 해시
config = {
  database: { host: "localhost", port: 5432 },
  cache:    { host: "localhost", port: 6379 }
}
puts config.dig(:database, :port)
