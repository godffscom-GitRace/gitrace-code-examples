// [46] Enum 타입 - Enumerations
// 레벨: 2 | 열거형 타입인 enum을 사용합니다

// 숫자 enum (기본값 0부터 자동 증가)
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right    // 3
}

let dir: Direction = Direction.Up;
console.log(dir);             // 0
console.log(Direction[0]);    // "Up" (역매핑)

// 시작값 지정
enum StatusCode {
  OK = 200,
  NotFound = 404,
  ServerError = 500
}

console.log(StatusCode.OK);         // 200
console.log(StatusCode.NotFound);   // 404

// 문자열 enum
enum Color {
  Red = "빨강",
  Green = "초록",
  Blue = "파랑"
}

function paintColor(color: Color): string {
  return `${color}으로 칠합니다`;
}

console.log(paintColor(Color.Red));   // 빨강으로 칠합니다
console.log(paintColor(Color.Blue));  // 파랑으로 칠합니다

// const enum - 컴파일 시 인라인 (더 효율적)
const enum Season {
  Spring = "봄",
  Summer = "여름",
  Autumn = "가을",
  Winter = "겨울"
}

let now: Season = Season.Summer;
console.log(`지금은 ${now}입니다`); // 지금은 여름입니다

// enum 활용 예제
enum Role {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST"
}

function checkAccess(role: Role): string {
  switch (role) {
    case Role.Admin: return "모든 권한";
    case Role.User:  return "일반 권한";
    case Role.Guest: return "읽기 전용";
  }
}

console.log(checkAccess(Role.Admin)); // 모든 권한
