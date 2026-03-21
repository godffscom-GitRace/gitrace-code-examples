// [514] 파일 입출력 - File I/O
// 레벨: 3 | os, bufio, io 패키지로 파일을 읽고 쓰는 방법을 배웁니다

package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	filename := "students.txt"

	// ===== 파일 쓰기 =====
	fmt.Println("=== 파일 쓰기 ===")

	// os.WriteFile: 간단한 쓰기
	data := "김철수,88,B\n이영희,95,A\n박민수,72,C\n최지영,91,A\n정호준,83,B\n"
	if err := os.WriteFile(filename, []byte(data), 0644); err != nil {
		fmt.Println("쓰기 오류:", err)
		return
	}
	fmt.Println("파일 생성 완료:", filename)

	// os.OpenFile로 추가 쓰기 (Append 모드)
	f, err := os.OpenFile(filename, os.O_APPEND|os.O_WRONLY, 0644)
	if err != nil {
		fmt.Println("열기 오류:", err)
		return
	}
	defer f.Close()
	fmt.Fprintln(f, "홍길동,90,A")
	fmt.Println("데이터 추가 완료")

	// ===== 파일 읽기 =====
	fmt.Println("\n=== 파일 전체 읽기 ===")
	content, err := os.ReadFile(filename)
	if err != nil {
		fmt.Println("읽기 오류:", err)
		return
	}
	fmt.Print(string(content))

	// ===== bufio로 줄 단위 읽기 =====
	fmt.Println("=== 줄 단위 읽기 ===")
	file, err := os.Open(filename)
	if err != nil {
		fmt.Println("열기 오류:", err)
		return
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	lineNum := 1
	for scanner.Scan() {
		line := scanner.Text()
		parts := strings.Split(line, ",")
		if len(parts) == 3 {
			fmt.Printf("%d. 이름: %-8s 점수: %s 학점: %s\n",
				lineNum, parts[0], parts[1], parts[2])
		}
		lineNum++
	}

	// ===== 파일 정보 =====
	fmt.Println("\n=== 파일 정보 ===")
	info, err := os.Stat(filename)
	if err == nil {
		fmt.Printf("파일명: %s\n", info.Name())
		fmt.Printf("크기: %d bytes\n", info.Size())
		fmt.Printf("수정일: %s\n", info.ModTime().Format("2006-01-02 15:04:05"))
		fmt.Printf("권한: %s\n", info.Mode())
	}

	// ===== 디렉터리 작업 =====
	fmt.Println("\n=== 디렉터리 ===")
	dir := "test_dir"
	if err := os.MkdirAll(dir+"/sub", 0755); err != nil {
		fmt.Println("디렉터리 생성 오류:", err)
	} else {
		fmt.Println("디렉터리 생성:", dir+"/sub")
	}

	// 임시 파일
	tmp, err := os.CreateTemp("", "gitrace-*.txt")
	if err == nil {
		fmt.Println("임시 파일:", tmp.Name())
		tmp.WriteString("임시 데이터")
		tmp.Close()
		os.Remove(tmp.Name())
	}

	// 정리
	os.Remove(filename)
	os.RemoveAll(dir)
	fmt.Println("\n정리 완료")
}
