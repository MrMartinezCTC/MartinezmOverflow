const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Question = new Schema({
    title: {
        required: true,
        type: String
    },
    questionText: {
        required: true,
        type: String
    },
    questionMarkup: {
        required: true,
        type: String
    },
    usefulness: {
        type: Number
    },
    views: {
        type: Number
    },
    answers: {
        type: Number
    },
    dateAsked: {
        type: Date
    },
    accepted: {
        type: Boolean
    },
    userId: {
        type: String
    }
},{
    collection: 'questions'
});


function validateQuestion (question) {
    const schema = Joi.object({
        title: Joi.string().required(),
        questionText: Joi.string.required(),
        questionMarkup: Joi.string.required()
    });

    return schema.validate(question);
}


exports.Question = mongoose.model('questions', Question);
exports.validateQuestion = validateQuestion;
