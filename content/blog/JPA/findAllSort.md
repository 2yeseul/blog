---
title: 'findAll일 때 sort하기'
date: 2021-02-13 21:33:00
description: ""
tags: [Java, JPA]
thumbnail: 
---  

`JpaRepository의` `findAll` 사용 시 `sort` 하는 방법
``` java
List<Tour> tours = tourRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
```
