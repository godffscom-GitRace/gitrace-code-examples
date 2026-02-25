public class 001_HelloWorld {

    public static void main(String[] args) {
        System.out.println("Hello, Java World!");

        String msg = greet("김철수");
        System.out.println(msg);

        sayHello("이영희");
        sayHello("박민수");

        int result = add(3, 5);
        System.out.println("3 + 5 = " + result);
    }

    public static String greet(String name) {
        return "안녕하세요, " + name + "님!";
    }

    public static void sayHello(String name) {
        System.out.println("Hello, " + name + "!");
    }

    public static int add(int a, int b) {
        return a + b;
    }
}


