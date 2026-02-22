// [35] DOM 조작 기초 - DOM Manipulation
// 레벨: 3 | HTML DOM을 JavaScript로 조작하는 방법을 배웁니다
// ※ 이 코드는 브라우저 환경(HTML 파일)에서 실행됩니다

// === querySelector() - 요소 선택 ===
// const title = document.querySelector("h1");           // 태그
// const box = document.querySelector(".box");           // 클래스
// const main = document.querySelector("#main");         // ID
// const items = document.querySelectorAll(".item");     // 여러 개

// === createElement() - 요소 생성 ===
function createTodoItem(text) {
  const li = document.createElement("li");
  li.textContent = text;
  li.className = "todo-item";
  return li;
}

// 사용 예시 (브라우저에서):
// const list = document.querySelector("#todo-list");
// list.appendChild(createTodoItem("공부하기"));
// list.appendChild(createTodoItem("운동하기"));

// === addEventListener() - 이벤트 처리 ===
// const btn = document.querySelector("#myBtn");
// btn.addEventListener("click", function(event) {
//   console.log("버튼 클릭!", event.target);
// });

// === classList 조작 ===
// const box = document.querySelector(".box");
// box.classList.add("active");        // 클래스 추가
// box.classList.remove("active");     // 클래스 제거
// box.classList.toggle("hidden");     // 토글
// box.classList.contains("active");   // 포함 여부

// === 실행 가능한 콘솔 데모 ===
console.log("=== DOM 조작 학습 (콘솔 데모) ===");

// DOM 구조를 객체로 시뮬레이션
const virtualDOM = {
  tag: "ul",
  id: "todo-list",
  children: [],
};

function addItem(dom, text) {
  dom.children.push({ tag: "li", text, className: "todo-item" });
  console.log(`추가: "${text}"`);
}

function removeItem(dom, index) {
  const removed = dom.children.splice(index, 1);
  console.log(`삭제: "${removed[0].text}"`);
}

function showItems(dom) {
  console.log(`\n[${dom.tag}#${dom.id}] 총 ${dom.children.length}개`);
  dom.children.forEach((child, i) => {
    console.log(`  ${i}: <${child.tag}> ${child.text}`);
  });
}

addItem(virtualDOM, "JavaScript 공부");
addItem(virtualDOM, "DOM 조작 연습");
addItem(virtualDOM, "프로젝트 만들기");
showItems(virtualDOM);

removeItem(virtualDOM, 1);
showItems(virtualDOM);
