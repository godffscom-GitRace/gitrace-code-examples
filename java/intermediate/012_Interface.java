// [72] 인터페이스 (Interface) - Interface
// 레벨: 3 | Java 인터페이스를 이해하고 구현합니다

public class 072_Interface {

    public static void main(String[] args) {
        // 인터페이스 타입으로 참조 (다형성)
        Drawable circle = new Circle("원", 5);
        Drawable rect = new Rectangle("사각형", 4, 6);

        Drawable[] shapes = {circle, rect};
        for (Drawable shape : shapes) {
            shape.draw();
            System.out.printf("  넓이: %.2f%n", shape.getArea());
        }

        // 다중 인터페이스 구현
        System.out.println("\n=== 다중 인터페이스 ===");
        SmartPhone phone = new SmartPhone("Galaxy S25");
        phone.call("010-1234-5678");
        phone.takePicture();
        phone.browse("www.google.com");
    }
}

// interface 선언
interface Drawable {
    void draw();                // 추상 메서드
    double getArea();           // 추상 메서드

    // default 메서드 (Java 8+) - 기본 구현 제공
    default void describe() {
        System.out.println("도형을 그립니다");
    }
}

// implements 키워드로 구현
class Circle implements Drawable {
    String name;
    double radius;

    Circle(String name, double radius) {
        this.name = name;
        this.radius = radius;
    }

    @Override
    public void draw() {
        System.out.println(name + " 그리기 (반지름: " + radius + ")");
    }

    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
}

class Rectangle implements Drawable {
    String name;
    double width, height;

    Rectangle(String name, double width, double height) {
        this.name = name;
        this.width = width;
        this.height = height;
    }

    @Override
    public void draw() {
        System.out.println(name + " 그리기 (" + width + " x " + height + ")");
    }

    @Override
    public double getArea() {
        return width * height;
    }
}

// 다중 인터페이스
interface Phone {
    void call(String number);
}

interface Camera {
    void takePicture();
}

interface Browser {
    void browse(String url);
}

// 다중 구현
class SmartPhone implements Phone, Camera, Browser {
    String model;

    SmartPhone(String model) {
        this.model = model;
    }

    @Override
    public void call(String number) {
        System.out.println(model + ": " + number + "에 전화 걸기");
    }

    @Override
    public void takePicture() {
        System.out.println(model + ": 사진 촬영!");
    }

    @Override
    public void browse(String url) {
        System.out.println(model + ": " + url + " 접속");
    }
}
