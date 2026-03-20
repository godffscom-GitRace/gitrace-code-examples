// [107] for 반복문 - for Loop
// 레벨: 1 | for 반복문으로 반복 작업을 처리하는 방법을 배웁니다

#include <stdio.h>

int main() {
    // 기본 for문: for(초기식; 조건식; 증감식)
    printf("1부터 10까지:\n");
    for (int i = 1; i <= 10; i++) {
        printf("%d ", i);
    }
    printf("\n");

    // 역순 반복
    printf("\n10부터 1까지 (역순):\n");
    for (int i = 10; i >= 1; i--) {
        printf("%d ", i);
    }
    printf("\n");

    // 짝수만 출력
    printf("\n1~20 중 짝수:\n");
    for (int i = 2; i <= 20; i += 2) {
        printf("%d ", i);
    }
    printf("\n");

    // 합계 계산
    int sum = 0;
    for (int i = 1; i <= 100; i++) {
        sum += i;
    }
    printf("\n1~100 합계: %d\n", sum);

    // 구구단 (중첩 for문)
    printf("\n=== 구구단 (3단) ===\n");
    for (int i = 1; i <= 9; i++) {
        printf("3 x %d = %d\n", i, 3 * i);
    }

    // break: 반복 중단
    printf("\n5에서 멈추기:\n");
    for (int i = 1; i <= 10; i++) {
        if (i == 5) break;
        printf("%d ", i);
    }
    printf("\n");

    // continue: 현재 반복 건너뜀
    printf("\n3의 배수 제외:\n");
    for (int i = 1; i <= 10; i++) {
        if (i % 3 == 0) continue;
        printf("%d ", i);
    }
    printf("\n");

    return 0;
}
