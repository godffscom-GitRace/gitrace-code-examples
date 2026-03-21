// [504] 함수 - Functions
// 레벨: 1 | Go의 함수, 다중 반환값, 가변 인수, 클로저를 배웁니다

package main

import (
	"errors"
	"fmt"
	"math"
)

// 기본 함수
func add(a, b int) int {
	return a + b
}

// 다중 반환값 (Go의 특징!)
func divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, errors.New("0으로 나눌 수 없습니다")
	}
	return a / b, nil
}

// 이름 있는 반환값
func minMax(nums []int) (min, max int) {
	min, max = nums[0], nums[0]
	for _, n := range nums {
		if n < min {
			min = n
		}
		if n > max {
			max = n
		}
	}
	return // 이름 있는 반환값은 그냥 return
}

// 가변 인수 (...Type)
func sum(nums ...int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}

// 함수를 값으로 전달
func apply(nums []int, fn func(int) int) []int {
	result := make([]int, len(nums))
	for i, n := range nums {
		result[i] = fn(n)
	}
	return result
}

// 클로저: 외부 변수를 캡처하는 함수
func makeCounter(start int) func() int {
	count := start
	return func() int {
		count++
		return count
	}
}

// 재귀 함수
func fibonacci(n int) int {
	if n <= 1 {
		return n
	}
	return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
	// 기본 함수 호출
	fmt.Printf("3 + 5 = %d\n", add(3, 5))

	// 다중 반환값
	result, err := divide(10, 3)
	if err != nil {
		fmt.Println("오류:", err)
	} else {
		fmt.Printf("10 / 3 = %.4f\n", result)
	}

	_, err = divide(10, 0)
	if err != nil {
		fmt.Println("오류:", err)
	}

	// 이름 있는 반환값
	nums := []int{5, 3, 8, 1, 9, 2, 7}
	min, max := minMax(nums)
	fmt.Printf("최솟값: %d, 최댓값: %d\n", min, max)

	// 가변 인수
	fmt.Printf("합계: %d\n", sum(1, 2, 3, 4, 5))

	// 슬라이스를 가변 인수로 전달
	scores := []int{85, 92, 78, 96}
	fmt.Printf("점수 합계: %d\n", sum(scores...))

	// 함수를 값으로 전달
	doubled := apply([]int{1, 2, 3, 4, 5}, func(n int) int { return n * 2 })
	fmt.Println("2배:", doubled)

	squared := apply([]int{1, 2, 3, 4, 5}, func(n int) int {
		return int(math.Pow(float64(n), 2))
	})
	fmt.Println("제곱:", squared)

	// 클로저
	counter1 := makeCounter(0)
	counter2 := makeCounter(10)
	fmt.Printf("counter1: %d, %d, %d\n", counter1(), counter1(), counter1())
	fmt.Printf("counter2: %d, %d\n", counter2(), counter2())

	// 피보나치
	fmt.Print("피보나치: ")
	for i := 0; i < 8; i++ {
		fmt.Printf("%d ", fibonacci(i))
	}
	fmt.Println()
}
