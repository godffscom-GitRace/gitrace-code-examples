// [19] 멀티스레딩 기초 - Multi-Threading
// 레벨: 5 | Java의 멀티스레딩을 이해하고 구현합니다

public class ThreadDemo {

    public static void main(String[] args) throws Exception {

        Thread t1 = new Thread(() -> {
            for (int i = 1; i <= 3; i++) {
                System.out.println("A " + i);
            }
        });

        Thread t2 = new Thread(() -> {
            for (int i = 1; i <= 3; i++) {
                System.out.println("B " + i);
            }
        });

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        Counter c = new Counter();

        Thread t3 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) c.inc();
        });

        Thread t4 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) c.inc();
        });

        t3.start();
        t4.start();

        t3.join();
        t4.join();

        System.out.println(c.get());
    }
}

class Counter {

    private int v = 0;

    synchronized void inc() {
        v++;
    }

    int get() {
        return v;
    }
}
