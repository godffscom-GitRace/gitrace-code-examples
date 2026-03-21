// [506] 맵 - Maps
// 레벨: 2 | Go의 키-값 자료구조인 맵을 배웁니다

package main

import (
	"fmt"
	"sort"
)

func main() {
	// 맵 생성
	m := make(map[string]int)

	// 값 추가
	m["김철수"] = 88
	m["이영희"] = 95
	m["박민수"] = 72
	m["최지영"] = 91

	fmt.Println("맵:", m)
	fmt.Println("이영희 점수:", m["이영희"])

	// 리터럴 초기화
	capitals := map[string]string{
		"한국": "서울",
		"일본": "도쿄",
		"미국": "워싱턴 D.C.",
		"영국": "런던",
	}
	fmt.Println("수도:", capitals["한국"])

	// 존재 확인 (comma ok 패턴)
	score, ok := m["홍길동"]
	if ok {
		fmt.Println("홍길동:", score)
	} else {
		fmt.Println("홍길동은 없습니다")
	}

	// 존재하지 않는 키 접근 시 제로값 반환
	fmt.Println("없는 키:", m["없음"]) // 0

	// 삭제
	delete(m, "박민수")
	fmt.Println("삭제 후:", m)

	// 순회 (순서 보장 안 됨)
	fmt.Print("점수 목록: ")
	for name, score := range m {
		fmt.Printf("%s=%d ", name, score)
	}
	fmt.Println()

	// 정렬된 순서로 출력
	keys := make([]string, 0, len(m))
	for k := range m {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	fmt.Println("\n정렬된 순서:")
	for _, k := range keys {
		fmt.Printf("  %s: %d점\n", k, m[k])
	}

	// 중첩 맵 (맵의 맵)
	students := map[string]map[string]int{
		"김철수": {"수학": 88, "영어": 92, "국어": 85},
		"이영희": {"수학": 95, "영어": 88, "국어": 91},
	}
	for name, subjects := range students {
		total := 0
		for _, s := range subjects {
			total += s
		}
		fmt.Printf("%s 평균: %.1f\n", name, float64(total)/float64(len(subjects)))
	}

	// 단어 빈도수 카운터
	words := []string{"go", "is", "fast", "go", "is", "fun", "go"}
	freq := make(map[string]int)
	for _, w := range words {
		freq[w]++ // 없는 키도 자동으로 0에서 증가
	}
	fmt.Println("\n단어 빈도:", freq)

	// 슬라이스를 맵으로 그룹화
	nums := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	grouped := map[string][]int{"홀수": {}, "짝수": {}}
	for _, n := range nums {
		if n%2 == 0 {
			grouped["짝수"] = append(grouped["짝수"], n)
		} else {
			grouped["홀수"] = append(grouped["홀수"], n)
		}
	}
	fmt.Println("홀수:", grouped["홀수"])
	fmt.Println("짝수:", grouped["짝수"])
}
