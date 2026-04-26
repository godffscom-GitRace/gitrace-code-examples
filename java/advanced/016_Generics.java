// [16] 제네릭 (Generics) - Generics
// 레벨: 4 | Java 제네릭을 사용해 타입 안전성을 확보합니다

public class GenericsDemo {

    public static void main(String[] args) {

        Box<String> a = new Box<>("A");
        Box<Integer> b = new Box<>(10);

        System.out.println(a.get());
        System.out.println(b.get());

        Integer[] nums = {1, 2, 3};
        System.out.println(first(nums));

        System.out.println(sum(nums));

        Pair<String, Integer> p = new Pair<>("age", 20);
        System.out.println(p.key + " " + p.value);
    }

    static <T> T first(T[] arr) {
        return arr[0];
    }

    static <T extends Number> double sum(T[] arr) {
        double s = 0;
        for (T n : arr) s += n.doubleValue();
        return s;
    }
}

class Box<T> {

    T v;

    Box(T v) {
        this.v = v;
    }

    T get() {
        return v;
    }
}

class Pair<K, V> {

    K key;
    V value;

    Pair(K k, V v) {
        key = k;
        value = v;
    }
}
