// [519] 알고리즘 - Algorithms
// 레벨: 4 | Go로 정렬, 탐색, 자료구조 알고리즘을 구현합니다

package main

import "fmt"

// ===== 정렬 =====
func quickSort(arr []int) []int {
	if len(arr) <= 1 {
		return arr
	}
	pivot := arr[len(arr)/2]
	var left, mid, right []int
	for _, v := range arr {
		switch {
		case v < pivot:
			left = append(left, v)
		case v == pivot:
			mid = append(mid, v)
		default:
			right = append(right, v)
		}
	}
	result := quickSort(left)
	result = append(result, mid...)
	result = append(result, quickSort(right)...)
	return result
}

func mergeSort(arr []int) []int {
	if len(arr) <= 1 {
		return arr
	}
	mid := len(arr) / 2
	left := mergeSort(arr[:mid])
	right := mergeSort(arr[mid:])
	return merge(left, right)
}

func merge(l, r []int) []int {
	result := make([]int, 0, len(l)+len(r))
	i, j := 0, 0
	for i < len(l) && j < len(r) {
		if l[i] <= r[j] {
			result = append(result, l[i])
			i++
		} else {
			result = append(result, r[j])
			j++
		}
	}
	result = append(result, l[i:]...)
	result = append(result, r[j:]...)
	return result
}

// ===== 탐색 =====
func binarySearch(arr []int, target int) int {
	lo, hi := 0, len(arr)-1
	for lo <= hi {
		mid := (lo + hi) / 2
		switch {
		case arr[mid] == target:
			return mid
		case arr[mid] < target:
			lo = mid + 1
		default:
			hi = mid - 1
		}
	}
	return -1
}

// ===== 연결 리스트 =====
type ListNode struct {
	Val  int
	Next *ListNode
}

func newList(vals ...int) *ListNode {
	if len(vals) == 0 {
		return nil
	}
	head := &ListNode{Val: vals[0]}
	curr := head
	for _, v := range vals[1:] {
		curr.Next = &ListNode{Val: v}
		curr = curr.Next
	}
	return head
}

func printList(head *ListNode) {
	for head != nil {
		fmt.Printf("%d", head.Val)
		if head.Next != nil {
			fmt.Print(" → ")
		}
		head = head.Next
	}
	fmt.Println()
}

func reverseList(head *ListNode) *ListNode {
	var prev *ListNode
	curr := head
	for curr != nil {
		next := curr.Next
		curr.Next = prev
		prev = curr
		curr = next
	}
	return prev
}

// ===== 스택/큐 =====
type Stack struct{ items []int }

func (s *Stack) Push(v int)      { s.items = append(s.items, v) }
func (s *Stack) Pop() (int, bool) {
	if len(s.items) == 0 {
		return 0, false
	}
	n := len(s.items) - 1
	v := s.items[n]
	s.items = s.items[:n]
	return v, true
}

type Queue struct{ items []int }

func (q *Queue) Enqueue(v int)    { q.items = append(q.items, v) }
func (q *Queue) Dequeue() (int, bool) {
	if len(q.items) == 0 {
		return 0, false
	}
	v := q.items[0]
	q.items = q.items[1:]
	return v, true
}

func main() {
	arr := []int{64, 34, 25, 12, 22, 11, 90}
	fmt.Println("원본:", arr)
	fmt.Println("퀵정렬:", quickSort(append([]int{}, arr...)))
	fmt.Println("병합정렬:", mergeSort(append([]int{}, arr...)))

	sorted := mergeSort(arr)
	fmt.Printf("\n이진탐색(25): 인덱스 %d\n", binarySearch(sorted, 25))
	fmt.Printf("이진탐색(99): 인덱스 %d\n", binarySearch(sorted, 99))

	fmt.Println("\n=== 연결 리스트 ===")
	list := newList(1, 2, 3, 4, 5)
	fmt.Print("원본: ")
	printList(list)
	fmt.Print("역순: ")
	printList(reverseList(list))

	fmt.Println("\n=== 스택 ===")
	s := &Stack{}
	for _, v := range []int{1, 2, 3, 4, 5} {
		s.Push(v)
	}
	for len(s.items) > 0 {
		if v, ok := s.Pop(); ok {
			fmt.Printf("%d ", v)
		}
	}
	fmt.Println()

	fmt.Println("\n=== 큐 ===")
	q := &Queue{}
	for _, v := range []int{1, 2, 3, 4, 5} {
		q.Enqueue(v)
	}
	for len(q.items) > 0 {
		if v, ok := q.Dequeue(); ok {
			fmt.Printf("%d ", v)
		}
	}
	fmt.Println()
}
