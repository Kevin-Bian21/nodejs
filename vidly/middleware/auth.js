const jwt = require('jsonwebtoken');
const config = require('config');

//用户登录之后进行相关操作时再验证用户是否有合法的 token
function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token)
        return res.status(401).send('Access denied. No token');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}

module.exports = auth;