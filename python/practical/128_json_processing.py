# [128] JSON 처리 (JSON Processing)
# 레벨: 3 | JSON 데이터를 읽고, 쓰고, 변환하는 방법입니다

import json
import os

# === 기본 JSON 변환 ===
print("=== Python → JSON 변환 ===")

# 딕셔너리 → JSON 문자열
user = {
    "name": "김철수",
    "age": 28,
    "skills": ["Python", "JavaScript", "SQL"],
    "is_active": True,
    "address": {
        "city": "서울",
        "district": "강남구"
    },
    "score": None
}

json_str = json.dumps(user, ensure_ascii=False, indent=2)
print(json_str)

# JSON 문자열 → 딕셔너리
print("\n=== JSON → Python 변환 ===")
json_text = '{"name": "이영희", "age": 25, "hobby": ["독서", "코딩"]}'
data = json.loads(json_text)
print(f"  이름: {data['name']}")
print(f"  나이: {data['age']}")
print(f"  취미: {', '.join(data['hobby'])}")

# === JSON 파일 읽기/쓰기 ===
print("\n=== JSON 파일 쓰기 ===")
users = [
    {"id": 1, "name": "홍길동", "email": "hong@example.com"},
    {"id": 2, "name": "김영수", "email": "kim@example.com"},
    {"id": 3, "name": "박지민", "email": "park@example.com"},
]

filepath = "temp_users.json"
with open(filepath, "w", encoding="utf-8") as f:
    json.dump(users, f, ensure_ascii=False, indent=2)
print(f"  {filepath} 저장 완료")

print("\n=== JSON 파일 읽기 ===")
with open(filepath, "r", encoding="utf-8") as f:
    loaded = json.load(f)
for u in loaded:
    print(f"  [{u['id']}] {u['name']} ({u['email']})")

# 임시 파일 삭제
os.remove(filepath)

# === 중첩 JSON 탐색 ===
print("\n=== 중첩 JSON 데이터 ===")
company = {
    "company": "테크코",
    "departments": [
        {
            "name": "개발팀",
            "members": [
                {"name": "김개발", "role": "팀장"},
                {"name": "이코딩", "role": "시니어"},
            ]
        },
        {
            "name": "디자인팀",
            "members": [
                {"name": "박디자", "role": "팀장"},
            ]
        }
    ]
}

for dept in company["departments"]:
    print(f"\n  {dept['name']}:")
    for member in dept["members"]:
        print(f"    - {member['name']} ({member['role']})")

# === 커스텀 JSON 인코딩 ===
print("\n=== 커스텀 인코더 ===")
from datetime import datetime, date

class CustomEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (datetime, date)):
            return obj.isoformat()
        if isinstance(obj, set):
            return list(obj)
        return super().default(obj)

data = {
    "event": "회의",
    "date": date(2026, 2, 17),
    "tags": {"중요", "긴급"},
}

result = json.dumps(data, cls=CustomEncoder, ensure_ascii=False, indent=2)
print(result)

# === JSON 비교 ===
print("\n=== JSON 비교 ===")
json1 = {"a": 1, "b": [1, 2, 3]}
json2 = {"b": [1, 2, 3], "a": 1}
json3 = {"a": 1, "b": [1, 2, 4]}

print(f"  json1 == json2: {json1 == json2}")  # True (순서 무관)
print(f"  json1 == json3: {json1 == json3}")  # False

# === 안전한 JSON 파싱 ===
print("\n=== 안전한 파싱 ===")
bad_jsons = [
    '{"valid": true}',
    '{invalid json}',
    '',
]

for text in bad_jsons:
    try:
        result = json.loads(text)
        print(f"  성공: {result}")
    except json.JSONDecodeError as e:
        print(f"  오류: {e.msg} ('{text[:20]}')")
