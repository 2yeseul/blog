---
title: 'save the transient instance before flushing'
date: 2021-02-13 21:14:00
description: ""
tags: [Java, JPA]
thumbnail: 
---  

오류 코드
```
object references an unsaved transient instance - save the transient instance before flushing
```

개체가 저장되지 않은 일시적인 인스턴스를 참조합니다. 플러싱하기 전에 임시 인스턴스를 저장합니다.

@OneToMany나 @ManyToOne 사용 시 부모 객체에 추가하는 자식 객체가 아직 db에 저장되지 않아 생긴 에러이다. 즉 영속성 전이를 해야한다. 

### 해결
`cascade = CascadeType.ALL`

