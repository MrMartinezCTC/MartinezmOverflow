// import mongoose from 'mongoose';
// import { _required } from '../utils/Model.js';
const mongoose = require('mongoose');
const { _required } = require('../utils/Model');//no js extension

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title: {
        required: _required('title'),
        type: String
    },
    questionText: {
        required: _required('questionText'),
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
    userId: {
        type: Object
    }
},{
    collection: 'questions'
});

QuestionSchema.index({ "title": "text", "questionText": "text" });


// export const Question = mongoose.model('questions', QuestionSchema);
module.exports.Question = mongoose.model('questions', QuestionSchema);
