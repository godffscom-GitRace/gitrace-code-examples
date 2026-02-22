// [80] 파일 입출력 - File I/O
// 레벨: 4 | Java로 파일을 읽고 쓰는 방법을 학습합니다

import java.io.*;
import java.nio.file.*;
import java.util.List;

public class 080_FileIO {

    public static void main(String[] args) {
        String fileName = "memo.txt";

        // === FileWriter - 파일 쓰기 ===
        System.out.println("=== 파일 쓰기 ===");
        try (FileWriter fw = new FileWriter(fileName)) {
            fw.write("첫 번째 메모입니다.\n");
            fw.write("두 번째 메모입니다.\n");
            fw.write("세 번째 메모입니다.\n");
            System.out.println("파일 저장 완료!");
        } catch (IOException e) {
            System.out.println("쓰기 오류: " + e.getMessage());
        }

        // === BufferedReader - 한 줄씩 읽기 ===
        System.out.println("\n=== 한 줄씩 읽기 ===");
        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
            String line;
            int lineNum = 1;
            while ((line = br.readLine()) != null) {
                System.out.println(lineNum + ": " + line);
                lineNum++;
            }
        } catch (IOException e) {
            System.out.println("읽기 오류: " + e.getMessage());
        }

        // === BufferedWriter - 효율적인 쓰기 ===
        System.out.println("\n=== BufferedWriter (추가 모드) ===");
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(fileName, true))) {
            bw.write("네 번째 메모 (추가)\n");
            bw.write("다섯 번째 메모 (추가)\n");
            System.out.println("추가 완료!");
        } catch (IOException e) {
            System.out.println("쓰기 오류: " + e.getMessage());
        }

        // === try-with-resources ===
        // try (리소스 선언) { } → 자동으로 close() 호출
        // AutoCloseable 인터페이스 구현 객체 사용 가능

        // === Files 클래스 (NIO) - 더 간편한 방법 ===
        System.out.println("\n=== Files (NIO) ===");
        Path path = Paths.get(fileName);

        try {
            // 전체 읽기
            List<String> allLines = Files.readAllLines(path);
            System.out.println("총 " + allLines.size() + "줄");
            for (String line : allLines) {
                System.out.println("  " + line);
            }

            // 파일 정보
            System.out.println("\n파일 크기: " + Files.size(path) + " bytes");
            System.out.println("파일 존재: " + Files.exists(path));

            // 한 번에 쓰기
            String content = "NIO로 작성한 내용입니다.\n간편합니다!";
            Files.writeString(Paths.get("nio_memo.txt"), content);
            System.out.println("NIO 쓰기 완료!");

            // 정리
            Files.deleteIfExists(Paths.get("nio_memo.txt"));
        } catch (IOException e) {
            System.out.println("NIO 오류: " + e.getMessage());
        }

        // 정리
        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            // 무시
        }
    }
}
