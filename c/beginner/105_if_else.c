// [105] 조건문 - if/else
// 레벨: 1 | if, else if, else로 조건에 따라 분기하는 방법을 배웁니다

#include <stdio.h>

int main() {
    int score;

    printf("점수를 입력하세요 (0~100): ");
    scanf("%d", &score);

    // if-else if-else 체인
    if (score >= 90) {
        printf("학점: A (우수)\n");
    } else if (score >= 80) {
        printf("학점: B (양호)\n");
    } else if (score >= 70) {
        printf("학점: C (보통)\n");
    } else if (score >= 60) {
        printf("학점: D (미흡)\n");
    } else {
        printf("학점: F (불합격)\n");
    }

    // 중첩 if문
    if (score >= 60) {
        printf("합격입니다.\n");
        if (score >= 90) {
            printf("장학금 대상입니다!\n");
        }
    } else {
        printf("불합격입니다. 재시험이 필요합니다.\n");
    }

    // 삼항 연산자: 조건 ? 참일때값 : 거짓일때값
    char *result = (score >= 60) ? "합격" : "불합격";
    printf("최종 결과: %s\n", result);

    // 범위 체크
    if (score < 0 || score > 100) {
        printf("경고: 유효하지 않은 점수입니다.\n");
    }

    return 0;
}
