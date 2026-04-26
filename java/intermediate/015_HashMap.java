// [15] HashMap과 컬렉션 - HashMap & Collections
// 레벨: 3 | Java 컬렉션 프레임워크의 HashMap을 활용합니다

import java.util.*;

public class HashMapDemo {

    public static void main(String[] args) {

        HashMap<String, Integer> map = new HashMap<>();
        map.put("A", 80);
        map.put("B", 90);

        System.out.println(map.get("A"));
        System.out.println(map.containsKey("B"));

        for (String k : map.keySet()) {
            System.out.println(k + " " + map.get(k));
        }

        map.remove("A");
        System.out.println(map.size());

        HashSet<String> set = new HashSet<>();
        set.add("X");
        set.add("X");
        set.add("Y");
        System.out.println(set.size());

        LinkedList<Integer> list = new LinkedList<>();
        list.add(1);
        list.add(2);
        System.out.println(list.getFirst());
    }
}
