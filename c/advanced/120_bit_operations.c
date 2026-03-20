// [120] 비트 연산 - Bit Operations
// 레벨: 4 | 비트 연산자로 저수준 데이터 처리를 배웁니다

#include <stdio.h>

// 비트 출력 함수
void printBits(unsigned int n, int bits) {
    for (int i = bits - 1; i >= 0; i--) {
        printf("%d", (n >> i) & 1);
        if (i % 4 == 0 && i > 0) printf(" ");
    }
    printf(" (%u)\n", n);
}

int main() {
    unsigned char a = 0b10110100;  // 180
    unsigned char b = 0b01101011;  // 107

    printf("a = "); printBits(a, 8);
    printf("b = "); printBits(b, 8);

    // AND (&): 두 비트가 모두 1일 때 1
    printf("\na & b = "); printBits(a & b, 8);

    // OR (|): 하나라도 1이면 1
    printf("a | b = "); printBits(a | b, 8);

    // XOR (^): 두 비트가 다를 때 1
    printf("a ^ b = "); printBits(a ^ b, 8);

    // NOT (~): 비트 반전
    printf("~a = "); printBits((unsigned char)~a, 8);

    // 시프트 연산
    printf("\n=== 시프트 연산 ===\n");
    unsigned char c = 0b00001010;  // 10
    printf("c      = "); printBits(c, 8);
    printf("c << 1 = "); printBits((unsigned char)(c << 1), 8);  // *2
    printf("c << 2 = "); printBits((unsigned char)(c << 2), 8);  // *4
    printf("c >> 1 = "); printBits((unsigned char)(c >> 1), 8);  // /2

    // 실용 예제: 비트 플래그 (권한 관리)
    printf("\n=== 비트 플래그 (파일 권한) ===\n");
    #define READ    0b00000100  // 4
    #define WRITE   0b00000010  // 2
    #define EXECUTE 0b00000001  // 1

    unsigned char perm = READ | WRITE;  // 읽기 + 쓰기

    printf("권한: ");
    if (perm & READ)    printf("읽기 ");
    if (perm & WRITE)   printf("쓰기 ");
    if (perm & EXECUTE) printf("실행 ");
    printf("\n");

    // 특정 비트 설정/해제
    perm |= EXECUTE;   // 실행 권한 추가
    printf("실행 추가 후: ");
    if (perm & READ)    printf("읽기 ");
    if (perm & WRITE)   printf("쓰기 ");
    if (perm & EXECUTE) printf("실행 ");
    printf("\n");

    perm &= ~WRITE;    // 쓰기 권한 제거
    printf("쓰기 제거 후: ");
    if (perm & READ)    printf("읽기 ");
    if (perm & WRITE)   printf("쓰기 ");
    if (perm & EXECUTE) printf("실행 ");
    printf("\n");

    return 0;
}
