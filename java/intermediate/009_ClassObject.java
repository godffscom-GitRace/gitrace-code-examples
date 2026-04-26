// [9] 클래스와 객체 - Class & Object
// 레벨: 3 | Java의 객체지향 프로그래밍 기초를 배웁니다

public class ClassObject {

    public static void main(String[] args) {

        Student s1 = new Student("Alex", 20);
        Student s2 = new Student("Sam", 22);

        s1.add(80);
        s1.add(90);

        s2.add(70);

        s1.print();
        s2.print();

        System.out.println("Count " + Student.count);
    }
}

class Student {

    String name;
    int age;
    int sum;
    int countScore;

    static int count = 0;

    Student(String name, int age) {
        this.name = name;
        this.age = age;
        count++;
    }

    void add(int score) {
        sum += score;
        countScore++;
    }

    double avg() {
        if (countScore == 0) return 0;
        return (double) sum / countScore;
    }

    void print() {
        System.out.println(name + " " + avg());
    }
}
