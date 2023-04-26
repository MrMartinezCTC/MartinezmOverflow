import Joi from 'joi';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const UserSchema = new Schema({
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

UserSchema.path('email').validate(async email => {
    const emailCount = await mongoose.models.User.countDocuments({ email });
    return !emailCount;
}, 'Email already exists');


export function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().max(20).required(),
        lastName: Joi.string().max(20).required(),
        email: Joi.string().max(255).required().email(),
        password: Joi.string().min(8).max(100).required()
    });

    return schema.validate(user);
}

export const User = mongoose.model('User', UserSchema);

