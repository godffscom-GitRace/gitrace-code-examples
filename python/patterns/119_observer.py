# [119] 옵저버 패턴 (Observer Pattern)
# 레벨: 4 | 객체 상태 변화를 다른 객체들에게 자동으로 알리는 패턴입니다

from abc import ABC, abstractmethod


class Observer(ABC):
    @abstractmethod
    def update(self, event, data):
        pass


class EventManager:
    def __init__(self):
        self.subscribers = {}

    def subscribe(self, event, observer):
        if event not in self.subscribers:
            self.subscribers[event] = []
        self.subscribers[event].append(observer)

    def unsubscribe(self, event, observer):
        if event in self.subscribers:
            self.subscribers[event].remove(observer)

    def notify(self, event, data=None):
        for obs in self.subscribers.get(event, []):
            obs.update(event, data)


class EmailObserver(Observer):
    def __init__(self, email):
        self.email = email

    def update(self, event, data):
        print("EMAIL:", self.email, event, data)


class LogObserver(Observer):
    def __init__(self):
        self.logs = []

    def update(self, event, data):
        msg = f"{event}:{data}"
        self.logs.append(msg)
        print("LOG:", msg)


class SlackObserver(Observer):
    def __init__(self, channel):
        self.channel = channel

    def update(self, event, data):
        print("SLACK:", self.channel, event, data)


class OrderSystem(EventManager):
    def place_order(self, item, price):
        print("\nORDER:", item, price)
        self.notify("order", f"{item}-{price}")

    def ship_order(self, item):
        print("\nSHIP:", item)
        self.notify("ship", item)

    def cancel_order(self, item):
        print("\nCANCEL:", item)
        self.notify("cancel", item)


print("=== OBSERVER SHOP ===")
shop = OrderSystem()

email = EmailObserver("a@a.com")
log = LogObserver()
slack = SlackObserver("#order")

shop.subscribe("order", email)
shop.subscribe("order", log)
shop.subscribe("order", slack)

shop.subscribe("ship", email)
shop.subscribe("ship", slack)

shop.subscribe("cancel", email)

shop.place_order("laptop", 1200)
shop.ship_order("laptop")

shop.unsubscribe("order", slack)

shop.place_order("mouse", 50)


print("\n=== WEATHER ===")


class Weather(EventManager):
    def __init__(self):
        super().__init__()
        self.temp = 0

    def set_temp(self, value):
        old = self.temp
        self.temp = value

        self.notify("temp", {"old": old, "new": value})

        if value > 30:
            self.notify("alert", value)


class Display(Observer):
    def __init__(self, name):
        self.name = name

    def update(self, event, data):
        print(self.name, event, data)


weather = Weather()

d1 = Display("A")
d2 = Display("B")

weather.subscribe("temp", d1)
weather.subscribe("temp", d2)
weather.subscribe("alert", d1)

weather.set_temp(20)
weather.set_temp(35)
