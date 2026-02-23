// [19] 멀티스레딩 기초 - Multi-Threading
// 레벨: 5 | Java의 멀티스레딩을 이해하고 구현합니다

public class 019_Threading {

    public static void main(String[] args) throws InterruptedException {
        // 1. Thread 클래스 상속
        System.out.println("=== Thread 클래스 ===");
        CountThread t1 = new CountThread("스레드A", 5);
        CountThread t2 = new CountThread("스레드B", 5);

        t1.start(); // start()로 실행 (run() 직접 호출 X)
        t2.start();

        // join() - 스레드 완료 대기
        t1.join();
        t2.join();
        System.out.println("두 스레드 완료!\n");

        // 2. Runnable 인터페이스
        System.out.println("=== Runnable 인터페이스 ===");
        Thread t3 = new Thread(new CountRunner("러너C", 3));
        Thread t4 = new Thread(() -> {
            for (int i = 1; i <= 3; i++) {
                System.out.println("람다D: " + i);
                try { Thread.sleep(100); } catch (InterruptedException e) {}
            }
        });

        t3.start();
        t4.start();
        t3.join();
        t4.join();
        System.out.println("러너 완료!\n");

        // 3. 동기화 (synchronized)
        System.out.println("=== 동기화 ===");
        SharedCounter counter = new SharedCounter();

        Thread inc1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) counter.increment();
        });
        Thread inc2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) counter.increment();
        });

        inc1.start();
        inc2.start();
        inc1.join();
        inc2.join();

        // synchronized 덕분에 정확히 2000
        System.out.println("카운터: " + counter.getCount() + " (예상: 2000)");
    }
}

// Thread 클래스 상속
class CountThread extends Thread {
    String label;
    int count;

    CountThread(String label, int count) {
        this.label = label;
        this.count = count;
    }

    @Override
    public void run() {
        for (int i = 1; i <= count; i++) {
            System.out.println(label + ": " + i);
            try {
                Thread.sleep(100); // 100ms 대기
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

// Runnable 인터페이스 구현
class CountRunner implements Runnable {
    String label;
    int count;

    CountRunner(String label, int count) {
        this.label = label;
        this.count = count;
    }

    @Override
    public void run() {
        for (int i = 1; i <= count; i++) {
            System.out.println(label + ": " + i);
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

// 동기화 - synchronized 키워드
class SharedCounter {
    private int count = 0;

    // synchronized로 동시 접근 방지
    public synchronized void increment() {
        count++;
    }

    public int getCount() {
        return count;
    }
}
