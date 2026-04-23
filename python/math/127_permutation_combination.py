# [117] 싱글톤 패턴 (Singleton Pattern)
# 레벨: 4 | 클래스의 인스턴스가 하나만 존재하도록 보장하는 패턴입니다

# 방법 1: __new__ 오버라이드
class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self, value=None):
        if not hasattr(self, "initialized"):
            self.value = value
            self.initialized = True


print("=== SINGLETON ===")
a = Singleton("FIRST")
b = Singleton("SECOND")

print(a.value)
print(b.value)
print(a is b)


def singleton(cls):
    instances = {}

    def wrapper(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]

    return wrapper


@singleton
class Database:
    def __init__(self, host="localhost"):
        self.host = host
        self.connected = False


print("\n=== DECORATOR ===")
db1 = Database("mysql.server.com")
db2 = Database("other.server.com")

print(db1 is db2)
print(db1.host)


class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]


class AppConfig(metaclass=SingletonMeta):
    def __init__(self):
        self.data = {}

    def set(self, k, v):
        self.data[k] = v

    def get(self, k):
        return self.data.get(k)


print("\n=== METACLASS ===")
c1 = AppConfig()
c1.set("mode", "dark")
c2 = AppConfig()

print(c1 is c2)
print(c2.get("mode"))
