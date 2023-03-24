const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    email: {
        maxLength: 50,
        required: true,
        unique: true,
        type: String
    },
    firstName: {
        maxLength: 20,
        required: true,
        type: String
    },
    lastName: {
        maxLength: 20,
        required: true,
        type: String
    },
    password: {
        maxLength: 100,
        required: true,
        minLength: 8,
        type: String,
    }
},{
    collection: 'users'
});


function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().max(20).required(),
        lastName: Joi.string().max(20).required(),
        email: Joi.string().max(255).required().email(),
        password: Joi.string().min(8).max(100).required()
    });

    return schema.validate(user);
}


exports.User = mongoose.model('users', User);
exports.validateUser = validateUser;
