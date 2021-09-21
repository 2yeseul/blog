---
title: 'VSCode에서 Snippet(자동완성) 이용하기'
date: 2021-01-05 16:48:00
description: ""
tags: [ETC, VSCode]
thumbnail: 
---  

`Snippet`은 간단하게 말하면 자동완성같은 기능이다. `prefix`를 지정하고 코드 내에서 입력하면, 지정한 코드들을 자동으로 완성시킨다.

![pic1](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdjvZa1%2FbtqSIZAZ0Of%2FDR1WqZV8eNJRKrTY41RGL0%2Fimg.png)

1. `Preferences`에서 `User Snippets`를 클릭한다.

![pic2](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FZ5zaX%2FbtqSDvtXMxa%2FLfM9uHk0UV4AOPeS7CJj7K%2Fimg.png)

`cpp.json`을 클릭해서 `prefix`와 `body`를 지정해주면 된다.

```javascript
"include library" : {
		"prefix": "inc",
		"body": [
			"#include <bits/stdc++.h>",
			"using namespace std;" 
		]
	}
```  
- `$1{}` `2${}` ... 와 같이 지정하면, 넘버링한 순서대로 블록지정을 불러올 수 있다.

![gif1](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcORhUV%2FbtqSELQNu1z%2FZzEKHVtyGidZtCXtCv0C6K%2Fimg.gif)

출처 - https://velog.io/@humblego42/VSCode%EC%97%90%EC%84%9C-Snippet-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0
