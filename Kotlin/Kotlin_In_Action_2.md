---
title: '[Kotlin In Action] 2장 - 코틀린 기초'
date: 2021-10-15 00:00:00
description: "코틀린 인 액션을 정리합니다. "
tags: [Kotlin]
thumbnail: 
---   

# [Kotlin In Action] 2장 - 코틀린 기초

# 2.1 함수와 변수 
> - 코틀린에서는 타입 선언을 생략할 수 있다.
> - 코틀린은 변경 가능한 데이터 보다, 변경할 수 없는 불변 데이터 사용을 권장한다.

## 2.1.2 함수
### 코틀린의 함수 정의 방식
``` kotlin
fun max(a: Int, b: Int): Int {
    return if (a > b) a else b
}

fun 함수이름(파라미터 목록): 반환 타입 {
    함수 본문
}
```
### 식(expression)이 본문인 함수
``` kotlin
fun max(a: Int, b: Int): Int {
    return if (a > b) a else b
}
```
이 함수는
``` kotlin
fun max(a: Int, b: Int): Int = if (a > b) a else b
```
와 같이 간결하게 표현할 수 있다.

위의 경우를 블록이 본문인 함수, 아래의 경우(등호와 식으로 이루어진)를 식이 본문인 함수라고 부른다.

__🤔 반환 타입을 생략할 수 있는 이유?__
식이 본문인 함수인 경우 굳이 사용자가 반환 타입을 적지 않아도 컴파일러가 함수 본문 식을 분석해 식의 결과 타입을 함수 반환 타입으로 정해준다. 이렇게 컴파일러가 프로그램 구성 요소의 타입을 정해주는 기능을 `타입 추론` 이라고 한다.

다만 유의해야 할 점은 식이 본문인 함수만 생략 거능하다.

## 2.1.3 변수
``` kotlin
val question = "질문"
val answer = 42
var age: Int = 42
```
타입 생략 가능

### 변경 가능한 변수와 변경 불가능한 변수
|val(value)|변경 불가능한 (immutable) 참조를 저장하는 변수이며, 초기화 이후에는 재대입을 할 수 없다. 자바로 따지면 final
|---|---|
|var(variable)|변경 가능한(mutable) 참조이다.|

> 기본적으로는 모든 변수를 `val` 을 통해 선언하고, 꼭 필요한 경우이면 var를 사용해야한다. 

`val` 참조 자체는 불변이어도, 그 참조가 가리키는 객체의 내부 값은 변경될 수 있다!

``` kotlin
val languages = arrayListOf("Java")
languages.add("Kotlin")
```

## 2.1.4 문자형 템플릿

``` kotlin
fun main(args: Array<String>) {
    val name = if (args.size > 0 ) args[0] else "Kotlin"
    println("Hello, $name")
}
``` 
스크립트 언어와 비슷하게, 코틀린 역시 변수를 문자열 내에서 사용가능하다.

문자열 리터럴 내 필요한 곳에 변수를 넣되, `$` 를 그 앞에 추가해준다.

# 2.2 클래스와 프로퍼티

## 자바 클래스 
``` java
public class Person {
    private final String name;

    public Person(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
```

__🤔 자바 클래스 코드의 문제점?__
- 필드가 둘 이상으로 늘어나면 생성자인 Person의 본문에서, 파라미터를 이름이 같은 필드에 대입하는 대입문의 수가 증가하고, 코드가 반복된다.

## 코틀린 클래스
``` kotlin
class Person(val name: String)
```
이런 유형의 클래스(코드 없이 데이터만 저장)를 `값 객체` 라고 부른다.

한편 코틀린의 기본 가시성은 public이므로 이런 경우 변경자를 생략한다.

## 2.2.1 프로퍼티
### 클래스의 목적
> 1. 데이터의 `캡슐화` 
> 2. 캡슐화한 데이터를 다루는 코드를 한 주체에 가둔다.

__자바에서는 ..__
데이터는 `필드` 에 저장하고, 멤버 필드의 가시성은 보통 비공개이다. 클라이언트가 데이터를 사용하려면 접근자 메서드(getter) 를 제공하여 이를 가능하게 한다.

자바에서는 필드와 접근자를 하나로 묶어 프로퍼티라고 부른다.

__코틀린에서는 ..__

코틀린은 프로퍼티를 언어 기본 기능으로 제공하고, 코틀린 프로퍼티는 자바의 필드와 접근자 메서드를 완전히 대신한다. 

### 클래스 안에서 변경 가능한 프로퍼티 선언하기
``` kotlin
class Person {
    val name: String,
    var isMarried: Boolean
}
```

- val을 통해 선언한 프로퍼티는 읽기 전용 프로퍼티로, 코틀린은 비공개 필드와 필드를 읽는 공개 getter를 생성한다.

