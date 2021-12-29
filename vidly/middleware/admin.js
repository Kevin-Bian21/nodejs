function admin(req, res, next) {
    //是管理员的话就交给下面的函数执行
    if (req.user.isAdmin)
        next();
    return res.status(403).send('This operation need admin authority');
}

module.exports = admin;