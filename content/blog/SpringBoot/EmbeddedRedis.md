---
title: "SpringBoot 테스트를 위한 EmbeddedRedis 설정 "
date: 2021-12-11 00:00:00
description: "redis 통합 테스트를 위하여 embedded redis를 m1 os에 맞게 설정합니다."
tags: [SpringBoot]
thumbnail:
---

# SpringBoot 테스트를 위한 EmbeddedRedis 설정

# 1. EmbeddedRedisConfig 설정

```kotlin
@TestConfiguration
class EmbeddedRedisConfig(
  @Value("\${spring.redis.port}")
  private val port: Int
) {
  // embedded redis server
  private val redisServer: RedisServer

  @PostConstruct
  fun redisServer() {
    redisServer.start()
  }

  @PreDestroy
  fun stopRedis() {
    redisServer.stop()
  }

  init {
    redisServer = if (isArmMac()) {
      RedisServer(
        getRedisBinaryFileForArmMac(), port
      )
    } else {
      redisServer(port)
    }
  }

  private fun isArmMac(): boolean {
    return Objects.equals(System.getProperty("os.arch"), "aarch64") &&
                Objects.equals(System.getProperty("os.name"), "Mac OS X")
  }

  private fun getRedisBinaryFileForArmMac(): File {
    return try {
            ClassPathResource("binary/redis-server-6.2.5-mac-arm64").file
        } catch (e: Exception) {
            throw EmbeddedRedisException("file does not exists")
        }
  }
}
```

`init`을 통해 초기화 되지 않았을 경우 port가 죽지않아 매 테스트 마다 redis port가 중복되어 사용되던 문제가 있었다..

embedded redis의 경우 m1을 지원하지 않아 굉장히 애를 먹었는데..

https://velog.io/@hakjong/ARM-Mac-M1-%EC%97%90%EC%84%9C-embedded-redis-%EC%82%AC%EC%9A%A9

해당 링크가 도움이 많이 되었다.

# 2. 테스트 작성

```kotlin
@ExtendedWith(SpringExtension::class)
@Import(EmbeddedRedis::class)
@DirtiesContext
class RedisTest(
  @Autowired
  private val redisTemplate: RedisTemplate<String, String>
) {

  @AfterEach
  fun deleteRedis() {
    redisTemplate.delete(key)
  }

  @Test
  fun test() {
    // test
  }
}
```

## @DirtiesContext

`@DirtiesContext` 는 Spring Test와 관련된 어노테이션이다. 통합 테스트를 하다보면 하나의 context가 공유되기 때문에, 이전에 진행된 테스트의 context들이 새 테스트에 영향을 주어 실패하는 경우가 있는데, 그런 경우 `@DirtiesContext` 를 통해 프레임워크로 하여금 기존의 context를 닫고 새로운 context를 생성할 수 있다.

mode를 지정하여 실행되는 시점을 정할 수 있다.

- BEFORE_CLASS : 클래스 테스트 시작 전
- BEFORE_EACH_TEST_METHOD : 모든 테스트 케이스 시작 전
- AFTER_EACH_TEST_METHOD : 모든 테스트 케이스 끝날 때
- BEFORE_METHOD : 특정 케이스 시작 전
- AFTER_METHOD : 특정 케이스 종료 이후
