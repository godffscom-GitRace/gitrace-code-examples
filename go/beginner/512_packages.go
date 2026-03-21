// [512] 표준 라이브러리 - Standard Library
// 레벨: 2 | Go의 자주 쓰는 표준 패키지들을 배웁니다

package main

import (
	"fmt"
	"math"
	"math/rand"
	"os"
	"path/filepath"
	"sort"
	"time"
)

func main() {
	// ===== time 패키지 =====
	fmt.Println("=== time ===")
	now := time.Now()
	fmt.Println("현재시간:", now.Format("2006-01-02 15:04:05"))
	fmt.Println("날짜:", now.Format("2006년 01월 02일"))
	fmt.Println("요일:", now.Weekday())
	fmt.Println("Unix:", now.Unix())

	// 날짜 생성
	birthday := time.Date(1999, time.March, 15, 0, 0, 0, 0, time.Local)
	age := int(now.Sub(birthday).Hours() / 24 / 365)
	fmt.Printf("생일: %s (약 %d세)\n", birthday.Format("2006-01-02"), age)

	// 시간 연산
	future := now.Add(30 * 24 * time.Hour)
	fmt.Println("30일 후:", future.Format("2006-01-02"))

	// 타이머 (짧게)
	start := time.Now()
	sum := 0
	for i := 0; i < 1000000; i++ {
		sum += i
	}
	elapsed := time.Since(start)
	fmt.Printf("1백만 합산 시간: %v\n", elapsed)

	// ===== math 패키지 =====
	fmt.Println("\n=== math ===")
	fmt.Printf("Pi: %.6f\n", math.Pi)
	fmt.Printf("E: %.6f\n", math.E)
	fmt.Printf("Sqrt(2): %.6f\n", math.Sqrt(2))
	fmt.Printf("Pow(2,10): %.0f\n", math.Pow(2, 10))
	fmt.Printf("Abs(-5.5): %.1f\n", math.Abs(-5.5))
	fmt.Printf("Ceil(4.1): %.0f\n", math.Ceil(4.1))
	fmt.Printf("Floor(4.9): %.0f\n", math.Floor(4.9))
	fmt.Printf("Round(4.5): %.0f\n", math.Round(4.5))
	fmt.Printf("Log10(1000): %.0f\n", math.Log10(1000))
	fmt.Printf("MaxInt: %d\n", math.MaxInt64)

	// ===== math/rand =====
	fmt.Println("\n=== math/rand ===")
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	fmt.Println("난수(1~100):", r.Intn(100)+1)
	fmt.Printf("실수난수: %.4f\n", r.Float64())

	nums := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	r.Shuffle(len(nums), func(i, j int) { nums[i], nums[j] = nums[j], nums[i] })
	fmt.Println("셔플:", nums)

	// ===== sort =====
	fmt.Println("\n=== sort ===")
	data := []int{5, 2, 8, 1, 9, 3}
	sort.Ints(data)
	fmt.Println("정렬:", data)
	fmt.Println("검색(8):", sort.SearchInts(data, 8))

	// 커스텀 정렬
	words := []string{"바나나", "사과", "딸기", "포도", "자두"}
	sort.Slice(words, func(i, j int) bool {
		return len(words[i]) < len(words[j]) // 길이순
	})
	fmt.Println("길이순:", words)

	// ===== os 패키지 =====
	fmt.Println("\n=== os ===")
	fmt.Println("현재 디렉터리:", func() string { d, _ := os.Getwd(); return d }())
	fmt.Println("HOME:", os.Getenv("HOME"))
	fmt.Println("실행파일:", os.Args[0])

	// 파일 경로
	path := filepath.Join("users", "김철수", "documents", "file.txt")
	fmt.Println("경로:", path)
	fmt.Println("디렉터리:", filepath.Dir(path))
	fmt.Println("파일명:", filepath.Base(path))
	fmt.Println("확장자:", filepath.Ext(path))
}
