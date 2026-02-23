// [37] class 문법 - ES6 Class
// 레벨: 4 | ES6 클래스 문법으로 객체지향 프로그래밍을 합니다

// class 키워드
class Animal {
  // constructor - 생성자
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  // 메서드
  speak() {
    return `${this.name}: ${this.sound}!`;
  }

  info() {
    return `[${this.constructor.name}] ${this.name}`;
  }
}

const cat = new Animal("나비", "야옹");
console.log(cat.speak()); // 나비: 야옹!

// extends와 super - 상속
class Dog extends Animal {
  constructor(name, breed) {
    super(name, "멍멍"); // 부모 생성자 호출
    this.breed = breed;
  }

  // 메서드 오버라이딩
  info() {
    return `${super.info()} (${this.breed})`;
  }

  fetch(item) {
    return `${this.name}이(가) ${item}을 물어옵니다!`;
  }
}

const dog = new Dog("바둑이", "진돗개");
console.log(dog.speak()); // 바둑이: 멍멍! (상속)
console.log(dog.info()); // [Dog] 바둑이 (진돗개)
console.log(dog.fetch("공")); // 바둑이이(가) 공을 물어옵니다!

// static 메서드 - 인스턴스 없이 호출
class MathHelper {
  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static average(...nums) {
    const sum = nums.reduce((a, b) => a + b, 0);
    return sum / nums.length;
  }
}

console.log(MathHelper.add(5, 3)); // 8
console.log(MathHelper.average(80, 90, 85)); // 85

// getter/setter
class Temperature {
  #celsius; // private 필드

  constructor(celsius) {
    this.#celsius = celsius;
  }

  get fahrenheit() {
    return this.#celsius * 1.8 + 32;
  }

  set fahrenheit(f) {
    this.#celsius = (f - 32) / 1.8;
  }

  toString() {
    return `${this.#celsius}°C (${this.fahrenheit}°F)`;
  }
}

const temp = new Temperature(100);
console.log(temp.toString()); // 100°C (212°F)
temp.fahrenheit = 68;
console.log(temp.toString()); // 20°C (68°F)
