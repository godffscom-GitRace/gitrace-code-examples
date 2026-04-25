// Conditionals

function getGrade(score) {
  if (score >= 90) return "A";
  else if (score >= 80) return "B";
  else if (score >= 70) return "C";
  else if (score >= 60) return "D";
  else return "F";
}

console.log("85 => " + getGrade(85));

function getDayName(day) {
  switch (day) {
    case 0: return "Sunday";
    case 1: return "Monday";
    case 2: return "Tuesday";
    case 3: return "Wednesday";
    case 4: return "Thursday";
    case 5: return "Friday";
    case 6: return "Saturday";
    default: return "invalid";
  }
}

console.log(getDayName(3));

const age = 20;
const status = age >= 18 ? "adult" : "minor";
console.log(age + " => " + status);

const user = { name: "Alice" };
const greeting = user && "Hello, " + user.name;
console.log(greeting);

const nickname = user.nickname || "no nickname";
console.log(nickname);

const count = 0;
console.log(count || 10);
console.log(count ?? 10);
