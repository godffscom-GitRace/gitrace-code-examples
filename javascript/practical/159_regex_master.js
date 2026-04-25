const str = "price $25 and $30";

console.log(/\d+/.test("abc123"));
console.log(str.match(/\$\d+/g));
console.log("Hello World".replace(/world/i, "JS"));
console.log("abc123".search(/\d+/));

const email = /^[\w.-]+@[\w.-]+\.\w+$/;
console.log(email.test("test@example.com"));

const phone = /^01\d-?\d{3,4}-?\d{4}$/;
console.log(phone.test("01012345678"));

const date = "2026-02-17".match(/(\d{4})-(\d{2})-(\d{2})/);
console.log(date[1], date[2], date[3]);

const named = "Alice (30, NYC)".match(/(\w+)\s+\((\d+),\s+(\w+)\)/);
console.log(named[1], named[2], named[3]);

const prices = "100won $200 300won $400";

console.log(prices.match(/\d+(?=won)/g));
console.log(prices.match(/(?<=\$)\d+/g));

const tpl = "Hi {name}, {age}";
const data = { name: "Tom", age: 20 };

console.log(tpl.replace(/\{(\w+)\}/g, (_, k) => data[k]));

const camel = "getUserName";
console.log(camel.replace(/[A-Z]/g, m => "_" + m.toLowerCase()));

const snake = "get_user_name";
console.log(snake.replace(/_([a-z])/g, (_, c) => c.toUpperCase()));
