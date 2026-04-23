# [116] 트라이 (Trie) 구조
# 레벨: 5 | 효율적인 문자열 검색을 위한 트라이 자료구조를 구현합니다

class Node:
    def __init__(self):
        self.children = {}
        self.end = False


class Trie:
    def __init__(self):
        self.root = Node()

    def insert(self, word):
        node = self.root

        for ch in word:
            if ch not in node.children:
                node.children[ch] = Node()
            node = node.children[ch]

        node.end = True

    def search(self, word):
        node = self.root

        for ch in word:
            if ch not in node.children:
                return False
            node = node.children[ch]

        return node.end

    def autocomplete(self, prefix):
        node = self.root

        for ch in prefix:
            if ch not in node.children:
                return []
            node = node.children[ch]

        return self._collect(node, prefix)

    def _collect(self, node, prefix):
        words = []

        if node.end:
            words.append(prefix)

        for ch in node.children:
            words += self._collect(node.children[ch], prefix + ch)

        return words


print("🔤 Trie Game\n")

trie = Trie()

words = ["apple", "app", "apply", "banana", "band"]

for w in words:
    trie.insert(w)

print("Search app:", trie.search("app"))
print("Search ape:", trie.search("ape"))

print("\nAutocomplete app:", trie.autocomplete("app"))
print("Autocomplete ba:", trie.autocomplete("ba"))

print("\n🎯 Your turn!")
word = input("Enter word: ")
trie.insert(word)

print("Search result:", trie.search(word))
