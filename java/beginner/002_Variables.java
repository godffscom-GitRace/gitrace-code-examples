// [2] 변수와 자료형 - Variables & Types
// 레벨: 1 | Java의 변수 선언과 자료형을 학습합니다

public class Variables {

    public static void main(String[] args) {

        int age = 25;
        double height = 175.5;
        boolean isStudent = true;

        System.out.println("Age " + age);
        System.out.println("Height " + height);
        System.out.println("Student " + isStudent);

        String name = "Alex";
        System.out.println("Name " + name);
        System.out.println("Length " + name.length());

        double pi = 3.14;
        int piInt = (int) pi;
        System.out.println("Pi int " + piInt);

        String scoreStr = "95";
        int score = Integer.parseInt(scoreStr);
        System.out.println("Score " + score);
    }
}
