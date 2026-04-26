// [8] 메서드 정의 - Methods
// 레벨: 2 | Java 메서드를 정의하고 호출하는 방법을 배웁니다

public class Methods {

    public static void main(String[] args) {

        System.out.println(add(10, 3));
        System.out.println(sub(10, 3));
        System.out.println(mul(10, 3));
        System.out.println(div(10, 3));

        System.out.println(add(1, 2));
        System.out.println(add(1.5, 2.5));

        int[] arr = {5, 2, 9};
        System.out.println(max(arr));
    }

    public static int add(int a, int b) {
        return a + b;
    }

    public static double add(double a, double b) {
        return a + b;
    }

    public static int sub(int a, int b) {
        return a - b;
    }

    public static int mul(int a, int b) {
        return a * b;
    }

    public static double div(int a, int b) {
        return (double) a / b;
    }

    public static int max(int[] arr) {
        int m = arr[0];
        for (int n : arr) if (n > m) m = n;
        return m;
    }
}
