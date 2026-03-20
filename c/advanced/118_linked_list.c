// [118] 연결 리스트 - Linked List
// 레벨: 4 | 노드와 포인터로 구현하는 단일 연결 리스트를 배웁니다

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 노드 구조체
typedef struct Node {
    int data;
    struct Node *next;  // 다음 노드를 가리키는 포인터
} Node;

// 연결 리스트 구조체
typedef struct {
    Node *head;
    int size;
} LinkedList;

// 함수 선언
LinkedList* createList();
void pushFront(LinkedList *list, int data);
void pushBack(LinkedList *list, int data);
void deleteNode(LinkedList *list, int data);
void printList(LinkedList *list);
void freeList(LinkedList *list);

int main() {
    LinkedList *list = createList();

    // 뒤에 추가
    pushBack(list, 10);
    pushBack(list, 20);
    pushBack(list, 30);
    pushBack(list, 40);

    printf("초기 리스트: ");
    printList(list);

    // 앞에 추가
    pushFront(list, 5);
    printf("앞에 5 추가: ");
    printList(list);

    // 노드 삭제
    deleteNode(list, 20);
    printf("20 삭제 후: ");
    printList(list);

    deleteNode(list, 5);
    printf("5 삭제 후: ");
    printList(list);

    printf("크기: %d\n", list->size);

    freeList(list);
    printf("메모리 해제 완료\n");

    return 0;
}

LinkedList* createList() {
    LinkedList *list = (LinkedList*)malloc(sizeof(LinkedList));
    list->head = NULL;
    list->size = 0;
    return list;
}

void pushFront(LinkedList *list, int data) {
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = list->head;
    list->head = newNode;
    list->size++;
}

void pushBack(LinkedList *list, int data) {
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = NULL;

    if (list->head == NULL) {
        list->head = newNode;
    } else {
        Node *curr = list->head;
        while (curr->next != NULL) curr = curr->next;
        curr->next = newNode;
    }
    list->size++;
}

void deleteNode(LinkedList *list, int data) {
    Node *curr = list->head;
    Node *prev = NULL;

    while (curr != NULL && curr->data != data) {
        prev = curr;
        curr = curr->next;
    }

    if (curr == NULL) return;  // 못 찾음

    if (prev == NULL) list->head = curr->next;
    else prev->next = curr->next;

    free(curr);
    list->size--;
}

void printList(LinkedList *list) {
    Node *curr = list->head;
    while (curr != NULL) {
        printf("%d", curr->data);
        if (curr->next) printf(" -> ");
        curr = curr->next;
    }
    printf(" -> NULL\n");
}

void freeList(LinkedList *list) {
    Node *curr = list->head;
    while (curr != NULL) {
        Node *next = curr->next;
        free(curr);
        curr = next;
    }
    free(list);
}
