// [109] 배열 - Arrays
// 레벨: 2 | 같은 자료형의 값을 연속으로 저장하는 배열을 배웁니다

#include <stdio.h>

int main() {
    // 배열 선언과 초기화
    int scores[5] = {85, 92, 78, 96, 88};

    // 인덱스로 접근 (0부터 시작)
    printf("첫 번째 점수: %d\n", scores[0]);
    printf("마지막 점수: %d\n", scores[4]);

    // 배열 전체 출력
    printf("\n전체 점수:\n");
    for (int i = 0; i < 5; i++) {
        printf("scores[%d] = %d\n", i, scores[i]);
    }

    // 합계와 평균
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += scores[i];
    }
    printf("\n합계: %d\n", sum);
    printf("평균: %.1f\n", (float)sum / 5);

    // 최댓값, 최솟값
    int max = scores[0], min = scores[0];
    for (int i = 1; i < 5; i++) {
        if (scores[i] > max) max = scores[i];
        if (scores[i] < min) min = scores[i];
    }
    printf("최고 점수: %d\n", max);
    printf("최저 점수: %d\n", min);

    // 2차원 배열
    printf("\n=== 2차원 배열 (3x3 행렬) ===\n");
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\n");
    }

    return 0;
}
