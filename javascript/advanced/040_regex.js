// Regular Expressions

// create regex
const pattern1 = /hello/i;          // literal (case-insensitive)
const pattern2 = new RegExp("hello", "i"); // constructor

// test() — true/false
console.log(/\d+/.test("abc123")); // true
console.log(/\d+/.test("abcdef")); // false

// match() — returns array
const text = "Today is 2026-02-16";
const dates = text.match(/\d+/g);
console.log("numbers:", dates); // ['2026', '02', '16']

// replace()
const messy = "Hello     World   JS";
const clean = messy.replace(/\s+/g, " ");
console.log("cleaned:", clean);

// common validation patterns
const patterns = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^01[016789]-?\d{3,4}-?\d{4}$/,
  url:   /^https?:\/\/.+\..+$/,
};

const emails = ["user@gmail.com", "invalid@", "test@naver.co.kr"];
emails.forEach(e => {
  console.log(`${e} => ${patterns.email.test(e) ? "valid" : "invalid"}`);
});

// capture groups
const dateStr = "2026-02-16";
const m = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
if (m) console.log(`year:${m[1]} month:${m[2]} day:${m[3]}`);

// format phone with replace groups
function formatPhone(phone) {
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
}
console.log(formatPhone("01012345678")); // 010-1234-5678
