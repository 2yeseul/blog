---
title: '[Node.js 교과서] - 7장 Sequelize'
date: 2021-11-01 00:00:00
description: "Node.js 교과서 7장 Sequelize을 정리합니다."
tags: [Java, SpringBoot]
thumbnail: 
---   
# create 
## sql 
``` sql 
insert into nodejs.users (name, age, married, comment) values ('lee', 27, 0, '안녕');
``` 
## sequelize query 
``` javascript 
User.create({ 
    name: 'lee', 
    age: 27, 
    married: false, 
    comment: '안녕',
});
``` 
# 전체 row 조회 
## sql 
``` sql 
select * from nodejs.users;
``` 
## sequelize query 
``` javascript 
User.findAll({});
``` 

# 원하는 컬럼만 조회 
## sql 
``` sql 
select name, married from nodejs.users;
``` 
## sequelize query 
``` javascript 
User.findAll({
    attributes: ['name', 'married'],
});
``` 

# where 
## sql 
``` sql 
select name, age from nodejs.users where married = 1 and age > 30;
select id, name from nodejs.users where married = 1 or age > 30;
``` 
## sequelize query 
``` javascript 
const { Op } = require('sequelize');
const { User } = require('../models');

User.findAll({
    attributes: ['name', 'age'],
    where: {
        married: true,
        age: { [Op.gt]: 30},
    }
});

User.findAll({
    attribues: ['id', 'name'],
    where: {
        [Op.or] : [{married: false}, {age: [Op.gt]: 30}],
    }
});
```

# order 
## sql 
``` sql 
select id, name from nodejs.users order by age desc;
``` 
## sequelize query 
``` javascript 
User.findAll({
    attributes: ['id', 'name'],
    order: [['age', 'DESC']],
});
``` 

# 조회할 로우 개수 설정 & offset 
## sql 
``` sql 
select id, name from nodejs.users order by age desc limit 1 offset 1; 
``` 
## sequelize query 
``` javascript 
User.findAll({
    attributes: ['id', 'name'],
    order: [['age', 'DESC']],
    limit: 1,
    offset: 1,
});
``` 

# 수정 
## sql 
``` sql 
update nodejs.user set comment = '바꿀 내용' where id = 2;
``` 
## sequelize query 
``` javascript 
User.update({
    comment: '바꿀내용',
}, {
    where: { id: 2 },
})
``` 

# 삭제 
## sql 
``` sql 
delete from nodejs.users where id = 2;
``` 
## sequelize query 
``` javascript 
User.destroy({
    where: { id: 2 },
});
```

# 관계 쿼리 
`findOne`이나 `findAll` 메서드를 호출할 때 Promise의 결과로 모델을 반환한다. 

``` javascript 
const user = await User.findOne({});
console.log(user.nickname);
``` 

## include 
**hasMany - belongsTo** 관계가 맺어진 모델 (User(1) : Comment(N)) 에서, 특정 사용자를 조회할 때 그 사람의 댓글 까지 조회하려는 경우 `include` 속성을 사용한다. 

``` javascript
const user = await User.findOne({
    include: [{
        model: Comment,
    }]
});

console.log(user.Comments);
``` 
또는 

``` javascript
const user = await User.findOne({});
const comments = await user.getComments();
console.log(comments);
``` 

**댓글을 가져올 때 id가 1인 댓글만 가져오고, 컬럼도 id만 가져오는 경우**

``` javascript
const user = await User.findOne({});
const comment = await user.getComments({
    where: {
        id: 1,
    },
    attributes: ['id'],
});
``` 
## 생성, 수정, 삭제 
``` javascript
const user = User.findOne({});
const comment = await Comment.create();
await user.addComment(comment);

// or 
await user.addComment(comment.id); 

// 배열로 
const comment1 = await Comment.create();
const comment2 = await Comment.create();

await.addCommen([comment1, comment2]);
``` 

