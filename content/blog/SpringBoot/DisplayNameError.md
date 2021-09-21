---
title: 'IntelliJ에서 JUnit 5 Test 시@DisplayName이 보이지 않을 때'
date: 2020-12-13 00:00:00
description: ""
tags: [Java, SpringBoot]
thumbnail: 
--- 

JUnit 5 Jupiter로 테스트를 실행하는데 지정한 `DisplayName`은 보이지않고 각 클래스와 메소드 이름만 보였다..😞

### 💡How to Solve
`Preferences` → `Build, Execution, Deployment` → `Build Tools` → `Gradle`
에서
`Run tests using` 을 `IntelliJ IDEA`로 변경한다.
![](https://images.velog.io/images/2yeseul/post/2db605e5-3d5c-4f8c-8af0-208089ba8579/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202020-12-13%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%209.30.28.png)

[출처](http://jmlim.github.io/intellij/2020/03/02/intellij-junit5-display-name-did-not-show-issue/)