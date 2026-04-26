// [4] 조건문 (if-switch) - Conditionals
// 레벨: 2 | Java의 조건문을 사용해 프로그램 흐름을 제어합니다

public class Conditionals {

    public static void main(String[] args) {

        int score = 85;
        String grade;

        if (score >= 90) grade = "A";
        else if (score >= 80) grade = "B";
        else grade = "C";

        System.out.println("Grade " + grade);

        int day = 3;
        String dayName;

        switch (day) {
            case 1: dayName = "Mon"; break;
            case 2: dayName = "Tue"; break;
            case 3: dayName = "Wed"; break;
            default: dayName = "Other";
        }

        System.out.println("Day " + dayName);

        int age = 20;
        String status = (age >= 18) ? "Adult" : "Minor";
        System.out.println(status);
    }
}
