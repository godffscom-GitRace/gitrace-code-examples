// [118] 연결 리스트 - Linked List
// 레벨: 4 | 노드와 포인터로 구현하는 단일 연결 리스트를 배웁니다

#include <stdio.h>
#include <stdlib.h>

// Node structure
typedef struct Node {
    int data;
    struct Node* next;
} Node;

// Linked list
typedef struct {
    Node* head;
    int size;
} LinkedList;


// create list
LinkedList* create_list() {
    LinkedList* list = (LinkedList*)malloc(sizeof(LinkedList));
    list->head = NULL;
    list->size = 0;
    return list;
}


// push front
void push_front(LinkedList* list, int value) {
    Node* node = (Node*)malloc(sizeof(Node));
    node->data = value;
    node->next = list->head;

    list->head = node;
    list->size++;
}


// push back
void push_back(LinkedList* list, int value) {
    Node* node = (Node*)malloc(sizeof(Node));
    node->data = value;
    node->next = NULL;

    if (list->head == NULL) {
        list->head = node;
    } else {
        Node* cur = list->head;
        while (cur->next != NULL) {
            cur = cur->next;
        }
        cur->next = node;
    }

    list->size++;
}


// delete node
void delete_node(LinkedList* list, int value) {
    Node* cur = list->head;
    Node* prev = NULL;

    while (cur != NULL && cur->data != value) {
        prev = cur;
        cur = cur->next;
    }

    if (cur == NULL) return;

    if (prev == NULL) {
        list->head = cur->next;
    } else {
        prev->next = cur->next;
    }

    free(cur);
    list->size--;
}


// print list
void print_list(LinkedList* list) {
    Node* cur = list->head;

    while (cur != NULL) {
        printf("%d", cur->data);
        if (cur->next) printf(" -> ");
        cur = cur->next;
    }

    printf(" -> NULL\n");
}


// free list
void free_list(LinkedList* list) {
    Node* cur = list->head;

    while (cur != NULL) {
        Node* next = cur->next;
        free(cur);
        cur = next;
    }

    free(list);
}


// main
int main() {
    LinkedList* list = create_list();

    push_back(list, 10);
    push_back(list, 20);
    push_back(list, 30);

    print_list(list);

    push_front(list, 5);
    print_list(list);

    delete_node(list, 20);
    print_list(list);

    printf("size: %d\n", list->size);

    free_list(list);
    return 0;
}
