// [516] 제네릭 - Generics (Go 1.18+)
// 레벨: 3 | 타입 파라미터로 재사용 가능한 코드를 작성합니다

package main

import (
	"fmt"
	"golang.org/x/exp/constraints"
)

// 타입 제약 정의
type Number interface {
	constraints.Integer | constraints.Float
}

// 제네릭 함수
func Sum[T Number](nums []T) T {
	var total T
	for _, n := range nums {
		total += n
	}
	return total
}

func Map[T, U any](s []T, fn func(T) U) []U {
	result := make([]U, len(s))
	for i, v := range s {
		result[i] = fn(v)
	}
	return result
}

func Filter[T any](s []T, fn func(T) bool) []T {
	var result []T
	for _, v := range s {
		if fn(v) {
			result = append(result, v)
		}
	}
	return result
}

func Reduce[T, U any](s []T, init U, fn func(U, T) U) U {
	result := init
	for _, v := range s {
		result = fn(result, v)
	}
	return result
}

func Contains[T comparable](s []T, val T) bool {
	for _, v := range s {
		if v == val {
			return true
		}
	}
	return false
}

// 제네릭 구조체
type Stack[T any] struct {
	items []T
}

func (s *Stack[T]) Push(item T)  { s.items = append(s.items, item) }
func (s *Stack[T]) Pop() (T, bool) {
	var zero T
	if len(s.items) == 0 {
		return zero, false
	}
	n := len(s.items) - 1
	item := s.items[n]
	s.items = s.items[:n]
	return item, true
}
func (s *Stack[T]) Peek() (T, bool) {
	var zero T
	if len(s.items) == 0 {
		return zero, false
	}
	return s.items[len(s.items)-1], true
}
func (s *Stack[T]) Size() int    { return len(s.items) }
func (s *Stack[T]) IsEmpty() bool { return len(s.items) == 0 }

// 제네릭 쌍(Pair)
type Pair[A, B any] struct {
	First  A
	Second B
}

func NewPair[A, B any](a A, b B) Pair[A, B] { return Pair[A, B]{a, b} }

func main() {
	// 제네릭 함수
	fmt.Println("=== 제네릭 함수 ===")
	ints := []int{1, 2, 3, 4, 5}
	floats := []float64{1.1, 2.2, 3.3}
	fmt.Printf("정수 합계: %d\n", Sum(ints))
	fmt.Printf("실수 합계: %.1f\n", Sum(floats))

	// Map
	doubled := Map(ints, func(n int) int { return n * 2 })
	strs := Map(ints, func(n int) string { return fmt.Sprintf("item%d", n) })
	fmt.Println("2배:", doubled)
	fmt.Println("문자열:", strs)

	// Filter
	evens := Filter(ints, func(n int) bool { return n%2 == 0 })
	fmt.Println("짝수:", evens)

	// Reduce
	product := Reduce(ints, 1, func(acc, n int) int { return acc * n })
	fmt.Println("곱:", product)

	// Contains
	fmt.Println("3 포함:", Contains(ints, 3))
	fmt.Println("9 포함:", Contains(ints, 9))
	fmt.Println("'Go' 포함:", Contains([]string{"Python", "Go", "Rust"}, "Go"))

	// 제네릭 스택
	fmt.Println("\n=== 제네릭 스택 ===")
	intStack := &Stack[int]{}
	intStack.Push(1)
	intStack.Push(2)
	intStack.Push(3)
	fmt.Printf("크기: %d\n", intStack.Size())
	if top, ok := intStack.Peek(); ok {
		fmt.Printf("최상단: %d\n", top)
	}
	for !intStack.IsEmpty() {
		if v, ok := intStack.Pop(); ok {
			fmt.Printf("Pop: %d\n", v)
		}
	}

	// 문자열 스택
	strStack := &Stack[string]{}
	strStack.Push("김철수")
	strStack.Push("이영희")
	if name, ok := strStack.Pop(); ok {
		fmt.Println("꺼냄:", name)
	}

	// 제네릭 쌍
	fmt.Println("\n=== 제네릭 쌍 ===")
	p1 := NewPair("김철수", 88)
	p2 := NewPair(3.14, true)
	fmt.Printf("쌍1: %v, %v\n", p1.First, p1.Second)
	fmt.Printf("쌍2: %v, %v\n", p2.First, p2.Second)
}
