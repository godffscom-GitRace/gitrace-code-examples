// [150] Proxy와 Reflect (Proxy & Reflect)
// 레벨: 5 | Proxy로 객체 동작을 가로채고 커스터마이징합니다

// === 기본 Proxy ===
console.log("=== 기본 Proxy ===");
const target = { name: "홍길동", age: 28 };

const handler = {
  get(target, prop) {
    console.log(`  [GET] ${prop}`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    console.log(`  [SET] ${prop} = ${value}`);
    return Reflect.set(target, prop, value);
  },
};

const proxy = new Proxy(target, handler);
proxy.name;        // GET 트랩 발동
proxy.age = 30;    // SET 트랩 발동

// === 유효성 검사 Proxy ===
console.log("\n=== 유효성 검사 ===");
function createValidated(schema) {
  return new Proxy({}, {
    set(target, prop, value) {
      if (!(prop in schema)) {
        throw new Error(`알 수 없는 속성: ${prop}`);
      }
      const validator = schema[prop];
      if (!validator(value)) {
        throw new Error(`${prop} 유효성 검사 실패: ${value}`);
      }
      return Reflect.set(target, prop, value);
    }
  });
}

const userSchema = {
  name: (v) => typeof v === "string" && v.length > 0,
  age: (v) => typeof v === "number" && v >= 0 && v <= 150,
  email: (v) => typeof v === "string" && v.includes("@"),
};

const user = createValidated(userSchema);
user.name = "김철수";
user.age = 25;
user.email = "kim@example.com";
console.log(`  이름: ${user.name}, 나이: ${user.age}`);

try {
  user.age = -5;
} catch (e) {
  console.log(`  오류: ${e.message}`);
}

try {
  user.phone = "010-1234";
} catch (e) {
  console.log(`  오류: ${e.message}`);
}

// === 읽기 전용 Proxy ===
console.log("\n=== 읽기 전용 객체 ===");
function readonly(target) {
  return new Proxy(target, {
    set() { throw new Error("읽기 전용 객체입니다"); },
    deleteProperty() { throw new Error("읽기 전용 객체입니다"); },
  });
}

const config = readonly({ host: "localhost", port: 3000 });
console.log(`  host: ${config.host}`);
try {
  config.port = 8080;
} catch (e) {
  console.log(`  오류: ${e.message}`);
}

// === 접근 로깅 Proxy ===
console.log("\n=== 접근 로깅 ===");
function withLogging(obj, name) {
  const log = [];
  const proxy = new Proxy(obj, {
    get(target, prop) {
      log.push({ action: "get", prop, time: new Date().toISOString() });
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      log.push({ action: "set", prop, value, time: new Date().toISOString() });
      return Reflect.set(target, prop, value);
    },
  });
  proxy._getLog = () => log;
  return proxy;
}

const data = withLogging({ x: 1, y: 2 }, "data");
data.x;
data.y = 10;
data.z = 30;
const accessLog = data._getLog();
console.log(`  기록된 접근: ${accessLog.length}건`);
accessLog.forEach(l => console.log(`    ${l.action}(${l.prop}${l.value !== undefined ? `=${l.value}` : ""})`));

// === 기본값 Proxy ===
console.log("\n=== 기본값 설정 ===");
function withDefaults(target, defaults) {
  return new Proxy(target, {
    get(target, prop) {
      return prop in target ? target[prop] : defaults[prop];
    },
  });
}

const settings = withDefaults(
  { theme: "dark" },
  { theme: "light", lang: "ko", fontSize: 16 }
);
console.log(`  theme: ${settings.theme}`);       // dark (설정됨)
console.log(`  lang: ${settings.lang}`);          // ko (기본값)
console.log(`  fontSize: ${settings.fontSize}`);  // 16 (기본값)

// === Reflect API ===
console.log("\n=== Reflect API ===");
const obj = { a: 1, b: 2, c: 3 };

console.log(`  has 'a': ${Reflect.has(obj, "a")}`);
console.log(`  keys: [${Reflect.ownKeys(obj)}]`);
Reflect.set(obj, "d", 4);
console.log(`  set 'd': ${obj.d}`);
Reflect.deleteProperty(obj, "a");
console.log(`  delete 'a': keys = [${Reflect.ownKeys(obj)}]`);

// === 함수 호출 트랩 ===
console.log("\n=== 함수 호출 트랩 ===");
function createTracked(fn) {
  let callCount = 0;
  return new Proxy(fn, {
    apply(target, thisArg, args) {
      callCount++;
      console.log(`  호출 #${callCount}: ${target.name}(${args.join(", ")})`);
      const result = Reflect.apply(target, thisArg, args);
      console.log(`  반환: ${result}`);
      return result;
    },
  });
}

function add(a, b) { return a + b; }
const trackedAdd = createTracked(add);
trackedAdd(1, 2);
trackedAdd(10, 20);
