const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Answer = new Schema({
    content: {
        required: true,
        type: String
    },
    usefulness: {
        default: 0,
        type: Number
    },
    user: {
        type: String
    }
},{
    collection: 'answers'
});


function validateAnswer(answer) {
    const schema = Joi.object({
        content: Joi.string().required()
    });

    return schema.validate(answer);
}


exports.Answer = mongoose.model('answers', Answer);
exports.validateAnswer = validateAnswer;
