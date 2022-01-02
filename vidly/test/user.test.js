const {User} = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const { iteratee } = require('lodash');

describe('user.generateAuthToken', () => {
    it('应该返回一个有效的JWT', () => {
        const payload = { _id : mongoose.Types.ObjectId(), isAdmin  : true };
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);
    })
});