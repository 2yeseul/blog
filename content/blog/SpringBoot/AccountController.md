---
title: '회원가입 컨트롤러 만들기'
date: 2021-01-12 21:28:00
description: ""
tags: [Java, SpringBoot]
thumbnail: 
---  
- GET `"/sign-up"` 요청을 받아서 account/sign-up.html을 보여준다.
- 회원가입 폼에서 입력받을 수 있는 정보를 `닉네임`, `이메일`, `패스워드 폼` 객체로 제공한다.

```java
@Controller
public class AccountController {

    @GetMapping("/sign-up")
    public String signUpForm(Model model) {
        return "account/sign-up";
    }
}
```

## Model 객체

- 서버 템플릿 엔진(Thymeleaf...)에서 사용할 수 있는 객체를 저장할 수 있다.
- `model.addAttribute(key, value)`

    key - value 쌍을 통해서 view에 전달할 데이터 객체를 지정한다.

## Annotation

### `@Controller`

- `@Controller` 어노테이션을 명시하면, Spring MVC Container가 Client의 요청으로부터 View를 반환한다. 해당 클래스가 컨트롤러임을 스프링 컨테이너에게 알려준다.

### `@GetMapping(url)`

- GET 방식으로 url으로 들어온 요청을 처리하는 메서드를 매핑한다.

## Thymeleaf

- `<html xmlns:th="http://www.thymeleaf.org">` 를 적으면 해당 html 파일이 타임리프임을 명시한다.
- url 요청 보낼 때 : `@{/url}`

    ex) `th:href="@{/}"` , `th:actoin="@{/sign-up}"`

- `th:field="*{valueName}"`
- `th:object="${objectName}"`