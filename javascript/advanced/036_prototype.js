// Prototype & Inheritance

// constructor function
function Person(name, age) {
  this.name = name;
  this.age  = age;
}

// add method to prototype
Person.prototype.greet = function() {
  return `Hi, I'm ${this.name} (${this.age})`;
};

const alice = new Person("Alice", 25);
console.log(alice.greet());

// prototype chain
console.log(alice.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true

// Object.create() inheritance
const animal = {
  type: "animal",
  speak() { return `${this.name} makes a sound`; }
};

const dog = Object.create(animal);
dog.name  = "Rex";
dog.breed = "Husky";
console.log(dog.speak());
console.log(dog.type); // inherited

// constructor-based inheritance
function Student(name, age, grade) {
  Person.call(this, name, age);
  this.grade = grade;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function() {
  return `${this.name} is studying (grade ${this.grade})`;
};

const bob = new Student("Bob", 17, 2);
console.log(bob.greet());  // inherited from Person
console.log(bob.study());

// instanceof
console.log(bob instanceof Student); // true
console.log(bob instanceof Person);  // true

// hasOwnProperty
console.log(bob.hasOwnProperty("name"));  // true
console.log(bob.hasOwnProperty("greet")); // false
