# [120] 전략 패턴 (Strategy Pattern)
# 레벨: 4 | 알고리즘을 캡슐화하여 런타임에 교체 가능하게 하는 패턴입니다

from abc import ABC, abstractmethod

# 전략 인터페이스
class SortStrategy(ABC):
    @abstractmethod
    def sort(self, data):
        pass

    @abstractmethod
    def name(self):
        pass

# 구체적 전략들
class BubbleSort(SortStrategy):
    def sort(self, data):
        arr = data[:]
        n = len(arr)
        for i in range(n):
            for j in range(0, n - i - 1):
                if arr[j] > arr[j + 1]:
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
        return arr

    def name(self):
        return "버블 정렬"

class QuickSort(SortStrategy):
    def sort(self, data):
        if len(data) <= 1:
            return data
        pivot = data[len(data) // 2]
        left = [x for x in data if x < pivot]
        mid = [x for x in data if x == pivot]
        right = [x for x in data if x > pivot]
        return self.sort(left) + mid + self.sort(right)

    def name(self):
        return "퀵 정렬"

class InsertionSort(SortStrategy):
    def sort(self, data):
        arr = data[:]
        for i in range(1, len(arr)):
            key = arr[i]
            j = i - 1
            while j >= 0 and arr[j] > key:
                arr[j + 1] = arr[j]
                j -= 1
            arr[j + 1] = key
        return arr

    def name(self):
        return "삽입 정렬"

# 컨텍스트
class Sorter:
    def __init__(self, strategy=None):
        self._strategy = strategy

    def set_strategy(self, strategy):
        self._strategy = strategy

    def sort(self, data):
        print(f"  전략: {self._strategy.name()}")
        result = self._strategy.sort(data)
        print(f"  결과: {result}")
        return result

# 사용
print("=== 전략 패턴 - 정렬 ===")
data = [64, 34, 25, 12, 22, 11, 90]
print(f"원본: {data}\n")

sorter = Sorter()
for strategy in [BubbleSort(), QuickSort(), InsertionSort()]:
    sorter.set_strategy(strategy)
    sorter.sort(data)
    print()

# 할인 전략 예제
class DiscountStrategy(ABC):
    @abstractmethod
    def calculate(self, price):
        pass

class NoDiscount(DiscountStrategy):
    def calculate(self, price):
        return price

class PercentDiscount(DiscountStrategy):
    def __init__(self, percent):
        self.percent = percent

    def calculate(self, price):
        return price * (1 - self.percent / 100)

class FixedDiscount(DiscountStrategy):
    def __init__(self, amount):
        self.amount = amount

    def calculate(self, price):
        return max(0, price - self.amount)

class VIPDiscount(DiscountStrategy):
    def calculate(self, price):
        if price >= 100000:
            return price * 0.7   # 30% 할인
        return price * 0.85      # 15% 할인

class ShoppingCart:
    def __init__(self):
        self.items = []
        self._discount = NoDiscount()

    def add_item(self, name, price):
        self.items.append((name, price))

    def set_discount(self, strategy):
        self._discount = strategy

    def checkout(self):
        total = sum(p for _, p in self.items)
        final = self._discount.calculate(total)
        print(f"  상품 합계: {total:,.0f}원")
        print(f"  할인 적용: {final:,.0f}원")
        print(f"  할인액: {total - final:,.0f}원")
        return final

print("=== 전략 패턴 - 할인 ===")
cart = ShoppingCart()
cart.add_item("노트북", 1200000)
cart.add_item("마우스", 35000)

print("\n일반 결제:")
cart.set_discount(NoDiscount())
cart.checkout()

print("\n20% 할인 쿠폰:")
cart.set_discount(PercentDiscount(20))
cart.checkout()

print("\n5만원 할인:")
cart.set_discount(FixedDiscount(50000))
cart.checkout()

print("\nVIP 할인:")
cart.set_discount(VIPDiscount())
cart.checkout()
