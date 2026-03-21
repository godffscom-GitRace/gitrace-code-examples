// [315] PDO 데이터베이스 - PDO Database
// 레벨: 3 | PDO로 MySQL에 안전하게 연결하고 CRUD를 수행합니다

<?php
// PDO 연결 설정
$dsn     = 'mysql:host=localhost;dbname=gitrace_db;charset=utf8mb4';
$user    = 'root';
$pass    = 'password';
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    echo "DB 연결 성공!\n";

    // ===== 테이블 생성 =====
    $pdo->exec("
        CREATE TEMPORARY TABLE IF NOT EXISTS members (
            id      INT AUTO_INCREMENT PRIMARY KEY,
            name    VARCHAR(50) NOT NULL,
            email   VARCHAR(100) UNIQUE,
            score   INT DEFAULT 0,
            created DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");

    // ===== INSERT (prepared statement) =====
    echo "\n=== INSERT ===\n";
    $insert = $pdo->prepare(
        "INSERT INTO members (name, email, score) VALUES (:name, :email, :score)"
    );

    $members = [
        ['name' => '김철수', 'email' => 'kim@example.com',  'score' => 88],
        ['name' => '이영희', 'email' => 'lee@example.com',  'score' => 95],
        ['name' => '박민수', 'email' => 'park@example.com', 'score' => 72],
    ];

    foreach ($members as $m) {
        $insert->execute($m);
        echo "추가: {$m['name']} (ID: " . $pdo->lastInsertId() . ")\n";
    }

    // ===== SELECT =====
    echo "\n=== SELECT ===\n";
    $stmt = $pdo->query("SELECT * FROM members ORDER BY score DESC");
    while ($row = $stmt->fetch()) {
        echo "{$row['id']}. {$row['name']}: {$row['score']}점\n";
    }

    // 조건 검색
    $search = $pdo->prepare("SELECT * FROM members WHERE score >= :min");
    $search->execute([':min' => 80]);
    $results = $search->fetchAll();
    echo "\n80점 이상 (" . count($results) . "명):\n";
    foreach ($results as $r) echo "  {$r['name']}\n";

    // ===== UPDATE =====
    echo "\n=== UPDATE ===\n";
    $update = $pdo->prepare("UPDATE members SET score = :score WHERE email = :email");
    $update->execute([':score' => 100, ':email' => 'park@example.com']);
    echo "수정된 행: " . $update->rowCount() . "\n";

    // ===== DELETE =====
    echo "\n=== DELETE ===\n";
    $delete = $pdo->prepare("DELETE FROM members WHERE score < :min");
    $delete->execute([':min' => 80]);
    echo "삭제된 행: " . $delete->rowCount() . "\n";

    // ===== 트랜잭션 =====
    echo "\n=== 트랜잭션 ===\n";
    $pdo->beginTransaction();
    try {
        $pdo->prepare("UPDATE members SET score = score + 5 WHERE id = 1")->execute();
        $pdo->prepare("UPDATE members SET score = score + 5 WHERE id = 2")->execute();
        $pdo->commit();
        echo "트랜잭션 커밋 성공\n";
    } catch (Exception $e) {
        $pdo->rollBack();
        echo "롤백: " . $e->getMessage() . "\n";
    }

} catch (PDOException $e) {
    echo "DB 오류: " . $e->getMessage() . "\n";
}
