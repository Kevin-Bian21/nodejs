const winston = require('winston'); // 日志模块
require('winston-mongodb');

/*
错误处理中间件总是需要四个参数。您必须提供四个参数以将其标识为错误处理中间件函数。
即使不需要使用next对象，也必须指定它来维护签名。否则，该next对象将被解释为常规中间件并且无法处理错误。
有关错误处理中间件的详细信息，请参阅：错误处理。以与其他中间件函数相同的方式定义错误处理中间件函数，
除了使用四个参数而不是三个参数，特别是使用签名(err, req, res, next))：
*/

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf} = format;

const myFormat = printf(({ level, message, label, timestamp , stack}) => {
  return `${timestamp} [${label}] ${level}: ${message} ${stack}`;
});

module.exports = function (err, req, res, next) {

    const logger = winston.createLogger({
        format: combine(
            label({ label: '日志模块' }),
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            myFormat
          ),
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({ filename : './log/error.log'}),
          new winston.transports.MongoDB({db : 'mongodb://localhost/vidly', level : 'error'})
        ]
    });

    // logger.info(err.message);
    logger.error(err);

    // error
    // warn
    // info
    // verbose
    // debug
    // silly
    res.status(500).send('Something broke!');
}

