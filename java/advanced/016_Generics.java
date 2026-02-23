// [16] 제네릭 (Generics) - Generics
// 레벨: 4 | Java 제네릭을 사용해 타입 안전성을 확보합니다

public class 016_Generics {

    public static void main(String[] args) {
        // 제네릭 클래스 사용
        Box<String> strBox = new Box<>("안녕하세요");
        Box<Integer> intBox = new Box<>(42);

        System.out.println("문자열 박스: " + strBox.getValue());
        System.out.println("정수 박스: " + intBox.getValue());

        // 제네릭 메서드
        String[] names = {"김철수", "이영희", "박민수"};
        Integer[] numbers = {10, 20, 30};

        System.out.println("\n첫 번째: " + getFirst(names));
        System.out.println("첫 번째: " + getFirst(numbers));

        printArray(names);
        printArray(numbers);

        // 타입 바운드 (extends)
        System.out.println("\n=== 타입 바운드 ===");
        System.out.println("합계: " + sum(new Integer[]{1, 2, 3, 4, 5}));
        System.out.println("합계: " + sum(new Double[]{1.5, 2.5, 3.0}));

        // 와일드카드 (?)
        System.out.println("\n=== 와일드카드 ===");
        Box<Integer> numBox = new Box<>(100);
        Box<String> txtBox = new Box<>("텍스트");
        printBox(numBox);  // ? - 어떤 타입이든
        printBox(txtBox);

        // Pair 제네릭
        Pair<String, Integer> pair = new Pair<>("나이", 25);
        System.out.println("\n" + pair.getKey() + ": " + pair.getValue());
    }

    // 제네릭 메서드 - <T>를 반환타입 앞에 선언
    static <T> T getFirst(T[] array) {
        return array[0];
    }

    static <T> void printArray(T[] array) {
        System.out.print("[");
        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i]);
            if (i < array.length - 1) System.out.print(", ");
        }
        System.out.println("]");
    }

    // 타입 바운드 - T extends Number (Number의 하위 타입만)
    static <T extends Number> double sum(T[] numbers) {
        double total = 0;
        for (T num : numbers) {
            total += num.doubleValue();
        }
        return total;
    }

    // 와일드카드 (?) - 모든 타입의 Box 허용
    static void printBox(Box<?> box) {
        System.out.println("박스 내용: " + box.getValue());
    }
}

// 제네릭 클래스 <T>
class Box<T> {
    private T value;

    Box(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }
}

// 제네릭 - 타입 매개변수 여러 개
class Pair<K, V> {
    private K key;
    private V value;

    Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() { return key; }
    public V getValue() { return value; }
}
