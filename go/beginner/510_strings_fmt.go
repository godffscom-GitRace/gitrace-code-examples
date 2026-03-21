// [510] 문자열과 포맷 - Strings & Formatting
// 레벨: 2 | strings 패키지와 fmt 포맷팅을 배웁니다

package main

import (
	"fmt"
	"strings"
	"strconv"
	"unicode/utf8"
)

func main() {
	s := "Hello, GitRace! 안녕하세요"

	// strings 패키지 주요 함수
	fmt.Println("=== strings 패키지 ===")
	fmt.Println("Contains:", strings.Contains(s, "GitRace"))
	fmt.Println("HasPrefix:", strings.HasPrefix(s, "Hello"))
	fmt.Println("HasSuffix:", strings.HasSuffix(s, "세요"))
	fmt.Println("Count:", strings.Count(s, "l"))
	fmt.Println("Index:", strings.Index(s, "GitRace"))
	fmt.Println("ToUpper:", strings.ToUpper("hello"))
	fmt.Println("ToLower:", strings.ToLower("HELLO"))
	fmt.Println("TrimSpace:", strings.TrimSpace("  공백  "))
	fmt.Println("Trim:", strings.Trim("***Go***", "*"))
	fmt.Println("Replace:", strings.Replace(s, "GitRace", "Go", 1))
	fmt.Println("ReplaceAll:", strings.ReplaceAll("aababab", "ab", "X"))

	// 분리 / 합치기
	csv := "김철수,이영희,박민수,최지영"
	parts := strings.Split(csv, ",")
	fmt.Println("\nSplit:", parts)
	fmt.Println("Join:", strings.Join(parts, " | "))

	// Fields: 공백으로 분리
	sentence := "Go  is  a  great  language"
	fmt.Println("Fields:", strings.Fields(sentence))

	// Repeat / Builder
	fmt.Println("Repeat:", strings.Repeat("ab", 4))

	// strings.Builder: 효율적인 문자열 생성
	var sb strings.Builder
	for i := 1; i <= 5; i++ {
		sb.WriteString(fmt.Sprintf("항목%d", i))
		if i < 5 {
			sb.WriteString(", ")
		}
	}
	fmt.Println("Builder:", sb.String())

	// 바이트 vs 문자 (한글은 3바이트)
	fmt.Println("\n=== 문자열 길이 ===")
	korean := "안녕하세요"
	fmt.Printf("바이트 길이: %d\n", len(korean))
	fmt.Printf("문자 길이: %d\n", utf8.RuneCountInString(korean))

	// 문자 순회 (rune)
	for i, r := range "Hi안녕" {
		fmt.Printf("[%d] %c (%d)\n", i, r, r)
	}

	// strconv: 타입 변환
	fmt.Println("\n=== strconv ===")
	num := 42
	str := strconv.Itoa(num)
	fmt.Printf("Itoa: %s (타입: %T)\n", str, str)

	parsed, err := strconv.Atoi("123")
	if err == nil {
		fmt.Printf("Atoi: %d (타입: %T)\n", parsed, parsed)
	}

	f, _ := strconv.ParseFloat("3.14159", 64)
	fmt.Printf("ParseFloat: %.5f\n", f)

	fmt.Println("FormatBool:", strconv.FormatBool(true))
	fmt.Println("FormatInt(255,16):", strconv.FormatInt(255, 16)) // ff

	// fmt 포맷팅
	fmt.Println("\n=== fmt 포맷 ===")
	fmt.Printf("%%v: %v\n", []int{1, 2, 3})
	fmt.Printf("%%+v: %+v\n", struct{ Name string; Age int }{"김철수", 25})
	fmt.Printf("%%#v: %#v\n", struct{ X int }{42})
	fmt.Printf("%%b: %b\n", 42)    // 2진수
	fmt.Printf("%%o: %o\n", 42)    // 8진수
	fmt.Printf("%%x: %x\n", 255)   // 16진수
	fmt.Printf("%%e: %e\n", 12345.6789) // 지수
	fmt.Printf("%%10d: %10d\n", 42)     // 너비 지정
	fmt.Printf("%%-10d|\n", 42)         // 왼쪽 정렬
}
