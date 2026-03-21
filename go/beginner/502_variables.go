// [502] 변수와 상수 - Variables & Constants
// 레벨: 1 | Go의 변수 선언 방식과 기본 자료형을 배웁니다

package main

import "fmt"

// 패키지 레벨 변수
var appName = "GitRace"
var version string = "1.0.0"

// 상수
const Pi = 3.14159265358979
const MaxRetry = 3

// iota: 자동 증가 상수
type Direction int

const (
	North Direction = iota // 0
	East                   // 1
	South                  // 2
	West                   // 3
)

func main() {
	// var 선언
	var age int = 25
	var name string = "김철수"
	var isStudent bool = true
	var score float64 = 88.5

	fmt.Printf("이름: %s, 나이: %d, 학생: %v, 점수: %.1f\n",
		name, age, isStudent, score)

	// 짧은 선언 := (함수 내에서만 가능)
	city := "서울"
	height := 175.5
	fmt.Printf("도시: %s, 키: %.1f\n", city, height)

	// 여러 변수 동시 선언
	var (
		x int     = 10
		y float64 = 3.14
		z string  = "hello"
	)
	fmt.Println(x, y, z)

	// 여러 변수 짧은 선언
	a, b, c := 1, 2, 3
	fmt.Println(a, b, c)

	// 값 교환 (Go의 우아한 방법)
	a, b = b, a
	fmt.Printf("교환 후: a=%d, b=%d\n", a, b)

	// 제로값: 선언만 하면 자동으로 기본값
	var num int     // 0
	var str string  // ""
	var flag bool   // false
	fmt.Printf("제로값: %d, '%s', %v\n", num, str, flag)

	// 상수와 iota 사용
	fmt.Printf("\nPi: %.5f, MaxRetry: %d\n", Pi, MaxRetry)
	fmt.Printf("방향: North=%d, East=%d, South=%d, West=%d\n",
		North, East, South, West)

	// 타입 확인
	fmt.Printf("\n타입: %T, %T, %T\n", age, score, city)

	fmt.Println("\n앱:", appName, "버전:", version)
}
