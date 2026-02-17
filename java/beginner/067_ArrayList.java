// [67] ArrayList - Dynamic List
// 레벨: 2 | Java 컬렉션 프레임워크의 ArrayList를 학습합니다

import java.util.ArrayList;
import java.util.Collections;

public class 067_ArrayList {

    public static void main(String[] args) {
        // ArrayList 생성 - 제네릭 타입 <T>
        ArrayList<String> fruits = new ArrayList<>();

        // add() - 요소 추가
        fruits.add("사과");
        fruits.add("바나나");
        fruits.add("딸기");
        fruits.add("포도");
        System.out.println("과일: " + fruits);

        // get() - 인덱스로 접근
        System.out.println("첫 번째: " + fruits.get(0));

        // size() - 크기
        System.out.println("개수: " + fruits.size());

        // contains() - 포함 여부
        System.out.println("바나나 있음: " + fruits.contains("바나나"));
        System.out.println("망고 있음: " + fruits.contains("망고"));

        // remove() - 삭제
        fruits.remove("딸기");
        System.out.println("딸기 삭제 후: " + fruits);

        // set() - 수정
        fruits.set(0, "청사과");
        System.out.println("수정 후: " + fruits);

        // 순회
        System.out.println("\n=== 과일 목록 ===");
        for (int i = 0; i < fruits.size(); i++) {
            System.out.println((i + 1) + ". " + fruits.get(i));
        }

        // 숫자 ArrayList
        ArrayList<Integer> scores = new ArrayList<>();
        scores.add(85);
        scores.add(92);
        scores.add(78);
        scores.add(95);

        // 정렬
        Collections.sort(scores);
        System.out.println("\n정렬: " + scores);

        // 합계, 평균
        int sum = 0;
        for (int s : scores) {
            sum += s;
        }
        System.out.println("합계: " + sum);
        System.out.println("평균: " + (sum / (double) scores.size()));
    }
}
