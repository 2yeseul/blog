---
title: 'map과 flatMap?'
date: 2021-10-28 00:00:00
description: "map과 flatMap을 정리합니다"
tags: [Kotlin, Java]
thumbnail: 
---   

# map과 flatMap

# map
`map`은 입력값(Collection) 을 람다 내부의 로직을 걸쳐, 사용자가 원하는대로 결과로 반환한다.

예를들어 학생 데이터 중, 시험 성적만 뽑고 싶은 경우를 생각해보자. Student Collection은 아래와 같다.


``` kotlin
data class Student (val id: Long, val name: String, val score: Int)

val students = listOf(Student(1, "Kim", 80), Student(2, "Lee", 100), Student(3, "Park", 65) )

val scores = students.map(Student::score)
println(scores) // [80, 100, 65]
```

# flatMap
그렇다면 flatMap이란 뭘끼? flatMap은 flatten map, 즉 펼쳐진 map이라는 뜻인데, 
> 1) 컬렉션 각 객체에 람다의 로직을 map을 통해 적용한 각각의 결과값을 (여러 개)
> 2) 하나의 리스트로 모은다

``` kotlin
val books = listOf(Book("Title1", listOf("author1")),
                   Book("Title2", listOf("author2")),
                   Book("Title3", listOf("author2", "author3"))
                   )

val authors = books.flatMap(Book::authors).toSet()

println(authors) // [author1, author2, author3]
println(books.map(Book::author)) // [{author1}, {author2}, {author2, author3}]
