// [36] 프로토타입과 상속 - Prototype & Inheritance
// 레벨: 5 | JavaScript의 프로토타입 기반 상속을 마스터합니다

// 생성자 함수
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// 프로토타입에 메서드 추가
Person.prototype.greet = function () {
  return `안녕, 나는 ${this.name} (${this.age}살)`;
};

const kim = new Person("김철수", 25);
console.log(kim.greet()); // 안녕, 나는 김철수 (25살)

// 프로토타입 체인 확인
console.log(kim.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true

// Object.create()로 상속
const animal = {
  type: "동물",
  speak() {
    return `${this.name}이(가) 소리를 냅니다`;
  },
};

const dog = Object.create(animal);
dog.name = "바둑이";
dog.breed = "진돗개";
console.log(dog.speak()); // 바둑이이(가) 소리를 냅니다
console.log(dog.type); // 동물 (프로토타입 체인으로 접근)

// 생성자 함수로 상속 구현
function Student(name, age, grade) {
  Person.call(this, name, age); // 부모 생성자 호출
  this.grade = grade;
}

// 프로토타입 체인 연결
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function () {
  return `${this.name}이(가) 공부 중 (${this.grade}학년)`;
};

const student = new Student("이영희", 17, 2);
console.log(student.greet()); // 안녕, 나는 이영희 (17살) - 상속!
console.log(student.study()); // 이영희이(가) 공부 중 (2학년)

// instanceof 확인
console.log(student instanceof Student); // true
console.log(student instanceof Person); // true
console.log(student instanceof Object); // true

// hasOwnProperty - 자기 자신의 속성인지 확인
console.log(student.hasOwnProperty("name")); // true
console.log(student.hasOwnProperty("greet")); // false (프로토타입의 것)
