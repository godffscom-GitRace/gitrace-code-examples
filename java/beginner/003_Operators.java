// [3] 연산자 - Operators
// 레벨: 1 | Java의 다양한 연산자를 학습합니다

public class Operators {

    public static void main(String[] args) {

        int a = 17, b = 5;
        System.out.println("Add " + (a + b));
        System.out.println("Sub " + (a - b));
        System.out.println("Mul " + (a * b));
        System.out.println("Div " + (a / b));
        System.out.println("Mod " + (a % b));

        System.out.println("Eq " + (10 == 10));
        System.out.println("Gt " + (10 > 5));

        boolean x = true, y = false;
        System.out.println("And " + (x && y));
        System.out.println("Or " + (x || y));

        int score = 80;
        score += 10;
        System.out.println("Score " + score);

        int count = 0;
        System.out.println("Inc " + (++count));
    }
}
