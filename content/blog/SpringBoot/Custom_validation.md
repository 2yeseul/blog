---
title: 'Custom Validation'
date: 2021-06-04 00:00:00
description: ""
tags: [Java, SpringBoot]
thumbnail: 
---  

# Conditional Validation
객체의 속성 값에 따라 데이터 유효성 검사를 다르게 해야 하는 경우, 어떤 방법으로 유효성을 검증하여야 가장 효율적이고 코드 중복을 최소화하여 간단하게 할 수 있는 지를 고민하였다. 그러던 중, NHN의 기술블로그에 게시된 Validation에 대한 포스트를 보았고, 자바의 Validation 기능이 생각보다도 더 방대한 것을 알게되어 정리해보고자 한다. 

일반적으로 Java에서는 데이터 유효성 검사 표준 기술인 Bean Validation을 사용하고 있다. 나 같은 경우엔 `@Valid` 의 기본적인 사용법은 알았지만, 제약조건이 설정된 객체의 특정 값에 의하여 제약조건을 다르게 주어야 하는 경우엔 어떤 식으로 해야 할지 감이 잘 잡히지 않았다. 

이러한 경우, 
1. 특정 조건에만 제약이 되는 필드에 대하여 
2. 그룹을 만들어주는 Marker Interface를 생성한 뒤 
3. 제약을 받는 필드에 이를 명시해준다

그 후, 커스텀 어노테이션을 통하여 커스텀 제약을 구현해주면 된다.



우선 Spring에서 Bean Validation을 사용하기 위해서는 `spring-boot-starter-validation`을 추가해주어야 한다. 

``` java
@Getter
@Setter
@RequiredArgsConstructor
@PostConstraint // ** 구현해야 할 커스텀 제약 
public class PostRequestDto {

    @NotEmpty(groups = NotTemp.class)
    private String title;
    @NotEmpty(groups = NotTemp.class)
    private String content;
    @NotEmpty(groups = NotTemp.class)
    private String userNickname;

    private boolean isTempSaved;
}
```

`isTempSaved` 가 true일 때, 즉 임시저장인 경우를 제외하고 모든 필드들은 유효하여햐 한다.

`NotTemp` 는 그룹화를 위한 마커 인터페이스이다. 

``` java
@Target({TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = PostConstraintValidator.class)
@Documented
public @interface PostConstraint {
    String message() default;
    Class<?>[] groups default {};
    Class<? extends Payload>[] payload() default {};
}
```

`PostConstraintValidator`를 통해 `PostConstraint`를 구현한다.

``` java
public class PostConstraintValidator implements PostConstraint<AdMessageConstraint, Message> {
    private Validator validator;

    public AdMessageConstraintValidator(Validator validator) {
        this.validator = validator;
    }

    @Override
    public boolean isValid(PostRequestDto value, ConstraintValidatorContext context) {
        // 임시저장이 아닐 때, Group이 NotTemp로 설정된 필드들을 검사 
        // 그 후 결과를 ConstraintValidatorContext에 추가 
        if (!value.isTempSaved()) {
            final Set<ConstraintViolation<Object>> constraintViolations = validator.validate(value, Ad.class);
            if (CollectionUtils.isNotEmpty(constraintViolations)) {
                context.disableDefaultConstraintViolation();
                constraintViolations
                        .stream()
                        .forEach(constraintViolation -> {
                            context.buildConstraintViolationWithTemplate(constraintViolation.getMessageTemplate())
                                    .addPropertyNode(constraintViolation.getPropertyPath().toString())
                                    .addConstraintViolation();
                        });
                return false;
            }
        }

        return true;
    }
}
```

그 후, Service에서 `@Validated` 와 `@Valid` 어노테이션을 추가해준다.

``` java 

@Service
@RequiredArgsConstructor
@Validated // here 
public class PostService {

    @Transactional
    public PostResponseDto uploadPostProcess(@Valid PostRequestDto postRequestDto) {
        // ...
    }
}

출처 - https://meetup.toast.com/posts/223