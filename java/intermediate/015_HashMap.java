// [75] HashMap과 컬렉션 - HashMap & Collections
// 레벨: 3 | Java 컬렉션 프레임워크의 HashMap을 활용합니다

import java.util.*;

public class 075_HashMap {

    public static void main(String[] args) {
        // HashMap<K, V> 생성
        HashMap<String, Integer> scores = new HashMap<>();

        // put() - 값 추가
        scores.put("김철수", 85);
        scores.put("이영희", 92);
        scores.put("박민수", 78);
        scores.put("최지은", 95);
        System.out.println("성적표: " + scores);

        // get() - 값 조회
        System.out.println("김철수: " + scores.get("김철수") + "점");

        // containsKey() - 키 존재 여부
        System.out.println("이영희 존재? " + scores.containsKey("이영희"));
        System.out.println("홍길동 존재? " + scores.containsKey("홍길동"));

        // getOrDefault() - 없으면 기본값
        int score = scores.getOrDefault("홍길동", 0);
        System.out.println("홍길동 점수: " + score);

        // 순회 - keySet(), values(), entrySet()
        System.out.println("\n=== 전체 조회 ===");
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue() + "점");
        }

        // remove() - 삭제
        scores.remove("박민수");
        System.out.println("\n삭제 후: " + scores);
        System.out.println("크기: " + scores.size());

        // === HashSet - 중복 없는 집합 ===
        System.out.println("\n=== HashSet ===");
        HashSet<String> fruits = new HashSet<>();
        fruits.add("사과");
        fruits.add("바나나");
        fruits.add("사과");  // 중복 무시!
        fruits.add("딸기");
        System.out.println("과일: " + fruits);
        System.out.println("크기: " + fruits.size()); // 3

        // === LinkedList - 연결 리스트 ===
        System.out.println("\n=== LinkedList ===");
        LinkedList<String> queue = new LinkedList<>();
        queue.add("첫 번째");
        queue.add("두 번째");
        queue.add("세 번째");
        System.out.println("맨 앞: " + queue.getFirst());
        System.out.println("맨 뒤: " + queue.getLast());
        queue.removeFirst();
        System.out.println("제거 후: " + queue);

        // === 컬렉션 정렬 ===
        System.out.println("\n=== 정렬 ===");
        ArrayList<Integer> nums = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));
        Collections.sort(nums);
        System.out.println("오름차순: " + nums);
        Collections.sort(nums, Collections.reverseOrder());
        System.out.println("내림차순: " + nums);
    }
}
