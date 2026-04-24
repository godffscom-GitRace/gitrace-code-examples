# [10] 파일 읽기/쓰기 - File I/O
# 레벨: 3 | 파일을 읽고 쓰는 방법을 배웁니다

# Simple File I/O Practice

print("Memo App\n")

# 1. Write file
with open("memo.txt", "w", encoding="utf-8") as f:
    f.write("Hello Memo\n")
    f.write("Python File I/O\n")

print("Saved!\n")

# 2. Read file
with open("memo.txt", "r", encoding="utf-8") as f:
    content = f.read()

print("Content:")
print(content)

# 3. Append file
with open("memo.txt", "a", encoding="utf-8") as f:
    f.write("New line added\n")

print("Added new line!\n")

# 4. Read again
with open("memo.txt", "r", encoding="utf-8") as f:
    print("Updated Content:")
    print(f.read())

print("\n Your turn!")
text = input("Write memo: ")

with open("memo.txt", "a", encoding="utf-8") as f:
    f.write(text + "\n")

print("Saved your memo!")
