// [77] 람다 표현식 - Lambda Expression
// 레벨: 4 | Java 8의 람다 표현식으로 함수형 프로그래밍을 합니다

import java.util.*;
import java.util.function.*;

public class 077_Lambda {

    public static void main(String[] args) {
        // 람다 표현식 기본 문법: (매개변수) -> { 본문 }
        // 함수형 인터페이스 (추상 메서드가 하나인 인터페이스)

        // Comparator - 정렬 기준
        List<String> names = new ArrayList<>(Arrays.asList("김철수", "이영희", "박민수", "최지은"));

        // 기존 방식 (익명 클래스)
        // names.sort(new Comparator<String>() {
        //     public int compare(String a, String b) { return a.compareTo(b); }
        // });

        // 람다 방식
        names.sort((a, b) -> a.compareTo(b));
        System.out.println("정렬: " + names);

        // 메서드 참조
        names.sort(String::compareTo);
        System.out.println("메서드 참조: " + names);

        // === 함수형 인터페이스들 ===

        // Predicate<T> - 조건 판별 (T → boolean)
        System.out.println("\n=== Predicate ===");
        Predicate<Integer> isEven = n -> n % 2 == 0;
        Predicate<Integer> isPositive = n -> n > 0;

        System.out.println("4는 짝수? " + isEven.test(4));       // true
        System.out.println("4는 양수? " + isPositive.test(4));   // true
        // and, or, negate 조합
        System.out.println("4는 짝수이고 양수? " + isEven.and(isPositive).test(4));

        // Function<T, R> - 변환 (T → R)
        System.out.println("\n=== Function ===");
        Function<String, Integer> strLen = s -> s.length();
        Function<Integer, String> intToStr = n -> "숫자: " + n;

        System.out.println("길이: " + strLen.apply("Hello"));
        System.out.println(intToStr.apply(42));
        // andThen - 체이닝
        System.out.println(strLen.andThen(intToStr).apply("Hello"));

        // Consumer<T> - 소비 (T → void)
        System.out.println("\n=== Consumer ===");
        Consumer<String> printer = s -> System.out.println("출력: " + s);
        printer.accept("안녕하세요!");

        names.forEach(name -> System.out.println("  - " + name));

        // Supplier<T> - 공급 (() → T)
        System.out.println("\n=== Supplier ===");
        Supplier<Double> randomNum = () -> Math.random() * 100;
        System.out.printf("랜덤: %.2f%n", randomNum.get());
        System.out.printf("랜덤: %.2f%n", randomNum.get());

        // 커스텀 함수형 인터페이스
        System.out.println("\n=== 커스텀 ===");
        Calculator add = (a, b) -> a + b;
        Calculator multiply = (a, b) -> a * b;
        System.out.println("더하기: " + add.calculate(10, 3));
        System.out.println("곱하기: " + multiply.calculate(10, 3));
    }
}

// 커스텀 함수형 인터페이스
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}
