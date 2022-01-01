require('express-async-errors');  // 使用express处理异常的模块可以不用再手动指定相关处理函数了
const winston = require('winston'); // 日志模块
require('winston-mongodb');

module.exports = function() {
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
}
