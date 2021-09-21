---
title: 'Github Action을 통한 TIL README 문서 자동화'
date: 2021-04-07 00:00:00
description: ""
tags: [ETC, Git]
thumbnail: 
---  

요즘 많은 개발자들이 TIL, 즉 `Today I Learned` 를 개인 github repo에 작성하곤 한다. 물론 나는 매일(..)은 아니더라도 꼭 기록하고 싶은 기술 등이 있다면 작성하곤 하는데, 문제는 README에 TIL 인덱스를 추가하는 것이 너무나도 귀찮았다.. 다음에 작성해야지 하고 밀린 것들이 너무 많았고 또 추가를 안하자니 괜히 뭔가 찝찝하였다..~~(이래서 뭐든 제때제때 해야함)~~ 혹시나 action marketplace에 TIL auto README를 검색했더니 웬걸 바로 나오는 것이었다!! 
심지어 별다른 설정 없이 yml엔 description 정도만 수정을 해주면 되었다.

## 설정 방법

https://github.com/marketplace/actions/til-auto-format-readme

나는 잡다한 설정도 귀찮아서(..) 개발자가 올려준 예제 yml을 description만 수정하고 사용하였다.

``` yml
name: Build README
on:
  push:
    branches:
    - master
    paths-ignore:
    - README.md
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Check out repo
      uses: actions/checkout@v2
      with:
        # necessary for github-action-til-autoformat-readme
        fetch-depth: 0
    - name: Autoformat README
      uses: cflynn07/github-action-til-autoformat-readme@1.1.0
      with:
        description: |
          A collection of concrete writeups of small things I learn daily while working
          and researching. My goal is to work in public. I was inspired to start this
          repository after reading Simon Wilson's [hacker new post][1], and he was
          apparently inspired by Josh Branchaud's [TIL collection][2].
        footer: |
          [1]: https://simonwillison.net/2020/Apr/20/self-rewriting-readme/
          [2]: https://github.com/jbranchaud/til
        list_most_recent: 2 # optional, lists most recent TILS below description
        date_format: "2020 Jan 15:04" # optional, must align to https://golang.org/pkg/time/#Time.Format
```

description은 readme를 설명하는 부분이니 본인이 readme에 적고 싶은 말을 쓰면 된다.

해당 action을 실행하면 자동적으로 readme가 완성!
주의할점은 readme 인덱싱을 할 때, 파일 내 가장 첫 줄을 제목으로 쓰기 때문에 TIL 파일 내 가장 첫 줄은 꼭 제목으로 써주어야 한다.

![](https://images.velog.io/images/2yeseul/post/51cd14a0-6d98-46c1-ab31-8a0b44dc6468/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-04-07%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%206.08.09.png)

적용한 README