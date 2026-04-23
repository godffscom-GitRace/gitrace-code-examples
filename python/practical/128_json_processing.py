# [128] JSON 처리 (JSON Processing)
# 레벨: 3 | JSON 데이터를 읽고, 쓰고, 변환하는 방법입니다

import json
import os
from datetime import datetime, date


print("=== PYTHON TO JSON ===")

user = {
    "name": "Alice",
    "age": 25,
    "skills": ["Python", "JS", "SQL"],
    "active": True,
    "address": {
        "city": "Seoul",
        "district": "Gangnam"
    },
    "score": None
}

json_str = json.dumps(user, ensure_ascii=False, indent=2)
print(json_str)


print("\n=== JSON TO PYTHON ===")

text = '{"name": "Bob", "age": 30, "hobby": ["read", "code"]}'
data = json.loads(text)

print(data["name"])
print(data["age"])
print(",".join(data["hobby"]))


print("\n=== FILE SAVE/LOAD ===")

file = "users.json"

users = [
    {"id": 1, "name": "A", "email": "a@mail.com"},
    {"id": 2, "name": "B", "email": "b@mail.com"},
]

with open(file, "w", encoding="utf-8") as f:
    json.dump(users, f, ensure_ascii=False, indent=2)

with open(file, "r", encoding="utf-8") as f:
    loaded = json.load(f)

for u in loaded:
    print(u["id"], u["name"])

os.remove(file)


print("\n=== NESTED JSON ===")

company = {
    "name": "Tech",
    "departments": [
        {
            "name": "Dev",
            "members": [
                {"name": "Kim", "role": "lead"},
                {"name": "Lee", "role": "dev"}
            ]
        },
        {
            "name": "Design",
            "members": [
                {"name": "Park", "role": "lead"}
            ]
        }
    ]
}

for d in company["departments"]:
    print(d["name"])
    for m in d["members"]:
        print("-", m["name"])


print("\n=== CUSTOM ENCODER ===")

class Encoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (datetime, date)):
            return obj.isoformat()
        if isinstance(obj, set):
            return list(obj)
        return super().default(obj)


data = {
    "event": "meeting",
    "date": date(2026, 1, 1),
    "tags": {"urgent", "work"}
}

print(json.dumps(data, cls=Encoder, indent=2, ensure_ascii=False))


print("\n=== JSON COMPARE ===")

a = {"a": 1, "b": [1, 2]}
b = {"b": [1, 2], "a": 1}
c = {"a": 1, "b": [1, 3]}

print(a == b)
print(a == c)


print("\n=== SAFE PARSE ===")

tests = [
    '{"ok": true}',
    '{bad json}',
    ''
]

for t in tests:
    try:
        print(json.loads(t))
    except Exception as e:
        print("error")
