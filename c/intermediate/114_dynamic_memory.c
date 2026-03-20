// [114] 동적 메모리 할당 - Dynamic Memory
// 레벨: 3 | malloc, calloc, realloc, free로 힙 메모리를 관리합니다

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    // malloc: 지정한 크기(바이트)만큼 메모리 할당 (초기화 안 됨)
    int *arr = (int*)malloc(5 * sizeof(int));

    if (arr == NULL) {  // 항상 NULL 체크!
        printf("메모리 할당 실패!\n");
        return 1;
    }

    // 값 저장
    for (int i = 0; i < 5; i++) {
        arr[i] = (i + 1) * 10;
    }

    printf("malloc 배열:\n");
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d\n", i, arr[i]);
    }

    // realloc: 배열 크기 확장
    arr = (int*)realloc(arr, 8 * sizeof(int));
    if (arr == NULL) {
        printf("realloc 실패!\n");
        return 1;
    }

    for (int i = 5; i < 8; i++) {
        arr[i] = (i + 1) * 10;
    }

    printf("\nrealloc 후 (8개):\n");
    for (int i = 0; i < 8; i++) {
        printf("arr[%d] = %d\n", i, arr[i]);
    }

    // free: 사용 후 반드시 해제 (메모리 누수 방지)
    free(arr);
    arr = NULL;  // 해제 후 NULL로 초기화 (안전)

    // calloc: 메모리 할당 + 0으로 초기화
    int *scores = (int*)calloc(5, sizeof(int));
    printf("\ncalloc (0으로 초기화):\n");
    for (int i = 0; i < 5; i++) {
        printf("scores[%d] = %d\n", i, scores[i]);
    }
    free(scores);

    // 동적 문자열
    int len = 50;
    char *msg = (char*)malloc(len * sizeof(char));
    strcpy(msg, "동적으로 할당된 문자열입니다.");
    printf("\n%s\n", msg);
    free(msg);

    printf("\n모든 메모리 해제 완료!\n");

    return 0;
}
