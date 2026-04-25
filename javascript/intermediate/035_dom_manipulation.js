// DOM Manipulation

const vdom = { tag: "ul", id: "list", children: [] };

function addItem(dom, text) {
  dom.children.push({ tag: "li", text: text });
  console.log("added: " + text);
}

function removeItem(dom, index) {
  const removed = dom.children.splice(index, 1)[0];
  console.log("removed: " + removed.text);
}

function showItems(dom) {
  console.log("list info:");
  console.log(dom.tag + "#" + dom.id + " count " + dom.children.length);
  for (let i = 0; i < dom.children.length; i++) {
    console.log(i + ": " + dom.children[i].text);
  }
}

addItem(vdom, "Learn JavaScript");
addItem(vdom, "Practice DOM");
addItem(vdom, "Build project");

showItems(vdom);

removeItem(vdom, 1);

showItems(vdom);
