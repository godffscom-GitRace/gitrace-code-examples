# [119] 옵저버 패턴 (Observer Pattern)
# 레벨: 4 | 객체 상태 변화를 다른 객체들에게 자동으로 알리는 패턴입니다

from abc import ABC, abstractmethod

# 옵저버 인터페이스
class Observer(ABC):
    @abstractmethod
    def update(self, event, data):
        pass

# 서브젝트 (발행자)
class EventEmitter:
    def __init__(self):
        self._observers = {}

    def subscribe(self, event, observer):
        if event not in self._observers:
            self._observers[event] = []
        self._observers[event].append(observer)

    def unsubscribe(self, event, observer):
        if event in self._observers:
            self._observers[event].remove(observer)

    def notify(self, event, data=None):
        for observer in self._observers.get(event, []):
            observer.update(event, data)

# 구체적 옵저버들
class EmailNotifier(Observer):
    def __init__(self, email):
        self.email = email

    def update(self, event, data):
        print(f"  📧 {self.email}에게 메일: [{event}] {data}")

class LogWriter(Observer):
    def __init__(self):
        self.logs = []

    def update(self, event, data):
        log = f"[{event}] {data}"
        self.logs.append(log)
        print(f"  📝 로그 기록: {log}")

class SlackNotifier(Observer):
    def __init__(self, channel):
        self.channel = channel

    def update(self, event, data):
        print(f"  💬 #{self.channel}: [{event}] {data}")

# 쇼핑몰 주문 시스템
class OrderSystem(EventEmitter):
    def place_order(self, item, price):
        print(f"\n주문 접수: {item} ({price:,}원)")
        self.notify("order_placed", f"{item} {price:,}원")

    def ship_order(self, item):
        print(f"\n배송 시작: {item}")
        self.notify("order_shipped", f"{item} 배송 출발")

    def cancel_order(self, item):
        print(f"\n주문 취소: {item}")
        self.notify("order_cancelled", f"{item} 취소됨")

# 사용
print("=== 옵저버 패턴 - 쇼핑몰 ===")
shop = OrderSystem()

email = EmailNotifier("user@example.com")
logger = LogWriter()
slack = SlackNotifier("주문알림")

# 이벤트별 구독
shop.subscribe("order_placed", email)
shop.subscribe("order_placed", logger)
shop.subscribe("order_placed", slack)
shop.subscribe("order_shipped", email)
shop.subscribe("order_shipped", slack)
shop.subscribe("order_cancelled", email)

shop.place_order("노트북", 1500000)
shop.ship_order("노트북")

# 구독 해제
shop.unsubscribe("order_placed", slack)
shop.place_order("마우스", 35000)

# 날씨 모니터링 예제
print("\n\n=== 옵저버 패턴 - 날씨 ===")

class WeatherStation(EventEmitter):
    def __init__(self):
        super().__init__()
        self._temp = 0

    @property
    def temperature(self):
        return self._temp

    @temperature.setter
    def temperature(self, value):
        old = self._temp
        self._temp = value
        if value != old:
            self.notify("temp_changed", {"old": old, "new": value})
            if value > 35:
                self.notify("heat_warning", value)

class Display(Observer):
    def __init__(self, name):
        self.name = name

    def update(self, event, data):
        if event == "temp_changed":
            print(f"  [{self.name}] {data['old']}°C → {data['new']}°C")
        elif event == "heat_warning":
            print(f"  [{self.name}] ⚠️ 폭염 경보! {data}°C")

station = WeatherStation()
display1 = Display("거실")
display2 = Display("사무실")

station.subscribe("temp_changed", display1)
station.subscribe("temp_changed", display2)
station.subscribe("heat_warning", display1)

station.temperature = 25
station.temperature = 36  # 폭염 경보
