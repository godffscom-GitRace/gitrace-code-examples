// [302] 변수와 자료형 - Variables & Data Types
// 레벨: 1 | PHP 변수 선언($)과 기본 자료형을 배웁니다

<?php
// PHP 변수: 항상 $ 로 시작, 자료형 자동 결정
$age = 25;           // 정수 (integer)
$height = 175.5;     // 실수 (float)
$name = "김철수";    // 문자열 (string)
$isStudent = true;   // 불리언 (boolean)
$nothing = null;     // null

// 자료형 확인
echo "=== 자료형 확인 ===\n";
echo gettype($age) . "\n";       // integer
echo gettype($height) . "\n";    // double
echo gettype($name) . "\n";      // string
echo gettype($isStudent) . "\n"; // boolean
echo gettype($nothing) . "\n";   // NULL

// var_dump: 자료형 + 값 상세 출력
echo "\n=== var_dump ===\n";
var_dump($age);
var_dump($isStudent);
var_dump($nothing);

// 자료형 변환 (캐스팅)
echo "\n=== 자료형 변환 ===\n";
$strNum = "42";
echo gettype($strNum) . "\n";          // string

$intNum = (int)$strNum;
echo gettype($intNum) . ": $intNum\n"; // integer: 42

$floatNum = (float)"3.14abc";
echo $floatNum . "\n";  // 3.14 (숫자 부분만)

// 상수 (const / define)
define('MAX_SCORE', 100);
const APP_NAME = 'GitRace';
echo "\n앱: " . APP_NAME . ", 최고점수: " . MAX_SCORE . "\n";

// 변수 존재 확인
echo "\n=== 변수 체크 ===\n";
echo isset($name) ? "name 존재\n" : "name 없음\n";
echo isset($undefined) ? "존재\n" : "undefined 없음\n";
echo empty($nothing) ? "nothing은 비어있음\n" : "값 있음\n";
