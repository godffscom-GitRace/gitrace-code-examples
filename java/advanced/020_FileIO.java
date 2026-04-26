// [20] 파일 입출력 - File I/O
// 레벨: 4 | Java로 파일을 읽고 쓰는 방법을 학습합니다

import java.io.*;
import java.nio.file.*;
import java.util.*;

public class FileDemo {

    public static void main(String[] args) {

        String name = "a.txt";

        try (FileWriter w = new FileWriter(name)) {
            w.write("one\n");
            w.write("two\n");
        } catch (Exception e) {
            System.out.println("err");
        }

        try (BufferedReader r = new BufferedReader(new FileReader(name))) {
            String line;
            while ((line = r.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception e) {
            System.out.println("err");
        }

        try {
            List<String> list = Files.readAllLines(Paths.get(name));
            System.out.println(list.size());
        } catch (Exception e) {
            System.out.println("err");
        }
    }
}
