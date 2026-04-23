// ES6 Class

class Animal {
  constructor(name, sound) {
    this.name  = name;
    this.sound = sound;
  }

  speak() { return `${this.name}: ${this.sound}!`; }
  info()  { return `[${this.constructor.name}] ${this.name}`; }
}

const cat = new Animal("Whiskers", "meow");
console.log(cat.speak());

// extends and super — inheritance
class Dog extends Animal {
  constructor(name, breed) {
    super(name, "woof");
    this.breed = breed;
  }

  info() { return `${super.info()} (${this.breed})`; }
  fetch(item) { return `${this.name} fetches the ${item}!`; }
}

const dog = new Dog("Rex", "Husky");
console.log(dog.speak());    // inherited
console.log(dog.info());
console.log(dog.fetch("ball"));

// static methods — called on the class, not instances
class MathHelper {
  static add(a, b)          { return a + b; }
  static multiply(a, b)     { return a * b; }
  static average(...nums)   { return nums.reduce((a, b) => a + b, 0) / nums.length; }
}

console.log(MathHelper.add(5, 3));
console.log(MathHelper.average(80, 90, 85));

// getter / setter with private field
class Temperature {
  #celsius;
  constructor(c) { this.#celsius = c; }

  get fahrenheit()    { return this.#celsius * 1.8 + 32; }
  set fahrenheit(f)   { this.#celsius = (f - 32) / 1.8; }
  toString()          { return `${this.#celsius}C (${this.fahrenheit}F)`; }
}

const temp = new Temperature(100);
console.log(temp.toString());
temp.fahrenheit = 68;
console.log(temp.toString());
