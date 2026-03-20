// [119] 정렬 알고리즘 - Sorting Algorithms
// 레벨: 4 | 버블, 선택, 삽입 정렬을 직접 구현합니다

#include <stdio.h>
#include <string.h>

void bubbleSort(int arr[], int n);
void selectionSort(int arr[], int n);
void insertionSort(int arr[], int n);
void printArray(int arr[], int n, const char *label);
void copyArray(int src[], int dst[], int n);

int main() {
    int original[] = {64, 34, 25, 12, 22, 11, 90};
    int n = 7;
    int arr[7];

    printf("원본: ");
    printArray(original, n, "");

    // 버블 정렬: 인접한 두 원소를 비교/교환 - O(n²)
    copyArray(original, arr, n);
    bubbleSort(arr, n);
    printArray(arr, n, "버블 정렬: ");

    // 선택 정렬: 최솟값을 선택해 앞으로 - O(n²)
    copyArray(original, arr, n);
    selectionSort(arr, n);
    printArray(arr, n, "선택 정렬: ");

    // 삽입 정렬: 카드를 정렬하듯 - O(n²), 거의 정렬된 경우 빠름
    copyArray(original, arr, n);
    insertionSort(arr, n);
    printArray(arr, n, "삽입 정렬: ");

    return 0;
}

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // 교환
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        // i 이후에서 최솟값 인덱스 찾기
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        // 최솟값을 i 위치로 교환
        int temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        // key보다 큰 원소들을 오른쪽으로 밀기
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

void printArray(int arr[], int n, const char *label) {
    printf("%s", label);
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

void copyArray(int src[], int dst[], int n) {
    for (int i = 0; i < n; i++) dst[i] = src[i];
}
