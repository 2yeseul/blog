---
title: 'Redis 개념 정리'
date: 2021-11-23 00:00:00
description: "Redis의 기초 개념을 정리합니다."
tags: [Infra, Redis]
thumbnail: 
---   

# Redis 정리 - (1)

redis를 사용해야 할 일이 곧 다가올 것 같은데.. 레디스는 막연히 성능상의 이점을 위하여 캐싱처리를 하는 NoSQL 정도로만 알고 제대로 사용해본적이 없어 정리해보고자 한다.

(이 글을 쓴 지는 좀 되었는데, 게시하는 시점에서 실제로 redis를 써야할일이 생겼다(ㅋㅋ))


# NoSQL 
`NoSQL`은 `RDBMS` 와는 다른 방식으로 데이터를 저장한다. RDBMS 처럼 Table의 형식이 아니며, DB 모델에 따라 유형이 다양하다. 보통 아주 많은 양의 데이터를 효율적으로 처리해야 하거나, 데이터의 분산처리 및 빠른 쓰기나, 데이터의 안정성이 필요할 때 사용한다. 
## 종류
1. Key-Value : Redis, memcached, Coherence
2. 열 지향 와이드 컬럼 스토어 : Cassandra, HBASE, Cloud Database
3. 문서형 : MongoDB, Couchbase, MarkLogin ...
4. 그래프형 : Neo4j

# Redis 
`REDIS(REmote Dictionary Server)`는 메모리 기반의 key-value 데이터 관리 시스템이며, 모든 데이터가 메모리에 저장되고 또 메모리에서 조회되므로 Read, Write 속도가 빠르다. 
## 특징
1. Remote에 위치
2. 프로세스로 존재 
3. In-Memory 기반 
4. key-value 

## 지원하는 자료구조
1. String 
2. Set 
3. Sorted Set 
4. Hash 
5. List 

> 서비스 특성이나 상황에 따라 `캐시`로 사용하거나 `Persistence Data Storage` 로 사용할 수 있다.

## 캐시로 사용 
트래픽이 많은 경우, 모든 요청을 DB를 통해 접근하면 DB 서버에 무리가 갈 수 있고, 장애가 없다 하더라도 요청이 증가하는 상황에서는 기존 성능을 기대하기 힘들다.

따라서 나중에 요청될 결과를 미리 저장해두었다가, 빨리 제공하기 위해 사용한다.

Redis Cache는 보통 In-Memory 기반인데, 디스크 보다 용량은 적어도 속도는 빠르다.

## 사용 방법
### 일반적인 패턴 (Look aside cache)
![pattern](https://media.vlpt.us/images/2yeseul/post/bb9b3b56-d2bb-4d83-98d9-27d3d8d4727d/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-10-25%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%209.05.44.png)

1. 클라이언트 -> 서버 요청 -> 캐시에 데이터 존재 여부 우선적으로 확인
1-1. 캐시에 데이터 있으면 꺼내줌
2. 없으면 DB에서 읽은 뒤, 캐시에 저장한 다음 데이터로 돌려줌

### Write back
- 데이터를 캐시에 전부 저장해두고, 특정 시점마다 한 번씩 캐시 내 데이터 DB를 insert 한다.
성능 상 뒤쳐지는 방식은 아니지만, 데이터를 일정 기간 유지하는 공간은 메모리이므로, 서버 장애 상황에서 데이터가 손실될 수 있다. 따라서 재생 가능한 데이터나 극단적으로 무거운 데이터에서 이 방식을 사용한다.

## Redis Collection 
Redis는 Collection을 지원하는데, 이로인해 개발자는 비즈니스 로직에 집중할 수 있게 되었다. 

레디스에서 지원하는 자료구조는 다음과 같다. 
1. String : 가장 일반적인 형태이며, key-value 와 같이 저장한다.
2. Set : 중복 허용 X 
3. List : Array 형식. 처음과 끝에 데이터 삽입이나 빼는건 빠르나 중간에 데이터 삽입 혹은 삭제는 느리다. 
4. Sorted Set 

### 주의할 점 
- 하나의 컬렉션에 너무 많은 아이템 담지 X 
    - 가능하면 10000개 이하, 몇천개 수준의 데이터셋을 유지하는 것이 Redis 성능에 영향 X 
- Expire는 전체 Collection 에 대해서만 걸리는데, 10000개의 아이템을 가진 Collection 에 Expire가 걸려있으면, 그 시간 이후 10000개의 아이템이 전부 삭제된다.

--- 
출처
- https://velog.io/@hyeondev/Redis-%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C
- https://jyejye9201.medium.com/%EB%A0%88%EB%94%94%EC%8A%A4-redis-%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80-2b7af75fa818
