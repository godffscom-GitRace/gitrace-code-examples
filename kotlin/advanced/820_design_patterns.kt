// [820] 디자인 패턴 - Design Patterns
// 레벨: 3 | Kotlin으로 구현하는 실용적인 디자인 패턴들

// ===== 옵저버 패턴 =====
typealias Observer<T> = (T) -> Unit

class EventEmitter<T> {
    private val observers = mutableListOf<Observer<T>>()

    fun subscribe(observer: Observer<T>) = observers.add(observer)
    fun unsubscribe(observer: Observer<T>) = observers.remove(observer)
    fun emit(event: T) = observers.forEach { it(event) }
}

// ===== 전략 패턴 =====
fun interface SortStrategy {
    fun sort(list: MutableList<Int>): List<Int>
}

class Sorter(private var strategy: SortStrategy) {
    fun setStrategy(strategy: SortStrategy) { this.strategy = strategy }
    fun sort(list: MutableList<Int>) = strategy.sort(list)
}

// ===== 데코레이터 패턴 =====
interface TextProcessor {
    fun process(text: String): String
}

class PlainText : TextProcessor {
    override fun process(text: String) = text
}

class UpperCaseDecorator(private val processor: TextProcessor) : TextProcessor {
    override fun process(text: String) = processor.process(text).uppercase()
}

class TrimDecorator(private val processor: TextProcessor) : TextProcessor {
    override fun process(text: String) = processor.process(text).trim()
}

class PrefixDecorator(private val processor: TextProcessor, val prefix: String) : TextProcessor {
    override fun process(text: String) = "$prefix${processor.process(text)}"
}

// ===== 커맨드 패턴 =====
interface Command {
    fun execute()
    fun undo()
}

class TextEditor {
    private val content = StringBuilder()
    private val history = mutableListOf<Command>()

    fun executeCommand(cmd: Command) {
        cmd.execute()
        history.add(cmd)
    }

    fun undo() {
        history.removeLastOrNull()?.undo()
    }

    inner class AppendCommand(private val text: String) : Command {
        override fun execute() { content.append(text) }
        override fun undo() { content.delete(content.length - text.length, content.length) }
    }

    override fun toString() = content.toString()
}

fun main() {
    // 옵저버
    println("=== 옵저버 ===")
    val emitter = EventEmitter<String>()
    emitter.subscribe { println("구독자1: $it") }
    emitter.subscribe { println("구독자2: $it") }
    emitter.emit("이벤트 발생!")

    // 전략
    println("\n=== 전략 ===")
    val sorter = Sorter(SortStrategy { it.also { l -> l.sort() } })
    println(sorter.sort(mutableListOf(3, 1, 4, 1, 5)))

    sorter.setStrategy(SortStrategy { it.also { l -> l.sortDescending() } })
    println(sorter.sort(mutableListOf(3, 1, 4, 1, 5)))

    // 데코레이터
    println("\n=== 데코레이터 ===")
    val processor = PrefixDecorator(UpperCaseDecorator(TrimDecorator(PlainText())), ">> ")
    println(processor.process("  hello kotlin  "))

    // 커맨드
    println("\n=== 커맨드 ===")
    val editor = TextEditor()
    editor.executeCommand(editor.AppendCommand("Hello"))
    editor.executeCommand(editor.AppendCommand(", Kotlin"))
    editor.executeCommand(editor.AppendCommand("!"))
    println("현재: $editor")
    editor.undo()
    println("undo: $editor")
    editor.undo()
    println("undo: $editor")
}
