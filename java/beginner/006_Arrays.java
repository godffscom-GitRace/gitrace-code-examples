// [6] 배열 기초 - Arrays
// 레벨: 2 | Java의 배열을 다루는 방법을 배웁니다

import java.util.Arrays;

public class ArraysDemo {

    public static void main(String[] args) {

        int[] scores = {85, 92, 78};
        System.out.println(scores[0]);
        System.out.println(scores.length);

        for (int s : scores) {
            System.out.println(s);
        }

        Arrays.sort(scores);
        System.out.println(Arrays.toString(scores));

        int idx = Arrays.binarySearch(scores, 92);
        System.out.println(idx);

        int[] copy = Arrays.copyOf(scores, scores.length);
        System.out.println(Arrays.toString(copy));
    }
}
