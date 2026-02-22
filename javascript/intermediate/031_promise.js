// [31] Promise 기초 - Promise Basics
// 레벨: 3 | JavaScript의 비동기 처리를 위한 Promise를 학습합니다

// Promise 생성
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${ms}ms 완료!`), ms);
  });
}

// then(), catch()
delay(1000).then((msg) => console.log(msg)); // 1000ms 완료!

// 성공/실패 처리
function divide(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject("0으로 나눌 수 없습니다");
    } else {
      resolve(a / b);
    }
  });
}

divide(10, 3)
  .then((result) => console.log(`결과: ${result.toFixed(2)}`))
  .catch((err) => console.log(`오류: ${err}`));

divide(10, 0)
  .then((result) => console.log(`결과: ${result}`))
  .catch((err) => console.log(`오류: ${err}`)); // 오류: 0으로 나눌 수 없습니다

// Promise 체이닝
function addOne(num) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(num + 1), 100);
  });
}

addOne(1)
  .then((result) => {
    console.log(`1단계: ${result}`); // 2
    return addOne(result);
  })
  .then((result) => {
    console.log(`2단계: ${result}`); // 3
    return addOne(result);
  })
  .then((result) => {
    console.log(`3단계: ${result}`); // 4
  });

// Promise.all - 모든 Promise가 완료될 때
Promise.all([delay(100), delay(200), delay(300)]).then((results) => {
  console.log("모두 완료:", results);
});

// Promise.race - 가장 빠른 것만
Promise.race([delay(100), delay(200), delay(300)]).then((result) => {
  console.log("가장 빠른:", result); // 100ms 완료!
});
