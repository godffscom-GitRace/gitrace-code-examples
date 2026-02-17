// [155] Fetch API와 에러 처리 (Fetch API)
// 레벨: 3 | Fetch API로 HTTP 요청을 보내고 응답을 처리합니다

// === 기본 GET 요청 ===
console.log("=== Fetch API 기본 ===");

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

// 예시: JSONPlaceholder API
async function getUser(id) {
  try {
    const user = await fetchJSON(`https://jsonplaceholder.typicode.com/users/${id}`);
    console.log(`  유저: ${user.name} (${user.email})`);
    return user;
  } catch (err) {
    console.log(`  오류: ${err.message}`);
    return null;
  }
}

// === POST 요청 ===
async function createPost(data) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    console.log(`  생성됨: ID ${result.id}, 제목: "${result.title}"`);
    return result;
  } catch (err) {
    console.log(`  오류: ${err.message}`);
    return null;
  }
}

// === 다양한 HTTP 메서드 ===
async function apiRequest(url, method = "GET", data = null) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (data) options.body = JSON.stringify(data);

  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

// === 타임아웃 처리 ===
async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    return response;
  } catch (err) {
    clearTimeout(timer);
    if (err.name === "AbortError") {
      throw new Error(`요청 타임아웃 (${timeout}ms)`);
    }
    throw err;
  }
}

// === 재시도 패턴 ===
async function fetchWithRetry(url, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      throw new Error(`HTTP ${response.status}`);
    } catch (err) {
      console.log(`  시도 ${i + 1}/${retries} 실패: ${err.message}`);
      if (i < retries - 1) {
        await new Promise(r => setTimeout(r, delay * (i + 1))); // 지수 백오프
      }
    }
  }
  throw new Error(`${retries}번 재시도 모두 실패`);
}

// === 병렬 요청 ===
async function fetchParallel(urls) {
  const promises = urls.map(url =>
    fetch(url).then(r => r.json()).catch(err => ({ error: err.message }))
  );
  return Promise.all(promises);
}

// === API 래퍼 클래스 ===
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: { "Content-Type": "application/json" },
      ...options,
    };
    if (config.body && typeof config.body === "object") {
      config.body = JSON.stringify(config.body);
    }

    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  get(endpoint) { return this.request(endpoint); }
  post(endpoint, data) { return this.request(endpoint, { method: "POST", body: data }); }
  put(endpoint, data) { return this.request(endpoint, { method: "PUT", body: data }); }
  delete(endpoint) { return this.request(endpoint, { method: "DELETE" }); }
}

// === 실행 ===
async function main() {
  // GET
  console.log("\n--- GET 요청 ---");
  await getUser(1);

  // POST
  console.log("\n--- POST 요청 ---");
  await createPost({ title: "테스트 글", body: "내용입니다", userId: 1 });

  // 병렬 요청
  console.log("\n--- 병렬 요청 ---");
  const urls = [1, 2, 3].map(id => `https://jsonplaceholder.typicode.com/users/${id}`);
  const users = await fetchParallel(urls);
  users.forEach(u => console.log(`  ${u.name || u.error}`));

  // API 클래스
  console.log("\n--- API 클라이언트 ---");
  const api = new ApiClient("https://jsonplaceholder.typicode.com");
  const posts = await api.get("/posts?_limit=3");
  posts.forEach(p => console.log(`  [${p.id}] ${p.title.slice(0, 30)}...`));

  console.log("\n=== 정리 ===");
  console.log("  fetch() → Response → .json() / .text() / .blob()");
  console.log("  에러: response.ok 확인 필수 (404도 resolve됨)");
  console.log("  취소: AbortController 사용");
}

main().catch(err => console.log(`  실행 오류: ${err.message}`));