- var를 통해 선언한 프로퍼티는 쓸 수 있는 프로퍼티로, getter와 setter 둘다 생성한다.


``` java
Person person = new Person("Anna", true);

System.out.println(person.getName());
System.out.println(person.isMarried());
```

``` kotlin
val person = Person("anna", true)
println(person.name)
println(person.isMarried)
```

코틀린에서는 게터를 호출하는 것이 아니라 프로퍼티를 직접 사용한다.
setter 역시 자바에서는

``` java
person.setMarried(false);
```
와 같이 사용하지만, 코틀린 에서는

``` kotlin
person.isMarried = false
```
를 쓴다.

## 2.2.2 커스텀 접근자
직사각형 클래스 `Rectangle` 을 정의하며 자신이 정사각형인지 알려주는 기능을 만들어야 함.
-> 직사각형이 정사각형인지를 별도의 필드에 저장할 필요 X

``` kotlin
class Rectangle(val height: Int, val width: Int) {
    val isSquare: Boolean 
        get( ) {  // 프로퍼티 게터 선언
            return height == width
        }
}
``` 

``` kotlin
val rectangle = Rectangle(41, 43)
println(rectangle.isSqaure) // false
```

# 2.3 선택 표현과 처리 - enum과 when
`when` 은 자바의 `switch`를 대치하되 더 강력하다.

## 2.3.1 enum 정의
``` kotlin
enum class Color {
    RED, YELLOW, BLUE
}
```
코틀린에서 `enum` 은 `소프트 키워드` 라고 부르는 존재인데, `class` 키워드 앞에 있을 때만 특별한 의미를 가지고 다른 곳에서는 이름에 사용할 수 있다.

``` kotlin
enum class Color(val r: Int, var g: Int, var b: Int) {
    RED(255, 0, 0),
    YELLOW(255, 255, 0), 
    BLUE(0, 0, 255)

    fun rgb() = (r * 256 + g) * 256 + b
}

>>> println(Color.BLUE.rgb()) // 255
```

### 2.3.2 `when` 으로 `enum` 다루기
__`when`을 사용해 올바른 `enum` 찾기__

``` kotlin
fun getMnemonic(color: Color) {
    when (color) {
        Color.RED -> "Richard"
        Color.BLUE -> "Battle"
        Color.YELLOW -> "York"
    }
}

>>> println(getMnemonic(Color.BLUE)) // Battle
```

위 코드는 color 로 전달된 값과 같은 분기를 찾는다. 자바와 달리 __각 분기의 끝에 `break` 를 넣지 않아도 된다!__

성공적으로 매치되는 분기를 찾으면 switch는 그 분기를 실행한다.

``` kotlin
fun getWarmth(color : Color) = when(color) {
    Color.RED, Color.YELLOW -> "warm"
    Color.GREEN -> "neutral"
    Color.BLUE, Color.INDIGO -> "cold"
}

println(getWarmth(Color.ORANGE))
```
### 2.3.3 `when` 과 임의의 객체를 함께 사용
분기 조건에서 상수(enum or 숫자 리터럴) 만 사용 가능한 자바 `switch` 와는 달리,코틀린의 `when` 은 임의의 객체를 허용한다.

> 두 색을 혼합했을 때, 미리 정해진 팔레트에 들어있는 색이 될 수 있는지를 알려주는 함수를 작성해보자!

``` kotlin
fun mix(c1: Color, c2: Color) = 
    when(setOf(c1, c2)) {
        setOf(RED, YELLOW) -> ORANGE
        setOf(YELLOW, BLUI) -> GREEN
        setOf(BLUE, VIOLET) -> INDIGO
        else -> throw Exception("Dirty Color")
    }

>>> println(mix(BLUE, GREEN)) // YELLOW
```

`when` 의 분기 조건 부분에는 _식_ 을 넣을 수 있기 때문에 많은 코드를 더 간결하게 작성할 수 있다.

### 2.3.4 인자 없는 when 사용
인자 없는 when 식을 사용하면 불필요한 객체 생성을 막아 성능을 향상시킬 수 있다. (코드의 가독성은 더 떨어지지만 ... 👀)
``` kotlin
fun mixOptimized(c1: Color, c2: Color) =
    when {
        (c1 == RED && c2 == YELLOW) ||
        (c1 ==YELLOW && c2 == RED) ->
            ORANGE
        
        (c1 == YELLOW && c2 == BLUE) ||
        (c1 == BLUE && c1 == YELLOW) ->
            GREEN
        else -> throw Exception("Dirty Color")
    }

>> println(mixOptimized(BLUE, YELLOW)) // GREEN
```



