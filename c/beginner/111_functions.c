// [111] 함수 - Functions
// 레벨: 2 | 코드를 재사용하기 위한 함수 정의와 호출을 배웁니다

#include <stdio.h>

// 함수 선언 (프로토타입) - main 위에 선언
int add(int a, int b);
float average(int arr[], int size);
void printLine(char ch, int count);
int factorial(int n);

int main() {
    // 함수 호출
    int result = add(15, 27);
    printf("15 + 27 = %d\n", result);

    // 배열을 함수에 전달
    int scores[] = {85, 92, 78, 96, 88};
    float avg = average(scores, 5);
    printf("평균 점수: %.1f\n", avg);

    // void 함수 (반환값 없음)
    printLine('-', 30);
    printf("GitRace C 예제\n");
    printLine('-', 30);

    // 재귀 함수
    for (int i = 1; i <= 6; i++) {
        printf("%d! = %d\n", i, factorial(i));
    }

    return 0;
}

// 함수 정의: 두 정수 합
int add(int a, int b) {
    return a + b;
}

// 배열 평균 계산
float average(int arr[], int size) {
    int sum = 0;
    for (int i = 0; i < size; i++) {
        sum += arr[i];
    }
    return (float)sum / size;
}

// 구분선 출력 (반환값 없음)
void printLine(char ch, int count) {
    for (int i = 0; i < count; i++) {
        printf("%c", ch);
    }
    printf("\n");
}

// 재귀 함수: n!
int factorial(int n) {
    if (n <= 1) return 1;          // 기저 조건
    return n * factorial(n - 1);   // 재귀 호출
}
