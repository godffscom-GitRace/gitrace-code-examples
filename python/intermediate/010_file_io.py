# [10] 파일 읽기/쓰기 - File I/O
# 레벨: 3 | 파일을 읽고 쓰는 방법을 배웁니다

# write() - 파일 쓰기
with open("memo.txt", "w", encoding="utf-8") as f:
    f.write("첫 번째 메모입니다.\n")
    f.write("두 번째 메모입니다.\n")
    f.write("세 번째 메모입니다.\n")

print("메모 저장 완료!")

# read() - 전체 읽기
with open("memo.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print("=== 전체 읽기 ===")
    print(content)

# readline() - 한 줄씩 읽기
with open("memo.txt", "r", encoding="utf-8") as f:
    print("=== 한 줄씩 읽기 ===")
    line = f.readline()
    while line:
        print(line.strip())
        line = f.readline()

# readlines() - 리스트로 읽기
with open("memo.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()
    print(f"\n총 {len(lines)}줄")

# writelines() - 여러 줄 쓰기
new_memos = ["메모 A\n", "메모 B\n", "메모 C\n"]
with open("memo.txt", "a", encoding="utf-8") as f:
    f.writelines(new_memos)

# with 문 사용 - 자동으로 파일 닫기 처리
# with 없이 사용하면 f.close()를 직접 호출해야 함
print("파일 작업 완료!")
