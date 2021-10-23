---
title: '[Kotlin] Scope Function'
date: 2021-10-23 23:00:00
description: "코틀린의 Scope Function을 정리합니다."
tags: [Kotlin]
thumbnail: 
---   
# Scope Function

# 정의 
Kotlin은 객체의 컨텍스트 내에서 오직 코트 블록을 실행하는 여러 함수가 포함되어 있는데, 람다식에서 scope 함수를 호출하면 임시 범위(scope)가 만들어진다. 이 scope에서는 해당 객체의 이름 없이도 접근가능하다.

# 요소
`Scope 함수` 에는 `let`, `run`, `with`, `apply`, `also` 가 있는데, 이 다섯 함수는 기본적으로는 같은 것을 한다 : 객체에 있는 코드 블록을 실행하는 함수들이다. 

## 차이점 
차이점은 다음과 같은데, 해당 객체들이 어떻게 코드 블록 내에서 사용 가능하게 되는지와, 전체 표현식의 결과이다. 

## 함수 정의

### let
``` kotlin
public inline fun <T, R> T.let(block: (T) -> R): R {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    return block(this)
}

```

### run 
``` kotlin
public inline fun <T, R> T.run(block: T.() -> R): R {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    return block()
}

```

### with
``` kotlin
public inline fun <T, R> with(receiver: T, block: T.() -> R): R {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    return receiver.block()
}
``` 

### apply 
``` kotlin
public inline fun <T> T.apply(block: T.() -> Unit): T {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    block()
    return this
}
``` 

### also
``` kotlin
public inline fun <T> T.also(block: (T) -> Unit): T {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    block(this)
    return this
}
``` 

|함수|객체 참조|반환 값|확장 함수 여부|
|----|---------|-------|--------------|
|let|it|람다 결과|O|
|run|this|람다 결과|O|
|run|-|람다 결과|X : context 없이 호출|
|with|this|람다 결과|X : context 객체를 인수로 사용|
|apply|this|context 객체|O|
|also|it|context 객체|O|

# let

- let 함수를 사용하면 null이 될 수 있는 식을 더 쉽게 다룰 수 있다.

- let 함수는 자신의 수신 객체를 인자로 전달받은 람다에게 넘기고, 널이 될 수 있는 값에 대해 안전한 호출 구문을 사용해 let을 호출하되, 널이 될 수 없는 타입을 인자로 받는 람다를 let에 전달한다. 즉 지정된 값이 null이 아닌 경우에 코드를 실행해야 하는 경우 유용

- 수신 객체는 `it`이라는 인자로 사용할 수 있고, 람다 결과가 return 값이다.

- let은 호출 체인들의 결과에 대해 하나 이상의 함수를 호출하는 데 사용할 수 있다. 예를들어 다음 코드는 Collection에 대한 두 작업의 결과를 리턴한다.

## 예제

### let 사용 X
``` kotlin
val numbers = mutableListOf("one", "two", "three", "four", "five")
val resultList = numbers.map { it.length }.filter { it > 3 }
println(resultList)    
```

### let 사용 O 
``` kotlin
val numbers = mutableListOf("one", "two", "three", "four", "five")
numbers.map { it.length }.filter { it > 3 }.let {
    println(it)
}

// 람다 대신 메서드 참조 (::) 사용

val numbers = mutableListOf("one", "two", "three", "four", "five")
numbers.map { it.length }.filter { it > 3 }.let(::println)
``` 

### null이 될 수 없는 객체에 대해 ?.과 같이 사용
``` kotlin
val str: String = "Hello"
val length = str?.let {
    println("let() called on $it)
    processNonNullString(it) 
    it.length
}
``` 
-> null이 아닐 때만 실행 

# run 
- 수신 객체는 `this`로 사용가능하고, return 값은 람다의 결과이다.
- `run`은 `with` 와 같은 일을 하지만 `let`과 같이 수신 객체에 대한 확장함수이다.
- `run` 은 람다가 객체의 초기화와 return값에 대한 계산을 모두 할 경우 유용하다.
- 확장함수이기 때문이 `.?`을 붙여 non-null 제약을 걸 수 있다.

``` kotlin
val square = run {
    val width= 10
    val height = 10
    Square(name, age)
}
```

# with
- `with` 는 확장함수가 아니므로 수신 객체를 인자로 전달하지만, 람다 내부에서 `this` 로 사용가능하다. return 값은 람다 실행 결과이다.

- 람다 결과과 필요하지 않거나 제공하지 않고, 수신 객체 내에서 함수를 호출하는 경우 `with` 를 사용하는 것이 좋다. 
    - `with this object, do the following.` 

``` kotlin
val numbers = mutableListOf("one", "two", "three", "four", "five")
with(numbers) {
    println("'with' is called with argument $this")
    println("It contains $size elements")
}
// 호출 결과는 사용하지 않는다.
```

# apply
- 수신 객체는 `this`로 사용가능하고, return 값은 객체 자신이다.
- 값을 반환하지 않고, 수신 객체의 멤버가 주로 연산할 때 `apply` 를 사용하면 좋다.
- `Builder` 패언과 동일한 용도로 사용된다.
- 대표적으로 객체를 초기화 할 때 사용 

``` kotlin
val user = User(name = "yeseul").apply {
    age = 27
}
```

# also
- `also` 는 확장함수 이므로 수신 객체를 `this` 를 사용한다. 그러나 코드블럭 내에서 `this` 를 파라미터로 입력하므로, `it` 을 통해 프로퍼티에 접근할 수 있다.
- 반환 결과가 객체 자신이며, `Builder` 패턴과 동일하게 사용된다.
- 객체의 속성을 전혀 사용하지 않거나 변경하지 않는 경우 사용하면 좋다. 객체의 유효성 확인, 로그, 디버깅 등의 목적으로 사용

``` kotlin
val numbers = mutableListOf("one", "two", "three")
numbers
    .also { println("The list elements before adding new one: $it") }
    .add("four")
```

---
출처
- Kotlin In Action
- kotlin 공식 문서
- https://mycool0905.github.io/kotlin/2020/12/15/kotlin-scope-function.html  