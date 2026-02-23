// [32] async/await - Async/Await
// 레벨: 3 | 비동기 코드를 동기적으로 작성하는 async/await를 마스터합니다

// 기본 delay 함수
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// async 함수 - 항상 Promise를 반환
async function greet(name) {
  await delay(500);
  return `안녕하세요, ${name}님!`;
}

// await 키워드 - Promise 결과를 기다림
async function main() {
  const msg = await greet("철수");
  console.log(msg); // 안녕하세요, 철수님!
}
main();

// try-catch 에러 처리
async function fetchData(id) {
  if (id < 0) {
    throw new Error("잘못된 ID입니다");
  }
  await delay(100);
  return { id, name: `사용자${id}`, score: Math.floor(Math.random() * 100) };
}

async function loadUser() {
  try {
    const user = await fetchData(1);
    console.log("사용자:", user);

    const invalid = await fetchData(-1); // 에러 발생!
    console.log(invalid);
  } catch (err) {
    console.log(`오류 발생: ${err.message}`);
  }
}
loadUser();

// 순차 실행 vs 병렬 실행
async function sequential() {
  console.time("순차");
  const a = await delay(200);
  const b = await delay(200);
  console.timeEnd("순차"); // ~400ms
}

async function parallel() {
  console.time("병렬");
  const [a, b] = await Promise.all([delay(200), delay(200)]);
  console.timeEnd("병렬"); // ~200ms
}

sequential().then(() => parallel());

// 반복문에서 async/await
async function processItems() {
  const items = ["A", "B", "C"];
  for (const item of items) {
    await delay(100);
    console.log(`처리 완료: ${item}`);
  }
  console.log("모든 항목 처리 완료!");
}
processItems();
