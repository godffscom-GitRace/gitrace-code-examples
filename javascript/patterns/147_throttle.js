// [147] 쓰로틀링 (Throttling)
// 레벨: 3 | 일정 간격으로만 함수를 실행하는 쓰로틀링을 구현합니다

// 기본 쓰로틀 (타임스탬프 기반)
function throttle(fn, interval) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// 타이머 기반 쓰로틀
function throttleTimer(fn, interval) {
  let waiting = false;
  return function (...args) {
    if (!waiting) {
      fn.apply(this, args);
      waiting = true;
      setTimeout(() => { waiting = false; }, interval);
    }
  };
}

// Leading + Trailing 쓰로틀
function throttleFull(fn, interval, { leading = true, trailing = true } = {}) {
  let lastTime = 0;
  let timer = null;

  return function (...args) {
    const now = Date.now();

    if (!lastTime && !leading) lastTime = now;

    const remaining = interval - (now - lastTime);

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastTime = now;
      fn.apply(this, args);
    } else if (!timer && trailing) {
      timer = setTimeout(() => {
        lastTime = leading ? Date.now() : 0;
        timer = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}

// 시뮬레이션
console.log("=== 쓰로틀 시뮬레이션 ===");

function simulateThrottle() {
  const withoutThrottle = [];
  const withThrottle = [];

  const rawFn = (val) => withoutThrottle.push(val);
  const throttledFn = throttle((val) => withThrottle.push(val), 200);

  // 50ms 간격으로 20번 호출 (총 1초)
  let count = 0;
  const interval = setInterval(() => {
    count++;
    rawFn(count);
    throttledFn(count);

    if (count >= 20) {
      clearInterval(interval);
      setTimeout(() => {
        console.log(`  쓰로틀 없이: ${withoutThrottle.length}번 실행`);
        console.log(`    → [${withoutThrottle.join(", ")}]`);
        console.log(`  200ms 쓰로틀: ${withThrottle.length}번 실행`);
        console.log(`    → [${withThrottle.join(", ")}]`);
        showUseCases();
      }, 300);
    }
  }, 50);
}

simulateThrottle();

// 스크롤 이벤트 시뮬레이션
function showUseCases() {
  console.log("\n=== 스크롤 쓰로틀 시뮬레이션 ===");

  let scrollEvents = 0;
  let throttledEvents = 0;

  const onScroll = throttle(() => { throttledEvents++; }, 100);

  // 10ms 간격으로 스크롤 이벤트 50번
  for (let i = 0; i < 50; i++) {
    scrollEvents++;
  }

  // 동기 시뮬레이션에서는 시간차 없으므로 개념 설명
  console.log(`  원본 스크롤 이벤트: ${scrollEvents}번`);
  console.log("  100ms 쓰로틀 적용 시: ~5번만 처리");

  // 활용 사례
  console.log("\n=== 쓰로틀 활용 사례 ===");
  console.log("  1. 스크롤 이벤트 (무한 스크롤, 위치 추적)");
  console.log("  2. 마우스 이동 추적 (드래그 앤 드롭)");
  console.log("  3. API 요청 제한 (Rate Limiting)");
  console.log("  4. 게임 입력 처리 (키보드/마우스)");

  console.log("\n=== 디바운스 vs 쓰로틀 비교 ===");
  console.log("  ┌─────────┬──────────────────┬─────────────────┐");
  console.log("  │         │   디바운스        │    쓰로틀        │");
  console.log("  ├─────────┼──────────────────┼─────────────────┤");
  console.log("  │ 실행    │ 마지막 호출 후    │ 일정 간격마다    │");
  console.log("  │ 적합    │ 검색, 자동저장    │ 스크롤, 리사이즈 │");
  console.log("  │ 보장    │ 최종 1회 실행     │ 주기적 실행      │");
  console.log("  └─────────┴──────────────────┴─────────────────┘");
}
