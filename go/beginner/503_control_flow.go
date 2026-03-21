// [503] 제어 흐름 - Control Flow
// 레벨: 1 | if, switch, for로 프로그램 흐름을 제어하는 방법을 배웁니다

package main

import "fmt"

func main() {
	// ===== if/else =====
	score := 85

	// Go의 if: 조건에 괄호 없음
	if score >= 90 {
		fmt.Println("A학점")
	} else if score >= 80 {
		fmt.Println("B학점")
	} else if score >= 70 {
		fmt.Println("C학점")
	} else {
		fmt.Println("F학점")
	}

	// if 초기화 문: if 블록 안에서만 유효한 변수
	if remainder := score % 10; remainder >= 5 {
		fmt.Printf("올림 적용 (%d점)\n", score+10-remainder)
	} else {
		fmt.Printf("버림 적용 (%d점)\n", score-remainder)
	}

	// ===== switch =====
	day := 3
	switch day {
	case 1:
		fmt.Println("월요일")
	case 2:
		fmt.Println("화요일")
	case 3, 4: // 여러 값 동시 처리
		fmt.Println("수/목요일")
	case 5:
		fmt.Println("금요일")
	default:
		fmt.Println("주말")
	}

	// 조건식 switch (if-else 대체)
	switch {
	case score >= 90:
		fmt.Println("우수")
	case score >= 70:
		fmt.Println("양호")
	default:
		fmt.Println("노력 필요")
	}

	// ===== for (Go의 유일한 반복문) =====
	// 기본 for
	sum := 0
	for i := 1; i <= 10; i++ {
		sum += i
	}
	fmt.Printf("1~10 합계: %d\n", sum)

	// while처럼 사용
	n := 1
	for n <= 32 {
		fmt.Printf("%d ", n)
		n *= 2
	}
	fmt.Println()

	// 무한 루프 + break
	count := 0
	for {
		count++
		if count >= 5 {
			break
		}
	}
	fmt.Printf("count: %d\n", count)

	// continue: 현재 반복 건너뜀
	fmt.Print("홀수: ")
	for i := 1; i <= 10; i++ {
		if i%2 == 0 {
			continue
		}
		fmt.Printf("%d ", i)
	}
	fmt.Println()

	// 레이블 break (중첩 루프 탈출)
outer:
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			if i+j >= 3 {
				break outer
			}
			fmt.Printf("(%d,%d) ", i, j)
		}
	}
	fmt.Println()
}
