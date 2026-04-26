// [13] 추상 클래스 - Abstract Class
// 레벨: 3 | 추상 클래스로 공통 기능을 정의합니다

public class AbstractClass {

    public static void main(String[] args) {

        Shape a = new Circle(2);
        Shape b = new Rect(3, 4);

        Shape[] list = {a, b};

        for (Shape s : list) {
            s.print();
        }
    }
}

abstract class Shape {

    abstract double area();

    void print() {
        System.out.println(area());
    }
}

class Circle extends Shape {

    double r;

    Circle(double r) {
        this.r = r;
    }

    double area() {
        return 3.14 * r * r;
    }
}

class Rect extends Shape {

    double w, h;

    Rect(double w, double h) {
        this.w = w;
        this.h = h;
    }

    double area() {
        return w * h;
    }
}
