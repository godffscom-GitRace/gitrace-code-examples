// [154] LocalStorage와 SessionStorage (Web Storage)
// 레벨: 2 | 브라우저 스토리지를 사용해 데이터를 저장하고 관리합니다
// 참고: 브라우저 API입니다. Node.js에서는 시뮬레이션으로 학습합니다.

// === Storage 시뮬레이션 (Node.js용) ===
class StorageSimulator {
  constructor(name) {
    this.name = name;
    this._store = {};
  }

  setItem(key, value) {
    this._store[key] = String(value);
    console.log(`  [${this.name}] SET "${key}" = ${value}`);
  }

  getItem(key) {
    return this._store[key] || null;
  }

  removeItem(key) {
    delete this._store[key];
    console.log(`  [${this.name}] REMOVE "${key}"`);
  }

  clear() {
    this._store = {};
    console.log(`  [${this.name}] CLEAR`);
  }

  get length() {
    return Object.keys(this._store).length;
  }

  key(index) {
    return Object.keys(this._store)[index] || null;
  }
}

const localStorage = new StorageSimulator("localStorage");
const sessionStorage = new StorageSimulator("sessionStorage");

// === 기본 사용법 ===
console.log("=== 기본 사용법 ===");
localStorage.setItem("username", "홍길동");
localStorage.setItem("theme", "dark");
localStorage.setItem("lang", "ko");

console.log(`  username: ${localStorage.getItem("username")}`);
console.log(`  theme: ${localStorage.getItem("theme")}`);
console.log(`  없는 키: ${localStorage.getItem("없는키")}`);
console.log(`  저장된 항목: ${localStorage.length}개`);

// === JSON 데이터 저장 ===
console.log("\n=== JSON 데이터 저장 ===");
const user = { name: "김철수", age: 28, skills: ["JS", "Python"] };
localStorage.setItem("user", JSON.stringify(user));

const loaded = JSON.parse(localStorage.getItem("user"));
console.log(`  이름: ${loaded.name}`);
console.log(`  스킬: [${loaded.skills}]`);

// === 배열 저장 ===
console.log("\n=== 배열 저장 ===");
const todos = [
  { id: 1, text: "공부하기", done: false },
  { id: 2, text: "운동하기", done: true },
  { id: 3, text: "코딩하기", done: false },
];
localStorage.setItem("todos", JSON.stringify(todos));

const loadedTodos = JSON.parse(localStorage.getItem("todos"));
loadedTodos.forEach(t => {
  console.log(`  [${t.done ? "V" : " "}] ${t.text}`);
});

// === 안전한 헬퍼 함수 ===
console.log("\n=== 안전한 헬퍼 함수 ===");

class SafeStorage {
  constructor(storage, prefix = "") {
    this.storage = storage;
    this.prefix = prefix;
  }

  _key(key) {
    return this.prefix ? `${this.prefix}:${key}` : key;
  }

  set(key, value, ttl = null) {
    const item = {
      value,
      timestamp: Date.now(),
      ttl, // ms 단위 만료 시간
    };
    this.storage.setItem(this._key(key), JSON.stringify(item));
  }

  get(key, defaultValue = null) {
    const raw = this.storage.getItem(this._key(key));
    if (!raw) return defaultValue;

    try {
      const item = JSON.parse(raw);
      // TTL 확인
      if (item.ttl && Date.now() - item.timestamp > item.ttl) {
        this.storage.removeItem(this._key(key));
        return defaultValue;
      }
      return item.value;
    } catch {
      return defaultValue;
    }
  }

  remove(key) {
    this.storage.removeItem(this._key(key));
  }
}

const appStore = new SafeStorage(localStorage, "myapp");

appStore.set("config", { darkMode: true, fontSize: 16 });
appStore.set("token", "abc123", 3600000); // 1시간 TTL

console.log(`  config: ${JSON.stringify(appStore.get("config"))}`);
console.log(`  token: ${appStore.get("token")}`);
console.log(`  없는키: ${appStore.get("없는키", "기본값")}`);

// === LocalStorage vs SessionStorage ===
console.log("\n=== LocalStorage vs SessionStorage ===");
console.log("  ┌──────────────┬──────────────────┬─────────────────┐");
console.log("  │              │  LocalStorage     │  SessionStorage │");
console.log("  ├──────────────┼──────────────────┼─────────────────┤");
console.log("  │ 수명         │  영구 (직접 삭제) │  탭 닫으면 삭제  │");
console.log("  │ 공유         │  같은 도메인      │  같은 탭만       │");
console.log("  │ 용량         │  ~5-10MB          │  ~5MB           │");
console.log("  │ 용도         │  설정, 테마       │  폼 임시저장     │");
console.log("  └──────────────┴──────────────────┴─────────────────┘");

// === 주의사항 ===
console.log("\n=== 주의사항 ===");
console.log("  1. 문자열만 저장 가능 → JSON.stringify/parse 필수");
console.log("  2. 동기적 API → 대량 데이터는 IndexedDB 사용");
console.log("  3. 보안 민감 데이터 저장 금지 (비밀번호, 토큰 등)");
console.log("  4. 시크릿/프라이빗 모드에서 제한될 수 있음");
