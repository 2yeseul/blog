---
title: '[Kotlin] 확장함수'
date: 2021-10-23 00:00:00
description: "코틀린의 확장에 대해 정리한 글입니다."
tags: [Kotlin]
thumbnail: 
---   

# 확장 함수 

## 정의 
코틀린은 클래스에서 상속하거나, Decorator와 같은 디자인 패턴을 사용하지 않고도, 새로운 기능으로 클래스를 확장할 수 있는 기능을 제공한다. 

코틀린의 핵심 목표 중 하나는, **기존 코드와 코틀린 코드를 자연스럽게 통합** 하는 것인데, 코틀린을 기존 자바 프로젝트에 통합하는 경우에, 직접 코틀린으로 변환할 수 없거나 미처 변환하지 않은 기존 자바 코드를 처리할 수 있어야 한다. 기존 자바 API를 재작성하지 않고도, `확장함수` 를 통해 코틀린이 제공하는 여러 편리한 기능을 사용할 수 있다. 

(출처 - Kotlin In Action, 코틀린 공식 docs)

## 선언
1)추가하려는 함수 이름 앞에 2) 그 함수가 확장할 클래스의 이름을 덧붙이면 된다.

- 클래스 이름 : `수신 객체 타입`
- 호출되는 대상이 되는 값 : `수신 객체`

``` kotlin
fun String.lastChar(): Char = this.get(this.length - 1)
// String : 수신 객체 타입
// this : 수신 객체 -> 수신 객체 타입에 속한 인스턴스 객체
``` 

또 다른 예제)
``` kotlin
fun MutableList<Int>.swap(index1: Int, index2: Int) {
    val tmp = this[index1]
    this[index1] = this[index2]
    this[index2] = tmp
}

val list = mutableListOf(1, 2, 3)
list.swap(0, 2)
```

해당 예제를 제네릭으로 만들 수도 있다.
``` kotlin
fun <T> MutableList<T>.swap(index1: Int, index2: Int) {
    val tmp = this[index1]
    this[index1] = this[index2]
    this[index2] = tmp
}
``` 

## 정적 바인딩이 가능하다
확장은 그들이 확장하는 클래스를 실제로 수정하지 않는다. 확장을 정의함으로써, 오직 `.` 을 통해 새로운 함수만 함수하면서 클래스에 새로운 멤버를 주입하지 않는다. 함수 호출 부분에 메모리 주소값을 저장하는 작업이 컴파일 시간에 행해지므로, 런타임 시점 값이 변경되지 않는다. 

확장함수는 단지 정적 메서드 호출에 대한 문법적인 편의일 뿐이다. 따라서 클래스가 아닌 더 구체적인 타입을 수신 객체 타입으로 지정할 수도 있다. 

``` kotlin
fun <T> Collection<T>.joinToString(
    seperator: String = ", ",
    prefix: String = "",
    postfix: String = ""
): String {
    val result = StringBuilder(prefix)

    for((index, element) in this.withIndex()) {
        if (index > 0) result.append(seperator)
        result.append(element)
    }

    result.append(postfix)
    return result.toString()
}

val list = arrayListOf(1, 2, 3)
val result = list.joinToString(" ") // 1 2 3
```
더 구체적인 타입을 수신 객체 타입으로 지정하고 싶다면, `Collection<Integer>`으로 변경하면 된다. 

## 캡슐화? 
확장 함수 내부에서는 일반적인 인스턴스 메서드의 내부에서와 마찬가지로, 수신 객체의 메서드나 프로퍼티를 바로 사용할 수 있다. 

하지만 확장 함수가 캡슐화를 깨지는 않는다. 클래스 내에서 정의한 메서드와 달리, **확장함수 내에서는 클래스 내부에서만 사용할 수 있는 private 멤버와 protected 멤버를 사용할 수 없다.**

## 확장함수는 오버라이드할 수 없다. 
확장함수는 클래스의 일부가 아니고, 클래스 밖에서 선언된다. 

이름과 파라미터가 완전히 같은 확장함수를, 기반 클래스와 하위 클래스에 대해 정의해도, 실제로는 확장함수를 호출할 때 **수신 객체로 지정한 변수의 정적 타입에 의해 어떤 확장 함수가 호출될 지가 결정되는 것이다.**  그 변수에 저장된 객체의 동적인 타입에 의해 확장함수가 결정되진 않는다.