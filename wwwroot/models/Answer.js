import mongoose from 'mongoose';
import { _required } from '../utils/Model.js';

const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    answerText: {
        required: _required('answer'),
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
    accepted: {
        type: Boolean,
        default: false
    }
},{
    collection: 'answers'
});


export const Answer = mongoose.model('answers', AnswerSchema);
