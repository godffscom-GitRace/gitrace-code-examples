// [108] while / do-while 반복문 - While Loop
// 레벨: 2 | 조건 기반 반복인 while과 do-while을 배웁니다

#include <stdio.h>

int main() {
    // while: 조건이 참인 동안 반복
    printf("=== while 문 ===\n");
    int count = 1;
    while (count <= 5) {
        printf("count = %d\n", count);
        count++;
    }

    // 합계 구하기
    int num, total = 0;
    printf("\n숫자를 입력하세요 (0 입력 시 종료):\n");
    while (1) {  // 무한 루프
        scanf("%d", &num);
        if (num == 0) break;  // 0이면 탈출
        total += num;
        printf("현재 합계: %d\n", total);
    }
    printf("최종 합계: %d\n", total);

    // do-while: 최소 1번은 실행 후 조건 검사
    printf("\n=== do-while 문 ===\n");
    int input;
    do {
        printf("1~10 사이의 숫자를 입력하세요: ");
        scanf("%d", &input);
        if (input < 1 || input > 10) {
            printf("잘못된 입력입니다. 다시 입력하세요.\n");
        }
    } while (input < 1 || input > 10);

    printf("입력한 숫자: %d\n", input);

    // while로 자릿수 계산
    int n = 123456;
    int digits = 0;
    int temp = n;
    while (temp > 0) {
        temp /= 10;
        digits++;
    }
    printf("\n%d는 %d자리 수입니다.\n", n, digits);

    return 0;
}
