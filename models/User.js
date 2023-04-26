import Joi from 'joi';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: {
        maxLength: [50, 'email can not contain more than 50 characters'],
        required: true,
        unique: true,
        type: String
    },
    firstName: {
        maxLength: [20, 'firstName can not contain more than 20 characters'],
        required: true,
        type: String
    },
    lastName: {
        maxLength: [20, 'lastName can not contain more than 20 characters'],
        required: true,
        type: String
    },
    password: {
        maxLength: [100, 'password can not contain more than 100 characters'],
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


export const User = mongoose.model('User', UserSchema);

