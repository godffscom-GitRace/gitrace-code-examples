// [509] 에러 처리 - Error Handling
// 레벨: 2 | Go의 error 타입, 사용자 정의 에러, defer/panic/recover를 배웁니다

package main

import (
	"errors"
	"fmt"
)

// sentinel 에러: 미리 정의된 에러 값
var (
	ErrNotFound   = errors.New("데이터를 찾을 수 없습니다")
	ErrPermission = errors.New("권한이 없습니다")
)

// 사용자 정의 에러 타입
type ValidationError struct {
	Field   string
	Message string
}

func (e *ValidationError) Error() string {
	return fmt.Sprintf("검증 오류 [%s]: %s", e.Field, e.Message)
}

// fmt.Errorf로 에러 래핑 (%w)
func findUser(id int) (string, error) {
	users := map[int]string{1: "김철수", 2: "이영희"}
	if name, ok := users[id]; ok {
		return name, nil
	}
	return "", fmt.Errorf("findUser 실패: %w", ErrNotFound)
}

// 유효성 검사
func validateAge(age int) error {
	if age < 0 {
		return &ValidationError{Field: "age", Message: "나이는 0 이상이어야 합니다"}
	}
	if age > 150 {
		return &ValidationError{Field: "age", Message: "유효하지 않은 나이"}
	}
	return nil
}

// defer: 함수 종료 시 실행 (LIFO 순서)
func deferExample() {
	fmt.Println("\n=== defer ===")
	defer fmt.Println("defer 3 (마지막 등록, 첫 실행)")
	defer fmt.Println("defer 2")
	defer fmt.Println("defer 1 (첫 등록, 마지막 실행)")
	fmt.Println("함수 본문")
}

// panic과 recover
func safeDiv(a, b int) (result int, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("panic 복구: %v", r)
		}
	}()
	if b == 0 {
		panic("0으로 나누기!")
	}
	return a / b, nil
}

func main() {
	// 기본 에러 처리
	name, err := findUser(1)
	if err != nil {
		fmt.Println("오류:", err)
	} else {
		fmt.Println("찾음:", name)
	}

	_, err = findUser(99)
	if err != nil {
		fmt.Println("오류:", err)

		// errors.Is: 특정 에러인지 확인 (래핑 관통)
		if errors.Is(err, ErrNotFound) {
			fmt.Println("→ ErrNotFound 확인됨")
		}
	}

	// 사용자 정의 에러 확인
	fmt.Println()
	ages := []int{25, -5, 200}
	for _, age := range ages {
		if err := validateAge(age); err != nil {
			// errors.As: 특정 타입으로 변환
			var ve *ValidationError
			if errors.As(err, &ve) {
				fmt.Printf("필드: %s, 메시지: %s\n", ve.Field, ve.Message)
			}
		} else {
			fmt.Printf("나이 %d: 유효\n", age)
		}
	}

	// defer 예제
	deferExample()

	// panic/recover
	fmt.Println("\n=== panic/recover ===")
	result, err := safeDiv(10, 2)
	fmt.Printf("10/2 = %d, err = %v\n", result, err)

	result, err = safeDiv(10, 0)
	fmt.Printf("10/0 = %d, err = %v\n", result, err)
}
