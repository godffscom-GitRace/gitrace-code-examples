// [7] ArrayList - Dynamic List
// 레벨: 2 | Java 컬렉션 프레임워크의 ArrayList를 학습합니다

import java.util.ArrayList;
import java.util.Collections;

public class ArrayListDemo {

    public static void main(String[] args) {

        ArrayList<String> list = new ArrayList<>();
        list.add("A");
        list.add("B");
        list.add("C");

        System.out.println(list);
        System.out.println(list.get(0));
        System.out.println(list.size());

        list.remove("B");
        list.set(0, "X");
        System.out.println(list);

        ArrayList<Integer> nums = new ArrayList<>();
        nums.add(3);
        nums.add(1);
        nums.add(2);

        Collections.sort(nums);
        System.out.println(nums);

        int sum = 0;
        for (int n : nums) sum += n;
        System.out.println(sum);
    }
}
