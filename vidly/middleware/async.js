//捕获处理异常单独封装成函数，之后只需要调用该函数即可实现异常的捕获，就不用再一遍遍的去写 try catch 语句了
moudle.exports = function (handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch (err) {
            next(err);
        }
    }
}