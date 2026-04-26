// [17] 람다 표현식 - Lambda Expression
// 레벨: 4 | Java 8의 람다 표현식으로 함수형 프로그래밍을 합니다

import java.util.*;
import java.util.function.*;

public class LambdaDemo {

    public static void main(String[] args) {

        List<String> list = new ArrayList<>(Arrays.asList("b", "a", "c"));
        list.sort((x, y) -> x.compareTo(y));
        System.out.println(list);

        Predicate<Integer> even = n -> n % 2 == 0;
        System.out.println(even.test(4));

        Function<String, Integer> len = s -> s.length();
        System.out.println(len.apply("hi"));

        Consumer<String> print = s -> System.out.println(s);
        print.accept("ok");

        Supplier<Integer> rand = () -> (int)(Math.random() * 10);
        System.out.println(rand.get());

        Calc add = (a, b) -> a + b;
        System.out.println(add.calc(2, 3));
    }
}

interface Calc {
    int calc(int a, int b);
}
