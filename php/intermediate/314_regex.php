// [314] 정규표현식 - Regular Expressions
// 레벨: 3 | preg_match, preg_replace, preg_split로 패턴 처리를 배웁니다

<?php
// preg_match: 패턴 일치 여부 확인
echo "=== preg_match ===\n";

$tests = [
    'kim@example.com',
    'invalid-email',
    'user.name+tag@domain.co.kr',
];
$emailPattern = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';
foreach ($tests as $email) {
    $valid = preg_match($emailPattern, $email) ? "유효" : "무효";
    echo "  $email: $valid\n";
}

// 캡처 그룹
echo "\n=== 캡처 그룹 ===\n";
$phone = '010-1234-5678';
if (preg_match('/^(\d{3})-(\d{4})-(\d{4})$/', $phone, $matches)) {
    echo "전화번호: " . $matches[0] . "\n";
    echo "국번: "    . $matches[1] . "\n";
    echo "중간: "    . $matches[2] . "\n";
    echo "끝: "      . $matches[3] . "\n";
}

// 날짜 형식 검증
$dates = ['2025-03-15', '2025/03/15', '15-03-2025', '2025-13-01'];
$datePattern = '/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/';
echo "\n=== 날짜 검증 ===\n";
foreach ($dates as $d) {
    echo "  $d: " . (preg_match($datePattern, $d) ? "유효" : "무효") . "\n";
}

// preg_replace: 패턴 치환
echo "\n=== preg_replace ===\n";
$text = "  안녕하세요   반갑습니다   PHP   ";
$clean = preg_replace('/\s+/', ' ', trim($text));
echo "공백 정리: '$clean'\n";

// HTML 태그 제거
$html = '<p>안녕하세요 <b>김철수</b>님, <a href="#">클릭</a></p>';
$plain = preg_replace('/<[^>]+>/', '', $html);
echo "태그 제거: $plain\n";

// 전화번호 마스킹
$phones = ['010-1234-5678', '010-9876-5432'];
foreach ($phones as $p) {
    $masked = preg_replace('/(\d{3})-(\d{4})-(\d{4})/', '$1-****-$3', $p);
    echo "마스킹: $masked\n";
}

// preg_match_all: 모든 일치 찾기
echo "\n=== preg_match_all ===\n";
$content = "가격: 1,200원, 배송비: 3,000원, 할인: 500원";
preg_match_all('/[\d,]+원/', $content, $prices);
echo "가격 목록: " . implode(", ", $prices[0]) . "\n";

// preg_split: 패턴으로 분리
$data = "김철수  88   B학점  서울";
$parts = preg_split('/\s+/', trim($data));
echo "분리 결과: " . implode(" | ", $parts) . "\n";
