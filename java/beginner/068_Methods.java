// [68] 메서드 정의 - Methods
// 레벨: 2 | Java 메서드를 정의하고 호출하는 방법을 배웁니다

public class 068_Methods {

    public static void main(String[] args) {
        // 메서드 호출
        System.out.println("=== 계산기 ===");
        System.out.println("10 + 3 = " + add(10, 3));
        System.out.println("10 - 3 = " + subtract(10, 3));
        System.out.println("10 * 3 = " + multiply(10, 3));
        System.out.println("10 / 3 = " + divide(10, 3));

        // 메서드 오버로딩
        System.out.println("\n=== 오버로딩 ===");
        System.out.println(add(1, 2));          // int 버전
        System.out.println(add(1.5, 2.5));      // double 버전
        System.out.println(add(1, 2, 3));       // 3개 매개변수 버전

        // 배열 매개변수
        int[] scores = {85, 92, 78, 95, 88};
        System.out.println("\n=== 성적 통계 ===");
        System.out.println("최대: " + max(scores));
        System.out.println("최소: " + min(scores));
        System.out.println("평균: " + average(scores));
    }

    // 매개변수와 반환값
    public static int add(int a, int b) {
        return a + b;
    }

    public static int subtract(int a, int b) {
        return a - b;
    }

    public static int multiply(int a, int b) {
        return a * b;
    }

    public static double divide(int a, int b) {
        if (b == 0) return 0;
        return (double) a / b;
    }

    // 메서드 오버로딩 - 같은 이름, 다른 매개변수
    public static double add(double a, double b) {
        return a + b;
    }

    public static int add(int a, int b, int c) {
        return a + b + c;
    }

    // static vs non-static
    // static: 클래스 소속, 객체 없이 호출 가능
    // non-static: 인스턴스 소속, 객체 필요

    public static int max(int[] arr) {
        int result = arr[0];
        for (int n : arr) {
            if (n > result) result = n;
        }
        return result;
    }

    public static int min(int[] arr) {
        int result = arr[0];
        for (int n : arr) {
            if (n < result) result = n;
        }
        return result;
    }

    public static double average(int[] arr) {
        int sum = 0;
        for (int n : arr) sum += n;
        return (double) sum / arr.length;
    }
}
