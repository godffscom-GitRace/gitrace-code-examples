// Async Await

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function greet(name) {
  await delay(100);
  return "Hello, " + name + "!";
}

async function main() {
  const msg = await greet("Alice");
  console.log(msg);
}
main();

async function fetchData(id) {
  if (id < 0) throw new Error("invalid ID");
  await delay(100);
  return { id: id, name: "user" + id, score: 50 };
}

async function loadUser() {
  try {
    const user = await fetchData(1);
    console.log("user:");
    for (const k in user) {
      console.log(k + ": " + user[k]);
    }
    await fetchData(-1);
  } catch (err) {
    console.log("error: " + err.message);
  }
}
loadUser();

async function sequential() {
  await delay(100);
  await delay(100);
  console.log("seq done");
}

async function parallel() {
  await Promise.all([delay(100), delay(100)]);
  console.log("par done");
}

sequential().then(() => parallel());

async function processItems() {
  const items = ["A", "B", "C"];
  for (let i = 0; i < items.length; i++) {
    await delay(50);
    console.log("done: " + items[i]);
  }
}
processItems();
