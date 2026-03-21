// [613] 동시성 - Concurrency (async/await)
// 레벨: 2 | Swift의 async/await으로 비동기 코드를 작성합니다

import Foundation

// async 함수 정의
func fetchUser(id: Int) async throws -> String {
    try await Task.sleep(nanoseconds: 100_000_000)  // 0.1초 대기
    guard id > 0 else { throw URLError(.badURL) }
    return "User#\(id)"
}

func fetchScore(for userId: String) async -> Int {
    try? await Task.sleep(nanoseconds: 50_000_000)
    return abs(userId.hashCode()) % 50 + 50
}

// 순차 실행
func sequentialFetch() async throws {
    print("=== 순차 실행 ===")
    let start = Date()
    let user1 = try await fetchUser(id: 1)
    let user2 = try await fetchUser(id: 2)
    print("결과: \(user1), \(user2)")
    print("소요: \(String(format: "%.2f", Date().timeIntervalSince(start)))초")
}

// 병렬 실행 (async let)
func parallelFetch() async throws {
    print("\n=== 병렬 실행 (async let) ===")
    let start = Date()
    async let user1 = fetchUser(id: 1)
    async let user2 = fetchUser(id: 2)
    async let user3 = fetchUser(id: 3)
    let results = try await [user1, user2, user3]
    print("결과: \(results)")
    print("소요: \(String(format: "%.2f", Date().timeIntervalSince(start)))초")
}

// TaskGroup으로 동적 병렬 처리
func groupFetch(ids: [Int]) async throws -> [String] {
    try await withThrowingTaskGroup(of: String.self) { group in
        for id in ids {
            group.addTask { try await fetchUser(id: id) }
        }
        var results: [String] = []
        for try await result in group {
            results.append(result)
        }
        return results.sorted()
    }
}

// Actor: 데이터 경쟁 방지
actor Counter {
    private var count = 0
    func increment() { count += 1 }
    func getValue() -> Int { count }
}

// MainActor: UI 업데이트
@MainActor
func updateUI(message: String) {
    print("[UI] \(message)")
}

extension String {
    func hashCode() -> Int {
        var hash = 0
        for char in unicodeScalars { hash = 31 &* hash &+ Int(char.value) }
        return hash
    }
}

// 진입점
Task {
    do {
        try await sequentialFetch()
        try await parallelFetch()

        let users = try await groupFetch(ids: [1, 2, 3, 4, 5])
        print("\n그룹 결과: \(users)")

        let counter = Counter()
        await withTaskGroup(of: Void.self) { group in
            for _ in 0..<10 {
                group.addTask { await counter.increment() }
            }
        }
        print("카운터: \(await counter.getValue())")

        await updateUI(message: "완료!")
    } catch {
        print("오류: \(error)")
    }
}
