// [146] 디바운싱 (Debouncing)
// 레벨: 3 | 연속된 이벤트를 제어하는 디바운싱을 구현합니다

// 기본 디바운스
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 시뮬레이션
console.log("=== 디바운스 기본 ===");
let callCount = 0;
const debouncedLog = debounce((msg) => {
  callCount++;
  console.log(`  실행 #${callCount}: ${msg}`);
}, 300);

// 빠른 연속 호출 시뮬레이션
console.log("  300ms 디바운스 - 연속 호출 시뮬레이션:");
debouncedLog("1번째 호출"); // 취소됨
setTimeout(() => debouncedLog("2번째 호출"), 100); // 취소됨
setTimeout(() => debouncedLog("3번째 호출"), 200); // 이것만 실행됨

// 즉시 실행 디바운스 (leading edge)
function debounceLeading(fn, delay) {
  let timer = null;
  return function (...args) {
    const callNow = !timer;
    clearTimeout(timer);
    timer = setTimeout(() => { timer = null; }, delay);
    if (callNow) fn.apply(this, args);
  };
}

// 취소 가능 디바운스
function debounceWithCancel(fn, delay) {
  let timer = null;

  function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  }

  debounced.cancel = () => {
    clearTimeout(timer);
    timer = null;
  };

  debounced.flush = (...args) => {
    clearTimeout(timer);
    fn.apply(this, args);
  };

  return debounced;
}

// 검색 입력 시뮬레이션
console.log("\n=== 검색 디바운스 시뮬레이션 ===");
function simulateSearch() {
  const searchLog = [];

  function search(query) {
    searchLog.push(`API 호출: "${query}"`);
  }

  const debouncedSearch = debounce(search, 300);

  // 사용자가 "hello" 입력
  const inputs = ["h", "he", "hel", "hell", "hello"];
  let delay = 0;

  for (const input of inputs) {
    setTimeout(() => {
      console.log(`  입력: "${input}"`);
      debouncedSearch(input);
    }, delay);
    delay += 50; // 50ms 간격으로 타이핑
  }

  // 결과 확인
  setTimeout(() => {
    console.log(`\n  디바운스 없이: API ${inputs.length}번 호출`);
    console.log(`  디바운스 사용: API ${searchLog.length + 1}번 호출 (마지막만)`);
  }, 800);
}

simulateSearch();

// 실전 활용 패턴
setTimeout(() => {
  console.log("\n=== 디바운스 활용 사례 ===");
  console.log("  1. 검색 입력 (타이핑 완료 후 API 호출)");
  console.log("  2. 윈도우 리사이즈 (리사이즈 완료 후 레이아웃 재계산)");
  console.log("  3. 폼 자동 저장 (입력 멈춘 후 저장)");
  console.log("  4. 버튼 중복 클릭 방지");

  console.log("\n=== 디바운스 vs 쓰로틀 ===");
  console.log("  디바운스: 마지막 이벤트 후 대기 시간 지나면 실행");
  console.log("  쓰로틀:   일정 간격으로 최대 1번 실행");
}, 1000);
