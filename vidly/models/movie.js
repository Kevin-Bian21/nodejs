const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

const Movie = mongoose.model('Movies', new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true,
        minlength : 2,
        maxlength : 255
    },
    genre : {
        type : genreSchema,
        required : true
    },
    numberInStock : {
        type : Number,
        required : true,
        min : 0,
        max : 255
    },
    dailyRentalRate : {
        type : Number,
        required : true,
        min : 0,
        max : 255
    }
}));

function validateMovie(movie) {
    // 约束客户端的输入
    const schema = Joi.object({
        title : Joi.string().min(5).max(255).required(),
        genreId : Joi.string().required(),
        numberInStock : Joi.number().min(0).required(),
        dailyRentalRate : Joi.number().min(0).required()
    });
    return schema.validate(movie);
}

module.exports.Movie = Movie;
module.exports.validate = validateMovie;