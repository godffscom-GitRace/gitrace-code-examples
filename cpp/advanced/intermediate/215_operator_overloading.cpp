// [215] 연산자 오버로딩 - Operator Overloading
// 레벨: 3 | 사용자 정의 타입에 연산자를 정의하는 방법을 배웁니다

#include <iostream>
#include <string>
#include <cmath>
using namespace std;

class Vector2D {
public:
    double x, y;

    Vector2D(double x = 0, double y = 0) : x(x), y(y) {}

    // + 연산자 오버로딩
    Vector2D operator+(const Vector2D& other) const {
        return Vector2D(x + other.x, y + other.y);
    }

    // - 연산자
    Vector2D operator-(const Vector2D& other) const {
        return Vector2D(x - other.x, y - other.y);
    }

    // * 스칼라 곱
    Vector2D operator*(double scalar) const {
        return Vector2D(x * scalar, y * scalar);
    }

    // == 비교 연산자
    bool operator==(const Vector2D& other) const {
        return x == other.x && y == other.y;
    }

    // 크기
    double magnitude() const {
        return sqrt(x * x + y * y);
    }

    // << 연산자 (friend 함수로 정의)
    friend ostream& operator<<(ostream& os, const Vector2D& v) {
        os << "(" << v.x << ", " << v.y << ")";
        return os;
    }

    // [] 인덱스 연산자
    double& operator[](int idx) {
        return idx == 0 ? x : y;
    }

    // 복합 대입 연산자
    Vector2D& operator+=(const Vector2D& other) {
        x += other.x;
        y += other.y;
        return *this;
    }
};

int main() {
    Vector2D v1(3.0, 4.0);
    Vector2D v2(1.0, 2.0);

    cout << "v1 = " << v1 << endl;
    cout << "v2 = " << v2 << endl;

    // 연산자 사용
    cout << "\nv1 + v2 = " << (v1 + v2) << endl;
    cout << "v1 - v2 = " << (v1 - v2) << endl;
    cout << "v1 * 2 = " << (v1 * 2) << endl;
    cout << "|v1| = " << v1.magnitude() << endl;
    cout << "v1 == v2: " << boolalpha << (v1 == v2) << endl;

    // 인덱스 연산자
    cout << "\nv1[0] = " << v1[0] << endl;
    cout << "v1[1] = " << v1[1] << endl;
    v1[0] = 10;
    cout << "v1[0] = 10 후: " << v1 << endl;

    // 복합 대입
    v1 += v2;
    cout << "v1 += v2: " << v1 << endl;

    return 0;
}
