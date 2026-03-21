// [919] 디자인 패턴 - Design Patterns
// 레벨: 3 | Rust로 구현하는 빌더, 상태, 커맨드 패턴

// ===== 빌더 패턴 =====
#[derive(Debug)]
struct Request {
    url:     String,
    method:  String,
    headers: Vec<(String, String)>,
    body:    Option<String>,
    timeout: u64,
}

struct RequestBuilder {
    url:     String,
    method:  String,
    headers: Vec<(String, String)>,
    body:    Option<String>,
    timeout: u64,
}

impl RequestBuilder {
    fn new(url: &str) -> Self {
        Self {
            url:     url.to_string(),
            method:  "GET".to_string(),
            headers: vec![],
            body:    None,
            timeout: 30,
        }
    }
    fn method(mut self, m: &str)         -> Self { self.method  = m.to_string(); self }
    fn header(mut self, k: &str, v: &str)-> Self { self.headers.push((k.to_string(), v.to_string())); self }
    fn body(mut self, b: &str)           -> Self { self.body    = Some(b.to_string()); self }
    fn timeout(mut self, t: u64)         -> Self { self.timeout = t; self }
    fn build(self) -> Request {
        Request { url: self.url, method: self.method, headers: self.headers, body: self.body, timeout: self.timeout }
    }
}

// ===== 상태 패턴 (타입 상태) =====
struct Locked;
struct Unlocked;

struct Safe<State> {
    contents: String,
    _state: std::marker::PhantomData<State>,
}

impl Safe<Locked> {
    fn new(contents: &str) -> Self {
        Self { contents: contents.to_string(), _state: std::marker::PhantomData }
    }
    fn unlock(self, _password: &str) -> Safe<Unlocked> {
        Safe { contents: self.contents, _state: std::marker::PhantomData }
    }
}

impl Safe<Unlocked> {
    fn get_contents(&self) -> &str { &self.contents }
    fn lock(self) -> Safe<Locked> {
        Safe { contents: self.contents, _state: std::marker::PhantomData }
    }
}

// ===== 커맨드 패턴 =====
trait Command {
    fn execute(&self, text: &mut String);
    fn undo(&self, text: &mut String);
}

struct Append(String);
struct Replace { from: String, to: String }

impl Command for Append {
    fn execute(&self, text: &mut String) { text.push_str(&self.0); }
    fn undo(&self, text: &mut String)    {
        let new_len = text.len().saturating_sub(self.0.len());
        text.truncate(new_len);
    }
}

impl Command for Replace {
    fn execute(&self, text: &mut String) { *text = text.replace(&self.from, &self.to); }
    fn undo(&self, text: &mut String)    { *text = text.replace(&self.to, &self.from); }
}

struct Editor {
    text:    String,
    history: Vec<Box<dyn Command>>,
}

impl Editor {
    fn new() -> Self { Self { text: String::new(), history: vec![] } }
    fn execute(&mut self, cmd: impl Command + 'static) {
        cmd.execute(&mut self.text);
        self.history.push(Box::new(cmd));
    }
    fn undo(&mut self) {
        if let Some(cmd) = self.history.pop() {
            cmd.undo(&mut self.text);
        }
    }
}

fn main() {
    // 빌더 패턴
    let req = RequestBuilder::new("https://api.example.com/users")
        .method("POST")
        .header("Content-Type", "application/json")
        .header("Authorization", "Bearer token123")
        .body(r#"{"name": "철수"}"#)
        .timeout(60)
        .build();
    println!("{:?}", req);

    // 타입 상태 패턴
    let safe    = Safe::<Locked>::new("비밀 문서");
    let opened  = safe.unlock("1234");
    println!("내용: {}", opened.get_contents());
    let _closed = opened.lock();
    // _closed.get_contents(); // 컴파일 오류!

    // 커맨드 패턴
    let mut editor = Editor::new();
    editor.execute(Append("Hello".to_string()));
    editor.execute(Append(", Rust!".to_string()));
    println!("{}", editor.text);

    editor.execute(Replace { from: "Rust".to_string(), to: "World".to_string() });
    println!("{}", editor.text);

    editor.undo();
    println!("undo: {}", editor.text);
    editor.undo();
    println!("undo: {}", editor.text);
}
