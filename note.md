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
