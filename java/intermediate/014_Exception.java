// [14] 예외 처리 (Exception) - Exception Handling
// 레벨: 3 | Java의 예외 처리 메커니즘을 마스터합니다

public class ExceptionDemo {

    public static void main(String[] args) {

        try {
            int x = 10 / 0;
            System.out.println(x);
        } catch (Exception e) {
            System.out.println("error");
        }

        String[] data = {"10", "a"};
        for (String s : data) {
            try {
                int n = Integer.parseInt(s);
                System.out.println(n);
            } catch (Exception e) {
                System.out.println("fail");
            }
        }

        try {
            check(-1);
        } catch (Exception e) {
            System.out.println("bad");
        }
    }

    static void check(int age) {
        if (age < 0) throw new RuntimeException();
        System.out.println(age);
    }
}
