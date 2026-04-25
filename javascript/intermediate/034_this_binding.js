// this Binding

const user = {
  name: "Alice",
  greet() {
    console.log("Hi, " + this.name + "!");
  }
};
user.greet();

"use strict";
function showThis() {
  console.log("this:");
  console.log(this);
}
showThis();

function introduce(greeting) {
  console.log(greeting + ", I am " + this.name);
}

const p1 = { name: "Alice" };
const p2 = { name: "Bob" };

introduce.call(p1, "Hello");
introduce.call(p2, "Hey");

function sum(a, b, c) {
  console.log(this.label + ": " + (a + b + c));
}

sum.apply({ label: "total" }, [10, 20, 30]);

const boundGreet = introduce.bind(p1);
boundGreet("Hi");

const team = {
  name: "Dev",
  members: ["Alice", "Bob"],
  showMembers() {
    for (let i = 0; i < this.members.length; i++) {
      console.log(this.name + ": " + this.members[i]);
    }
  }
};
team.showMembers();

const obj = {
  value: 42,
  regular: function() {
    return this.value;
  },
  arrow: () => {
    return this && this.value;
  }
};

console.log("regular: " + obj.regular());
console.log("arrow: " + obj.arrow());
