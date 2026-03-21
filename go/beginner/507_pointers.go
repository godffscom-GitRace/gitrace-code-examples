// [507] 포인터 - Pointers
// 레벨: 2 | Go의 포인터로 메모리 주소를 다루는 방법을 배웁니다

package main

import "fmt"

// 값 전달 (복사본 수정 → 원본 불변)
func doubleValue(n int) int {
	n *= 2
	return n
}

// 포인터 전달 (원본 수정 가능)
func doublePointer(n *int) {
	*n *= 2
}

// 포인터로 두 값 교환
func swap(a, b *int) {
	*a, *b = *b, *a
}

// 포인터 반환 (힙 할당)
func newStudent(name string, score int) *struct {
	name  string
	score int
} {
	return &struct {
		name  string
		score int
	}{name, score}
}

func main() {
	// & : 주소 연산자
	x := 42
	fmt.Printf("x의 값: %d\n", x)
	fmt.Printf("x의 주소: %p\n", &x)

	// * : 역참조 연산자 (포인터가 가리키는 값)
	ptr := &x
	fmt.Printf("ptr이 가리키는 값: %d\n", *ptr)

	// 포인터로 값 변경
	*ptr = 100
	fmt.Printf("포인터로 변경 후 x: %d\n", x)

	// new(): 포인터 생성 + 제로값 초기화
	p := new(int)
	fmt.Printf("new(int): %d (주소: %p)\n", *p, p)
	*p = 55
	fmt.Printf("값 설정 후: %d\n", *p)

	// 값 전달 vs 포인터 전달
	a := 10
	fmt.Printf("\n값 전달 전: %d\n", a)
	result := doubleValue(a)
	fmt.Printf("값 전달 후 a: %d (result: %d)\n", a, result)

	doublePointer(&a)
	fmt.Printf("포인터 전달 후 a: %d\n", a)

	// 값 교환
	m, n := 5, 10
	fmt.Printf("\n교환 전: m=%d, n=%d\n", m, n)
	swap(&m, &n)
	fmt.Printf("교환 후: m=%d, n=%d\n", m, n)

	// nil 포인터
	var nilPtr *int
	fmt.Printf("\nnilPtr: %v\n", nilPtr)
	if nilPtr == nil {
		fmt.Println("포인터가 nil입니다")
	}

	// 구조체 포인터 (자동 역참조)
	type Point struct{ X, Y int }

	p1 := &Point{3, 4}
	fmt.Printf("\n포인트: %v\n", *p1)
	p1.X = 10 // (*p1).X = 10 과 동일
	fmt.Printf("X 변경 후: %v\n", *p1)

	// 포인터 슬라이스
	nums := []*int{new(int), new(int), new(int)}
	for i, p := range nums {
		*p = (i + 1) * 10
	}
	for _, p := range nums {
		fmt.Printf("%d ", *p)
	}
	fmt.Println()
}
