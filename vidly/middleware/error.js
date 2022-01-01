const logger = require('../config/logFormate');
/*
错误处理中间件总是需要四个参数。您必须提供四个参数以将其标识为错误处理中间件函数。
即使不需要使用next对象，也必须指定它来维护签名。否则，该next对象将被解释为常规中间件并且无法处理错误。
有关错误处理中间件的详细信息，请参阅：错误处理。以与其他中间件函数相同的方式定义错误处理中间件函数，
除了使用四个参数而不是三个参数，特别是使用签名(err, req, res, next))：
*/



//该函数只捕捉所有请求处理流程中的异常，忽略除此之外Express发送的异常
module.exports = function (err, req, res, next) {

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

