const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const { boolean } = require('joi');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 50
    },
    email : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 255,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 1024,
    },
    isAdmin : boolean
});

//创建token
userSchema.methods.generateAuthToken = function() {
    //token中要包含的数据
    const token = jwt.sign({ _id : this._id, isAdmin : this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name : Joi.string().min(2).max(50).required(),
        email : Joi.string().min(5).max(255).required().email(),
        password : Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;