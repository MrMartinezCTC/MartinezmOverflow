import Joi from 'joi';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    answerText: {
        required: true,
        type: String
    },
    usefulness: {
        default: 0,
        type: Number
    },
    user: {
        type: String
    },
    date: {
        type: Date
    },
    questionId: {
        type: Object
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
    collection: 'answers'
});


export function validateAnswer(answer) {
    const schema = Joi.object({
        answerText: Joi.string().required()
    });

    return schema.validate(answer);
}


export const Answer = mongoose.model('answers', AnswerSchema);
