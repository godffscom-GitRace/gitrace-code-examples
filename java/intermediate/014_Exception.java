// [74] 예외 처리 (Exception) - Exception Handling
// 레벨: 3 | Java의 예외 처리 메커니즘을 마스터합니다

public class 074_Exception {

    public static void main(String[] args) {
        // try-catch 기본
        System.out.println("=== 기본 예외 처리 ===");
        try {
            int result = 10 / 0; // ArithmeticException 발생!
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("오류: " + e.getMessage());
        }

        // 여러 예외 처리
        System.out.println("\n=== 여러 예외 처리 ===");
        String[] data = {"100", "abc", null};
        for (String s : data) {
            try {
                int num = Integer.parseInt(s);
                System.out.println(s + " → " + num);
            } catch (NumberFormatException e) {
                System.out.println("숫자 변환 실패: " + s);
            } catch (NullPointerException e) {
                System.out.println("null 값!");
            }
        }

        // finally 블록 - 항상 실행
        System.out.println("\n=== finally 블록 ===");
        try {
            System.out.println("시도 중...");
            int[] arr = {1, 2, 3};
            System.out.println(arr[5]); // 인덱스 초과!
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("인덱스 초과!");
        } finally {
            System.out.println("항상 실행됩니다 (정리 작업)");
        }

        // throw & throws - 예외 발생
        System.out.println("\n=== throw & throws ===");
        try {
            validateAge(25);
            validateAge(-1); // 예외 발생!
        } catch (IllegalArgumentException e) {
            System.out.println("오류: " + e.getMessage());
        }

        // 사용자 정의 예외
        System.out.println("\n=== 사용자 정의 예외 ===");
        try {
            withdraw(10000, 15000);
        } catch (InsufficientBalanceException e) {
            System.out.println("출금 실패: " + e.getMessage());
            System.out.println("부족 금액: " + e.getShortage() + "원");
        }
    }

    // throws - 예외를 호출자에게 전달
    static void validateAge(int age) throws IllegalArgumentException {
        if (age < 0) {
            throw new IllegalArgumentException("나이는 0 이상이어야 합니다");
        }
        System.out.println(age + "살: 유효한 나이");
    }

    static void withdraw(int balance, int amount) throws InsufficientBalanceException {
        if (amount > balance) {
            throw new InsufficientBalanceException(
                "잔액이 부족합니다", amount - balance
            );
        }
        System.out.println("출금 성공!");
    }
}

// 사용자 정의 예외 클래스
class InsufficientBalanceException extends Exception {
    private int shortage;

    InsufficientBalanceException(String message, int shortage) {
        super(message);
        this.shortage = shortage;
    }

    public int getShortage() {
        return shortage;
    }
}
