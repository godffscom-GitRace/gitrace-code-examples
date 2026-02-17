// [65] 반복문 (for-while) - Loops
// 레벨: 2 | Java의 반복문으로 반복 작업을 수행합니다

public class 065_Loops {

    public static void main(String[] args) {
        // for 반복문
        System.out.println("=== 구구단 3단 ===");
        for (int i = 1; i <= 9; i++) {
            System.out.println("3 x " + i + " = " + (3 * i));
        }

        // while 반복문
        System.out.println("\n=== 카운트다운 ===");
        int count = 5;
        while (count > 0) {
            System.out.print(count + " ");
            count--;
        }
        System.out.println("발사!");

        // do-while (최소 1번 실행)
        System.out.println("\n=== do-while ===");
        int num = 1;
        do {
            System.out.print(num + " ");
            num++;
        } while (num <= 5);
        System.out.println();

        // enhanced for (for-each)
        System.out.println("\n=== for-each ===");
        String[] fruits = {"사과", "바나나", "딸기", "포도"};
        for (String fruit : fruits) {
            System.out.println("과일: " + fruit);
        }

        // break - 반복 중단
        System.out.println("\n=== break ===");
        for (int i = 1; i <= 10; i++) {
            if (i == 6) {
                System.out.println("6에서 중단!");
                break;
            }
            System.out.print(i + " ");
        }

        // continue - 현재 반복 건너뛰기
        System.out.println("\n\n=== continue (3의 배수 건너뛰기) ===");
        for (int i = 1; i <= 10; i++) {
            if (i % 3 == 0) continue;
            System.out.print(i + " ");
        }

        // 1~100 합산
        int total = 0;
        for (int i = 1; i <= 100; i++) {
            total += i;
        }
        System.out.println("\n\n1~100 합: " + total);
    }
}
