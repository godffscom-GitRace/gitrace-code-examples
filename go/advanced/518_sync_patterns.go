// [518] 동시성 패턴 - Sync Patterns
// 레벨: 4 | sync 패키지의 Mutex, RWMutex, Once, Pool을 배웁니다

package main

import (
	"fmt"
	"sync"
	"sync/atomic"
)

// ===== Mutex: 경쟁 조건 방지 =====
type SafeCounter struct {
	mu    sync.Mutex
	count int
}

func (c *SafeCounter) Increment() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.count++
}

func (c *SafeCounter) Value() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.count
}

// ===== RWMutex: 읽기/쓰기 분리 =====
type Cache struct {
	mu   sync.RWMutex
	data map[string]string
}

func NewCache() *Cache {
	return &Cache{data: make(map[string]string)}
}

func (c *Cache) Set(key, val string) {
	c.mu.Lock() // 쓰기 잠금 (단독)
	defer c.mu.Unlock()
	c.data[key] = val
}

func (c *Cache) Get(key string) (string, bool) {
	c.mu.RLock() // 읽기 잠금 (공유 가능)
	defer c.mu.RUnlock()
	val, ok := c.data[key]
	return val, ok
}

// ===== sync.Once: 딱 한 번만 실행 =====
type Singleton struct {
	value string
}

var (
	instance *Singleton
	once     sync.Once
)

func GetInstance() *Singleton {
	once.Do(func() {
		fmt.Println("싱글톤 초기화 (한 번만)")
		instance = &Singleton{value: "유일한 인스턴스"}
	})
	return instance
}

// ===== WaitGroup + ErrGroup 패턴 =====
func fetchData(id int) (string, error) {
	// 작업 시뮬레이션
	return fmt.Sprintf("데이터-%d", id), nil
}

func main() {
	// Mutex 테스트
	fmt.Println("=== SafeCounter ===")
	counter := &SafeCounter{}
	var wg sync.WaitGroup

	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			counter.Increment()
		}()
	}
	wg.Wait()
	fmt.Println("최종 카운트:", counter.Value()) // 반드시 100

	// RWMutex 캐시
	fmt.Println("\n=== Cache (RWMutex) ===")
	cache := NewCache()

	// 여러 고루틴이 동시에 쓰기/읽기
	for i := 0; i < 5; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			key := fmt.Sprintf("key%d", i)
			cache.Set(key, fmt.Sprintf("value%d", i))
		}(i)
	}
	wg.Wait()

	for i := 0; i < 5; i++ {
		if val, ok := cache.Get(fmt.Sprintf("key%d", i)); ok {
			fmt.Printf("캐시: key%d = %s\n", i, val)
		}
	}

	// sync.Once
	fmt.Println("\n=== sync.Once ===")
	for i := 0; i < 3; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			s := GetInstance()
			fmt.Println("인스턴스:", s.value)
		}()
	}
	wg.Wait()

	// atomic: 락 없이 원자적 연산
	fmt.Println("\n=== atomic ===")
	var atomicCounter int64
	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			atomic.AddInt64(&atomicCounter, 1)
		}()
	}
	wg.Wait()
	fmt.Println("atomic 카운터:", atomic.LoadInt64(&atomicCounter))

	// sync.Pool: 객체 재사용 풀
	fmt.Println("\n=== sync.Pool ===")
	pool := &sync.Pool{
		New: func() interface{} {
			fmt.Println("새 객체 생성")
			return &[]byte{}
		},
	}

	obj1 := pool.Get().(*[]byte)
	*obj1 = append(*obj1, []byte("데이터1")...)
	pool.Put(obj1)

	obj2 := pool.Get().(*[]byte)
	fmt.Printf("재사용 객체: %s\n", string(*obj2))
	pool.Put(obj2)

	// 병렬 데이터 수집
	fmt.Println("\n=== 병렬 데이터 수집 ===")
	results := make([]string, 5)
	for i := 0; i < 5; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			data, _ := fetchData(i)
			results[i] = data
		}(i)
	}
	wg.Wait()
	fmt.Println("결과:", results)
}
