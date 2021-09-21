---
title: '로그인 상태 유지'
date: 2021-02-03 14:25:00
description: ""
tags: [Java, SpringBoot]
thumbnail: 
---  

## RemeberMe

- `Spring Security`의 `RememberMe`를 이용하여 로그인 상태를 유지할 수 있다.

    로그인 시, `jsessionid`를 통해 웹브라우저와 서버가 연결된다. 스프링부트의 기본 세션 타임은 30분인데, 로그인 상태 유지를 위해 이 값을 키우면 불필요한 메모리의 낭비가 커지게 된다. 메모리의 낭비를 막으며 로그인을 유지하기 위해서는 `RememberMe`를 이용해야 한다.
- 세션이 만료 되더라도 로그인을 유지하고 싶을 때 사용하는 방법

    쿠키에 인증 정보를 남겨두고 세션이 만료 됐을 때에는 쿠키에 남아있는 정보로 인증한다.

- 안전하게 개선 하기

    Username, 토큰(랜덤, 매번 바뀜), 시리즈(랜덤, 고정)
    - 쿠키를 탈취당한 경우 유효하지 않은 토큰 + 유효한 시리즈 + Username으로 접속하게 된다.
    - 이경우, 모든 토큰을 삭제하여 해커가 더 이상 탈취한 쿠키를 사용하지 못하도록 방지할수 있다.

```Java
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final AccountService accountService;
    private final DataSource dataSource;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // ... 생략

        http.rememberMe() // 1
                .userDetailsService(accountService) // 2
                .tokenRepository(tokenRepository()); // 3
    }

    // 보다 안전한 영속화 기반 설정 - 4
    @Bean
    public PersistentTokenRepository tokenRepository() {
        JdbcTokenRepositoryImpl jdbcTokenRepository = new JdbcTokenRepositoryImpl();
        jdbcTokenRepository.setDataSource(dataSource);
        return jdbcTokenRepository;
    }

```

1. remeberMe()를 통해 로그인 상태를 기억할 수 있도록 하는데
2. userDetailsService(accoutService)를 통해 user의 정보를 불러오는 메소드(loadUserByUsername)을 구현한 service와
3. token을 제작하는 tokenRepository를 구현한 리파지토리를 불러온다.

4. `PersistentTokenRepository`는 사용자에 대한 로그인 토큰을 저장하는데 사용되는데, 영속성을 기반으로 설정한다.



