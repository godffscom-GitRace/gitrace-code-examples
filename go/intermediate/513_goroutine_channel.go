// [513] 고루틴과 채널 - Goroutines & Channels
// 레벨: 3 | Go의 핵심 동시성 기능인 고루틴과 채널을 배웁니다

package main

import (
	"fmt"
	"sync"
	"time"
)

// 고루틴: go 키워드로 비동기 실행
func printNumbers(name string, count int, wg *sync.WaitGroup) {
	defer wg.Done() // 완료 시 카운터 감소
	for i := 1; i <= count; i++ {
		fmt.Printf("[%s] %d\n", name, i)
		time.Sleep(10 * time.Millisecond)
	}
}

// 채널로 결과 전송
func generate(nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		for _, n := range nums {
			out <- n
		}
		close(out)
	}()
	return out
}

func square(in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		for n := range in {
			out <- n * n
		}
		close(out)
	}()
	return out
}

// 팬아웃: 여러 고루틴으로 분배
func worker(id int, jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {
	defer wg.Done()
	for job := range jobs {
		result := job * job
		fmt.Printf("워커%d: %d² = %d\n", id, job, result)
		results <- result
		time.Sleep(5 * time.Millisecond)
	}
}

func main() {
	// ===== 기본 고루틴 =====
	fmt.Println("=== 기본 고루틴 ===")
	var wg sync.WaitGroup

	wg.Add(2)
	go printNumbers("A", 3, &wg)
	go printNumbers("B", 3, &wg)
	wg.Wait()

	// ===== 채널 기본 =====
	fmt.Println("\n=== 채널 기본 ===")
	ch := make(chan string)

	go func() {
		ch <- "안녕하세요"
		ch <- "고루틴에서 전송"
		ch <- "DONE"
		close(ch)
	}()

	for msg := range ch {
		fmt.Println("받음:", msg)
	}

	// ===== 파이프라인 패턴 =====
	fmt.Println("\n=== 파이프라인 ===")
	// generate → square → print
	for n := range square(generate(1, 2, 3, 4, 5)) {
		fmt.Printf("%d ", n)
	}
	fmt.Println()

	// ===== 버퍼드 채널 =====
	fmt.Println("\n=== 버퍼드 채널 ===")
	buffered := make(chan int, 3) // 3개 버퍼
	buffered <- 1
	buffered <- 2
	buffered <- 3
	// 버퍼가 있으면 블로킹 없이 전송
	fmt.Println("버퍼:", <-buffered, <-buffered, <-buffered)

	// ===== select: 여러 채널 동시 대기 =====
	fmt.Println("\n=== select ===")
	ch1 := make(chan string)
	ch2 := make(chan string)

	go func() { time.Sleep(10 * time.Millisecond); ch1 <- "ch1 메시지" }()
	go func() { time.Sleep(5 * time.Millisecond); ch2 <- "ch2 메시지" }()

	for i := 0; i < 2; i++ {
		select {
		case msg1 := <-ch1:
			fmt.Println("ch1:", msg1)
		case msg2 := <-ch2:
			fmt.Println("ch2:", msg2)
		}
	}

	// ===== 워커 풀 =====
	fmt.Println("\n=== 워커 풀 ===")
	jobs := make(chan int, 5)
	results := make(chan int, 5)

	var workerWg sync.WaitGroup
	for w := 1; w <= 3; w++ {
		workerWg.Add(1)
		go worker(w, jobs, results, &workerWg)
	}

	for j := 1; j <= 5; j++ {
		jobs <- j
	}
	close(jobs)

	workerWg.Wait()
	close(results)

	total := 0
	for r := range results {
		total += r
	}
	fmt.Println("총합:", total)
}
