// Proxy & Reflect

// basic Proxy with get/set traps
const target = { name: "Alice", age: 28 };
const handler = {
  get(target, prop) {
    console.log(`[GET] ${prop}`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    console.log(`[SET] ${prop} = ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const proxy = new Proxy(target, handler);
proxy.name;
proxy.age = 30;

// validation Proxy
function createValidated(schema) {
  return new Proxy({}, {
    set(target, prop, value) {
      if (!(prop in schema)) throw new Error(`unknown prop: ${prop}`);
      if (!schema[prop](value)) throw new Error(`invalid value for ${prop}: ${value}`);
      return Reflect.set(target, prop, value);
    }
  });
}

const userSchema = {
  name:  v => typeof v === "string" && v.length > 0,
  age:   v => typeof v === "number" && v >= 0 && v <= 150,
  email: v => typeof v === "string" && v.includes("@")
};

const user = createValidated(userSchema);
user.name  = "Alice";
user.age   = 25;
user.email = "alice@example.com";
try { user.age = -5; } catch (e) { console.log(`error: ${e.message}`); }

// read-only Proxy
function readonly(obj) {
  return new Proxy(obj, {
    set()            { throw new Error("read only"); },
    deleteProperty() { throw new Error("read only"); }
  });
}

const config = readonly({ host: "localhost", port: 3000 });
console.log(`host: ${config.host}`);
try { config.port = 8080; } catch (e) { console.log(`error: ${e.message}`); }

// Reflect API basics
const obj = { a: 1, b: 2 };
console.log(`has 'a': ${Reflect.has(obj, "a")}`);
console.log(`keys: [${Reflect.ownKeys(obj)}]`);
Reflect.set(obj, "c", 3);
Reflect.deleteProperty(obj, "a");
console.log(`keys after: [${Reflect.ownKeys(obj)}]`);
