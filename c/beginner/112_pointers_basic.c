// [112] 포인터 기초 - Pointers Basic
// 레벨: 2 | C의 핵심 개념인 포인터와 메모리 주소를 배웁니다

#include <stdio.h>

// 포인터로 두 값 교환
void swap(int *a, int *b);

int main() {
    int num = 42;

    // & : 변수의 메모리 주소
    printf("num의 값: %d\n", num);
    printf("num의 주소: %p\n", (void*)&num);

    // 포인터 선언: 주소를 저장하는 변수
    int *ptr = &num;  // ptr은 num의 주소를 저장

    // * : 포인터가 가리키는 값 (역참조)
    printf("\nptr이 가리키는 값: %d\n", *ptr);
    printf("ptr이 저장한 주소: %p\n", (void*)ptr);

    // 포인터로 값 변경
    *ptr = 100;
    printf("포인터로 변경 후 num: %d\n", num);

    // 포인터와 배열
    printf("\n=== 포인터와 배열 ===\n");
    int arr[5] = {10, 20, 30, 40, 50};
    int *p = arr;  // 배열명은 첫 번째 요소의 주소

    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d (주소: %p)\n", i, *(p + i), (void*)(p + i));
    }

    // 포인터로 값 교환 (call by reference)
    int x = 5, y = 10;
    printf("\n교환 전: x=%d, y=%d\n", x, y);
    swap(&x, &y);
    printf("교환 후: x=%d, y=%d\n", x, y);

    return 0;
}

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}
