# [116] 트라이 (Trie) 구조
# 레벨: 5 | 효율적인 문자열 검색을 위한 트라이 자료구조를 구현합니다

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word):
        node = self._find_node(word)
        return node is not None and node.is_end

    def starts_with(self, prefix):
        return self._find_node(prefix) is not None

    def _find_node(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node

    # 자동완성 - 접두사로 시작하는 모든 단어 반환
    def autocomplete(self, prefix):
        node = self._find_node(prefix)
        if node is None:
            return []
        results = []
        self._collect_words(node, prefix, results)
        return results

    def _collect_words(self, node, prefix, results):
        if node.is_end:
            results.append(prefix)
        for char, child in sorted(node.children.items()):
            self._collect_words(child, prefix + char, results)

# 사용
trie = Trie()
words = ["apple", "app", "application", "apply", "banana", "band", "ban"]
for word in words:
    trie.insert(word)

print("=== 트라이 검색 ===")
print(f"'apple' 검색: {trie.search('apple')}")    # True
print(f"'app' 검색: {trie.search('app')}")         # True
print(f"'ap' 검색: {trie.search('ap')}")           # False
print(f"'ap' 접두사: {trie.starts_with('ap')}")    # True

print("\n=== 자동완성 ===")
print(f"'app' → {trie.autocomplete('app')}")
print(f"'ban' → {trie.autocomplete('ban')}")
print(f"'c' → {trie.autocomplete('c')}")

# 한글 트라이
print("\n=== 한글 트라이 ===")
kr_trie = Trie()
kr_words = ["파이썬", "파이썬3", "파이프", "파일", "자바", "자바스크립트"]
for w in kr_words:
    kr_trie.insert(w)

print(f"'파이' → {kr_trie.autocomplete('파이')}")
print(f"'자바' → {kr_trie.autocomplete('자바')}")
