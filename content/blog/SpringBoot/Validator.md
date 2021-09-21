---
title: 'Validator, @InitBinder'
date: 2021-01-01 00:00:00
description: ""
tags: [Java, SpringBoot]
thumbnail: 
---  

## 폼에서 에러가 발생할 때

```java
@PostMapping("/sign-up")
// @Valid SignUpForm signUpForm -> signUpForm 유효성 검증해라
public String signUpSubmit(@Valid SignUpForm signUpForm, Errors errors) {
   if (errors.hasErrors()) {
       return "account/sign-up";
    }
    // accountService.processNewAccount(signUpForm);
    return "redirect:/";
}
```

- 폼 에러 있을 때, 폼을 다시 보여주는 컨트롤러
- 파라미터로 받을 때는 `@ModelAttribute` 생략 가능

## Validator Interface

도매인 객체를 검증할 수 있도록 `Spring`이 제공하는 인터페이스다. Validator 인터페이스는 객체를 검증하는데 실패하면 `Errors 객체에 에러를 등록`함으로써 동작한다.

Validator는 두 개의 메소드를 가진다 - `supprots(Class)`, `validate(Object, Errors)`

### `supprots(Class)` 메소드

매개변수로 전달된 클래스를 검증할 수 있는지 여부를 반환한다.

- `aClass.isAssignableFrom(SignUpForm.class);` - SignUpForm 타입의 인스턴스를 검증한다.

    Class를 구분하며 어떤 class나 interface를 상속 혹은 구현했는지 체크하는 메소드

```java
@Component
@RequiredArgsConstructor
public class SignUpFormValidator implements Validator {

    private final AccountRepository accountRepository;

    @Override
    public boolean supports(Class<?> aClass) {
        return aClass.isAssignableFrom(SignUpForm.class);
    }

		// nickname, email이 중복 되는지 아닌지 검증
    @Override
    public void validate(Object object, Errors errors) {
        SignUpForm signUpForm = (SignUpForm)object;
        if (accountRepository.existsByEmail(signUpForm.getEmail())) {
            errors.rejectValue("email", "invalid.email", new Object[]{signUpForm.getEmail()}, "이미 사용중인 이메일입니다.");
        }

        if (accountRepository.existsByNickname(signUpForm.getNickname())) {
            errors.rejectValue("nickname", "invalid.nickname", new Object[]{signUpForm.getEmail()}, "이미 사용중인 닉네임입니다.");
        }
    }
}
```

## `@InitBinder`

```java
		@InitBinder("signUpForm")
    public void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.addValidators(signUpFormValidator);
    }
```

- `"signUpForm"` (-SignUpForm과 매핑) 이라는 데이터를 받을 때, `InitBinder`를 설정할 수 있다.
- Spring Validator를 사용할 때, `@Valid` 어노테이션으로 검증이 필요한 객체를 가져오기 전, 수행할 메소드를 지정해주는 어노테이션이다.

출처 

[인프런 강의 - 스프링과 JPA 기반 웹 애플리케이션 개발, 백기선]([https://www.inflearn.com/course/스프링-JPA-웹앱](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-JPA-%EC%9B%B9%EC%95%B1))

[https://lazymankook.tistory.com/86](https://lazymankook.tistory.com/86)
