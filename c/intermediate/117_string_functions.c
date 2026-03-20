// [117] 문자열 함수 - String Functions
// 레벨: 3 | string.h의 주요 함수들과 문자 처리 함수를 배웁니다

#include <stdio.h>
#include <string.h>
#include <ctype.h>   // 문자 분류/변환 함수
#include <stdlib.h>  // atoi, atof

int main() {
    char str1[100] = "Hello, GitRace!";
    char str2[100];

    // strlen: 문자열 길이
    printf("strlen(\"%s\") = %zu\n", str1, strlen(str1));

    // strcpy / strncpy: 복사
    strcpy(str2, str1);
    printf("strcpy 결과: %s\n", str2);

    char safe[10];
    strncpy(safe, str1, 5);  // 최대 5글자
    safe[5] = '\0';
    printf("strncpy(5글자): %s\n", safe);

    // strcat / strncat: 연결
    char greeting[50] = "안녕하세요, ";
    strcat(greeting, "김철수님!");
    printf("strcat: %s\n", greeting);

    // strcmp: 비교 (0=같음, 양수=str1>str2, 음수=str1<str2)
    printf("\nstrcmp 결과: %d\n", strcmp("apple", "apple"));
    printf("strcasecmp 결과: %d\n", strcasecmp("Hello", "hello"));

    // strchr: 문자 검색 (첫 번째 위치)
    char *found = strchr(str1, 'G');
    if (found) printf("\n'G' 발견: %s\n", found);

    // strstr: 부분 문자열 검색
    char *sub = strstr(str1, "Race");
    if (sub) printf("'Race' 발견: %s\n", sub);

    // strtok: 문자열 분리 (토큰화)
    printf("\n=== strtok (CSV 파싱) ===\n");
    char csv[] = "김철수,25,서울,개발자";
    char *token = strtok(csv, ",");
    while (token != NULL) {
        printf("  토큰: %s\n", token);
        token = strtok(NULL, ",");
    }

    // ctype.h 함수들
    printf("\n=== 문자 분류 ===\n");
    char c = 'A';
    printf("'%c': 대문자=%d, 알파벳=%d, 숫자=%d\n",
        c, isupper(c), isalpha(c), isdigit(c));

    // 대소문자 변환
    char text[] = "Hello World";
    for (int i = 0; text[i]; i++) text[i] = tolower(text[i]);
    printf("소문자 변환: %s\n", text);

    // 문자열 → 숫자 변환
    printf("\n=== 문자열 변환 ===\n");
    printf("atoi(\"123\") = %d\n", atoi("123"));
    printf("atof(\"3.14\") = %.2f\n", atof("3.14"));

    return 0;
}
