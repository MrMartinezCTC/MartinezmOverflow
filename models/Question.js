import Joi from 'joi';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    questionText: {
        required: true,
        type: String
    },
    usefulness: {
        default: 0,
        type: Number
    },
    views: {
        default: 0,
        type: Number
    },
    answers: {
        type: Array
    },
    tags: {
        type: Array
    },
    dateAsked: {
        type: Date
    },
    accepted: {
        default: false,
        type: Boolean
    },
    user: {
        type: String
    },
    upVotes: {
        type: Array,
        default: []
    },
    downVotes: {
        type: Array,
        default: []
    },
},{
    collection: 'questions'
});


export function validateQuestion (question) {
    const schema = Joi.object({
        title: Joi.string().required(),
        questionText: Joi.string().required(),
    });

    return schema.validate(question);
}


export const Question = mongoose.model('questions', QuestionSchema);
