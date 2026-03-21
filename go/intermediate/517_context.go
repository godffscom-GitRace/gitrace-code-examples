// [517] 컨텍스트 - Context
// 레벨: 3 | context 패키지로 취소, 타임아웃, 값 전달을 처리합니다

package main

import (
	"context"
	"fmt"
	"time"
)

// 키 타입 (컨텍스트 값 충돌 방지)
type contextKey string

const (
	KeyUserID    contextKey = "user_id"
	KeyRequestID contextKey = "request_id"
)

// 컨텍스트에서 값 추출
func getUserID(ctx context.Context) (int, bool) {
	id, ok := ctx.Value(KeyUserID).(int)
	return id, ok
}

// 오래 걸리는 작업 (취소 가능)
func longTask(ctx context.Context, name string) error {
	fmt.Printf("[%s] 작업 시작\n", name)
	for i := 1; i <= 5; i++ {
		select {
		case <-ctx.Done():
			fmt.Printf("[%s] 취소됨: %v\n", name, ctx.Err())
			return ctx.Err()
		case <-time.After(100 * time.Millisecond):
			fmt.Printf("[%s] 진행 중 %d/5\n", name, i)
		}
	}
	fmt.Printf("[%s] 완료!\n", name)
	return nil
}

// DB 조회 시뮬레이션
func queryDB(ctx context.Context, query string) (string, error) {
	// 컨텍스트에서 사용자 정보 추출
	if id, ok := getUserID(ctx); ok {
		fmt.Printf("사용자 %d의 쿼리: %s\n", id, query)
	}

	// 타임아웃 체크
	done := make(chan string)
	go func() {
		time.Sleep(50 * time.Millisecond) // DB 쿼리 시뮬레이션
		done <- "결과 데이터"
	}()

	select {
	case result := <-done:
		return result, nil
	case <-ctx.Done():
		return "", fmt.Errorf("DB 쿼리 타임아웃: %w", ctx.Err())
	}
}

func main() {
	// ===== Background & TODO =====
	fmt.Println("=== 기본 컨텍스트 ===")
	bg := context.Background() // 최상위 컨텍스트
	fmt.Println("Background:", bg)

	// ===== WithValue: 값 전달 =====
	fmt.Println("\n=== WithValue ===")
	ctx := context.WithValue(bg, KeyUserID, 42)
	ctx = context.WithValue(ctx, KeyRequestID, "req-abc-123")

	if id, ok := getUserID(ctx); ok {
		fmt.Println("UserID:", id)
	}
	if reqID, ok := ctx.Value(KeyRequestID).(string); ok {
		fmt.Println("RequestID:", reqID)
	}

	// DB 조회 (컨텍스트 전달)
	result, err := queryDB(ctx, "SELECT * FROM users")
	if err != nil {
		fmt.Println("오류:", err)
	} else {
		fmt.Println("결과:", result)
	}

	// ===== WithTimeout: 시간 제한 =====
	fmt.Println("\n=== WithTimeout ===")
	timeoutCtx, cancel := context.WithTimeout(bg, 350*time.Millisecond)
	defer cancel()

	if err := longTask(timeoutCtx, "타임아웃작업"); err != nil {
		fmt.Println("작업 종료:", err)
	}

	// ===== WithCancel: 수동 취소 =====
	fmt.Println("\n=== WithCancel ===")
	cancelCtx, cancelFn := context.WithCancel(bg)

	go func() {
		time.Sleep(250 * time.Millisecond)
		fmt.Println("취소 신호 전송!")
		cancelFn()
	}()

	if err := longTask(cancelCtx, "취소작업"); err != nil {
		fmt.Println("작업 종료:", err)
	}

	// ===== WithDeadline =====
	fmt.Println("\n=== WithDeadline ===")
	deadline := time.Now().Add(200 * time.Millisecond)
	deadlineCtx, deadlineCancel := context.WithDeadline(bg, deadline)
	defer deadlineCancel()

	fmt.Println("데드라인:", deadline.Format("15:04:05.000"))
	fmt.Println("현재시간:", time.Now().Format("15:04:05.000"))

	<-deadlineCtx.Done()
	fmt.Println("데드라인 도달:", deadlineCtx.Err())
}
