// [156] FormData 활용 (FormData)
// 레벨: 3 | FormData로 폼 데이터와 파일을 처리하고 전송합니다
// 참고: FormData는 브라우저/Node 18+ API입니다.

// === FormData 기본 ===
console.log("=== FormData 기본 ===");

const formData = new FormData();

// 데이터 추가
formData.append("username", "홍길동");
formData.append("email", "hong@example.com");
formData.append("age", "28");
formData.append("hobby", "코딩");
formData.append("hobby", "독서"); // 같은 키로 여러 값

// 데이터 읽기
console.log(`  username: ${formData.get("username")}`);
console.log(`  email: ${formData.get("email")}`);
console.log(`  hobby (첫번째): ${formData.get("hobby")}`);
console.log(`  hobby (전체): [${formData.getAll("hobby")}]`);
console.log(`  존재 여부: ${formData.has("username")}`);

// === 데이터 수정/삭제 ===
console.log("\n=== 수정/삭제 ===");
formData.set("age", "30"); // 덮어쓰기
console.log(`  age (수정): ${formData.get("age")}`);

formData.delete("email");
console.log(`  email 삭제 후: ${formData.has("email")}`);

// === 순회 ===
console.log("\n=== FormData 순회 ===");
formData.set("email", "hong@test.com"); // 다시 추가

// entries()
for (const [key, value] of formData.entries()) {
  console.log(`  ${key}: ${value}`);
}

// keys(), values()
console.log(`  키 목록: [${[...formData.keys()]}]`);

// === 객체 → FormData 변환 ===
console.log("\n=== 객체 → FormData ===");

function objectToFormData(obj, form = new FormData(), prefix = "") {
  for (const [key, value] of Object.entries(obj)) {
    const formKey = prefix ? `${prefix}[${key}]` : key;

    if (value !== null && typeof value === "object" && !(value instanceof File) && !Array.isArray(value)) {
      objectToFormData(value, form, formKey);
    } else if (Array.isArray(value)) {
      value.forEach((item, i) => form.append(`${formKey}[${i}]`, item));
    } else {
      form.append(formKey, value ?? "");
    }
  }
  return form;
}

const userData = {
  name: "김철수",
  age: 25,
  address: { city: "서울", district: "강남" },
  skills: ["JS", "Python", "Go"],
};

const fd = objectToFormData(userData);
console.log("  변환 결과:");
for (const [key, value] of fd.entries()) {
  console.log(`    ${key}: ${value}`);
}

// === FormData → 객체 변환 ===
function formDataToObject(formData) {
  const obj = {};
  for (const [key, value] of formData.entries()) {
    if (obj[key]) {
      if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
      obj[key].push(value);
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

console.log("\n=== FormData → 객체 ===");
const simple = new FormData();
simple.append("name", "박지민");
simple.append("tags", "개발");
simple.append("tags", "디자인");

const obj = formDataToObject(simple);
console.log(`  ${JSON.stringify(obj)}`);

// === Fetch로 전송 ===
console.log("\n=== Fetch 전송 패턴 ===");

async function submitForm(url, data) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value);
  }

  // FormData 사용 시 Content-Type 자동 설정 (boundary 포함)
  // headers에 Content-Type을 설정하지 않는 것이 중요!
  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      // headers를 설정하지 않음 - 브라우저가 자동 설정
    });
    return await response.json();
  } catch (err) {
    console.log(`  전송 오류: ${err.message}`);
    return null;
  }
}

console.log("  // FormData는 Content-Type 헤더를 수동 설정하지 않습니다");
console.log("  // 브라우저가 multipart/form-data + boundary를 자동 설정합니다");

// === 파일 업로드 패턴 (브라우저) ===
console.log("\n=== 파일 업로드 패턴 (브라우저 코드) ===");
console.log(`  const input = document.querySelector('input[type="file"]');`);
console.log(`  const formData = new FormData();`);
console.log(`  formData.append("avatar", input.files[0]);`);
console.log(`  formData.append("username", "kim");`);
console.log(`  `);
console.log(`  fetch("/upload", { method: "POST", body: formData });`);

console.log("\n=== 주의사항 ===");
console.log("  1. Content-Type 헤더를 직접 설정하지 말 것");
console.log("  2. JSON 전송이면 JSON.stringify + application/json 사용");
console.log("  3. 파일 포함 시 반드시 FormData 사용");
