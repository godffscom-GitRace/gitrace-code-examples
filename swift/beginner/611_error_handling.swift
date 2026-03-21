// [611] 에러 처리 - Error Handling
// 레벨: 1 | throw/try/catch로 에러를 안전하게 처리합니다

import Foundation

// 에러 타입 정의
enum ValidationError: Error {
    case tooShort(min: Int)
    case tooLong(max: Int)
    case invalidCharacter(Character)
    case empty
}

enum NetworkError: Error, LocalizedError {
    case notFound
    case unauthorized
    case serverError(code: Int)

    var errorDescription: String? {
        switch self {
        case .notFound:           return "리소스를 찾을 수 없습니다"
        case .unauthorized:       return "인증이 필요합니다"
        case .serverError(let c): return "서버 오류: \(c)"
        }
    }
}

// throwing 함수
func validateUsername(_ username: String) throws -> String {
    guard !username.isEmpty else { throw ValidationError.empty }
    guard username.count >= 3 else { throw ValidationError.tooShort(min: 3) }
    guard username.count <= 20 else { throw ValidationError.tooLong(max: 20) }

    for char in username {
        guard char.isLetter || char.isNumber || char == "_" else {
            throw ValidationError.invalidCharacter(char)
        }
    }
    return username.lowercased()
}

func fetchUser(id: Int) throws -> String {
    guard id > 0 else { throw NetworkError.notFound }
    guard id != 403 else { throw NetworkError.unauthorized }
    guard id < 1000 else { throw NetworkError.serverError(code: 500) }
    return "User#\(id)"
}

// do-catch
do {
    let name = try validateUsername("Swift_Dev")
    print("유효한 이름: \(name)")
} catch ValidationError.empty {
    print("이름이 비어있습니다")
} catch ValidationError.tooShort(let min) {
    print("최소 \(min)자 이상이어야 합니다")
} catch {
    print("오류: \(error)")
}

// try? (실패 시 nil)
let result = try? validateUsername("ab")
print("try?: \(result as Any)")

// try! (실패 시 크래시 - 확실할 때만)
let valid = try! validateUsername("valid_user")
print("try!: \(valid)")

// 에러 전파
func processUser(id: Int) throws -> String {
    let user = try fetchUser(id: id)
    return "처리됨: \(user)"
}

for id in [1, 403, 1001] {
    do {
        print(try processUser(id: id))
    } catch let error as NetworkError {
        print("네트워크 오류: \(error.errorDescription ?? "")")
    }
}
