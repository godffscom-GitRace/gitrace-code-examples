// Destructuring

const colors = ["red", "blue", "green"];

const [red, blue, green] = colors;
console.log(red + " " + blue);

const [first, , third] = colors;
console.log(first + " " + third);

const user = { name: "Alice", age: 25, city: "Seoul" };

const { name, age, city } = user;
console.log(name + ", " + age + ", " + city);

const { name: userName, age: userAge } = user;
console.log(userName + " " + userAge);

const { name: n, job = "student" } = user;
console.log(n + ": " + job);

const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head);

let tailStr = "";
for (let i = 0; i < tail.length; i++) {
  tailStr += tail[i] + " ";
}
console.log(tailStr.trim());

const { city: c, ...rest } = user;
console.log(c);

console.log("rest:");
for (const k in rest) {
  console.log(k + ": " + rest[k]);
}

function introduce(obj) {
  const { name, age, city = "unknown" } = obj;
  console.log(name + " (" + age + ") - " + city);
}

introduce(user);
