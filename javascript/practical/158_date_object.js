// [158] Date 객체 완벽 가이드 (Date Object)
// 레벨: 3 | JavaScript Date 객체를 완벽하게 다루는 방법을 학습합니다

// === 날짜 생성 ===
console.log("=== 날짜 생성 ===");
const now = new Date();
const specific = new Date(2026, 1, 17, 14, 30, 0); // 월은 0부터!
const fromString = new Date("2026-02-17T14:30:00");
const fromTimestamp = new Date(1771408200000);

console.log(`  현재: ${now}`);
console.log(`  지정: ${specific}`);
console.log(`  문자열: ${fromString}`);
console.log(`  타임스탬프: ${Date.now()}`);

// === 날짜 정보 읽기 ===
console.log("\n=== 날짜 정보 ===");
const d = new Date();
console.log(`  년: ${d.getFullYear()}`);
console.log(`  월: ${d.getMonth() + 1} (0부터 시작이므로 +1)`);
console.log(`  일: ${d.getDate()}`);
console.log(`  요일: ${d.getDay()} (0=일, 1=월, ..., 6=토)`);
console.log(`  시: ${d.getHours()}`);
console.log(`  분: ${d.getMinutes()}`);
console.log(`  초: ${d.getSeconds()}`);

// === 날짜 포맷팅 ===
console.log("\n=== 날짜 포맷팅 ===");

function formatDate(date, format) {
  const pad = (n) => String(n).padStart(2, "0");
  const tokens = {
    YYYY: date.getFullYear(),
    MM: pad(date.getMonth() + 1),
    DD: pad(date.getDate()),
    HH: pad(date.getHours()),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
  };

  let result = format;
  for (const [token, value] of Object.entries(tokens)) {
    result = result.replace(token, value);
  }
  return result;
}

console.log(`  기본: ${formatDate(d, "YYYY-MM-DD")}`);
console.log(`  상세: ${formatDate(d, "YYYY-MM-DD HH:mm:ss")}`);
console.log(`  한국식: ${formatDate(d, "YYYY년 MM월 DD일")}`);

// toLocaleString 활용
console.log(`  locale(ko): ${d.toLocaleDateString("ko-KR")}`);
console.log(`  locale(en): ${d.toLocaleDateString("en-US")}`);
console.log(`  locale 상세: ${d.toLocaleDateString("ko-KR", {
  year: "numeric", month: "long", day: "numeric", weekday: "long"
})}`);

// === 날짜 연산 ===
console.log("\n=== 날짜 연산 ===");

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function addMonths(date, months) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

const today = new Date();
console.log(`  오늘: ${formatDate(today, "YYYY-MM-DD")}`);
console.log(`  7일 후: ${formatDate(addDays(today, 7), "YYYY-MM-DD")}`);
console.log(`  30일 전: ${formatDate(addDays(today, -30), "YYYY-MM-DD")}`);
console.log(`  3개월 후: ${formatDate(addMonths(today, 3), "YYYY-MM-DD")}`);

// 두 날짜 차이
function daysBetween(date1, date2) {
  const ms = Math.abs(date2 - date1);
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

const christmas = new Date(2026, 11, 25); // 12월 = 11
console.log(`  크리스마스까지: ${daysBetween(today, christmas)}일`);

// === 요일 ===
console.log("\n=== 요일 ===");
const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
console.log(`  오늘: ${dayNames[today.getDay()]}요일`);

// 이번 주 월요일
function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}
console.log(`  이번 주 월요일: ${formatDate(getMonday(today), "YYYY-MM-DD")}`);

// === D-Day 계산기 ===
console.log("\n=== D-Day 계산기 ===");
const events = [
  { name: "크리스마스", date: new Date(2026, 11, 25) },
  { name: "새해", date: new Date(2027, 0, 1) },
  { name: "어린이날", date: new Date(2026, 4, 5) },
];

for (const event of events) {
  const diff = daysBetween(today, event.date);
  const isPast = event.date < today;
  console.log(`  ${event.name}: ${isPast ? "D+" : "D-"}${diff}`);
}

// === 날짜 비교 ===
console.log("\n=== 날짜 비교 ===");
const d1 = new Date("2026-01-01");
const d2 = new Date("2026-12-31");
console.log(`  ${formatDate(d1, "MM/DD")} < ${formatDate(d2, "MM/DD")}: ${d1 < d2}`);
console.log(`  같은 날: ${d1.getTime() === new Date("2026-01-01").getTime()}`);

// 날짜 범위 확인
function isInRange(date, start, end) {
  return date >= start && date <= end;
}

const checkDate = new Date("2026-06-15");
console.log(`  6/15 in Q1: ${isInRange(checkDate, new Date("2026-01-01"), new Date("2026-03-31"))}`);
console.log(`  6/15 in Q2: ${isInRange(checkDate, new Date("2026-04-01"), new Date("2026-06-30"))}`);

// === 상대 시간 표시 ===
console.log("\n=== 상대 시간 ===");
function timeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const intervals = [
    { label: "년", seconds: 31536000 },
    { label: "개월", seconds: 2592000 },
    { label: "일", seconds: 86400 },
    { label: "시간", seconds: 3600 },
    { label: "분", seconds: 60 },
  ];
  for (const { label, seconds: s } of intervals) {
    const count = Math.floor(seconds / s);
    if (count >= 1) return `${count}${label} 전`;
  }
  return "방금 전";
}

console.log(`  1시간 전: ${timeAgo(new Date(Date.now() - 3600000))}`);
console.log(`  3일 전: ${timeAgo(new Date(Date.now() - 259200000))}`);
console.log(`  방금: ${timeAgo(new Date())}`);
