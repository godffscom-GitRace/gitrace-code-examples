// [103] 표준 입출력 - Standard I/O
// 레벨: 1 | printf와 scanf로 입력과 출력을 처리합니다

#include <stdio.h>

int main() {
    int age;
    float height;
    char name[50];

    // printf: 출력
    printf("=== 개인정보 입력 ===\n");

    // scanf: 입력 (&변수명으로 주소 전달)
    printf("이름을 입력하세요: ");
    scanf("%s", name);  // 문자열은 & 불필요

    printf("나이를 입력하세요: ");
    scanf("%d", &age);

    printf("키를 입력하세요 (cm): ");
    scanf("%f", &height);

    // 입력받은 값 출력
    printf("\n=== 입력 결과 ===\n");
    printf("이름: %s\n", name);
    printf("나이: %d세\n", age);
    printf("키: %.1f cm\n", height);

    // 서식 지정자 정리
    // %d  - 정수(int)
    // %f  - 실수(float)
    // %lf - 실수(double)
    // %c  - 문자(char)
    // %s  - 문자열
    // %ld - 정수(long)

    return 0;
}
