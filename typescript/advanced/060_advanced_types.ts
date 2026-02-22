// [60] 타입 시스템 고급 활용 - Advanced Type Patterns
// 레벨: 5 | TypeScript 타입 시스템을 실전에서 활용하는 고급 패턴을 배웁니다

// === 브랜드 타입 - 구조적으로 같지만 논리적으로 다른 타입 구분 ===
type USD = number & { __brand: "USD" };
type KRW = number & { __brand: "KRW" };

function usd(amount: number): USD {
  return amount as USD;
}

function krw(amount: number): KRW {
  return amount as KRW;
}

function addUSD(a: USD, b: USD): USD {
  return (a + b) as USD;
}

const price1 = usd(10);
const price2 = usd(20);
const total = addUSD(price1, price2); // OK
// addUSD(price1, krw(1000));         // Error! KRW는 USD가 아님
console.log(`합계: $${total}`);

// === 판별 유니온 (Discriminated Union) ===
interface LoadingState {
  status: "loading";
}

interface SuccessState {
  status: "success";
  data: string[];
}

interface ErrorState {
  status: "error";
  error: string;
}

type AppState = LoadingState | SuccessState | ErrorState;

function renderUI(state: AppState): string {
  switch (state.status) {
    case "loading":
      return "로딩 중...";
    case "success":
      return `데이터: ${state.data.join(", ")}`;  // data 접근 가능
    case "error":
      return `오류: ${state.error}`;              // error 접근 가능
  }
}

console.log(renderUI({ status: "loading" }));
console.log(renderUI({ status: "success", data: ["사과", "바나나"] }));
console.log(renderUI({ status: "error", error: "네트워크 오류" }));

// === 타입 안전성 패턴 - Exhaustive Check ===
function assertNever(value: never): never {
  throw new Error(`예상치 못한 값: ${value}`);
}

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "triangle"; base: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    case "triangle":
      return (shape.base * shape.height) / 2;
    default:
      return assertNever(shape); // 새 Shape 추가 시 컴파일 에러!
  }
}

console.log(`원: ${getArea({ kind: "circle", radius: 5 }).toFixed(2)}`);
console.log(`삼각형: ${getArea({ kind: "triangle", base: 10, height: 6 })}`);

// === 실전 활용 - 타입 안전한 이벤트 시스템 ===
interface EventMap {
  login: { userId: string; timestamp: Date };
  logout: { userId: string };
  purchase: { productId: string; amount: number };
}

class TypedEventEmitter {
  private handlers: { [K in keyof EventMap]?: Array<(data: EventMap[K]) => void> } = {};

  on<K extends keyof EventMap>(event: K, handler: (data: EventMap[K]) => void): void {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event]!.push(handler);
  }

  emit<K extends keyof EventMap>(event: K, data: EventMap[K]): void {
    this.handlers[event]?.forEach((handler) => handler(data));
  }
}

const emitter = new TypedEventEmitter();

emitter.on("login", (data) => {
  console.log(`로그인: ${data.userId}`); // data 타입 자동 추론!
});

emitter.on("purchase", (data) => {
  console.log(`구매: ${data.productId} - ${data.amount}원`);
});

emitter.emit("login", { userId: "user1", timestamp: new Date() });
emitter.emit("purchase", { productId: "P001", amount: 25000 });
// emitter.emit("login", { productId: "P001" }); // Error! 타입 불일치
