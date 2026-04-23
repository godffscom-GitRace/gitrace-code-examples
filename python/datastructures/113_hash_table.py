# [113] 해시 테이블 구현 - Hash Table
# 레벨: 4 | 빠른 검색을 위한 해시 테이블을 직접 구현합니다

class HashTable:
    def __init__(self, size=5):
        self.size = size
        self.table = [[] for _ in range(size)]

    def _hash(self, key):
        return hash(key) % self.size

    def put(self, key, value):
        index = self._hash(key)

        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                self.table[index][i] = (key, value)
                print(f"Update: {key}")
                return

        self.table[index].append((key, value))
        print(f"Add: {key}")

    def get(self, key):
        index = self._hash(key)

        for k, v in self.table[index]:
            if k == key:
                return v

        return None


print("⚡ Hash Game\n")

ht = HashTable()

ht.put("A", 10)
ht.put("B", 20)
ht.put("C", 30)

print("\nGet A:", ht.get("A"))

ht.put("A", 99)

print("Get A after update:", ht.get("A"))

print("\n🎯 Your turn!")
key = input("Enter key: ")
value = int(input("Enter value: "))
ht.put(key, value)

print("Result:", ht.get(key))
