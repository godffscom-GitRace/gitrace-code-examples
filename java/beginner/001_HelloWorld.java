public class HelloWorld {

    public static void main(String[] args) {
        System.out.println("Hello Java World");

        String msg = greet("Alex");
        System.out.println(msg);

        sayHello("Sam");
        sayHello("Jamie");

        int result = add(3, 5);
        System.out.println("3 + 5 = " + result);
    }

    public static String greet(String name) {
        return "Hello " + name;
    }

    public static void sayHello(String name) {
        System.out.println("Hi " + name);
    }

    public static int add(int a, int b) {
        return a + b;
    }
}
