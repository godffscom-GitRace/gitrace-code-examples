// [55] 네임스페이스와 모듈 - Namespaces & Modules
// 레벨: 3 | TypeScript의 네임스페이스와 모듈 시스템을 이해합니다

// === namespace 선언 ===
namespace MathUtils {
  export const PI = 3.14159;

  export function add(a: number, b: number): number {
    return a + b;
  }

  export function multiply(a: number, b: number): number {
    return a * b;
  }

  // export하지 않으면 내부에서만 사용
  function _helper(): void {
    console.log("내부 헬퍼");
  }
}

console.log(MathUtils.PI);           // 3.14159
console.log(MathUtils.add(5, 3));    // 8
console.log(MathUtils.multiply(4, 6)); // 24

// 중첩 네임스페이스
namespace App {
  export namespace Models {
    export interface User {
      id: number;
      name: string;
    }

    export interface Product {
      id: number;
      title: string;
      price: number;
    }
  }

  export namespace Services {
    export function getUser(id: number): Models.User {
      return { id, name: `사용자${id}` };
    }

    export function getProduct(id: number): Models.Product {
      return { id, title: `상품${id}`, price: 10000 };
    }
  }
}

const user = App.Services.getUser(1);
const product = App.Services.getProduct(1);
console.log(user);    // { id: 1, name: "사용자1" }
console.log(product); // { id: 1, title: "상품1", price: 10000 }

// === ES6 모듈 vs 네임스페이스 ===
// ES6 모듈 (권장) - 파일 단위로 분리
// utils.ts:
//   export function add(a: number, b: number) { return a + b; }
//   export const PI = 3.14;
//
// main.ts:
//   import { add, PI } from './utils';

// 네임스페이스 - 전역 스코프에서 이름 충돌 방지
// 주로 레거시 코드나 스크립트 모드에서 사용

// === import/export 패턴 ===
// named export
// export interface Config { host: string; port: number; }
// export function createServer(config: Config) { ... }

// default export
// export default class App { ... }

// re-export
// export { UserService } from './services/user';
// export { ProductService } from './services/product';

// 타입만 import (런타임에 제거됨)
// import type { User } from './models';

// === 실전 예시: 모듈 구조 ===
namespace Demo {
  export interface Config {
    host: string;
    port: number;
    debug: boolean;
  }

  export const defaultConfig: Config = {
    host: "localhost",
    port: 3000,
    debug: false,
  };

  export function createApp(config: Partial<Config> = {}): Config {
    const merged = { ...defaultConfig, ...config };
    console.log(`서버 시작: ${merged.host}:${merged.port}`);
    return merged;
  }
}

const app = Demo.createApp({ port: 8080, debug: true });
console.log(app);
