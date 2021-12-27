## 1. Node Base
1. 列出所有依赖`nmp list -all`
2. `npm init --yes`
3. package.json中的 `^` 和 `~` 表示使用当前主版本号下最新的依赖
```json
"dependencies": {
    "mongoose": "^6.1.2",  // Major.Minor.Patch
    "underscore": "^1.13.2"
}
```
1. 查看 mongoose 包依赖了那些包`npm view mongoose dependencies`
2. 查看至今为止所有发布的 mongoose 的版本号 `npm view mongoose versions`
3. 查看已安装的版本和对比在npm注册库中发布的版本`npm outdated`
4. 更新当前的版本号的最高版本`npm update`
5. 要实现更新到最终发行的版本`npm i -g npm-check-updates`
6.  有了package.json，我们就可以使用`npm i`来重新下载依赖的模块
7.  删除依赖包`npm un`
8.  查看全局依赖包`npm -g updated`


nodemon
helmet

## 2. 异步JS
处理异步结果的方式是使用回调函数

异步JS

Promise.all([p1, p2]);

Promise.race([p1, p2]);

A**sync and Await**

只有在一个`async`修饰的函数中才能使用`await`.

`Async` 返回的是一个Promise

使用`await`可以像写同步代码一样实现异步编程

mongoose 是一个用于连接 MongoDB 的简单API


## 3. 模型关系
```js
author : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Author'
}
```
populate()

嵌入文档
```js
author : authorSchema
```

子文档中使用数组
```js
author : [authorSchema]
```


1-1：安装与介绍 </br>
2-8：module模块 </br>
3-21：npm </br>
4-27：Restful接口 </br>
5-51：middleware中间件 </br>
6-63：异步编程（promise）</br>
7-75：mogoose数据库 </br>
8-94：验证（joi库） </br>
9-103：模型关系 </br>
10-110：认证与授权 </br>
11-129：记录与处理异常 </br>
12-146：单元测试 </br>
13-166：集成测试 </br>