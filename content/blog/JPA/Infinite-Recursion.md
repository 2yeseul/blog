---
title: 'Infinite Recursion in JPA'
date: 2021-01-27 15:47:00
description: ""
tags: [Java, JPA]
thumbnail: 
---  

## 오류 코드
```
org.springframework.web.util.NestedServletException: Request processing failed; nested exception is org.springframework.http.converter.HttpMessageNotWritableException: Could not write JSON: Infinite recursion
```
## 원인
- `JPA` 연관관계에서 `양방향 매핑`을 선언한 경우 발생
- 컨트롤러에서 `JSON`으로 값을 출력하는 경우, 타입을 변환해야 하는데 변환되는 엔티티의 필드가 다른 엔티티를 참조하고 또 그 엔티티 클래스의 필드가 또 다른 엔티티를 참조하고의 `Infinite Recursion`...

## 해결
### Member Entity
``` java
@Entity
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@Builder @AllArgsConstructor @NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue
    private Long id;

    @JsonManagedReference // 추가한 부분
    @OneToMany(mappedBy = "member")
    private List<Tour> tours = new ArrayList<>();

    @JsonManagedReference 
    @OneToMany(mappedBy = "member")
    private List<Scrap> scraps = new ArrayList<>();

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String phone;

    private String nickname;

    private String name;

    private LocalDate birth;

    private String password;

    private int teamIndex;

    private boolean isAgeOlderThan14;

    private boolean isAgreeOnTOS;

    private boolean isAgreeOnGetPromotion;

    private int gender;

    @ColumnDefault("50")
    private int weather;

}
```
### Tour Entity
```java
package shop.spotweb.spot.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Tour {

    @Id
    @GeneratedValue
    private Long id;

    @JsonBackReference // 추가한 부분
    @ManyToOne
    private Member member;

    private String tourLocation;
    private String tourTeam;

    private int tourStartDate;
    private int tourEndDate;

    private String tourTitle;
    private String tourContent;

    // 투어 조건
    private int requiredGender; // 1이면 남성 2이면 여성 3이면 제한 없음
    private String tourTheme;
    private int minimumAge;
    private int maximumAge;

    // 작성 시간
    private LocalDateTime postsAt;

    // private int numberOfView;

     private int totalNumberOfMember;
     private int nowNumberOfMember;

    @JsonManagedReference
    @OneToMany(mappedBy = "tour")
    private List<Scrap> scraps = new ArrayList<>();

}
```

`Member` 엔티티(`@OneToMany`)와 `Tour` 엔티티(`@ManyToOne`)는 서로 양방향 관계이다.
두 객체를 사용한 컨트롤러는 `JSON`을 반환하는 `RestController`인데, 위에서 처럼 어노테이션들을 붙이지 않으면 무한루프문제가 발생한다. 따라서 양방향 매핑을 맺은 엔티티들을 사용하는 RestController에서는 아래 두 개의 어노테이션을 붙여줘야한다.
- `@JsonManagedReference` 
    - 참조가 되는 앞부분을 의미하며, 정상적으로 **직렬화를 수행**한다.
    - `Collection Type`에 적용된다.
    - `@OneToMany` 어노테이션에 붙인다.
- `@JsonBackReference`
    - 참조가 되는 뒷부분을 의미하며, **직렬화를 수행하지 않는다**.
    - `@ManyToOne` 어노테이션에 붙인다. 
