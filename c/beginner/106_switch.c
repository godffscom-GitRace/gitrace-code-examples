// [106] switch 문 - Switch Statement
// 레벨: 1 | 여러 값을 비교할 때 if-else보다 깔끔한 switch문을 배웁니다

#include <stdio.h>

int main() {
    int day;

    printf("요일 번호를 입력하세요 (1=월 ~ 7=일): ");
    scanf("%d", &day);

    // switch: 변수 값에 따라 분기
    switch (day) {
        case 1:
            printf("월요일 - 한 주의 시작!\n");
            break;  // break 없으면 다음 case로 넘어감
        case 2:
            printf("화요일\n");
            break;
        case 3:
            printf("수요일 - 주중!\n");
            break;
        case 4:
            printf("목요일\n");
            break;
        case 5:
            printf("금요일 - 불금!\n");
            break;
        case 6:
        case 7:
            // 여러 case 묶기 (fall-through 활용)
            printf("주말입니다! 쉬세요 :)\n");
            break;
        default:
            // 어떤 case도 해당하지 않을 때
            printf("1~7 사이의 숫자를 입력하세요.\n");
    }

    // 문자로 switch 사용
    char grade = 'B';
    printf("\n학점 %c의 의미: ", grade);

    switch (grade) {
        case 'A': printf("매우 우수\n"); break;
        case 'B': printf("우수\n");      break;
        case 'C': printf("보통\n");      break;
        case 'D': printf("미흡\n");      break;
        case 'F': printf("낙제\n");      break;
        default:  printf("알 수 없음\n");
    }

    return 0;
}
