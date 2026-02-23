// [4] 조건문 (if-switch) - Conditionals
// 레벨: 2 | Java의 조건문을 사용해 프로그램 흐름을 제어합니다

public class 004_Conditionals {

    public static void main(String[] args) {
        // if-else if-else
        int score = 85;
        String grade;

        if (score >= 90) {
            grade = "A";
        } else if (score >= 80) {
            grade = "B";
        } else if (score >= 70) {
            grade = "C";
        } else if (score >= 60) {
            grade = "D";
        } else {
            grade = "F";
        }
        System.out.println(score + "점 → " + grade);

        // switch-case
        int day = 3;
        String dayName;

        switch (day) {
            case 1: dayName = "월요일"; break;
            case 2: dayName = "화요일"; break;
            case 3: dayName = "수요일"; break;
            case 4: dayName = "목요일"; break;
            case 5: dayName = "금요일"; break;
            case 6: dayName = "토요일"; break;
            case 7: dayName = "일요일"; break;
            default: dayName = "잘못된 입력"; break;
        }
        System.out.println("요일: " + dayName);

        // 삼항 연산자
        int age = 20;
        String status = (age >= 18) ? "성인" : "미성년자";
        System.out.println(age + "살 → " + status);

        // 입장료 계산 예제
        int[] ages = {5, 12, 16, 30, 70};
        for (int a : ages) {
            int fee = calcFee(a);
            System.out.println("나이 " + a + "세 → 입장료: " + fee + "원");
        }
    }

    public static int calcFee(int age) {
        if (age < 8) return 0;
        else if (age < 14) return 3000;
        else if (age < 19) return 5000;
        else if (age >= 65) return 0;
        else return 10000;
    }
}
