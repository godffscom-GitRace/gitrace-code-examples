// [3] 연산자 - Operators
// 레벨: 1 | Java의 다양한 연산자를 학습합니다

public class 003_Operators {

    public static void main(String[] args) {
        // 산술 연산자 (+, -, *, /, %)
        int a = 17, b = 5;
        System.out.println("=== 산술 연산자 ===");
        System.out.println(a + " + " + b + " = " + (a + b));   // 22
        System.out.println(a + " - " + b + " = " + (a - b));   // 12
        System.out.println(a + " * " + b + " = " + (a * b));   // 85
        System.out.println(a + " / " + b + " = " + (a / b));   // 3 (정수 나눗셈)
        System.out.println(a + " % " + b + " = " + (a % b));   // 2 (나머지)

        // 비교 연산자 (==, !=, >, <)
        System.out.println("\n=== 비교 연산자 ===");
        System.out.println("10 == 10: " + (10 == 10));  // true
        System.out.println("10 != 5: " + (10 != 5));    // true
        System.out.println("10 > 5: " + (10 > 5));      // true
        System.out.println("10 < 5: " + (10 < 5));      // false

        // 논리 연산자 (&&, ||, !)
        System.out.println("\n=== 논리 연산자 ===");
        boolean x = true, y = false;
        System.out.println("true && false: " + (x && y));  // false
        System.out.println("true || false: " + (x || y));  // true
        System.out.println("!true: " + (!x));               // false

        // 대입 연산자 (=, +=, -=)
        System.out.println("\n=== 대입 연산자 ===");
        int score = 80;
        score += 10;   // score = score + 10
        System.out.println("80 += 10 → " + score);  // 90
        score -= 5;
        System.out.println("90 -= 5 → " + score);   // 85
        score *= 2;
        System.out.println("85 *= 2 → " + score);   // 170

        // 증감 연산자
        int count = 0;
        System.out.println("\n++count: " + (++count));  // 1 (선증가)
        System.out.println("count++: " + (count++));    // 1 (후증가)
        System.out.println("현재 count: " + count);      // 2
    }
}
