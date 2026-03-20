// [211] 클래스 기초 - Class Basics
// 레벨: 2 | 클래스, 생성자, 소멸자, 접근 제어자를 배웁니다

#include <iostream>
#include <string>
using namespace std;

class Student {
private:
    // private: 클래스 외부에서 직접 접근 불가
    string name;
    int age;
    double score;

public:
    // 생성자: 객체 생성 시 자동 호출
    Student(string n, int a, double s) : name(n), age(a), score(s) {
        cout << name << " 학생 생성!" << endl;
    }

    // 기본 생성자
    Student() : name("미정"), age(0), score(0.0) {}

    // 소멸자: 객체 소멸 시 자동 호출
    ~Student() {
        cout << name << " 학생 소멸." << endl;
    }

    // getter (접근자)
    string getName()  const { return name; }
    int getAge()      const { return age; }
    double getScore() const { return score; }

    // setter (수정자)
    void setScore(double s) {
        if (s >= 0 && s <= 100) score = s;
        else cout << "유효하지 않은 점수!" << endl;
    }

    // 멤버 함수
    string getGrade() const {
        if (score >= 90) return "A";
        if (score >= 80) return "B";
        if (score >= 70) return "C";
        if (score >= 60) return "D";
        return "F";
    }

    void printInfo() const {
        cout << "이름: " << name
             << " | 나이: " << age
             << " | 점수: " << score
             << " | 학점: " << getGrade() << endl;
    }
};

int main() {
    // 객체 생성 (스택)
    Student s1("김철수", 20, 88.5);
    Student s2("이영희", 22, 95.0);

    s1.printInfo();
    s2.printInfo();

    // setter 사용
    s1.setScore(92.0);
    cout << "\n점수 수정 후: ";
    s1.printInfo();

    // 동적 할당 (힙)
    Student* s3 = new Student("박민수", 21, 75.0);
    s3->printInfo();   // 포인터는 -> 사용
    delete s3;         // 반드시 해제

    cout << "\n=== 객체 배열 ===" << endl;
    Student students[] = {
        Student("최지영", 20, 91.0),
        Student("정호준", 23, 83.0)
    };

    for (const auto& s : students) {
        s.printInfo();
    }

    return 0;  // s1, s2 소멸자 자동 호출
}
