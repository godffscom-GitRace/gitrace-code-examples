// [12] 인터페이스 (Interface) - Interface
// 레벨: 3 | Java 인터페이스를 이해하고 구현합니다

public class InterfaceDemo {

    public static void main(String[] args) {

        Drawable a = new Circle(2);
        Drawable b = new Rect(3, 4);

        Drawable[] list = {a, b};

        for (Drawable d : list) {
            d.draw();
            System.out.println(d.area());
        }

        Phone p = new SmartPhone();
        p.call("123");
    }
}

interface Drawable {
    void draw();
    double area();
}

class Circle implements Drawable {

    double r;

    Circle(double r) {
        this.r = r;
    }

    public void draw() {
        System.out.println("circle");
    }

    public double area() {
        return 3.14 * r * r;
    }
}

class Rect implements Drawable {

    double w, h;

    Rect(double w, double h) {
        this.w = w;
        this.h = h;
    }

    public void draw() {
        System.out.println("rect");
    }

    public double area() {
        return w * h;
    }
}

interface Phone {
    void call(String n);
}

class SmartPhone implements Phone {

    public void call(String n) {
        System.out.println("call " + n);
    }
}
