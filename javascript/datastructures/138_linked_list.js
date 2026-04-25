// Linked List

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      return;
    }
    let cur = this.head;
    while (cur.next) {
      cur = cur.next;
    }
    cur.next = node;
  }

  prepend(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
  }

  toString() {
    let cur = this.head;
    let out = "";
    while (cur) {
      out += cur.value + " -> ";
      cur = cur.next;
    }
    return out + "null";
  }
}

const list = new LinkedList();
list.append(10);
list.append(20);
list.append(30);

console.log("list:");
console.log(list.toString());

list.prepend(5);

console.log("after prepend:");
console.log(list.toString());
