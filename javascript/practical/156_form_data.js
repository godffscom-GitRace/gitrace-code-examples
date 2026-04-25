const fd = new FormData();

fd.append("name", "Alice");
fd.append("role", "dev");
fd.append("role", "admin");

console.log(fd.get("name"));
console.log(fd.getAll("role"));

fd.set("name", "Bob");
fd.delete("role");

console.log(fd.get("name"));
console.log(fd.has("role"));

fd.set("email", "test@mail.com");

for (const [k, v] of fd.entries()) {
  console.log(k, v);
}

const user = {
  name: "Tom",
  age: 20,
  skills: ["JS", "Go"]
};

function toFD(obj, fd = new FormData(), pre = "") {
  for (const k in obj) {
    const key = pre ? pre + "[" + k + "]" : k;
    const v = obj[k];

    if (Array.isArray(v)) {
      v.forEach((x, i) => fd.append(key + "[" + i + "]", x));
    } else if (v && typeof v === "object") {
      toFD(v, fd, key);
    } else {
      fd.append(key, v);
    }
  }
  return fd;
}

const out = toFD(user);

for (const [k, v] of out.entries()) {
  console.log(k, v);
}
