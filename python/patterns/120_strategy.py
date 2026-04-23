# [120] 전략 패턴 (Strategy Pattern)
# 레벨: 4 | 알고리즘을 캡슐화하여 런타임에 교체 가능하게 하는 패턴입니다

from abc import ABC, abstractmethod


class SortStrategy(ABC):
    @abstractmethod
    def sort(self, data):
        pass


class BubbleSort(SortStrategy):
    def sort(self, data):
        arr = data[:]
        for i in range(len(arr)):
            for j in range(len(arr) - 1):
                if arr[j] > arr[j + 1]:
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
        return arr


class QuickSort(SortStrategy):
    def sort(self, data):
        if len(data) <= 1:
            return data
        pivot = data[0]
        left = [x for x in data if x < pivot]
        mid = [x for x in data if x == pivot]
        right = [x for x in data if x > pivot]
        return self.sort(left) + mid + self.sort(right)


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


class Sorter:
    def __init__(self, strategy):
        self.strategy = strategy

    def set_strategy(self, strategy):
        self.strategy = strategy

    def run(self, data):
        print(self.strategy.__class__.__name__)
        result = self.strategy.sort(data)
        print(result)


print("=== SORT STRATEGY ===")

data = [5, 3, 8, 1, 2]
sorter = Sorter(BubbleSort())

sorter.run(data)
sorter.set_strategy(QuickSort())
sorter.run(data)
sorter.set_strategy(InsertionSort())
sorter.run(data)


class DiscountStrategy(ABC):
    @abstractmethod
    def apply(self, price):
        pass


class NoDiscount(DiscountStrategy):
    def apply(self, price):
        return price


class PercentDiscount(DiscountStrategy):
    def __init__(self, p):
        self.p = p

    def apply(self, price):
        return price * (1 - self.p / 100)


class FixedDiscount(DiscountStrategy):
    def __init__(self, a):
        self.a = a

    def apply(self, price):
        return max(0, price - self.a)


class Cart:
    def __init__(self):
        self.items = []
        self.discount = NoDiscount()

    def add(self, name, price):
        self.items.append(price)

    def set_discount(self, d):
        self.discount = d

    def checkout(self):
        total = sum(self.items)
        final = self.discount.apply(total)
        print(total, final)


print("\n=== DISCOUNT ===")

cart = Cart()
cart.add("a", 100)
cart.add("b", 200)

cart.set_discount(NoDiscount())
cart.checkout()

cart.set_discount(PercentDiscount(10))
cart.checkout()

cart.set_discount(FixedDiscount(50))
cart.checkout()
