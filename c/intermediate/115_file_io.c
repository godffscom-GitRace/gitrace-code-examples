// [115] 파일 입출력 - File I/O
// 레벨: 3 | fopen, fprintf, fscanf, fclose로 파일을 읽고 씁니다

#include <stdio.h>
#include <stdlib.h>

int main() {
    // ===== 파일 쓰기 =====
    // fopen(파일명, 모드): "w"=쓰기, "r"=읽기, "a"=추가, "rb"=바이너리
    FILE *fp = fopen("students.txt", "w");

    if (fp == NULL) {
        printf("파일 열기 실패!\n");
        return 1;
    }

    // fprintf: 파일에 형식 출력
    fprintf(fp, "김철수 88 A\n");
    fprintf(fp, "이영희 95 A\n");
    fprintf(fp, "박민수 72 C\n");
    fprintf(fp, "최지영 81 B\n");
    fprintf(fp, "정호준 65 D\n");

    fclose(fp);  // 반드시 닫기
    printf("파일 쓰기 완료: students.txt\n");

    // ===== 파일 읽기 =====
    fp = fopen("students.txt", "r");

    if (fp == NULL) {
        printf("파일 읽기 실패!\n");
        return 1;
    }

    printf("\n=== 파일 내용 ===\n");

    char name[30];
    int score;
    char grade;

    // fscanf: 파일에서 형식 입력 (EOF까지 반복)
    while (fscanf(fp, "%s %d %c", name, &score, &grade) == 3) {
        printf("이름: %-10s 점수: %3d 학점: %c\n", name, score, grade);
    }

    fclose(fp);

    // ===== 한 줄씩 읽기 (fgets) =====
    fp = fopen("students.txt", "r");
    printf("\n=== fgets로 읽기 ===\n");

    char line[100];
    int lineNum = 1;
    while (fgets(line, sizeof(line), fp) != NULL) {
        printf("줄 %d: %s", lineNum++, line);
    }

    fclose(fp);

    // ===== 파일 끝에 추가 (append 모드) =====
    fp = fopen("students.txt", "a");
    fprintf(fp, "홍길동 90 A\n");
    fclose(fp);
    printf("\n학생 추가 완료!\n");

    return 0;
}
