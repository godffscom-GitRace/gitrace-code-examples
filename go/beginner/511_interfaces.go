// [511] 인터페이스 - Interfaces
// 레벨: 2 | Go의 덕 타이핑 인터페이스와 빈 인터페이스를 배웁니다

package main

import (
	"fmt"
	"math"
	"sort"
)

// 인터페이스 정의
type Animal interface {
	Sound() string
	Name() string
}

type Mover interface {
	Move() string
}

// 인터페이스 합성
type Pet interface {
	Animal
	Mover
	Feed(food string) string
}

// 구현체들
type Dog struct{ name string }

func (d Dog) Sound() string          { return "멍멍!" }
func (d Dog) Name() string           { return d.name }
func (d Dog) Move() string           { return d.name + "이 달립니다" }
func (d Dog) Feed(food string) string { return d.name + "이 " + food + "을 먹습니다" }

type Cat struct{ name string }

func (c Cat) Sound() string          { return "야옹~" }
func (c Cat) Name() string           { return c.name }
func (c Cat) Move() string           { return c.name + "이 살금살금" }
func (c Cat) Feed(food string) string { return c.name + "이 " + food + "을 먹습니다" }

// 인터페이스를 매개변수로
func introduce(a Animal) {
	fmt.Printf("%s: %s\n", a.Name(), a.Sound())
}

// 타입 단언 (type assertion)
func describeAnimal(a Animal) {
	fmt.Printf("%s - ", a.Name())
	if dog, ok := a.(Dog); ok {
		fmt.Printf("강아지입니다. %s\n", dog.Move())
	} else if cat, ok := a.(Cat); ok {
		fmt.Printf("고양이입니다. %s\n", cat.Move())
	}
}

// 타입 스위치
func whatIs(i interface{}) string {
	switch v := i.(type) {
	case int:
		return fmt.Sprintf("정수: %d", v)
	case float64:
		return fmt.Sprintf("실수: %.2f", v)
	case string:
		return fmt.Sprintf("문자열: %q", v)
	case bool:
		return fmt.Sprintf("불리언: %v", v)
	case []int:
		return fmt.Sprintf("정수 슬라이스: %v", v)
	default:
		return fmt.Sprintf("알 수 없는 타입: %T", v)
	}
}

// 정렬 인터페이스 구현
type ByScore []struct {
	Name  string
	Score int
}

func (b ByScore) Len() int           { return len(b) }
func (b ByScore) Less(i, j int) bool { return b[i].Score > b[j].Score }
func (b ByScore) Swap(i, j int)      { b[i], b[j] = b[j], b[i] }

func main() {
	dog := Dog{"초코"}
	cat := Cat{"나비"}

	// 인터페이스 슬라이스
	animals := []Animal{dog, cat}
	for _, a := range animals {
		introduce(a)
	}

	// 합성 인터페이스
	fmt.Println()
	var pet Pet = dog
	fmt.Println(pet.Feed("사료"))
	fmt.Println(pet.Move())

	// 타입 단언
	fmt.Println()
	describeAnimal(dog)
	describeAnimal(cat)

	// 빈 인터페이스 (any = interface{})
	fmt.Println("\n=== 빈 인터페이스 ===")
	values := []interface{}{42, 3.14, "Go", true, []int{1, 2, 3}}
	for _, v := range values {
		fmt.Println(whatIs(v))
	}

	// 정렬 인터페이스
	fmt.Println("\n=== 커스텀 정렬 ===")
	students := ByScore{
		{"김철수", 88}, {"이영희", 95}, {"박민수", 72}, {"최지영", 91},
	}
	sort.Sort(students)
	for i, s := range students {
		fmt.Printf("%d위: %s (%d점)\n", i+1, s.Name, s.Score)
	}

	// Stringer 인터페이스 (fmt.Println 커스터마이즈)
	type Point struct{ X, Y float64 }
	p := struct {
		X, Y float64
	}{3, 4}
	dist := math.Sqrt(p.X*p.X + p.Y*p.Y)
	fmt.Printf("\n(%.0f, %.0f) 거리: %.2f\n", p.X, p.Y, dist)
}
