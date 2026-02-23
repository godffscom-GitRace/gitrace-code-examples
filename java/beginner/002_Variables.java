// [2] 변수와 자료형 - Variables & Types
// 레벨: 1 | Java의 변수 선언과 자료형을 학습합니다

public class 002_Variables {

    public static void main(String[] args) {
        // 기본 자료형 (int, double, boolean, char)
        int age = 25;
        double height = 175.5;
        boolean isStudent = true;
        char grade = 'A';

        System.out.println("나이: " + age);
        System.out.println("키: " + height);
        System.out.println("학생: " + isStudent);
        System.out.println("등급: " + grade);

        // String 클래스 (참조 타입)
        String name = "김철수";
        System.out.println("이름: " + name);
        System.out.println("이름 길이: " + name.length());

        // 형변환 (casting)
        double pi = 3.14;
        int piInt = (int) pi;           // 명시적 형변환 (소수점 버림)
        System.out.println("pi 정수: " + piInt);  // 3

        int num = 100;
        double numDouble = num;          // 자동 형변환 (작은 → 큰)
        System.out.println("num 실수: " + numDouble);  // 100.0

        // 문자열 ↔ 숫자 변환
        String scoreStr = "95";
        int score = Integer.parseInt(scoreStr);
        String backToStr = String.valueOf(score);
        System.out.println("점수: " + score);

        // final 키워드 (상수)
        final double TAX_RATE = 0.1;
        // TAX_RATE = 0.2; // Error! final은 재할당 불가
        System.out.println("세율: " + TAX_RATE);
    }
}
