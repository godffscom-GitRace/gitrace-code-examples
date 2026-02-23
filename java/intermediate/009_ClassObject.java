// [9] 클래스와 객체 - Class & Object
// 레벨: 3 | Java의 객체지향 프로그래밍 기초를 배웁니다

public class 009_ClassObject {

    public static void main(String[] args) {
        // new 키워드로 객체 생성
        Student s1 = new Student("김철수", 20, "컴퓨터공학");
        Student s2 = new Student("이영희", 22, "경영학");
        Student s3 = new Student("박민수", 21, "수학");

        // 메서드 호출
        s1.addScore(85);
        s1.addScore(92);
        s1.addScore(78);

        s2.addScore(95);
        s2.addScore(88);

        // 정보 출력
        s1.printInfo();
        System.out.println();
        s2.printInfo();

        // 학생 수 확인 (static 필드)
        System.out.println("\n총 학생 수: " + Student.studentCount);
    }
}

// 클래스 선언
class Student {
    // 필드 (인스턴스 변수)
    String name;
    int age;
    String major;
    int[] scores;
    int scoreCount;

    // static 필드 (클래스 변수)
    static int studentCount = 0;

    // 생성자 (constructor)
    Student(String name, int age, String major) {
        this.name = name;
        this.age = age;
        this.major = major;
        this.scores = new int[10];
        this.scoreCount = 0;
        studentCount++;
    }

    // 메서드
    void addScore(int score) {
        if (scoreCount < scores.length) {
            scores[scoreCount] = score;
            scoreCount++;
        }
    }

    double getAverage() {
        if (scoreCount == 0) return 0;
        int sum = 0;
        for (int i = 0; i < scoreCount; i++) {
            sum += scores[i];
        }
        return (double) sum / scoreCount;
    }

    void printInfo() {
        System.out.println("=== 학생 정보 ===");
        System.out.println("이름: " + name);
        System.out.println("나이: " + age + "살");
        System.out.println("전공: " + major);
        System.out.printf("평균: %.1f점%n", getAverage());
    }
}
