const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();

require('./startup/log')(); // 日志模块，放在最前面保证在代码出错时被正常处理
require('./startup/route')(app);  //调用注册中间件函数
require('./startup/db')();  //调用连接数据库函数
require('./startup/config')();

// const p = Promise.reject(new Error('some thing was wrong'));
// p.then( () => console.log('Done'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))