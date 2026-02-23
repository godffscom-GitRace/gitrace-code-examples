// [18] Stream API - Stream API
// 레벨: 5 | Stream API로 컬렉션을 효율적으로 처리합니다

import java.util.*;
import java.util.stream.*;

public class 018_StreamAPI {

    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // filter() - 조건에 맞는 요소만 선택
        List<Integer> evens = numbers.stream()
            .filter(n -> n % 2 == 0)
            .collect(Collectors.toList());
        System.out.println("짝수: " + evens);

        // map() - 요소 변환
        List<Integer> doubled = numbers.stream()
            .map(n -> n * 2)
            .collect(Collectors.toList());
        System.out.println("2배: " + doubled);

        // reduce() - 값 축약
        int sum = numbers.stream()
            .reduce(0, Integer::sum);
        System.out.println("합계: " + sum);

        // filter + map + collect 체이닝
        System.out.println("\n=== 체이닝 ===");
        List<String> students = Arrays.asList("김철수", "이영희", "박민수", "최지은", "김영수");

        List<String> kimStudents = students.stream()
            .filter(name -> name.startsWith("김"))
            .map(name -> name + " 학생")
            .collect(Collectors.toList());
        System.out.println("김씨: " + kimStudents);

        // 중간 연산 vs 최종 연산
        System.out.println("\n=== 다양한 최종 연산 ===");

        // count - 개수
        long count = numbers.stream().filter(n -> n > 5).count();
        System.out.println("5보다 큰 수: " + count + "개");

        // min, max
        Optional<Integer> max = numbers.stream().max(Integer::compareTo);
        System.out.println("최댓값: " + max.orElse(0));

        // anyMatch, allMatch
        boolean hasEven = numbers.stream().anyMatch(n -> n % 2 == 0);
        System.out.println("짝수 있음? " + hasEven);

        // forEach
        System.out.print("출력: ");
        numbers.stream().filter(n -> n <= 5).forEach(n -> System.out.print(n + " "));
        System.out.println();

        // 객체 스트림 활용
        System.out.println("\n=== 학생 성적 처리 ===");
        List<StudentRecord> records = Arrays.asList(
            new StudentRecord("김철수", 85),
            new StudentRecord("이영희", 92),
            new StudentRecord("박민수", 78),
            new StudentRecord("최지은", 95),
            new StudentRecord("정하늘", 62)
        );

        // 80점 이상 학생 이름 추출
        List<String> passed = records.stream()
            .filter(s -> s.score >= 80)
            .sorted((a, b) -> b.score - a.score)  // 내림차순
            .map(s -> s.name + "(" + s.score + ")")
            .collect(Collectors.toList());
        System.out.println("합격자: " + passed);

        // 평균 점수
        double avg = records.stream()
            .mapToInt(s -> s.score)
            .average()
            .orElse(0);
        System.out.printf("평균: %.1f점%n", avg);

        // 그룹핑
        Map<String, List<StudentRecord>> groups = records.stream()
            .collect(Collectors.groupingBy(s -> s.score >= 80 ? "합격" : "불합격"));
        groups.forEach((key, list) ->
            System.out.println(key + ": " + list.stream().map(s -> s.name).collect(Collectors.joining(", ")))
        );
    }
}

class StudentRecord {
    String name;
    int score;

    StudentRecord(String name, int score) {
        this.name = name;
        this.score = score;
    }
}
