// ES6 Class

class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    return this.name + ": " + this.sound;
  }
}

const cat = new Animal("Cat", "meow");
console.log(cat.speak());

class Dog extends Animal {
  constructor(name) {
    super(name, "woof");
  }

  run() {
    return this.name + " runs";
  }
}

const dog = new Dog("Rex");
console.log(dog.speak());
console.log(dog.run());

class MathHelper {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathHelper.add(2, 3));

class Temp {
  constructor(c) {
    this.c = c;
  }

  get f() {
    return this.c * 1.8 + 32;
  }

  set f(value) {
    this.c = (value - 32) / 1.8;
  }
}

const t = new Temp(0);
console.log(t.f);

t.f = 68;
console.log(t.c);
