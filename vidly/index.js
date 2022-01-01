require('express-async-errors');  // 使用express处理异常的模块可以不用再手动指定相关处理函数了
const winston = require('winston'); // 日志模块
require('winston-mongodb');
const Joi = require('joi');
const config = require('config');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
// const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const error = require('./middleware/error');
const app = express();

//如果在程序中忘记使用catch块来捕获异常，则可以监听process对象的uncaughtException事件，但只仅限于同步代码中的异常
process.on('uncaughtException', (ex) => {
    winston.add(new winston.transports.File({ filename : './log/uncaughtException.log'}));
    winston.error(ex.message, ex);
    process.exit(1);
});

//处理非同步方式的代码中的异常
process.on('unhandledRejection', (ex) => {
    winston.add(new winston.transports.File({ filename : './log/unhandledRejection.log'}));
    winston.error(ex.message, ex);
    process.exit(1);
});

const p = Promise.reject(new Error('some thing was wrong'));
p.then( () => console.log('Done'));

// if jwtPrivateKey environment param not defined , process should exit;
if (!config.get("jwtPrivateKey")) {
    console.log('ERROR : jwtPrivateKey is not defined!');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB'));


// 注册中间件
app.use(express.json());  //开启express获取请求体中JSON对象的功能
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
// app.use('api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);  //错误处理中间件

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))