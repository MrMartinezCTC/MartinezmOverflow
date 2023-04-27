import mongoose from 'mongoose';
import { _maxLength, _minLength, _required } from '../utils/Model.js';

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: {
        maxLength: _maxLength('email', 50),
        required: _required('email'),
        unique: true,
        type: String
    },
    firstName: {
        maxLength: _maxLength('firstName', 20),
        required: _required('firstName'),
        type: String
    },
    lastName: {
        maxLength: _maxLength('lastName', 20),
        required: _required('lastName'),
        type: String
    },
    password: {
        maxLength: _maxLength('password', 100),
        required: _required('password'),
        minLength: _minLength('password', 8),
        type: String,
    }
},{
    collection: 'users'
});

UserSchema.path('email').validate(async email => {
    const emailCount = await mongoose.models.User.countDocuments({ email });
    return !emailCount;
}, 'The provided email is already in use.');


export const User = mongoose.model('User', UserSchema);
