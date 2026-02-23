// [138] 링크드 리스트 구현 (Linked List)
// 레벨: 4 | JavaScript로 연결 리스트를 직접 구현합니다

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // 끝에 추가
  append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) current = current.next;
      current.next = node;
    }
    this.size++;
    return this;
  }

  // 앞에 추가
  prepend(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
    this.size++;
    return this;
  }

  // 특정 인덱스에 삽입
  insertAt(index, value) {
    if (index <= 0) return this.prepend(value);
    if (index >= this.size) return this.append(value);
    const node = new Node(value);
    let prev = this.head;
    for (let i = 0; i < index - 1; i++) prev = prev.next;
    node.next = prev.next;
    prev.next = node;
    this.size++;
    return this;
  }

  // 값으로 삭제
  remove(value) {
    if (!this.head) return null;
    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--;
      return value;
    }
    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }
    if (current.next) {
      current.next = current.next.next;
      this.size--;
      return value;
    }
    return null;
  }

  // 검색
  find(value) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) return index;
      current = current.next;
      index++;
    }
    return -1;
  }

  // 뒤집기
  reverse() {
    let prev = null;
    let current = this.head;
    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
    return this;
  }

  // 배열로 변환
  toArray() {
    const arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.value);
      current = current.next;
    }
    return arr;
  }

  // 출력
  toString() {
    return this.toArray().join(" → ") + " → null";
  }
}

// 사용
console.log("=== 링크드 리스트 ===");
const list = new LinkedList();
list.append(10).append(20).append(30);
console.log(`  생성: ${list}`);

list.prepend(5);
console.log(`  앞에 5 추가: ${list}`);

list.insertAt(2, 15);
console.log(`  인덱스 2에 15 삽입: ${list}`);

list.remove(20);
console.log(`  20 삭제: ${list}`);

console.log(`  15 위치: 인덱스 ${list.find(15)}`);
console.log(`  크기: ${list.size}`);

list.reverse();
console.log(`  뒤집기: ${list}`);

// 중간 노드 찾기 (러너 기법)
function findMiddle(list) {
  let slow = list.head;
  let fast = list.head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow.value;
}

console.log("\n=== 중간 노드 (러너 기법) ===");
const list2 = new LinkedList();
[1, 2, 3, 4, 5].forEach(v => list2.append(v));
console.log(`  리스트: ${list2}`);
console.log(`  중간 값: ${findMiddle(list2)}`);

// 사이클 감지
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

console.log("\n=== 사이클 감지 ===");
console.log(`  일반 리스트: ${hasCycle(list2.head) ? "사이클 있음" : "사이클 없음"}`);

// 사이클 만들기
const cycleList = new LinkedList();
[1, 2, 3, 4].forEach(v => cycleList.append(v));
let node = cycleList.head;
while (node.next) node = node.next;
node.next = cycleList.head.next; // 마지막 → 두 번째 노드
console.log(`  사이클 리스트: ${hasCycle(cycleList.head) ? "사이클 있음" : "사이클 없음"}`);
