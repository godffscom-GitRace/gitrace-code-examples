// [30] 조건문 (if-switch) - Conditionals
// 레벨: 2 | 다양한 조건문 사용법을 배웁니다

// if-else if-else
function getGrade(score) {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}
console.log(`85점 → ${getGrade(85)}`); // B

// switch-case
function getDayName(day) {
  switch (day) {
    case 0: return "일요일";
    case 1: return "월요일";
    case 2: return "화요일";
    case 3: return "수요일";
    case 4: return "목요일";
    case 5: return "금요일";
    case 6: return "토요일";
    default: return "잘못된 입력";
  }
}
console.log(getDayName(3)); // 수요일

// 삼항 연산자
const age = 20;
const status = age >= 18 ? "성인" : "미성년자";
console.log(`${age}살 → ${status}`);

// 단축 평가 (&&, ||)
const user = { name: "김철수" };

// && : 왼쪽이 true면 오른쪽 반환
const greeting = user && `안녕, ${user.name}`;
console.log(greeting); // "안녕, 김철수"

// || : 왼쪽이 falsy면 오른쪽 반환 (기본값 설정)
const nickname = user.nickname || "닉네임 없음";
console.log(nickname); // "닉네임 없음"

// ?? : null/undefined일 때만 오른쪽 (nullish coalescing)
const count = 0;
console.log(count || 10);  // 10 (0은 falsy)
console.log(count ?? 10);  // 0  (0은 null/undefined 아님)
