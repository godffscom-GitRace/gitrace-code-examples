// [819] DSL 빌더 - DSL Builder
// 레벨: 3 | Kotlin으로 타입 안전한 도메인 특화 언어를 만듭니다

// HTML DSL
@DslMarker
annotation class HtmlDsl

@HtmlDsl
class Tag(val name: String) {
    private val attributes = mutableMapOf<String, String>()
    private val children = mutableListOf<Any>()

    fun attr(key: String, value: String) { attributes[key] = value }

    fun tag(name: String, init: Tag.() -> Unit): Tag {
        val child = Tag(name).apply(init)
        children.add(child)
        return child
    }

    operator fun String.unaryPlus() { children.add(this) }

    fun render(indent: Int = 0): String {
        val prefix = "  ".repeat(indent)
        val attrStr = if (attributes.isEmpty()) ""
            else " " + attributes.map { "${it.key}=\"${it.value}\"" }.joinToString(" ")
        return buildString {
            appendLine("$prefix<$name$attrStr>")
            children.forEach { child ->
                when (child) {
                    is Tag    -> append(child.render(indent + 1))
                    is String -> appendLine("$prefix  $child")
                }
            }
            appendLine("$prefix</$name>")
        }
    }
}

fun html(init: Tag.() -> Unit) = Tag("html").apply(init)

// 쿼리 DSL
data class Condition(val expr: String)
data class Query(
    val table: String,
    val conditions: List<Condition>,
    val limit: Int?,
    val orderBy: String?
)

class QueryBuilder(private val table: String) {
    private val conditions = mutableListOf<Condition>()
    private var limit: Int? = null
    private var orderBy: String? = null

    infix fun String.eq(value: Any) = Condition("$this = '$value'").also { conditions.add(it) }
    infix fun String.gt(value: Int) = Condition("$this > $value").also { conditions.add(it) }
    fun limit(n: Int) { limit = n }
    fun orderBy(field: String) { orderBy = field }

    fun build() = Query(table, conditions.toList(), limit, orderBy)
    fun toSql(): String {
        val q = build()
        return buildString {
            append("SELECT * FROM ${q.table}")
            if (q.conditions.isNotEmpty())
                append(" WHERE " + q.conditions.joinToString(" AND ") { it.expr })
            q.orderBy?.let { append(" ORDER BY $it") }
            q.limit?.let { append(" LIMIT $it") }
        }
    }
}

fun query(table: String, init: QueryBuilder.() -> Unit) =
    QueryBuilder(table).apply(init).toSql()

fun main() {
    // HTML DSL
    val page = html {
        tag("head") {
            tag("title") { +"Kotlin DSL" }
        }
        tag("body") {
            tag("h1") { +"Hello, DSL!" }
            tag("p") {
                attr("class", "content")
                +"Kotlin으로 만든 HTML DSL 예제입니다."
            }
        }
    }
    println(page.render())

    // 쿼리 DSL
    val sql = query("users") {
        "age" gt 20
        "role" eq "admin"
        orderBy("name ASC")
        limit(10)
    }
    println(sql)
}
