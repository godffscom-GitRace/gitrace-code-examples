# [130] 날짜와 시간 (Date & Time)
# 레벨: 3 | datetime 모듈로 날짜/시간을 다루는 방법입니다

from datetime import datetime, date, time, timedelta
import calendar

# === 현재 날짜/시간 ===
print("=== 현재 날짜/시간 ===")
now = datetime.now()
today = date.today()
print(f"  현재: {now}")
print(f"  오늘: {today}")
print(f"  연: {now.year}, 월: {now.month}, 일: {now.day}")
print(f"  시: {now.hour}, 분: {now.minute}, 초: {now.second}")

# === 날짜 생성 ===
print("\n=== 날짜 생성 ===")
d1 = date(2026, 2, 17)
d2 = datetime(2026, 12, 25, 18, 30, 0)
t1 = time(14, 30, 0)
print(f"  날짜: {d1}")
print(f"  날짜시간: {d2}")
print(f"  시간: {t1}")

# === 포맷팅 (strftime) ===
print("\n=== 날짜 포맷팅 ===")
now = datetime.now()
formats = {
    "%Y-%m-%d": "기본",
    "%Y년 %m월 %d일": "한국식",
    "%Y/%m/%d %H:%M:%S": "상세",
    "%A, %B %d, %Y": "영어식",
    "%p %I시 %M분": "12시간제",
}
for fmt, label in formats.items():
    print(f"  {label}: {now.strftime(fmt)}")

# === 파싱 (strptime) ===
print("\n=== 문자열 → 날짜 ===")
date_strings = [
    ("2026-02-17", "%Y-%m-%d"),
    ("17/02/2026", "%d/%m/%Y"),
    ("2026년 02월 17일", "%Y년 %m월 %d일"),
]
for s, fmt in date_strings:
    parsed = datetime.strptime(s, fmt)
    print(f"  '{s}' → {parsed.date()}")

# === 날짜 연산 ===
print("\n=== 날짜 연산 ===")
today = date.today()

# timedelta
future = today + timedelta(days=30)
past = today - timedelta(weeks=2)
print(f"  오늘: {today}")
print(f"  30일 후: {future}")
print(f"  2주 전: {past}")

# 두 날짜 차이
christmas = date(2026, 12, 25)
diff = christmas - today
print(f"  크리스마스까지: {diff.days}일")

# 시간 차이
start = datetime(2026, 2, 17, 9, 0, 0)
end = datetime(2026, 2, 17, 17, 30, 0)
work = end - start
hours = work.total_seconds() / 3600
print(f"  근무시간: {work} ({hours}시간)")

# === 요일 ===
print("\n=== 요일 확인 ===")
days_kr = ["월", "화", "수", "목", "금", "토", "일"]
d = date.today()
print(f"  오늘: {days_kr[d.weekday()]}요일")

# 이번 달 달력
print(f"\n  {d.year}년 {d.month}월 달력:")
cal = calendar.month(d.year, d.month)
print(cal)

# === 활용: 나이 계산 ===
def calc_age(birth_date):
    today = date.today()
    age = today.year - birth_date.year
    if (today.month, today.day) < (birth_date.month, birth_date.day):
        age -= 1
    return age

print("=== 나이 계산 ===")
birth = date(1995, 8, 15)
age = calc_age(birth)
print(f"  생년월일: {birth}")
print(f"  만 나이: {age}세")

# === 활용: D-Day 계산기 ===
print("\n=== D-Day 계산기 ===")
events = {
    "크리스마스": date(2026, 12, 25),
    "새해": date(2027, 1, 1),
    "어린이날": date(2026, 5, 5),
}
today = date.today()
for name, d in events.items():
    diff = (d - today).days
    if diff > 0:
        print(f"  {name}: D-{diff}")
    elif diff == 0:
        print(f"  {name}: D-Day!")
    else:
        print(f"  {name}: D+{abs(diff)}")
