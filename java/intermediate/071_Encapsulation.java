// [71] 캡슐화와 접근 제어자 - Encapsulation
// 레벨: 3 | 객체지향의 핵심 원칙인 캡슐화를 이해합니다

public class 071_Encapsulation {

    public static void main(String[] args) {
        BankAccount account = new BankAccount("김철수", 10000);

        // getter로 정보 조회
        System.out.println("소유자: " + account.getOwner());
        System.out.println("잔액: " + account.getBalance() + "원");

        // public 메서드를 통해서만 잔액 변경 가능
        account.deposit(5000);
        account.withdraw(3000);
        account.withdraw(20000); // 잔액 부족!

        System.out.println("\n최종 잔액: " + account.getBalance() + "원");

        // setter로 정보 변경
        account.setOwner("김영희");
        System.out.println("변경된 소유자: " + account.getOwner());

        // account.balance = 999999; // Error! private 접근 불가
    }
}

class BankAccount {
    // private - 클래스 내부에서만 접근
    private String owner;
    private int balance;
    private String accountId;

    // 생성자
    public BankAccount(String owner, int initialBalance) {
        this.owner = owner;
        this.balance = initialBalance;
        this.accountId = "ACC-" + System.currentTimeMillis();
    }

    // getter 메서드 - 읽기 접근
    public String getOwner() {
        return owner;
    }

    public int getBalance() {
        return balance;
    }

    // setter 메서드 - 쓰기 접근 (검증 포함)
    public void setOwner(String owner) {
        if (owner == null || owner.isEmpty()) {
            System.out.println("이름이 비어있습니다!");
            return;
        }
        this.owner = owner;
    }

    // public 메서드 - 안전한 잔액 변경
    public void deposit(int amount) {
        if (amount <= 0) {
            System.out.println("입금액은 0보다 커야 합니다!");
            return;
        }
        balance += amount;
        System.out.println("입금 " + amount + "원 → 잔액: " + balance + "원");
    }

    public boolean withdraw(int amount) {
        if (amount > balance) {
            System.out.println("잔액 부족! (현재: " + balance + "원)");
            return false;
        }
        balance -= amount;
        System.out.println("출금 " + amount + "원 → 잔액: " + balance + "원");
        return true;
    }

    // protected - 같은 패키지 + 자식 클래스에서 접근
    protected String getAccountId() {
        return accountId;
    }
}
