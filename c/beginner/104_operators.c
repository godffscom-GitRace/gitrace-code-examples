// [104] 연산자 - Operators
// 레벨: 1 | 산술, 비교, 논리, 비트 연산자를 배웁니다

#include <stdio.h>

int main() {
    int a = 10, b = 3;

    // 산술 연산자
    printf("=== 산술 연산 ===\n");
    printf("%d + %d = %d\n", a, b, a + b);
    printf("%d - %d = %d\n", a, b, a - b);
    printf("%d * %d = %d\n", a, b, a * b);
    printf("%d / %d = %d\n", a, b, a / b);   // 정수 나눗셈
    printf("%d %% %d = %d\n", a, b, a % b);  // 나머지

    // 증감 연산자
    int x = 5;
    printf("\n=== 증감 연산 ===\n");
    printf("x = %d\n", x);
    printf("x++ = %d\n", x++);  // 후위: 현재값 반환 후 증가
    printf("x = %d\n", x);
    printf("++x = %d\n", ++x);  // 전위: 증가 후 반환

    // 비교 연산자 (결과: 1=참, 0=거짓)
    printf("\n=== 비교 연산 ===\n");
    printf("10 > 3: %d\n", a > b);
    printf("10 < 3: %d\n", a < b);
    printf("10 == 3: %d\n", a == b);
    printf("10 != 3: %d\n", a != b);

    // 논리 연산자
    printf("\n=== 논리 연산 ===\n");
    printf("1 && 0 = %d\n", 1 && 0);  // AND
    printf("1 || 0 = %d\n", 1 || 0);  // OR
    printf("!1 = %d\n", !1);           // NOT

    // 복합 대입 연산자
    int y = 10;
    y += 5;   printf("y += 5: %d\n", y);
    y -= 3;   printf("y -= 3: %d\n", y);
    y *= 2;   printf("y *= 2: %d\n", y);
    y /= 4;   printf("y /= 4: %d\n", y);

    return 0;
}
