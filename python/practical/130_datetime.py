# [130] 날짜와 시간 (Date & Time)
# 레벨: 3 | datetime 모듈로 날짜/시간을 다루는 방법입니다

from datetime import datetime, date, timedelta
import calendar


print("=== NOW ===")

now = datetime.now()
today = date.today()

print(now)
print(today)
print(now.year, now.month, now.day)
print(now.hour, now.minute, now.second)


print("\n=== CREATE DATE ===")

d1 = date(2026, 2, 17)
d2 = datetime(2026, 12, 25, 18, 30)

print(d1)
print(d2)


print("\n=== FORMAT ===")

fmt_list = [
    "%Y-%m-%d",
    "%Y/%m/%d %H:%M",
    "%Y년 %m월 %d일",
    "%A"
]

for f in fmt_list:
    print(now.strftime(f))


print("\n=== PARSE ===")

samples = [
    ("2026-02-17", "%Y-%m-%d"),
    ("2026/02/17", "%Y/%m/%d")
]

for s, f in samples:
    print(datetime.strptime(s, f))


print("\n=== DATE MATH ===")

today = date.today()

print("today:", today)
print("+30:", today + timedelta(days=30))
print("-7:", today - timedelta(days=7))

christmas = date(2026, 12, 25)
print("D-day:", (christmas - today).days)


print("\n=== WORK TIME ===")

start = datetime(2026, 2, 17, 9, 0)
end = datetime(2026, 2, 17, 18, 0)

diff = end - start
print(diff)
print(diff.total_seconds() / 3600)


print("\n=== WEEKDAY ===")

days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

print(days[date.today().weekday()])


print("\n=== CALENDAR ===")

y, m = today.year, today.month
print(calendar.month(y, m))


print("\n=== AGE ===")

def age(birth):
    t = date.today()
    a = t.year - birth.year
    if (t.month, t.day) < (birth.month, birth.day):
        a -= 1
    return a

print(age(date(1995, 8, 15)))


print("\n=== DDAY ===")

events = {
    "xmas": date(2026, 12, 25),
    "newyear": date(2027, 1, 1)
}

for k, v in events.items():
    d = (v - date.today()).days
    print(k, d)
