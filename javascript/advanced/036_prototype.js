// [36] 프로토타입과 상속 - Prototype & Inheritance

// 1. 생성자 + 프로토타입
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `안녕, ${this.name}`;
};

// 2. 상속
function Student(name, grade) {
  Person.call(this, name);
  this.grade = grade;
}

// 프로토타입 연결
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

// 자식 메서드
Student.prototype.study = function () {
  return `${this.name} (${this.grade}학년) 공부 중`;
};

// 3. 사용
const s = new Student("이영희", 2);

console.log(s.greet()); // 부모 메서드
console.log(s.study()); // 자식 메서드

// 4. 핵심 확인
console.log(s instanceof Student); // true
console.log(s instanceof Person);  // true
