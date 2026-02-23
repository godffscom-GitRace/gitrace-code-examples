// [157] URL과 URLSearchParams (URL & URLSearchParams)
// 레벨: 3 | URL을 파싱하고 쿼리 파라미터를 다루는 방법을 배웁니다

// === URL 객체 ===
console.log("=== URL 객체 ===");
const url = new URL("https://example.com:8080/api/users?page=2&limit=10#section1");

console.log(`  전체: ${url.href}`);
console.log(`  프로토콜: ${url.protocol}`);
console.log(`  호스트: ${url.host}`);
console.log(`  호스트명: ${url.hostname}`);
console.log(`  포트: ${url.port}`);
console.log(`  경로: ${url.pathname}`);
console.log(`  쿼리: ${url.search}`);
console.log(`  해시: ${url.hash}`);
console.log(`  오리진: ${url.origin}`);

// URL 수정
url.pathname = "/api/posts";
url.port = "3000";
console.log(`\n  수정 후: ${url.href}`);

// === URLSearchParams 기본 ===
console.log("\n=== URLSearchParams 기본 ===");
const params = new URLSearchParams("page=1&limit=20&sort=name&order=asc");

console.log(`  page: ${params.get("page")}`);
console.log(`  limit: ${params.get("limit")}`);
console.log(`  없는 키: ${params.get("없음")}`);
console.log(`  has sort: ${params.has("sort")}`);

// 추가/수정/삭제
params.set("page", "2");         // 수정
params.append("tag", "javascript"); // 추가
params.append("tag", "tutorial");   // 같은 키 추가
params.delete("order");            // 삭제

console.log(`\n  수정 후: ${params.toString()}`);
console.log(`  tag 전체: [${params.getAll("tag")}]`);

// === 순회 ===
console.log("\n=== 순회 ===");
for (const [key, value] of params) {
  console.log(`  ${key} = ${value}`);
}

console.log(`  키: [${[...params.keys()]}]`);
console.log(`  값: [${[...params.values()]}]`);

// === 객체 ↔ URLSearchParams ===
console.log("\n=== 객체 변환 ===");

// 객체 → URLSearchParams
function toParams(obj) {
  return new URLSearchParams(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null)
  );
}

const filters = { category: "books", minPrice: 10000, maxPrice: 50000, inStock: true };
const qs = toParams(filters);
console.log(`  객체 → 쿼리: ${qs.toString()}`);

// URLSearchParams → 객체
function toObject(params) {
  const obj = {};
  for (const [key, value] of params) {
    if (obj[key]) {
      obj[key] = Array.isArray(obj[key]) ? [...obj[key], value] : [obj[key], value];
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

const parsed = toObject(new URLSearchParams("a=1&b=2&c=3&b=4"));
console.log(`  쿼리 → 객체: ${JSON.stringify(parsed)}`);

// === URL 빌더 ===
console.log("\n=== URL 빌더 ===");

class URLBuilder {
  constructor(base) {
    this.url = new URL(base);
  }

  path(p) {
    this.url.pathname = p;
    return this;
  }

  param(key, value) {
    this.url.searchParams.set(key, value);
    return this;
  }

  params(obj) {
    for (const [k, v] of Object.entries(obj)) {
      if (v !== undefined && v !== null) {
        this.url.searchParams.set(k, v);
      }
    }
    return this;
  }

  build() {
    return this.url.href;
  }
}

const apiUrl = new URLBuilder("https://api.example.com")
  .path("/v2/products")
  .params({ page: 1, limit: 20, sort: "price" })
  .param("category", "electronics")
  .build();

console.log(`  ${apiUrl}`);

// === 실전: 현재 URL 파싱 ===
console.log("\n=== URL 파싱 유틸리티 ===");

function parseURL(urlString) {
  const url = new URL(urlString);
  return {
    protocol: url.protocol.replace(":", ""),
    host: url.hostname,
    port: url.port || (url.protocol === "https:" ? "443" : "80"),
    path: url.pathname,
    params: toObject(url.searchParams),
    hash: url.hash.replace("#", ""),
  };
}

const info = parseURL("https://shop.example.com/products?category=phone&brand=samsung&page=3#reviews");
console.log("  파싱 결과:");
for (const [key, value] of Object.entries(info)) {
  console.log(`    ${key}: ${JSON.stringify(value)}`);
}

// === 상대 URL 처리 ===
console.log("\n=== 상대 URL ===");
const base = "https://example.com/api/v1/";
console.log(`  ${new URL("users", base).href}`);
console.log(`  ${new URL("../v2/posts", base).href}`);
console.log(`  ${new URL("/absolute", base).href}`);
