# [8] 문자열 다루기 - String Methods
# 레벨: 2 | 문자열을 조작하는 다양한 메서드를 학습합니다

text = "  Hello, Python World!  "

# upper(), lower(), strip()
print(text.upper())          # "  HELLO, PYTHON WORLD!  "
print(text.lower())          # "  hello, python world!  "
print(text.strip())          # "Hello, Python World!"

# 문자열 슬라이싱
word = "Programming"
print(word[0:4])    # Prog
print(word[::-1])   # gnimmargorP (역순)

# split(), join()
csv = "사과,바나나,딸기,포도"
fruits = csv.split(",")
print(fruits)                # ['사과', '바나나', '딸기', '포도']

result = " & ".join(fruits)
print(result)                # 사과 & 바나나 & 딸기 & 포도

# replace(), find()
msg = "나는 Python을 좋아합니다"
print(msg.replace("좋아합니다", "사랑합니다"))
print(msg.find("Python"))    # 3 (인덱스)
print(msg.find("Java"))      # -1 (없음)

# 문자열 포맷팅 활용
name, score = "김철수", 95
print(f"{name}의 점수는 {score}점입니다")
print(f"{'합격' if score >= 60 else '불합격'}")
