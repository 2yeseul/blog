---
title: '[Node.js 교과서] - 4장 npm 정리'
date: 2021-11-05 00:00:00
description: "Node.js 교과서 4장 npm을 정리합니다."
tags: [Node.js, Javascript]
thumbnail: 
---   

# npm 이란 
> Node Package Manager

대부분의 자바스크립트 프로그램은 패키지로서 npm에 등록되어 있으므로, 특정 기능을 하는 패키지가 필요하다면 npm에서 설치하면 된다.

# package.json 을 통해 패키지 관리
패키지의 버전 관리를 위하여 노드 프로젝트를 시작하기 전에는 폴더 내부에 무조건 package.json 부터 만들어야한다.

# 개발용 패키지 설치
> npm install --save-dev [패키지]

# 전역설치
패키지를 현재 프로젝트의 node_modules 에 설치하는 것이 아니라 npm이 설치되어 있는 폴더에 설치한다. 
이 폴더의 경로는 보통 환경 변수에 등록되어 있으므로, 전역 설치한 패키지는 콘솔의 명령어로 사용할 수 있다. 

## npx 
``` shell
npm install --save-dev rimraf
npx rimraf node_modules
```

npx을 통해 실행하면 전역 설치한 것 같은 기능, 즉 명령어로 사용이 가능하다. 

# 패키지 버전 
노드 패키지의 버전은 항상 세 자리인데, `SemVer` 방식을 따르기 때문이다.

`SemVer` 이란 Semantic Versioning (유의적 버전) 의 약어이다.
## 첫 번째 자리 : major 버전 
major 버전이 0이면, 초기 개발 중이라는 의미이고 1 부터가 정식 버전이라는 뜻이다. 
major 버전은 하위 호환이 안 될 정도로 패키지 내용이 수정되었을 때 올린다. 
## 두 번째 자리 : minor 버전 
하위 호환이 되는 기능 업데이트
## 세 번째 자리 : patch 버전 
새로운 기능이 추가 되었다기 보단, 기존 기능에서 간단한 버그를 수정했을 때 버전을 업데이트 한다. 

# 기타 명령어
## npm update [패키지명]
업데이트
## npm uninstall [패키지명]
해당 패키지 제거 ( === npm rm [패키지명])

## npm search [검색어]
npm의 패키지를 검색 
## npm info [패키지명]
패키지의 세부 정보를 파악 
## npm addUser
npm 로그인을 위한 명령어 
## npm whoami 
로그인한 사용자가 누구인지 알린다 