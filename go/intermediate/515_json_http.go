// [515] JSON과 HTTP - JSON & HTTP
// 레벨: 3 | encoding/json과 net/http로 API를 다루는 방법을 배웁니다

package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
)

// 구조체 태그로 JSON 필드명 지정
type Student struct {
	ID       int     `json:"id"`
	Name     string  `json:"name"`
	Age      int     `json:"age"`
	Score    float64 `json:"score"`
	IsActive bool    `json:"is_active"`
	Address  *string `json:"address,omitempty"` // nil이면 생략
}

type APIResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data"`
	Message string      `json:"message,omitempty"`
}

func main() {
	// ===== JSON 인코딩 (Go → JSON) =====
	fmt.Println("=== JSON 인코딩 ===")
	addr := "서울시 강남구"
	s := Student{
		ID: 1, Name: "김철수", Age: 20, Score: 88.5,
		IsActive: true, Address: &addr,
	}

	// 기본 인코딩
	data, err := json.Marshal(s)
	if err != nil {
		fmt.Println("인코딩 오류:", err)
		return
	}
	fmt.Println("JSON:", string(data))

	// 들여쓰기 포함
	pretty, _ := json.MarshalIndent(s, "", "  ")
	fmt.Println("Pretty JSON:\n" + string(pretty))

	// ===== JSON 디코딩 (JSON → Go) =====
	fmt.Println("=== JSON 디코딩 ===")
	jsonStr := `{"id":2,"name":"이영희","age":22,"score":95.0,"is_active":true}`
	var s2 Student
	if err := json.Unmarshal([]byte(jsonStr), &s2); err != nil {
		fmt.Println("디코딩 오류:", err)
	} else {
		fmt.Printf("이름: %s, 점수: %.1f\n", s2.Name, s2.Score)
	}

	// map으로 디코딩
	var m map[string]interface{}
	json.Unmarshal([]byte(jsonStr), &m)
	fmt.Printf("이름(map): %v\n", m["name"])

	// 스트림 디코딩 (대용량)
	reader := strings.NewReader(`{"id":3,"name":"박민수","age":21,"score":72.0,"is_active":false}`)
	var s3 Student
	json.NewDecoder(reader).Decode(&s3)
	fmt.Printf("스트림: %s\n", s3.Name)

	// ===== HTTP 서버 (간단한 예시) =====
	fmt.Println("\n=== HTTP 핸들러 예시 ===")

	// 실제 서버 없이 핸들러 로직만 시연
	students := []Student{
		{ID: 1, Name: "김철수", Age: 20, Score: 88.5, IsActive: true},
		{ID: 2, Name: "이영희", Age: 22, Score: 95.0, IsActive: true},
	}

	// JSON 응답 생성 시뮬레이션
	resp := APIResponse{Success: true, Data: students}
	respJSON, _ := json.MarshalIndent(resp, "", "  ")
	fmt.Println("API 응답:\n" + string(respJSON))

	// ===== HTTP 클라이언트 =====
	fmt.Println("\n=== HTTP GET 예시 ===")
	// 공개 API 호출 시뮬레이션 (실제 네트워크 필요)
	mockHandler := func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(APIResponse{
			Success: true,
			Data:    students,
			Message: "조회 성공",
		})
	}
	_ = mockHandler

	// HTTP 클라이언트 사용 예시
	body := bytes.NewBuffer([]byte(`{"name":"테스트","score":90}`))
	req, _ := http.NewRequest("POST", "https://example.com/api/students", body)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer token123")

	fmt.Printf("요청 URL: %s\n", req.URL)
	fmt.Printf("메서드: %s\n", req.Method)
	fmt.Printf("헤더: %v\n", req.Header.Get("Content-Type"))

	// 응답 처리 패턴
	processResponse := func(resp *http.Response, err error) {
		if err != nil {
			fmt.Println("오류:", err)
			return
		}
		defer resp.Body.Close()
		body, _ := io.ReadAll(resp.Body)
		fmt.Printf("상태: %d, 응답: %s\n", resp.StatusCode, string(body))
	}
	_ = processResponse

	fmt.Println("HTTP 클라이언트 패턴 예시 완료")
}
