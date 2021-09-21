---
title: 'default method를 활용하여 JpaRepository 메서드 명 간소화하기'
date: 2021-03-12 21:53:00
description: ""
tags: [Java]
thumbnail: 
---  

JpaRepository를 사용하여 메서드를 생성할 때, 이름이 너무 길어져서 사용하기에 가독성이 좋지 않은 경우가 있다. 이 경우, 인터페이스 내에 `defaultMethod를` 통해 짧은 이름을 지정해 값을 return 하게끔 method를 생성할 수 있다.

Java 8 부터 인터페이스에 `defaultMethod` 라는 기능이 생겼는데, 기존의 인터페이스 개념과 달리 인터페이스 내부에 로직이 포함된 메서드를 작성할 수 있다.

예를들어, `findAllByTourLocationAndStartDateGreaterThanEqualAndEndDateLessThanEqualOrderByIdDesc` (...) 와 같이 긴 함수명을 Service 내에서 사용하면 코드의 가독성이 매우 떨어질 것이다.

이러한 경우

``` java
default List<Tour> getByLocationAndDate(String tourLocation, LocalDate startDate, LocalDate endDate) {
        return findAllByTourLocationAndStartDateGreaterThanEqualAndEndDateLessThanEqualOrderByIdDesc(tourLocation, startDate, endDate);
    }
```
와 같이 default method를 선언해주면, 코드의 가독성을 향상시킬 수 있다.