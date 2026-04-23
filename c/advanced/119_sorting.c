// [119] 정렬 알고리즘 - Sorting Algorithms
// 레벨: 4 | 버블, 선택, 삽입 정렬을 직접 구현합니다

#include <stdio.h>

void bubble_sort(int a[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (a[j] > a[j + 1]) {
                int t = a[j];
                a[j] = a[j + 1];
                a[j + 1] = t;
            }
        }
    }
}


void selection_sort(int a[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min = i;

        for (int j = i + 1; j < n; j++) {
            if (a[j] < a[min]) {
                min = j;
            }
        }

        int t = a[i];
        a[i] = a[min];
        a[min] = t;
    }
}


void insertion_sort(int a[], int n) {
    for (int i = 1; i < n; i++) {
        int key = a[i];
        int j = i - 1;

        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            j--;
        }

        a[j + 1] = key;
    }
}


void print(int a[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", a[i]);
    }
    printf("\n");
}


void copy(int src[], int dst[], int n) {
    for (int i = 0; i < n; i++) {
        dst[i] = src[i];
    }
}


int main() {
    int base[] = {64, 34, 25, 12, 22, 11, 90};
    int n = 7;
    int arr[7];

    copy(base, arr, n);
    bubble_sort(arr, n);
    print(arr, n);

    copy(base, arr, n);
    selection_sort(arr, n);
    print(arr, n);

    copy(base, arr, n);
    insertion_sort(arr, n);
    print(arr, n);

    return 0;
}
