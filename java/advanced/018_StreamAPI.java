// [18] Stream API - Stream API
// 레벨: 5 | Stream API로 컬렉션을 효율적으로 처리합니다

import java.util.*;
import java.util.stream.*;

public class StreamDemo {

    public static void main(String[] args) {

        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);

        List<Integer> evens = nums.stream()
            .filter(n -> n % 2 == 0)
            .collect(Collectors.toList());
        System.out.println(evens);

        List<Integer> doubled = nums.stream()
            .map(n -> n * 2)
            .collect(Collectors.toList());
        System.out.println(doubled);

        int sum = nums.stream()
            .reduce(0, Integer::sum);
        System.out.println(sum);

        long count = nums.stream()
            .filter(n -> n > 2)
            .count();
        System.out.println(count);
    }
}
