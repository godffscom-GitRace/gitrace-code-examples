// [508] 구조체 - Structs
// 레벨: 2 | Go의 구조체로 데이터를 묶고 메서드를 정의하는 방법을 배웁니다

package main

import (
	"fmt"
	"math"
)

// 구조체 정의
type Student struct {
	Name  string
	Age   int
	Score float64
	Grade string
}

// 메서드: 값 수신자 (구조체 복사본)
func (s Student) String() string {
	return fmt.Sprintf("%s(%d세): %.1f점(%s)", s.Name, s.Age, s.Score, s.Grade)
}

// 메서드: 포인터 수신자 (원본 수정 가능)
func (s *Student) UpdateGrade() {
	switch {
	case s.Score >= 90:
		s.Grade = "A"
	case s.Score >= 80:
		s.Grade = "B"
	case s.Score >= 70:
		s.Grade = "C"
	default:
		s.Grade = "F"
	}
}

// 임베딩 (상속 대신)
type Person struct {
	Name string
	Age  int
}

func (p Person) Greet() string {
	return fmt.Sprintf("안녕하세요, %s입니다!", p.Name)
}

type Employee struct {
	Person            // 임베딩
	Department string
	Salary     int
}

// 인터페이스 구현
type Shape interface {
	Area() float64
	Perimeter() float64
}

type Circle struct {
	Radius float64
}

func (c Circle) Area() float64      { return math.Pi * c.Radius * c.Radius }
func (c Circle) Perimeter() float64 { return 2 * math.Pi * c.Radius }

type Rectangle struct {
	Width, Height float64
}

func (r Rectangle) Area() float64      { return r.Width * r.Height }
func (r Rectangle) Perimeter() float64 { return 2 * (r.Width + r.Height) }

func printShape(s Shape) {
	fmt.Printf("넓이: %.2f, 둘레: %.2f\n", s.Area(), s.Perimeter())
}

func main() {
	// 구조체 생성
	s1 := Student{Name: "김철수", Age: 20, Score: 88.5}
	s1.UpdateGrade()
	fmt.Println(s1.String())

	// 포인터로 생성
	s2 := &Student{Name: "이영희", Age: 22, Score: 95.0}
	s2.UpdateGrade()
	fmt.Println(s2)

	// 구조체 슬라이스
	students := []Student{
		{Name: "박민수", Age: 21, Score: 72.0},
		{Name: "최지영", Age: 23, Score: 91.5},
	}
	for i := range students {
		students[i].UpdateGrade()
		fmt.Println(students[i].String())
	}

	// 임베딩
	emp := Employee{
		Person:     Person{Name: "정호준", Age: 30},
		Department: "개발팀",
		Salary:     5000000,
	}
	fmt.Println("\n" + emp.Greet())             // 임베딩된 메서드 직접 호출
	fmt.Printf("%s부서, 연봉: %d원\n", emp.Department, emp.Salary)
	fmt.Println("나이:", emp.Age)               // 임베딩된 필드 직접 접근

	// 인터페이스
	fmt.Println("\n=== 도형 ===")
	shapes := []Shape{
		Circle{Radius: 5},
		Rectangle{Width: 4, Height: 6},
	}
	for _, s := range shapes {
		printShape(s)
	}

	// 익명 구조체
	point := struct{ X, Y int }{X: 3, Y: 4}
	fmt.Printf("\n점: (%d, %d)\n", point.X, point.Y)
}
