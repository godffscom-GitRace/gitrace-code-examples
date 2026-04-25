class StorageSimulator {
  constructor(name) {
    this.name = name;
    this.data = {};
  }

  setItem(key, value) {
    this.data[key] = String(value);
    console.log(`[${this.name}] SET ${key}`);
  }

  getItem(key) {
    return this.data[key] ?? null;
  }

  removeItem(key) {
    delete this.data[key];
    console.log(`[${this.name}] DEL ${key}`);
  }

  get length() {
    return Object.keys(this.data).length;
  }
}

const localStorage = new StorageSimulator("local");

localStorage.setItem("user", "Alice");
localStorage.setItem("theme", "dark");

console.log(localStorage.getItem("user"));
console.log(localStorage.length);

const profile = { name: "Bob", age: 25 };
localStorage.setItem("profile", JSON.stringify(profile));

const loaded = JSON.parse(localStorage.getItem("profile"));
console.log(loaded.name);
console.log(loaded.age);

localStorage.removeItem("theme");
console.log(localStorage.length);
