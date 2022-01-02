## 1. Node Base
1. 列出所有依赖`nmp list -all`

2. `npm init --yes`

3. package.json中的 `^` 和 `~` 表示使用当前主版本号下最新的依赖

   ```js
   "dependencies": {
       "mongoose": "^6.1.2",  // Major.Minor.Patch
       "underscore": "^1.13.2"
   }
   ```

4. 查看 mongoose 包依赖了那些包`npm view mongoose dependencies`

5. 查看至今为止所有发布的 mongoose 的版本号 `npm view mongoose versions`

6. 查看已安装的版本和对比在npm注册库中发布的版本`npm outdated`

7. 更新当前的版本号的最高版本`npm update`

8. 要实现更新到最终发行的版本`npm i -g npm-check-updates`

9. 有了package.json，我们就可以使用`npm i`来重新下载依赖的模块

10.  删除依赖包`npm un`

11. 查看全局依赖包`npm -g updated`

12. 只在开发环境中使用该包 `npm i "包名" --save-dev`

nodemon
helmet

## 2. 异步JS
处理异步结果的方式是使用回调函数

异步JS

```js
Promise.all([p1, p2]);
Promise.race([p1, p2]);
```

A**sync and Await**

- 只有在一个`async`修饰的函数中才能使用`await`.

- `Async` 返回的是一个Promise

- 使用`await`可以像写同步代码一样实现异步编程

mongoose 是一个用于连接 MongoDB 的简单API

## 3. 模型关系
joi-object-id:用于验证MongoDB ObjectId格式的Joi扩展
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
## 认证与授权
**认证** ：认证就是判断用户是否为他们所声称身份，方式就是比对他们的邮件或密码等。

**授权**：授权就是判断给用户什么操作许可的过程。

使用 `bcypt` 对密码进行哈希运算进行加密。

**JWT** : JSON网络令牌是一个渲染为长字符串的JSON对象。

1.  用它来标识用户。

2. 它在自己的装载项中包含一些可以公开的用户信息。

3. 这些信息被加密(SH256)而无法被伪造。

4. 当用户注册时或登录时，在服务器中创建一个 jwt ，并发送给客户端，在客户端保存这个jwt，并在需要时伴随请求头发送给服务器，这个服务器就可以通过jwt来授权用户对应操作，而减少了访问数据库去验证的相关开销。

注意 ：

- 不要将私钥放在源码中，而是通过环境变量来设置。

- 使用config包来读取和保存环境变量。

- 将逻辑分装在mongoose中

  ```js
  uesrSchema.methods.generateAuthToken = function(){...}
  ```

- 使用中间函数进行授权操作。

- 要实现用户退出登录，无需再服务器端操作，只需在客户端将 jwt删除。
- 不要将jwt保存在数据库中，如确有必要，务必进行加密。
  401 无法验证
  403 禁止

## 处理记录异常
1. 使用Express的异常处理中间件可以捕捉请求处理流程中所有未处理的异常。
2. 需要在所有的路由后面注册错误处理的中间件。
3. 为了将控制权交给错误处理中间件，就需要将路由句柄放在try-catch块中，并调用作为句柄传入的next()函数。
4. 为每个路由都添加try-catch块比较麻烦，所以可以使用 `express-async-errors` 模块，该模块会动态捕捉运行时的错误，然后放到try-catch块中并将错误传给错误处理中间件。
5. 使用Winston来进行日志的存储记录，winston可以在各种运输介质中记录日志，运输介质就是保存日志的地方。
6. winston核心的输运介质是控制台、文件和HTTP，第三方库可以支持把MongoDB、CouchDB、Redis和Loggly作为输运介质。
7. 异常处理中间件只能捕捉请求处理流程中的异常，任何在程序开始时出现的异常，比如连接到数据库，都不会被捕捉，所以需要自己单独捕捉这些异常情况。
8. 用process.on('uncaughtException')来捕捉未处理的异常,并且用process.on('unhandleRejection')来捕捉被拒的Promise
9. 作为最佳实践，当你在事件句柄中用到了process.on,你就应该用日志记录异常并且退出进程,因为你的进程会处在挂起阶段，这会造成很多问题.最好是重启进程恢复它的状态.在生产环境中,使用进程管理来自动重启Node进程.

## 自动化测试
1. 单元测试 ：测试应用中的某一部分，不依赖外部资源
2. 集成测试 ：在测试时伴随着它外部对应的外部依赖资源，测试的是应用代码的集成性，比如数据库、文件系统等
3. 端到端测试 ：记录用户的操作过程，然后回放测试应用是否能满足要求

4. 常用测试框架
- Jasmine
- Mocha [Chai、Sinon]
- Jest
### 单元测试
1. `toBe()` : 匹配时比较的是内存中的位置，所以对于Object类型，应该使用 `toEqual()` 或 `toMatchObject()` 比较对象的一致性
2. 使用 --watchAll 可以进行不间断的测试
``` js
  "scripts": {
    "test": "jest --watchAll"
  },
```
npm test

## 体系结构

1-1：安装与介绍

2-8：module模块

3-21：npm

4-27：Restful接口

5-51：middleware中间件

6-63：异步编程（promise）

7-75：mogoose数据库

8-94：验证（joi库）

9-103：模型关系

10-110：认证与授权

11-129：记录与处理异常

12-146：单元测试

13-166：集成测试

