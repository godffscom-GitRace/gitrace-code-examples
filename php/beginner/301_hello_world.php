// [301] Hello World - 첫 번째 PHP 프로그램
// 레벨: 1 | PHP 기본 구조와 echo 출력을 배웁니다

<?php
// echo: 화면에 출력하는 가장 기본적인 방법
echo "Hello, World!\n";
echo "안녕하세요, PHP!\n";

// print: echo와 유사하지만 반환값(1)이 있음
print "PHP는 웹 개발의 강자!\n";

// 여러 값 출력
echo "첫 번째 줄", " 두 번째 줄", "\n";

// 큰따옴표: 변수와 이스케이프 시퀀스 처리
$name = "김철수";
echo "안녕하세요, $name 님!\n";

// 작은따옴표: 문자 그대로 출력 (빠름)
echo '작은따옴표 안의 $name\n';
echo "\n";

// PHP 버전 확인
echo "PHP 버전: " . PHP_VERSION . "\n";
echo "운영체제: " . PHP_OS . "\n";
