# [8] 문자열 다루기 - String Methods
# 레벨: 2 | 문자열을 조작하는 다양한 메서드를 학습합니다

# String Practice

text = "Hello Python"

print(text.upper())
print(text.strip())

word = "code"
print(word[::-1])

csv = "apple,banana,grape"
items = csv.split(",")
print(items)

print(" & ".join(items))

msg = "I like Python"
print(msg.replace("like", "love"))
print(msg.find("Python"))

name, score = "Tom", 85
print(f"{name}: {score}")
