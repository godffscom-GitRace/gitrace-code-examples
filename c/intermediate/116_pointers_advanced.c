// [116] 포인터 심화 - Advanced Pointers
// 레벨: 3 | 이중 포인터, 함수 포인터, 포인터 배열을 배웁니다

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 함수 포인터 타입 정의
typedef int (*Operation)(int, int);

int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }

void calculate(int a, int b, Operation op, const char *opName);

int main() {
    // 이중 포인터 (**)
    printf("=== 이중 포인터 ===\n");
    int value = 42;
    int *ptr = &value;
    int **pptr = &ptr;  // 포인터의 포인터

    printf("value = %d\n", value);
    printf("*ptr = %d\n", *ptr);
    printf("**pptr = %d\n", **pptr);

    // 이중 포인터로 값 변경
    **pptr = 100;
    printf("**pptr로 변경 후 value = %d\n\n", value);

    // 포인터 배열 (문자열 배열)
    printf("=== 포인터 배열 ===\n");
    const char *langs[] = {"C", "C++", "Python", "Java", "JavaScript"};
    int count = 5;

    for (int i = 0; i < count; i++) {
        printf("langs[%d] = %s\n", i, langs[i]);
    }

    // 함수 포인터
    printf("\n=== 함수 포인터 ===\n");
    Operation ops[] = {add, subtract, multiply};
    const char *names[] = {"더하기", "빼기", "곱하기"};

    for (int i = 0; i < 3; i++) {
        calculate(10, 3, ops[i], names[i]);
    }

    // 동적 2차원 배열
    printf("\n=== 동적 2차원 배열 ===\n");
    int rows = 3, cols = 4;
    int **matrix = (int**)malloc(rows * sizeof(int*));
    for (int i = 0; i < rows; i++) {
        matrix[i] = (int*)malloc(cols * sizeof(int));
        for (int j = 0; j < cols; j++) {
            matrix[i][j] = i * cols + j + 1;
        }
    }

    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%3d", matrix[i][j]);
        }
        printf("\n");
    }

    // 메모리 해제
    for (int i = 0; i < rows; i++) free(matrix[i]);
    free(matrix);

    return 0;
}

void calculate(int a, int b, Operation op, const char *opName) {
    printf("10 %s 3 = %d\n", opName, op(a, b));
}
