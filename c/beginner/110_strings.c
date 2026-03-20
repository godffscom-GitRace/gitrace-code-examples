// [110] 문자열 - Strings (char 배열)
// 레벨: 2 | C에서 문자열은 char 배열이며 null 문자(\0)로 끝납니다

#include <stdio.h>
#include <string.h>

int main() {
    // 문자열 선언
    char name[20] = "김철수";
    char city[] = "서울";          // 크기 자동 결정
    char greeting[50];

    printf("이름: %s\n", name);
    printf("도시: %s\n", city);

    // strlen: 문자열 길이
    printf("\n문자열 길이:\n");
    printf("name 길이: %zu\n", strlen(name));
    printf("city 길이: %zu\n", strlen(city));

    // strcpy: 문자열 복사
    char copy[20];
    strcpy(copy, name);
    printf("\n복사된 문자열: %s\n", copy);

    // strcat: 문자열 연결
    char full[50] = "안녕하세요, ";
    strcat(full, name);
    strcat(full, "님!");
    printf("연결된 문자열: %s\n", full);

    // strcmp: 문자열 비교 (같으면 0, 다르면 비 0)
    char str1[] = "apple";
    char str2[] = "apple";
    char str3[] = "banana";
    printf("\n'apple' == 'apple': %d\n", strcmp(str1, str2));
    printf("'apple' == 'banana': %d\n", strcmp(str1, str3));

    // sprintf: 형식화된 문자열 만들기
    int age = 25;
    sprintf(greeting, "%s님은 %d세입니다.", name, age);
    printf("\n%s\n", greeting);

    // 문자 하나씩 접근
    printf("\n이름의 각 문자:\n");
    for (int i = 0; name[i] != '\0'; i++) {
        printf("[%d]: %c (%d)\n", i, name[i], (unsigned char)name[i]);
    }

    return 0;
}
