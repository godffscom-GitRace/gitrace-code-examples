# [117] 싱글톤 패턴 (Singleton Pattern)
# 레벨: 4 | 클래스의 인스턴스가 하나만 존재하도록 보장하는 패턴입니다

# 방법 1: __new__ 오버라이드
class Singleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self, value=None):
        if not hasattr(self, '_initialized'):
            self.value = value
            self._initialized = True

# 테스트
a = Singleton("첫 번째")
b = Singleton("두 번째")

print("=== 싱글톤 패턴 ===")
print(f"a.value = {a.value}")  # 첫 번째
print(f"b.value = {b.value}")  # 첫 번째 (같은 인스턴스)
print(f"a is b: {a is b}")    # True

# 방법 2: 데코레이터 활용
def singleton(cls):
    instances = {}
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return get_instance

@singleton
class Database:
    def __init__(self, host="localhost"):
        self.host = host
        self.connected = False
        print(f"  DB 인스턴스 생성: {host}")

    def connect(self):
        self.connected = True
        print(f"  {self.host} 연결 완료")

print("\n=== 데코레이터 싱글톤 ===")
db1 = Database("mysql.server.com")
db2 = Database("other.server.com")  # 생성 안 됨
print(f"db1 is db2: {db1 is db2}")  # True
print(f"host: {db1.host}")          # mysql.server.com

# 방법 3: 메타클래스
class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class AppConfig(metaclass=SingletonMeta):
    def __init__(self):
        self.settings = {}

    def set(self, key, value):
        self.settings[key] = value

    def get(self, key):
        return self.settings.get(key)

print("\n=== 메타클래스 싱글톤 ===")
config1 = AppConfig()
config1.set("theme", "dark")
config2 = AppConfig()
print(f"config1 is config2: {config1 is config2}")  # True
print(f"theme: {config2.get('theme')}")              # dark

# 활용: 로거
print("\n=== 싱글톤 로거 ===")

@singleton
class Logger:
    def __init__(self):
        self.logs = []

    def log(self, message):
        self.logs.append(message)
        print(f"  [LOG] {message}")

    def show_all(self):
        print(f"  총 {len(self.logs)}개 로그")

logger1 = Logger()
logger1.log("앱 시작")
logger2 = Logger()
logger2.log("사용자 로그인")
logger1.show_all()  # 2개 (같은 인스턴스)
