// [10] 상속 (Inheritance) - Inheritance & Polymorphism
// 레벨: 3 | 클래스 상속과 메서드 오버라이딩을 학습합니다

public class Inheritance {

    public static void main(String[] args) {

        Animal a1 = new Dog("Rex");
        Animal a2 = new Cat("Milo");

        Animal[] list = {a1, a2};

        for (Animal a : list) {
            a.speak();
        }

        Dog d = new Dog("Max");
        d.run();
    }
}

class Animal {

    String name;

    Animal(String name) {
        this.name = name;
    }

    void speak() {
        System.out.println("sound");
    }
}

class Dog extends Animal {

    Dog(String name) {
        super(name);
    }

    void speak() {
        System.out.println(name + " bark");
    }

    void run() {
        System.out.println(name + " run");
    }
}

class Cat extends Animal {

    Cat(String name) {
        super(name);
    }

    void speak() {
        System.out.println(name + " meow");
    }
}
