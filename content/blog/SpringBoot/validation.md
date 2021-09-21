---
title: '제약 검증 기능 사용'
date: 2021-01-12 11:06:00
description: ""
tags: [Java, SpringBoot]
thumbnail: 
---  

```java
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class SignUpForm {

    @NotBlank
    @Length(min = 3, max = 20)
    @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z0-9_-]{3,20}$")
    private String nickname;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Length(min = 8, max = 50)
    private String password;

}
```

## java.validation Annotations

### `@NotBlank`

- `@NotNull` 은 null만 허용하지 않고, "" 혹은 `" "` 은 허용하는데, `NotBlank`는 전부 허용하지 않는다.

### `@Data`

- `@ToString`, `@EqualsAndHashCode`, `@Getter`, `@Setter`, `@RequiredArgsConstructor`를 합쳐둔 어노테이션
    - `@RequiredArgsConstructor`

        `final`이 붙은 객체에 대해서 생성자를 만들어준다. 생성자를 통한 `DI`시에 사용됨.

### `@Pattern(regexp="")`

- 정규식을 만족하는지의 여부
- [정규식 설명]([https://chrisjune-13837.medium.com/정규식-튜토리얼-예제를-통한-cheatsheet-번역-61c3099cdca8](https://chrisjune-13837.medium.com/%EC%A0%95%EA%B7%9C%EC%8B%9D-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-%EC%98%88%EC%A0%9C%EB%A5%BC-%ED%86%B5%ED%95%9C-cheatsheet-%EB%B2%88%EC%97%AD-61c3099cdca8))

출처

[인프런 강의 - 스프링과 JPA 기반 웹 애플리케이션 개발, 백기선]([https://www.inflearn.com/course/스프링-JPA-웹앱](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-JPA-%EC%9B%B9%EC%95%B1))