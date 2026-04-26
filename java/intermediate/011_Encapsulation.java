// [11] 캡슐화와 접근 제어자 - Encapsulation
// 레벨: 3 | 객체지향의 핵심 원칙인 캡슐화를 이해합니다

public class Encapsulation {

    public static void main(String[] args) {

        Account acc = new Account("Alex", 100);

        System.out.println(acc.getOwner());
        System.out.println(acc.getBalance());

        acc.deposit(50);
        acc.withdraw(30);

        System.out.println(acc.getBalance());

        acc.setOwner("Sam");
        System.out.println(acc.getOwner());
    }
}

class Account {

    private String owner;
    private int balance;

    public Account(String owner, int balance) {
        this.owner = owner;
        this.balance = balance;
    }

    public String getOwner() {
        return owner;
    }

    public int getBalance() {
        return balance;
    }

    public void setOwner(String owner) {
        if (owner == null || owner.isEmpty()) return;
        this.owner = owner;
    }

    public void deposit(int amount) {
        if (amount > 0) balance += amount;
    }

    public void withdraw(int amount) {
        if (amount <= balance) balance -= amount;
    }
}
