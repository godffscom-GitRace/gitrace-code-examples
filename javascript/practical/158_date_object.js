const now = new Date();
const event = new Date(2026, 11, 25);

console.log(now);
console.log(event);

console.log(now.getFullYear());
console.log(now.getMonth() + 1);
console.log(now.getDate());

function format(d) {
  const pad = n => String(n).padStart(2, "0");
  return d.getFullYear() + "-" +
    pad(d.getMonth() + 1) + "-" +
    pad(d.getDate());
}

console.log(format(now));

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

const after7 = addDays(now, 7);
const before7 = addDays(now, -7);

console.log(format(after7));
console.log(format(before7));

function diffDays(a, b) {
  return Math.floor(Math.abs(b - a) / 86400000);
}

console.log(diffDays(now, event));

const events = [
  { name: "A", date: new Date(2026, 0, 1) },
  { name: "B", date: new Date(2026, 5, 1) }
];

for (const e of events) {
  const d = diffDays(now, e.date);
  console.log(e.name, d);
}
