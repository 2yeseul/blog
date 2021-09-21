---
title: '@ControllerAdvice를 통한 일관성있는 예외 처리'
date: 2021-06-14 00:00:00
description: ""
tags: [Java, SpringBoot]
thumbnail: 
---  

# @ControllerAdvice

Controller에서 발생한 모든 예외를 @ControllerAdvice에서 처리할 수 있다. 일반적으로 try catch를 사용하여 예외를 처리했는데, try catch를 사용해야 하는 경우라면 구체적인 Exception을 발생시키는 것이 좋다. 그 외에는 try-catch를 최대한 지양하고, 사용하더라도 최대한 로그를 추가하는 편이 좋다!

try-catch를 통해 예외를 처리하는 대신, `@ControllerAdvice` 가 선언된 객체에서 예외를 핸들링한다. 스프링은 JSR 303(Spring Bean Validation) 기반 어노테이션을 통해 값 검증을 쉽고 일관성 있게 처리할 수 있도록 도와준다. 컨트롤러 자체가 예외를 처리하는 것이 아닌, 예외가 발생하면 해당 어노테이션이 선언된 객체에서 처리해주고 컨트롤러는 요청에 대한 값 검증만을 시행한다. 

``` java

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    // Server Error handle
    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    protected ResponseEntity<Object> handleException(Exception e) {
        return ResponseEntity.ok(ResponseWrapper.error(ErrorConst.SERVER_ERROR));
    }
}

```

출처 - https://github.com/cheese10yun/spring-guide/blob/master/docs/exception-guide.md#%ED%86%B5%EC%9D%BC%EB%90%9C-error-response-%EA%B0%9D%EC%B2%B4