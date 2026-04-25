// Fetch API

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json();
}

async function getUser(id) {
  try {
    const user = await fetchJSON("https://jsonplaceholder.typicode.com/users/" + id);
    console.log(user.name, user.email);
    return user;
  } catch (e) {
    console.log("error:", e.message);
    return null;
  }
}

async function createPost(data) {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    console.log(result.id, result.title);
    return result;
  } catch (e) {
    console.log("error:", e.message);
    return null;
  }
}

async function fetchAll(urls) {
  return Promise.all(
    urls.map(u =>
      fetch(u).then(r => r.json()).catch(e => ({ error: e.message }))
    )
  );
}

async function main() {
  await getUser(1);
  await createPost({ title: "Test", body: "Hello", userId: 1 });

  const urls = [1, 2, 3].map(i =>
    "https://jsonplaceholder.typicode.com/users/" + i
  );

  const users = await fetchAll(urls);
  users.forEach(u => console.log(u.name || u.error));
}

main();
