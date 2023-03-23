const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({
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
});


User.plugin(passportLocalMongoose);
  
module.exports = mongoose.model('User', User);
