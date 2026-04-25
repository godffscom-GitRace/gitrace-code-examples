const url = new URL("https://example.com:8080/api/users?page=2&limit=10#section");

console.log(url.href);
console.log(url.protocol);
console.log(url.host);
console.log(url.pathname);
console.log(url.search);
console.log(url.hash);

url.pathname = "/api/posts";
url.port = "3000";

console.log(url.href);

const params = new URLSearchParams("page=1&limit=20&sort=name");

console.log(params.get("page"));
console.log(params.has("sort"));

params.set("page", "2");
params.append("tag", "js");
params.append("tag", "ts");
params.delete("sort");

console.log(params.toString());

for (const [k, v] of params) {
  console.log(k, v);
}

function toParams(obj) {
  return new URLSearchParams(Object.entries(obj).filter(([, v]) => v != null));
}

function toObject(p) {
  const o = {};
  for (const [k, v] of p) {
    o[k] = o[k] ? [].concat(o[k], v) : v;
  }
  return o;
}

const filters = { a: 1, b: 2, c: 3 };

console.log(toParams(filters).toString());
console.log(JSON.stringify(toObject(new URLSearchParams("x=1&y=2&y=3"))));

class URLBuilder {
  constructor(base) {
    this.url = new URL(base);
  }

  path(p) {
    this.url.pathname = p;
    return this;
  }

  param(k, v) {
    this.url.searchParams.set(k, v);
    return this;
  }

  build() {
    return this.url.href;
  }
}

const api = new URLBuilder("https://api.com")
  .path("/v1/items")
  .param("page", 1)
  .param("limit", 10)
  .build();

console.log(api);
