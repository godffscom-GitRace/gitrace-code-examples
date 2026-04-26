// [5] 반복문 (for-while) - Loops
// 레벨: 2 | Java의 반복문으로 반복 작업을 수행합니다

public class Loops {

    public static void main(String[] args) {

        for (int i = 1; i <= 5; i++) {
            System.out.println("i " + i);
        }

        int count = 3;
        while (count > 0) {
            System.out.print(count + " ");
            count--;
        }
        System.out.println("go");

        String[] items = {"A", "B", "C"};
        for (String item : items) {
            System.out.println(item);
        }

        int sum = 0;
        for (int i = 1; i <= 5; i++) {
            sum += i;
        }
        System.out.println("Sum " + sum);
    }
}
