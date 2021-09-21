---
title: 'Spring REST Docs를 통한 API 문서 자동화'
date: 2021-05-05 15:30:00
description: ""
tags: [SpringBoot]
thumbnail: 
---  

자바에서는 주로 API 명세를 위한 툴로 `Swagger`와 `Spring REST Docs`가 사용된다. `Swagger`의 장점은 API를 테스트할 수 있는 환경이 제공되며 Spring REST Docs에 비해 비교적 설정이 간편하다. 하지만 코드에 어노테이션을 추가해야하기 때문에 코드가 지저분해지고, Spring REST Docs와 달리 테스트를 거치지 않기 때문에 제품 코드와 동기화되지 않을 수 있다는 단점이 있다.
`Spring REST Docs`의 가장 큰 장점은 테스트가 성공해야 문서을 작성할 수 있기 때문에, 테스트를 강제할 수 있다는 점이다. 또한 Swagger와 달리 비즈니스 로직 내에 별다른 어노테이션을 작성하지 않기 때문에 기존 코드에 영향을 주지 않는다. Swagger에 비해 적용하는 것은 다소 어렵지만, 한번 적용해두면 간편하게 API를 명세할 수 있다.

`Spring REST Docs`의 적용에 대해 가장 간단명료하게 정리해 둔 블로그
가 있어 첨부 -> https://brunch.co.kr/@purpledev/27

첨부한 블로그를 토대로 내가 적용한 사항은 다음과 같다.


# build.gradle 설정

``` 
plugins {
	...
	id 'org.asciidoctor.convert' version '1.5.3'
	...
}

...


dependencies {
    ... 
    testImplementation 'org.springframework.restdocs:spring-restdocs-mockmvc'
    ...
}

...

ext {
	set('snippetsDir', file("build/generated-snippets"))
}

// 1)
task copyDocument(type: Copy) {
	dependsOn asciidoctor
	from file("build/asciidoc/html5/")
	into file("src/main/resources/templates/doc")
}

// 2)
ㅠbootJar {
	dependsOn asciidoctor
	from("${asciidoctor.outputDir}/html5") {
		into 'static/docs'
	}
}
```

기존 gradle에 다음과 같이 추가해주었다. 

우선 2)를 실행하면 문서화된 테스트 코드를 adoc 형태로 변환해준다.
그 후 1)을 실행하면 `build/asciidoc/html5/`에 저장된 html화된 문서를 사용자가 지정한 파일 경로에 복사해준다.

# 테스트 코드 작성

테스트 코드 작성도 몇 번 작성하다 보면 바로 사용법을 익힐 수 있다.

우선 테스트 클래스 위에 다음과 같은 어노테이션을 추가해준다.

``` java
@ExtendWith({RestDocumentationExtension.class, SpringExtension.class})
@AutoConfigureRestDocs
```

``` java
@Test
@WithMockUser
@DisplayName("커뮤니티 글 작성")
public void test_upload_post() throws Exception {
  PostUpload postUpload = PostUpload.builder.title("제목").content("내용").build();
  this.mockMvc
          .perform(
                  post("/post/upload")
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(postUpload))
          )
          .andExpect(status().isOk())
          // 1)
          .andDo(document("post-upload",
          // 2)
                  preprocessRequest(prettyPrint()),
                  preprocessResponse(prettyPrint()),
                  // 3)
                  requestFields(
                          fieldWithPath("title").type(JsonFieldType.STRING).description("제목")),
                          fieldWithPath("content").type(JsonFieldType.STRING).description("내용"))
                  ),
                  // 4)
                  responseFields(
                          fieldWithPath("postId").type(JsonFieldType.NUMBER).description("글 id").attributes(getExampleAttribute(1))
          ));
}
```

1) adoc에 작성할 snippet 제목을 입력해준다. 
2) 문서에 예쁘게 출력되도록 설정
3) requestBody 속 field를 정의
4) responseBody 속 field를 정의

이외에도 api의 path 작성을 위한 pathParameters(...)도 존재한다.

# asciidoc 작성 
처음엔 익숙하지 않았는데 markdown과 거의 흡사한 것 같다.

`build.gradle` 의 `bootJar`를 실행하면 테스트 코드로 작성한 snippets들이 ./build/asciidoc/ 경로 내에 디렉토리 형태로 저장이 되고, 문서 내에 스니펫을 추가하면 된다. 

출처 
- https://brunch.co.kr/@purpledev/27
- https://woowabros.github.io/experience/2018/12/28/spring-rest-docs.html