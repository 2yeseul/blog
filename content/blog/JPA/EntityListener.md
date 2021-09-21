---
title: 'Entity Listener'
date: 2021-08-23 00:00:00
description: ""
tags: [Java, JPA]
thumbnail:  
---  
# Entity Listener

## 정의

![1](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/2e442924-e257-47fe-876a-f8875f0cca14/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-08-13_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_9.08.13.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210823%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210823T003809Z&X-Amz-Expires=86400&X-Amz-Signature=fb05aa09bca78028f5100a932ad0a7359be0eb1a099c20ad14995aa724c873bb&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA%25202021-08-13%2520%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB%25209.08.13.png%22)

hibernate 공식 문서

`Entity Life Cycle` (Persist, Remove, Update, Load) 에 대한 이벤트 발생 시 **call back** 처리

## 메서드

![2](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/31950cfd-2896-41b2-8850-d800c79ec99c/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-08-13_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_9.12.33.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210823%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210823T003858Z&X-Amz-Expires=86400&X-Amz-Signature=0d1f13407c2557d344e277e3dc5b056c3c39f6534f39fff1eacded524665b979&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA%25202021-08-13%2520%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB%25209.12.33.png%22)

`Pre`- vs `Post`-

> *@PreUpdate callback is only called if the data is actually changed*

즉 @PreUpdate는 실질적으로 Update SQL문이 실행될 때 동작한다. (트랜잭션 종료 or flush 하는 시점)

트랜잭션 바운더리 안에서 실행되기 때문에 영속성 컨텍스트에 의해 관리됨

@PreUpdate가 동작할 때 DB에서 변경되는 값을 조회할지라도, 이미 변경된 값으로 조회가 되기 때문에 결과적으로 행위 자체는 @PostUpdate와 동일한 결과

# 실제 적용

## 사용 이유

1. `알림`를 보내주는 곳(저장 시점)이 산발적으로 흩어져있어서, 소켓을 전송하는 각 모듈 하나하나에 추가하는데 시간이 오래걸리고 반복적인 작업 → 생산성이 저하되며, 코드가 반복됨
2. 현재의 요구사항 : 알림 객체가 Persist 되는 시점에 Socket으로 알림을 보내준다고 추상화할 수 있다.

    → 따라서, NoticeListener 생성하여 Socket 알림 전송을 처리한다.

## Listener 객체 생성
``` java
@Slf4j
public class NoticeListener {

    @PostPersist
    public void sendSocketNotice(Notice notice) {
        SimpMessagingTemplate template = BeanUtils.getBean(SimpMessagingTemplate.class);

        if (!notice.getUserNoticeType().equals(TypeConst.UserNotice.NEW_EST)) {
            NoticeResponseDto responseDto = new NoticeResponseDto(userNotice);
            responseDto.setRegisterDt(LocalDateTime.now());

            template.convertAndSend("/api/socket/subscribe/" + notice.getUserId(), responseDto);
        }
    }

}
```

### BeanUtils?

`Entity Listener`에서는 생성자 주입이나 필드 주입을 통한 생성자 주입이 불가능하기 때문에 Bean을 받아올 수 있는 Util을 따로 생성해주어야 한다.

``` java
@Component
public class BeanUtils implements ApplicationContextAware {

  private static ApplicationContext applicationContext;

  @Override
  public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
    BeanUtils.applicationContext = applicationContext;
  }

  public static <T> T getBean(Class<T> tClass) {
    return applicationContext.getBean(tClass);
  }
}
```


## Entity 적용

``` java
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@DynamicUpdate
@EntityListeners(NoticeListener.class)
public class Notice {
```

