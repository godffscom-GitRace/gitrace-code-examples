// [102] 변수와 자료형 - Variables & Data Types
// 레벨: 1 | C 언어의 기본 자료형과 변수 선언을 배웁니다

#include <stdio.h>

int main() {
    // 정수형
    int age = 25;
    short score = 100;
    long population = 51000000L;

    // 실수형
    float height = 175.5f;
    double pi = 3.14159265358979;

    // 문자형
    char grade = 'A';
    char initial = 'K';

    // 논리값 (0=거짓, 1=참)
    int isStudent = 1;

    // 출력: %d=정수, %f=실수, %c=문자, %ld=long
    printf("나이: %d\n", age);
    printf("점수: %d\n", score);
    printf("인구: %ld\n", population);
    printf("키: %.1f cm\n", height);
    printf("파이: %.6f\n", pi);
    printf("학점: %c\n", grade);
    printf("학생 여부: %d\n", isStudent);

    // sizeof: 자료형의 크기(바이트)
    printf("\n자료형 크기:\n");
    printf("int: %zu bytes\n", sizeof(int));
    printf("double: %zu bytes\n", sizeof(double));
    printf("char: %zu bytes\n", sizeof(char));

    return 0;
}
