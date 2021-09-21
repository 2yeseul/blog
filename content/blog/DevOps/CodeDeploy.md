---
title: 'AWS CodeDeploy'
date: 2021-05-21 18:00:00
description: ""
tags: [DevOps, AWS]
thumbnail: 
---  

# AWS CodeDeploy

# CodeDeploy란?
![Img](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbBrzg8%2Fbtq2HPvEMf1%2Fk7jHqW13kWqEW6ZhD92wl1%2Fimg.png)

aws의 ec2, 온프레미스 인스턴스, 서버리스 lambda 또는 ecs 서비스로 애플리케이션 배포를 자동화하는 배포 서비스이다. 즉 CD이다.

## 에이전트?
ec2에 설치하는 프로그램으로, CodeDeploy에서 해당 ec2를 사용할 수 있도록 한다. ec2 이외의 배포 환경에서는 필요하지 않다

에이전트는 app 개정, 배포기록, 배포 스크립트 등을 ec2의 루트 디렉토리에 저장한다. 

`Amazon Linux`, `Ubuntu Server`, `RHEL` 인 경우, `/opt/codedeploy-agent/deployment-root` 에 위치한다

# 과정

## 1. CodeDeploy용 IAM 역할 생성

역할 만들기 -> AWS 서비스

사용 사례 선택 -> CodeDeploy

권한 정책 -> AwsCodeDeployRole

## 2. CodeDeploy에 애플리케이션 생성 후 IAM 역할 연결
1) 컴퓨팅 플랫폼 -> EC2/온프레미스
2) 애플리케이션 생성 완료 후, 배포 그룹 생성 
    - 배포 유형 -> 현재 위치 
    - 배포할 서비스가 2대 이상이라면 블루/그린을 선택
3) 배포 설정 -> `CodeDeployDefault.AllAtOnce`
    한 번에 배포
4) 로드밸런서 -> 체크 해제 



## 3. appspec.yml
CodeDeploy는 `appspec.yml`을 통해서 어떤 파일을 어느 위치해 배포하고 이후 어떤 스크립트를 실행할 것인지 관리한다.

## 4. github action yml 수정

``` yml
 - name : Code Deploy
   run : aws deploy create-deployment --region us-east-2 --application-name 'code_deploy_app_name' --deployment-config-name CodeDeployDefault.AllAtOnce --deployment-group-name 'code_deploy_group_name' --s3-location bucket='bucket-name',bundleType=zip,key=$GITHUB_SHA.zip
```

- region : 대상 리전
- application-name : CodeDeploy 애플리케이션 명칭
- deployment-group-name : CodeDeploy 배포 그룹 명칭
- bucket : 버킷 명칭 

출처 
- https://galid1.tistory.com/745
- https://blog.naver.com/jcyber/222357107470
- https://velog.io/@hwany/AWS-EC2-CodeDeploy-%EC%97%B0%EB%8F%99%ED%95%98%EA%B8%B0
- https://twofootdog.tistory.com/38