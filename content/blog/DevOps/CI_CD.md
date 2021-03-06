---
title: 'CI/CD'
date: 2021-05-21 14:52:00
description: ""
tags: [DevOps]
thumbnail: 
---  

# CI / CD 
현재의 배포 트렌드는 작은 기능 단위로 자주 코드를 통합 및 배포하는 `CI(Continuous Integration)` / `CD(Continuous Deployment)` 가 대세이다. 새로 개발한 기능, 버그를 수정한 것을 real 서비스에 통합하기 위해서는 

1. 소스코드를 테스트하고
2. 빌드하고
3. 컨테이너로 만들어
4. 통합 저장소에 전달 후
5. 서비스 무중단 배포 etc

등의 과정이 필요하다.


CI, CD를 통해 애플리케이션 개발단계를 자동화하여 애플리케이션을 보다 짧은 주기로 고객에게 제공가능하다.

`CI`는 테스트, 빌드, Dockerizing, 저장소에 전달까지 프로덕션 환경으로 서비스를 배포할 수 있도록 준비하는 프로세스이다. `CD`는 저장소로 전달된 프로덕션 서비스를 실제 사용자들에게 배포하는 프로세스를 의미한다. 

## CI / CD 툴 비교 

### Travis

|장점|단점|
|------------------|------------------|
|github과의 연동|Jenkins에 비해 적은 플러그인 종류|
|yml을 통한 쉬운 설정|유료 서비스를 사용하면 가격이 비쌈|
|레퍼런스 다양|느린 속도|
|Travis가 알아서 VM으로 호스팅을 해주기 때문에 직접 서버를 운영할 필요가 없다||
|모든 job이 독립적||

### Jenkins

|장점|단점|
|------------------|------------------|
|무료!|다양한 플러그인 -> 플러그인 지옥..|
|사용자들이 많아 레퍼런스가 다양|프로젝트 규모가 작은 경우 리소스 낭비 발생|
|호스팅 직접 해야하므로 관련된 모든 부분 관리 가능|-> 서버 운영 및 관리 비용 발생|

### Github Action 
내가 사용했을 때는 딱히 단점..이라고 생각할 만 한 것은 없었다. 오히려 repo에서 바로 end-to-end로 실행할 수 있고, 설정도 비교적 간편하며 cron 설정을 통해 스케줄링까지 가능하기 때문에 매우 유용하다고 생각하였다. 개인 프로젝트를 수행하면서 매일 야구 경기 일정이나 순위에 대한 스크래핑이 필요했는데, github action의 크론을 설정하여 매일 특정 시간에 스크래핑 하도록 자동화할 수 있었다. 또한 속도도 비교적 빠른 편이며 marketplace에 다양한 action 스크립트 들이 있기 때문에 특정 기능을 자동화하기에 용이하다! 나 같은 경우엔 marketplace를 통해 얻은 yml 파일을 통해 TIL readme를 자동화 중이다.




출처 
- https://blog.naver.com/jcyber/222357090097
- https://hwasurr.io/git-github/github-actions/
- https://owin2828.github.io/devlog/2020/01/09/cicd-1.html