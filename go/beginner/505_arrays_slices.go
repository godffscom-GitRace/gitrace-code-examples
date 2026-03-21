// [505] 배열과 슬라이스 - Arrays & Slices
// 레벨: 2 | Go의 배열(고정)과 슬라이스(동적)를 배웁니다

package main

import (
	"fmt"
	"sort"
)

func main() {
	// ===== 배열 (크기 고정) =====
	var arr [5]int
	arr[0] = 10
	arr[1] = 20
	fmt.Println("배열:", arr)

	// 배열 초기화
	scores := [5]int{85, 92, 78, 96, 88}
	names := [3]string{"김철수", "이영희", "박민수"}
	fmt.Println("점수:", scores)
	fmt.Println("이름:", names)

	// 크기 자동 결정
	fruits := [...]string{"사과", "바나나", "딸기"}
	fmt.Printf("과일 (%d개): %v\n", len(fruits), fruits)

	// ===== 슬라이스 (동적 크기) =====
	// make로 생성: make([]Type, len, cap)
	s := make([]int, 0, 5)
	fmt.Printf("슬라이스: len=%d, cap=%d\n", len(s), cap(s))

	// append: 요소 추가
	s = append(s, 1, 2, 3)
	s = append(s, 4, 5, 6) // cap 초과 시 자동 확장
	fmt.Printf("append 후: %v len=%d cap=%d\n", s, len(s), cap(s))

	// 슬라이싱 [start:end]
	fmt.Println("s[1:4]:", s[1:4])
	fmt.Println("s[:3]:", s[:3])
	fmt.Println("s[3:]:", s[3:])

	// 슬라이스 복사 (copy)
	original := []int{1, 2, 3, 4, 5}
	copied := make([]int, len(original))
	copy(copied, original)
	copied[0] = 99
	fmt.Printf("원본: %v, 복사본: %v\n", original, copied)

	// range: 인덱스와 값 순회
	fmt.Print("인덱스와 값: ")
	for i, v := range scores {
		fmt.Printf("[%d]=%d ", i, v)
	}
	fmt.Println()

	// 값만 필요할 때 (_로 인덱스 무시)
	total := 0
	for _, v := range scores {
		total += v
	}
	fmt.Printf("합계: %d, 평균: %.1f\n", total, float64(total)/float64(len(scores)))

	// 정렬
	unsorted := []int{3, 1, 4, 1, 5, 9, 2, 6}
	sort.Ints(unsorted)
	fmt.Println("정렬:", unsorted)

	words := []string{"바나나", "사과", "딸기", "포도"}
	sort.Strings(words)
	fmt.Println("문자열 정렬:", words)

	// 2차원 슬라이스
	matrix := [][]int{
		{1, 2, 3},
		{4, 5, 6},
		{7, 8, 9},
	}
	fmt.Println("\n행렬:")
	for _, row := range matrix {
		fmt.Println(row)
	}

	// 슬라이스에서 요소 제거 (인덱스 2 제거)
	data := []int{10, 20, 30, 40, 50}
	idx := 2
	data = append(data[:idx], data[idx+1:]...)
	fmt.Println("30 제거 후:", data)
}
