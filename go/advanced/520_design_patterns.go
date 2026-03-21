// [520] 디자인 패턴 - Design Patterns
// 레벨: 4 | Go로 함수형 옵션, 빌더, 미들웨어 패턴을 구현합니다

package main

import (
	"fmt"
	"strings"
	"time"
)

// ===== 함수형 옵션 패턴 =====
type Server struct {
	host    string
	port    int
	timeout time.Duration
	maxConn int
}

type Option func(*Server)

func WithHost(host string) Option   { return func(s *Server) { s.host = host } }
func WithPort(port int) Option      { return func(s *Server) { s.port = port } }
func WithTimeout(d time.Duration) Option { return func(s *Server) { s.timeout = d } }
func WithMaxConn(n int) Option      { return func(s *Server) { s.maxConn = n } }

func NewServer(opts ...Option) *Server {
	s := &Server{ // 기본값
		host: "localhost", port: 8080,
		timeout: 30 * time.Second, maxConn: 100,
	}
	for _, opt := range opts {
		opt(s)
	}
	return s
}

// ===== 빌더 패턴 =====
type Query struct {
	table      string
	conditions []string
	orderBy    string
	limit      int
}

type QueryBuilder struct {
	q Query
}

func NewQuery(table string) *QueryBuilder {
	return &QueryBuilder{q: Query{table: table, limit: -1}}
}

func (b *QueryBuilder) Where(cond string) *QueryBuilder {
	b.q.conditions = append(b.q.conditions, cond)
	return b
}

func (b *QueryBuilder) OrderBy(field string) *QueryBuilder {
	b.q.orderBy = field
	return b
}

func (b *QueryBuilder) Limit(n int) *QueryBuilder {
	b.q.limit = n
	return b
}

func (b *QueryBuilder) Build() string {
	sql := fmt.Sprintf("SELECT * FROM %s", b.q.table)
	if len(b.q.conditions) > 0 {
		sql += " WHERE " + strings.Join(b.q.conditions, " AND ")
	}
	if b.q.orderBy != "" {
		sql += " ORDER BY " + b.q.orderBy
	}
	if b.q.limit > 0 {
		sql += fmt.Sprintf(" LIMIT %d", b.q.limit)
	}
	return sql
}

// ===== 미들웨어 패턴 =====
type HandlerFunc func(ctx map[string]interface{}) error

type Middleware func(HandlerFunc) HandlerFunc

// 로깅 미들웨어
func LoggingMiddleware(next HandlerFunc) HandlerFunc {
	return func(ctx map[string]interface{}) error {
		start := time.Now()
		fmt.Printf("[LOG] 시작: %v\n", ctx["action"])
		err := next(ctx)
		fmt.Printf("[LOG] 완료: %v (%v)\n", ctx["action"], time.Since(start))
		return err
	}
}

// 인증 미들웨어
func AuthMiddleware(next HandlerFunc) HandlerFunc {
	return func(ctx map[string]interface{}) error {
		token, ok := ctx["token"].(string)
		if !ok || token == "" {
			return fmt.Errorf("인증 토큰 없음")
		}
		fmt.Printf("[AUTH] 토큰 검증: %s\n", token)
		ctx["user_id"] = 42
		return next(ctx)
	}
}

// 미들웨어 체이닝
func Chain(h HandlerFunc, middlewares ...Middleware) HandlerFunc {
	for i := len(middlewares) - 1; i >= 0; i-- {
		h = middlewares[i](h)
	}
	return h
}

// ===== 이벤트 버스 패턴 =====
type EventBus struct {
	handlers map[string][]func(interface{})
}

func NewEventBus() *EventBus {
	return &EventBus{handlers: make(map[string][]func(interface{}))}
}

func (eb *EventBus) Subscribe(event string, handler func(interface{})) {
	eb.handlers[event] = append(eb.handlers[event], handler)
}

func (eb *EventBus) Publish(event string, data interface{}) {
	for _, h := range eb.handlers[event] {
		h(data)
	}
}

func main() {
	// 함수형 옵션
	fmt.Println("=== 함수형 옵션 ===")
	s1 := NewServer()
	s2 := NewServer(WithHost("0.0.0.0"), WithPort(9000), WithMaxConn(500))
	fmt.Printf("서버1: %s:%d (최대%d)\n", s1.host, s1.port, s1.maxConn)
	fmt.Printf("서버2: %s:%d (최대%d)\n", s2.host, s2.port, s2.maxConn)

	// 빌더 패턴
	fmt.Println("\n=== 쿼리 빌더 ===")
	sql := NewQuery("users").
		Where("age >= 20").
		Where("is_active = 1").
		OrderBy("score DESC").
		Limit(10).
		Build()
	fmt.Println(sql)

	// 미들웨어
	fmt.Println("\n=== 미들웨어 ===")
	handler := func(ctx map[string]interface{}) error {
		fmt.Printf("[HANDLER] user_id=%v 처리 완료\n", ctx["user_id"])
		return nil
	}
	chained := Chain(handler, LoggingMiddleware, AuthMiddleware)

	ctx := map[string]interface{}{"action": "getData", "token": "abc123"}
	if err := chained(ctx); err != nil {
		fmt.Println("오류:", err)
	}

	// 이벤트 버스
	fmt.Println("\n=== 이벤트 버스 ===")
	bus := NewEventBus()
	bus.Subscribe("user.login", func(d interface{}) {
		fmt.Printf("이메일 알림: %v 로그인\n", d)
	})
	bus.Subscribe("user.login", func(d interface{}) {
		fmt.Printf("로그 기록: %v\n", d)
	})
	bus.Subscribe("user.purchase", func(d interface{}) {
		fmt.Printf("결제 처리: %v\n", d)
	})

	bus.Publish("user.login", "김철수")
	bus.Publish("user.purchase", map[string]interface{}{"user": "이영희", "amount": 29000})
}
