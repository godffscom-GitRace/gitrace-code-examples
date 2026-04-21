// [501] Hello World - 첫 번째 Go 프로그램
// 레벨: 1 | Go의 기본 구조와 fmt 패키지로 출력하는 방법을 배웁니다

package main

import (
    "fmt"
    "runtime"
)

func main() {
    // fmt.Println: 줄바꿈 포함 출력
    fmt.Println("Hello, World!")
    fmt.Println("안녕하세요, Go 언어!")

    // fmt.Print: 줄바꿈 없음
    fmt.Print("첫 번째 ")
    fmt.Print("두 번째\n")

    // fmt.Printf: 형식 지정 출력
    // %s=문자열, %d=정수, %f=실수, %v=기본형식, %T=타입
    name := "김철수"
    age := 25
    fmt.Printf("이름: %s, 나이: %d세\n", name, age)

    // fmt.Sprintf: 형식화된 문자열 반환
    greeting := fmt.Sprintf("%s님 환영합니다!", name)
    fmt.Println(greeting)

    // Go 환경 정보
    fmt.Printf("\nGo 버전: %s\n", runtime.Version())
    fmt.Printf("운영체제: %s/%s\n", runtime.GOOS, runtime.GOARCH)
    fmt.Printf("CPU 코어: %d\n", runtime.NumCPU())
}
