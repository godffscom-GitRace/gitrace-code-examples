// [27] 객체 리터럴 - Object Literal
// 레벨: 2 | JavaScript 객체의 기본을 배웁니다

// 객체 생성 { }
const student = {
  name: "김철수",
  age: 20,
  scores: [85, 92, 78],
  isActive: true
};

// 속성 접근 - 점 표기법
console.log(student.name); // "김철수"
console.log(student.age);  // 20

// 속성 접근 - 대괄호 표기법
const key = "name";
console.log(student[key]); // "김철수"

// 메서드 정의
const calculator = {
  result: 0,
  add(num) {
    this.result += num;
    return this;
  },
  subtract(num) {
    this.result -= num;
    return this;
  },
  getResult() {
    return this.result;
  }
};

calculator.add(10).add(5).subtract(3);
console.log(`계산 결과: ${calculator.getResult()}`); // 12

// 객체 수정/삭제
student.grade = "A";        // 속성 추가
student.age = 21;           // 속성 수정
delete student.isActive;    // 속성 삭제
console.log(student);

// 객체 순회
console.log("\n=== 학생 정보 ===");
for (const [k, v] of Object.entries(student)) {
  console.log(`${k}: ${v}`);
}
