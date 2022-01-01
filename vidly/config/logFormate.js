const winston = require('winston'); // 日志模块
require('winston-mongodb');

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf} = format;

const myFormat = printf(({ level, message, label, timestamp , stack}) => {
  return `${timestamp} [${label}] ${level}: ${message} ${stack}`;
});

const logger = winston.createLogger({
    format: combine(
        label({ label: '日志模块' }),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        myFormat
      ),
    transports: [
      new winston.transports.Console({ colorize : true, prettyPrint : true}),
      new winston.transports.File({ filename : './log/error.log'}),
      new winston.transports.MongoDB({db : 'mongodb://localhost/vidly', level : 'error'})
    ]
});

module.exports = logger;