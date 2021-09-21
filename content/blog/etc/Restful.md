---
title: 'RESTFul API 설계 가이드 정리'
date: 2021-09-10 00:00:00
description: ""
tags: [ETC]
thumbnail: 
---  

# 📌 설계 중심 규칙

> **URI**는 **정보의 자원**을 표현해야 한다
자원에 대한 **행위**는 **HTTP Method**(GET, POST, PUT, DELETE 등)으로 표현한다

## URI 작성 규칙

👎

```bash
GET /users/show/1
```

👍

```bash
GET /users/1
```

**URI**는 **자원**을 표현해야 하므로, show와 같은 **행위가 포함되면 안된다**. show는 HTTP Method인 GET을 통해 충분히 표현 가능하다.

자원은 `Collection`과 `Element`로 나누어 표현할 수 있고, 아래 테이블에 기초하여 서버 대부분과의 통신 행태를 표현할 수 있다.

![사진](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/01735ab8-cec7-4208-a3eb-78e69fd87ed5/스크린샷_2021-08-31_오전_8.47.26.png)

### PATCH vs PUT

`PUT`은 해당 자원의 전체를 교체한다는 의미 

`PATCH`는 일부를 변경한다는 의미

→ `update` 이벤트에서 PUT보다 의미적으로 더 적합하다는 평가

### 마지막에 `/` 를 포함하지 않는다.

👎

```bash
GET /users/1/
```

👍

```bash
GET /users/1
```

### _(underbar) 대신 -(dash) 를 사용한다.

👎

```bash
POST /users/post_comments
```

👍

```bash
POST /users/post-comments
```

### 소문자를 사용한다

👎

```bash
POST /users/postComments
```

👍

```bash
POST /users/post-comments
```

### 컨트롤 자원을 의미하는 URI 예외적으로 동사를 허용한다.

함수처럼, 컨트롤 자원을 나타내는 URL은 동작을 포함하여 명명한다.

👎

```bash
POST /posts/duplicating
```

👍

```bash
POST /posts/duplicate
```

## HTTP Status

### 성공 응답은 `2XX` 로 응답한다

- 200 : OK
- 201 : CREATED
    - 200과 달리 요청에 성공하고, 새로운 리소스를 만든 경우에 응답
        - POST, PUT
- 202 : ACCEPTED
    - 클라이언트 요청을 받은 후, 요청은 유효하지만 서버가 아직 처리하지 않은 경우
        - 비동기 작업
        - 요청에 대한 응답이 일정 시간 후 완료되는 작업인 경우
        - 작업 완료 후 클라이언트에 알릴 수 있는 server push 작업을 하거나, 클라이언트가 해당 작업의 진행 상황을 조회할 수 있는 URI 응답해야함

        ```json
        HTTP/1.1 202 Accepted
        {
        			"links": [
        				{
        					"rel": "self",
        					"method": "GET",
        					"href": "https://api.test.com/v1/users/3"
        				}
        		]
        }

        ```

- 204 : NO Content
    - 응답 body가 필요없는 자원 삭제 요청(DELETE) 같은 경우
    - 200 응답 후 null, {}, [], false를 return 하는 것과 다르다. 아예 HTTP Body가 없음

### 실패 응답은 `4XX`로 응답한다

- 400 : [Bad Request]
    - 클라이언트 요청이 미리 정의된 파라미터 요구사항을 위반한 경우
    - 파라미터의 위치(`path`, `query`, `body`), 사용자 입력 값, 에러 이유 등을 **반드시** 알린다
        - case 1

        ```json
        {

            "message" : "'name'(body) must be Number, input 'name': test123"
        }

        ```

        - case 2

        ```json
        {

            "errors": [

                {

                    "location": "body",

                    "param": "name",

                    "value": "test123",

                    "msg": "must be Number"
                }

            ]

        }

        ```

- 401 : [Unauthorized]
- 403 : [Forbidden]
    - 해당 요청은 유효하나 서버 작업 중 접근이 허용되지 않은 자원을 조회하려는 경우
    - 접근 권한이 전체가 아닌 일부만 허용되어 요청자의 접근이 불가한 자원에 접근 시도한 경우 응답한다.
- 404 : [Not Found]
- 405 : [Method Not Allowed]
    - 405 code는 404 code와 혼동될 수 있기 때문에 룰을 잘 정하고 시작한다.
    - `POST /users/1`의 경우 404로 응답한다고 생각할 수 있지만, 경우에 따라 **405**로 응답할 수 있다. `/users/:id` URL은 GET, PATCH, DELETE method는 허용되고 POST는 불가한 URL이다.
        - 만약 id가 `1`인 사용자가 없는 경우엔 404로 응답하지만(GET, PATCH, DELETE의 경우), `POST /users/1`는 `/users/:id` URL이 POST method를 제공하지 않기 때문에 405로 응답하는 게 옳다.
    - `Allow: GET, PATCH, DELETE` HTTP header에 허용 가능한 method를 표시한다.
- 409 : [Conflict]
    - 해당 요청의 처리가 비지니스 로직상 불가능하거나 모순이 생긴 경우
    - e.g.) `DELETE /users/hak`의 경우, 비지니스 로직상 사용자의 모든 자원이 비어있을 때만 사용자를 삭제할 수 있는 규칙이 있을 때 409로 응답한다.

        ```json
        409 Conflict

        {

            "message" : "first, delete connected resources."
            "links": [

                {

                    "rel": "posts.delete",

                    "method": "DELETE",

                    "href":  "https://api.test.com/v1/users/hak/posts"
                },

                {

                    "rel": "comments.delete",

                    "method": "DELETE",

                    "href":  "https://api.test.com/v1/users/hak/comments"
                }

            ]

        }

        ```

- 429 : [Too Many Requests]
    - `Retry-After: 3600`(HTTP Headers)
    - DoS, Brute-force attack 같은 비정상적인 접근을 막기 위해 요청의 수를 제한한다.

## 입력 Form 형태

새로운 Item 작성하거나 기존의 Item을 수정하는 경우, 작성/수정 Form은 어떻게 제공해야 할까?

**→ Form 자체로도 정보로 취급**

![스크린샷 2021-08-31 오전 8.50.28.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/32c01163-68ad-4d7c-a9dc-64620143fe22/스크린샷_2021-08-31_오전_8.50.28.png)

## 모바일 환경에 따라 다른 정보를 보여야 하는 경우

REST API는 URI가 **플랫폼 중립적**이어야 하기 때문에, Request Header의 `User-Agent` 값을 참조하는 것이 좋다.

아이폰에서의 User-Agent>

```java
Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1A543a Safari/419.3
```

출처 

[https://sanghaklee.tistory.com/57](https://sanghaklee.tistory.com/57)

[https://spoqa.github.io/2012/02/27/rest-introduction.html](https://spoqa.github.io/2012/02/27/rest-introduction.html)