// [70] 상속 (Inheritance) - Inheritance & Polymorphism
// 레벨: 3 | 클래스 상속과 메서드 오버라이딩을 학습합니다

public class 070_Inheritance {

    public static void main(String[] args) {
        Dog dog = new Dog("바둑이", 3);
        Cat cat = new Cat("나비", 2);
        Bird bird = new Bird("짹짹이", 1);

        // 다형성 (polymorphism) - 부모 타입으로 참조
        Animal[] animals = {dog, cat, bird};

        for (Animal animal : animals) {
            animal.introduce();
            animal.speak();   // 각 자식 클래스의 오버라이딩된 메서드 호출
            System.out.println();
        }

        // 자식 클래스 고유 메서드
        dog.fetch();
        cat.purr();
        bird.fly();
    }
}

// 부모 클래스
class Animal {
    String name;
    int age;

    // 생성자
    Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    void introduce() {
        System.out.println(name + " (" + age + "살)");
    }

    // 자식에서 오버라이딩할 메서드
    void speak() {
        System.out.println("...");
    }
}

// 자식 클래스 - extends로 상속
class Dog extends Animal {
    // super로 부모 생성자 호출
    Dog(String name, int age) {
        super(name, age);
    }

    // @Override - 메서드 오버라이딩
    @Override
    void speak() {
        System.out.println(name + ": 멍멍!");
    }

    // 고유 메서드
    void fetch() {
        System.out.println(name + "이(가) 공을 물어옵니다!");
    }
}

class Cat extends Animal {
    Cat(String name, int age) {
        super(name, age);
    }

    @Override
    void speak() {
        System.out.println(name + ": 야옹~");
    }

    void purr() {
        System.out.println(name + "이(가) 그르릉 합니다.");
    }
}

class Bird extends Animal {
    Bird(String name, int age) {
        super(name, age);
    }

    @Override
    void speak() {
        System.out.println(name + ": 짹짹!");
    }

    void fly() {
        System.out.println(name + "이(가) 하늘을 날아갑니다!");
    }
}
