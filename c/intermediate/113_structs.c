// [113] 구조체 - Structures
// 레벨: 3 | 서로 다른 자료형을 하나로 묶는 구조체를 배웁니다

#include <stdio.h>
#include <string.h>

// 구조체 정의
typedef struct {
    char name[30];
    int age;
    float score;
    char grade;
} Student;

// 구조체를 매개변수로 받는 함수
void printStudent(Student s);
void updateScore(Student *s, float newScore);
char calcGrade(float score);

int main() {
    // 구조체 변수 선언 및 초기화
    Student s1 = {"김철수", 20, 88.5f, 'B'};
    Student s2;

    // 멤버 접근: . (점 연산자)
    strcpy(s2.name, "이영희");
    s2.age = 22;
    s2.score = 95.0f;
    s2.grade = calcGrade(s2.score);

    printf("=== 학생 정보 ===\n");
    printStudent(s1);
    printStudent(s2);

    // 포인터로 구조체 접근: -> 연산자
    Student *ptr = &s1;
    printf("\n포인터 접근 - 이름: %s\n", ptr->name);

    // 점수 업데이트 (포인터로 전달 = 원본 수정)
    updateScore(&s1, 92.0f);
    printf("점수 업데이트 후:\n");
    printStudent(s1);

    // 구조체 배열
    printf("\n=== 학생 명단 ===\n");
    Student class[3] = {
        {"박민수", 21, 75.0f, 'C'},
        {"최지영", 20, 91.0f, 'A'},
        {"정호준", 23, 83.0f, 'B'}
    };

    for (int i = 0; i < 3; i++) {
        printf("%d. %s (%.1f점, %c학점)\n",
            i + 1, class[i].name, class[i].score, class[i].grade);
    }

    return 0;
}

void printStudent(Student s) {
    printf("이름: %s | 나이: %d | 점수: %.1f | 학점: %c\n",
        s.name, s.age, s.score, s.grade);
}

void updateScore(Student *s, float newScore) {
    s->score = newScore;
    s->grade = calcGrade(newScore);
}

char calcGrade(float score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
}
