import mongoose from 'mongoose';
import { _maxLength, _minLength, _required } from '../utils/Model.js';

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: {
        maxLength: _maxLength('email', 50),
        required: _required('email'),
        match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
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
