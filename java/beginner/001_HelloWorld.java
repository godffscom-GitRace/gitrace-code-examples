public class 001_HelloWorld {

    // public static void main() - 프로그램 시작점
    public static void main(String[] args) {
        // System.out.println() - 출력
        System.out.println("Hello, Java World!");

        // 메서드 호출
        String msg = greet("김철수");
        System.out.println(msg);

        sayHello("이영희");
        sayHello("박민수");

        int result = add(3, 5);
        System.out.println("3 + 5 = " + result);
    }

    // 메서드 정의 - 반환값 있는 메서드
    public static String greet(String name) {
        return "안녕하세요, " + name + "님!";
    }

    // 반환값 없는 메서드 (void)
    public static void sayHello(String name) {
        System.out.println("Hello, " + name + "!");
    }

    // 매개변수와 반환값
    public static int add(int a, int b) {
        return a + b;
    }
}
