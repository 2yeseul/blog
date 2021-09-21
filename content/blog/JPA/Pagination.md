---
title: 'Spring Jpa Pagination 처리'
date: 2021-03-14 01:11:00
description: ""
tags: [Java, JPA]
thumbnail: 
---  
# 페이징의 필요성
JPA에서는 Entity의 전체 목록을 `findAll()` 을 통해 불러올 수 있다. 예컨대 db 수가 적다면 List 형식으로 db의 전체 목록을 받아와도 성능에 큰 차이는 없겠지만, db의 수가 기하급수적으로 늘어난다면 이는 성능에 큰 영향을 끼친다. 따라서 paging을 통해 효율적으로 data를 반환할 수 있다.
# Page
Page는 객체 목록의 하위 목록이다. 전체 목록을 포함하는 위치에 대한 정보를 얻을 수 있다. 

(출처 - https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Page.html) 

# Pageable
`Pageable` 은 페이징 하는 기술을 모아둔 인터페이스다. Pageable을 사용하여 조건에 맞도록 Pagination과 원하는 데이터로 정렬을 구현할 수 있다. 

# REST API 예시 

## 1. JpaRepository 수정 
우선 Page 처리를 위해 JpaRepository에서, 기존에 List로 반환하던 findAll의 타입을 변환하고, 조건에 맞는 목록 출력을 위해 파라미터에 Pageable을 넣어준다.
``` java
// 기존 
List<Post> findAll();

// Pagination 처리
Page<Post> findAll(Pageable pagealbe);
```
## 2. Pageable 적용 
한 페이지 당 10개의 데이터가 특정 조건(최신순 - descending) 되도록 처리한다고 가정해보자.
``` java
// PostService
public List<PostDto> getPostListPage(int page) {
    Page<Post> postPage = postRepository.findAll(PageRequest.of(page, 10, Sort.by("id").descending()));
    List<Post> posts = postPage.getContent();
    return makePostsList(posts); // list dto 처리
}
```
`PageRequest.of`는 말 그대로 Page에 대한 요청을 처리한다. 순서대로 page의 번호, 페이지에 보여질 데이터 개수, 그 다음 정렬 방식 순으로 파라미터를 받는다. 

## 3. Controller 설정
``` java
@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @GetMapping("/post-list/{id}") 
    public List<PostDto> getPostListPages(int page) {
        postService.getPostListPage(page);
    }

```