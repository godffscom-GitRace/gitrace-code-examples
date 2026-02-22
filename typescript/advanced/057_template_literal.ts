// [57] 템플릿 리터럴 타입 - Template Literal Types
// 레벨: 4 | 문자열 리터럴 타입을 동적으로 생성합니다

// 기본 템플릿 리터럴 타입
type Greeting = `Hello, ${string}`;
const msg1: Greeting = "Hello, World";    // OK
const msg2: Greeting = "Hello, 철수";     // OK
// const msg3: Greeting = "Hi, World";    // Error!

// 유니온과 결합 - 모든 조합 자동 생성
type Color = "red" | "green" | "blue";
type Size = "sm" | "md" | "lg";

type ColorSize = `${Color}-${Size}`;
// "red-sm" | "red-md" | "red-lg" | "green-sm" | ... (9가지)

const style: ColorSize = "blue-lg"; // OK

// Uppercase, Lowercase 내장 타입
type Shouted = Uppercase<"hello">;           // "HELLO"
type Whispered = Lowercase<"HELLO">;         // "hello"
type Title = Capitalize<"hello">;            // "Hello"
type Untitled = Uncapitalize<"Hello">;       // "hello"

// 이벤트 핸들러 이름 생성
type EventName = "click" | "focus" | "blur";
type Handler = `on${Capitalize<EventName>}`;
// "onClick" | "onFocus" | "onBlur"

const handlers: Record<Handler, () => void> = {
  onClick: () => console.log("클릭!"),
  onFocus: () => console.log("포커스!"),
  onBlur: () => console.log("블러!"),
};
handlers.onClick();

// CSS 속성 타입 생성
type Direction = "top" | "right" | "bottom" | "left";
type CSSProperty = `margin-${Direction}` | `padding-${Direction}`;

const styles: Partial<Record<CSSProperty, string>> = {
  "margin-top": "10px",
  "padding-left": "20px",
};
console.log(styles);

// 타입 조작 - 점 표기법 경로 생성
interface Config {
  db: {
    host: string;
    port: number;
  };
  app: {
    name: string;
  };
}

type TopLevel = keyof Config;                    // "db" | "app"
type DbKeys = `db.${keyof Config["db"]}`;       // "db.host" | "db.port"
type AppKeys = `app.${keyof Config["app"]}`;     // "app.name"

// HTTP 메서드 + 경로 조합
type Method = "GET" | "POST" | "PUT" | "DELETE";
type Route = "/users" | "/posts";
type Endpoint = `${Method} ${Route}`;
// "GET /users" | "POST /users" | "GET /posts" | ...

const api: Endpoint = "GET /users";
console.log(`API 호출: ${api}`);
console.log("템플릿 리터럴 타입 학습 완료!");
