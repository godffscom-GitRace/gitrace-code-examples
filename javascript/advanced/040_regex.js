// [40] 정규 표현식 - Regular Expression (Regex)
// 레벨: 4 | 정규 표현식으로 문자열 패턴을 처리합니다

// 정규 표현식 생성
const pattern1 = /hello/i; // 리터럴 (i = 대소문자 무시)
const pattern2 = new RegExp("hello", "i"); // 생성자

// test() - 매치 여부 확인 (true/false)
console.log(/\d+/.test("abc123")); // true (숫자 있음)
console.log(/\d+/.test("abcdef")); // false (숫자 없음)

// match() - 매치 결과 배열 반환
const text = "오늘은 2026년 2월 16일입니다";
const dates = text.match(/\d+/g);
console.log("숫자 추출:", dates); // ['2026', '2', '16']

// replace() - 패턴 치환
const messy = "Hello     World   JavaScript";
const clean = messy.replace(/\s+/g, " ");
console.log("정리:", clean); // "Hello World JavaScript"

// 자주 쓰는 패턴
const patterns = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^01[016789]-?\d{3,4}-?\d{4}$/,
  url: /^https?:\/\/.+\..+$/,
};

// 이메일 검증
const emails = ["user@gmail.com", "invalid@", "test@naver.co.kr"];
emails.forEach((email) => {
  const valid = patterns.email.test(email);
  console.log(`${email} → ${valid ? "유효" : "무효"}`);
});

// 전화번호 검증
const phones = ["010-1234-5678", "01012345678", "02-123-4567"];
console.log("\n전화번호 검증:");
phones.forEach((phone) => {
  const valid = patterns.phone.test(phone);
  console.log(`${phone} → ${valid ? "유효" : "무효"}`);
});

// 그룹 캡처 - ()
const dateStr = "2026-02-16";
const match = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
if (match) {
  console.log(`\n년: ${match[1]}, 월: ${match[2]}, 일: ${match[3]}`);
}

// 전화번호 포맷팅
function formatPhone(phone) {
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
}
console.log(formatPhone("01012345678")); // 010-1234-5678
