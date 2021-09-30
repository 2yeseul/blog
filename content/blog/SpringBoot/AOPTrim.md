---
title: '@ControllerAdvice 와 @InitBinder를 이용하여 모든 Request의 String Trim 설정'
date: 2021-09-30 00:00:00
description: ""
tags: [Java, SpringBoot]
thumbnail: 
---  

# @ControllerAdvice 와  @InitBinder를 이용하여 모든 Request의 String Trim 설정

# @ControllerAdvice란?
`@ControllerAdvice`는 모든 컨트롤러들에 대하여 전역적으로 특정 메서드를 적용할 수 있다.

# @InitBinder  
`@InitBinder`는 WebDataBinder를 초기화 하는 메서드들을 식별한다. Request 객체에 적용된 Valid들을 검증하거나, 파라미터 들에 대한 특정한 처리를 WebBinder로 하여금 가능하게 한다.

# 모든 Controller의 Request에 대한 일관적인 Trim 설정

개발 시, 문자열 입력값들에 대하여 Trim을 해주어야 하는 경우가 많은데, 이 두 어노테이션을 통해 trim을 할 수 있다. 

``` java 
@ControllerAdvice
public class ControllerConfig {

    @InitBinder
    public void initBinder(WebBinder binder) {
        // 1) 
        binder.setAutoGrowCollectionLimit(4000);
        // 2)
        binder.registerCustomEditor(String.class, new StringTrimmerEditor(false));
    }
}
```

1) 모든 collection의 최대 크기를 지정
2) 모든 request string들의 trim 지정 

 