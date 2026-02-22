// [73] 추상 클래스 - Abstract Class
// 레벨: 3 | 추상 클래스로 공통 기능을 정의합니다

public class 073_AbstractClass {

    public static void main(String[] args) {
        // Shape shape = new Shape(); // Error! 추상 클래스는 인스턴스 생성 불가

        Shape circle = new Circle("원", 5);
        Shape rect = new Rect("사각형", 4, 6);
        Shape triangle = new Triangle("삼각형", 10, 8);

        Shape[] shapes = {circle, rect, triangle};

        // 템플릿 메서드 패턴 - 공통 로직 + 개별 구현
        for (Shape shape : shapes) {
            shape.printInfo();  // 공통 메서드가 추상 메서드 호출
            System.out.println();
        }
    }
}

// abstract 키워드 - 추상 클래스
abstract class Shape {
    String name;

    Shape(String name) {
        this.name = name;
    }

    // 추상 메서드 - 자식 클래스에서 반드시 구현
    abstract double getArea();
    abstract String getFormula();

    // 일반 메서드 - 공통 로직 (템플릿 메서드 패턴)
    void printInfo() {
        System.out.println("=== " + name + " ===");
        System.out.println("공식: " + getFormula());
        System.out.printf("넓이: %.2f%n", getArea());
    }
}

class Circle extends Shape {
    double radius;

    Circle(String name, double radius) {
        super(name);
        this.radius = radius;
    }

    @Override
    double getArea() {
        return Math.PI * radius * radius;
    }

    @Override
    String getFormula() {
        return "π × r² (r=" + radius + ")";
    }
}

class Rect extends Shape {
    double width, height;

    Rect(String name, double width, double height) {
        super(name);
        this.width = width;
        this.height = height;
    }

    @Override
    double getArea() {
        return width * height;
    }

    @Override
    String getFormula() {
        return "가로 × 세로 (" + width + " × " + height + ")";
    }
}

class Triangle extends Shape {
    double base, height;

    Triangle(String name, double base, double height) {
        super(name);
        this.base = base;
        this.height = height;
    }

    @Override
    double getArea() {
        return base * height / 2;
    }

    @Override
    String getFormula() {
        return "밑변 × 높이 ÷ 2 (" + base + " × " + height + " ÷ 2)";
    }
}

// 추상 클래스 vs 인터페이스
// 추상 클래스: 공통 상태(필드) + 공통 로직 + 추상 메서드, 단일 상속
// 인터페이스: 추상 메서드 위주, 다중 구현 가능
