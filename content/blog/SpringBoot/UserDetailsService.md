---
title: 'UserDetailsService'
date: 2021-02-03 18:35:00
description: ""
tags: [Java, SpringBoot]
thumbnail: 
---  
[출처](https://velog.io/@hellas4/2019-11-12-0811-%EC%9E%91%EC%84%B1%EB%90%A8)

# UserDetails

- user에 대한 정보를 제공한다. `UserDetails`에 대한 구현은 보안 목적으로 Spring Security에서 직접적으로 사용되지는 않는다. 단순히 `Authentication` 객체로 캡슐화 되는 사용자의 정보를 저장할 뿐이다. 이를 통해 이메일 주소나 전화 번호와 같은 user 정보와 관련된 비보안 정보를 편리한 위치에 저장할 수 있다. 

- `UserDetails`는 `UserDetailService`를 통해 return된다. `DaoAuthenticationProvider`는 `UserDetails`가 유효한지를 확인한 후, `UserDetailsService`에서 리턴된 `UserDetails` 인 `principal`을 가진 `Authentication`을 반환한다. 
[출처 - 공식 doc]

- 쉽게 생각하면 security에서 사용(인증, 인가) 하기 위해 구현한 계정(사용자) 정보를 담은 인터페이스이다. 

# UserDetailsService

`UserDetailsService`는 DB에서 사용자에 대한 정보를 가져온다. `loadUserByUserName()`을 통해 UserDetails에 대한 정보를 받아온다.

``` java
@Service
@RequiredArgsConstructor
public class AccountService implements UserDetailsService {

    private final AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String emailOrNickname) throws UsernameNotFoundException {

        Account account = accountRepository.findByEmail(emailOrNickname);
        if(account == null) {
            account = accountRepository.findByNickname(emailOrNickname);
        }
        if(account == null) {
            throw new UsernameNotFoundException(emailOrNickname);
        }
        return new UserAccount(account);
    }
}
```

