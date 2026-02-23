# [113] 해시 테이블 구현 - Hash Table
# 레벨: 4 | 빠른 검색을 위한 해시 테이블을 직접 구현합니다

class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]  # 체이닝용 리스트

    # 해시 함수
    def _hash(self, key):
        return hash(key) % self.size

    def put(self, key, value):
        index = self._hash(key)
        # 기존 키 업데이트
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                self.table[index][i] = (key, value)
                return
        # 새 키 추가
        self.table[index].append((key, value))

    def get(self, key):
        index = self._hash(key)
        for k, v in self.table[index]:
            if k == key:
                return v
        raise KeyError(f"'{key}' not found")

    def remove(self, key):
        index = self._hash(key)
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                del self.table[index][i]
                return
        raise KeyError(f"'{key}' not found")

    def contains(self, key):
        index = self._hash(key)
        return any(k == key for k, v in self.table[index])

    def display(self):
        for i, bucket in enumerate(self.table):
            if bucket:
                items = ", ".join(f"{k}: {v}" for k, v in bucket)
                print(f"  [{i}] {items}")

# 사용
ht = HashTable(7)
ht.put("김철수", 85)
ht.put("이영희", 92)
ht.put("박민수", 78)
ht.put("최지은", 95)

print("=== 해시 테이블 ===")
ht.display()

print(f"\n김철수: {ht.get('김철수')}점")
print(f"이영희 존재? {ht.contains('이영희')}")

ht.put("김철수", 90)  # 업데이트
print(f"김철수 업데이트: {ht.get('김철수')}점")

ht.remove("박민수")
print(f"박민수 삭제 후:")
ht.display()

# 해시 충돌 시각화
print("\n=== 충돌 확인 ===")
ht2 = HashTable(3)  # 작은 크기로 충돌 유발
for name in ["A", "B", "C", "D", "E"]:
    ht2.put(name, ord(name))
ht2.display()

# 시간 복잡도: 평균 O(1), 최악 O(n) - 모든 키가 충돌
