// Prototype and Inheritance

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  return "Hi, " + this.name + " (" + this.age + ")";
};

const alice = new Person("Alice", 25);
console.log(alice.greet());

console.log(alice.__proto__ === Person.prototype);

const animal = {
  speak: function() {
    return this.name + " speaks";
  }
};

const dog = Object.create(animal);
dog.name = "Rex";
console.log(dog.speak());

function Student(name, age, grade) {
  Person.call(this, name, age);
  this.grade = grade;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function() {
  return this.name + " grade " + this.grade;
};

const bob = new Student("Bob", 17, 2);

console.log(bob.greet());
console.log(bob.study());
console.log(bob instanceof Person);
