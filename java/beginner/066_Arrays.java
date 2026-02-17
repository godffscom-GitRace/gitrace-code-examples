// [66] 배열 기초 - Arrays
// 레벨: 2 | Java의 배열을 다루는 방법을 배웁니다

import java.util.Arrays;

public class 066_Arrays {

    public static void main(String[] args) {
        // 배열 선언과 초기화
        int[] scores = {85, 92, 78, 95, 88};
        String[] names = {"김철수", "이영희", "박민수"};

        // 크기만 지정하여 생성
        int[] numbers = new int[5]; // [0, 0, 0, 0, 0]
        numbers[0] = 10;
        numbers[1] = 20;

        // 배열 접근
        System.out.println("첫 번째 점수: " + scores[0]);      // 85
        System.out.println("마지막 점수: " + scores[scores.length - 1]); // 88
        System.out.println("배열 길이: " + scores.length);

        // 배열 순회
        System.out.println("\n=== 성적표 ===");
        for (int i = 0; i < names.length; i++) {
            System.out.println(names[i] + ": " + scores[i] + "점");
        }

        // Arrays 클래스 활용
        System.out.println("\n정렬 전: " + Arrays.toString(scores));
        Arrays.sort(scores);
        System.out.println("정렬 후: " + Arrays.toString(scores));

        // 배열 검색 (정렬된 배열에서)
        int idx = Arrays.binarySearch(scores, 92);
        System.out.println("92의 위치: " + idx);

        // 배열 복사
        int[] copy = Arrays.copyOf(scores, scores.length);
        System.out.println("복사: " + Arrays.toString(copy));

        // 다차원 배열
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        System.out.println("\n=== 행렬 ===");
        for (int[] row : matrix) {
            System.out.println(Arrays.toString(row));
        }
    }
}
