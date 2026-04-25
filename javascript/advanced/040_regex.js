// Regular Expressions

const pattern1 = /hello/i;
const pattern2 = new RegExp("hello", "i");

console.log(/\d+/.test("abc123"));
console.log(/\d+/.test("abcdef"));

const text = "Today is 2026-02-16";
const dates = text.match(/\d+/g);

console.log("numbers:");
for (let i = 0; i < dates.length; i++) {
  console.log(dates[i]);
}

const messy = "Hello     World   JS";
const clean = messy.replace(/\s+/g, " ");
console.log("cleaned: " + clean);

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const emails = ["user@gmail.com", "invalid@", "test@naver.co.kr"];

for (let i = 0; i < emails.length; i++) {
  const e = emails[i];
  const ok = emailPattern.test(e) ? "valid" : "invalid";
  console.log(e + " => " + ok);
}

const dateStr = "2026-02-16";
const m = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);

if (m) {
  console.log("year:" + m[1] + " month:" + m[2] + " day:" + m[3]);
}

function formatPhone(phone) {
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
}

console.log(formatPhone("01012345678"));
