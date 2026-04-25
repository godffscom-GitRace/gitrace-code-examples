// Proxy basic

const target = { name: "Alice", age: 20 };

const handler = {
  get(obj, prop) {
    console.log("GET:", prop);
    return obj[prop];
  },
  set(obj, prop, value) {
    console.log("SET:", prop, value);
    obj[prop] = value;
    return true;
  }
};

const user = new Proxy(target, handler);

user.name;
user.age = 30;

// validation proxy
function createUser(schema) {
  return new Proxy({}, {
    set(obj, prop, value) {
      if (!schema[prop]) {
        throw new Error("invalid prop");
      }
      if (!schema[prop](value)) {
        throw new Error("invalid value");
      }
      obj[prop] = value;
      return true;
    }
  });
}

const schema = {
  name: v => typeof v === "string",
  age: v => typeof v === "number" && v >= 0
};

const u = createUser(schema);

u.name = "Bob";
u.age = 25;

try {
  u.age = -1;
} catch (e) {
  console.log("error:", e.message);
}

// readonly proxy
function readonly(obj) {
  return new Proxy(obj, {
    set() {
      throw new Error("readonly");
    }
  });
}

const config = readonly({ port: 3000 });

console.log(config.port);

try {
  config.port = 8080;
} catch (e) {
  console.log("error:", e.message);
}
