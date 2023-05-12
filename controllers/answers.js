// import express from 'express';
// import { Answer } from '../models/Answer.js';
// import { forceSignIn, getDoc, sendError, validateId } from '../utils/jsonresponse.js';
// import { Question } from '../models/Question.js';
// import { updateUsefulness } from './questions.js';
// import mongoose from 'mongoose';
// import { errorWrap } from '../utils/errorHandling.js';

const express = require('express');
const { Answer } = require('../models/Answer');
const { forceSignIn, getDoc, sendError } = require('../utils/jsonresponse');//no js extension
const { Question } = require('../models/Question');//no js extension
const { updateUsefulness } = require('./questions');//no js extension
const mongoose = require('mongoose');
const { errorWrap } = require('../utils/errorHandling');//no js extension


const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();


router.use(forceSignIn);

router.post('/upload', errorWrap(async (req, res) => {
    const answerObj = { answerText: req.body.answerText }

    const user = req.user, id = req.body.id;
    if (!user) return sendError(res, 401, "Must be logged in to answer a question.");
    
    const question = await getDoc(id, Question);
    if (!question) return sendError(res, 400, "There are no questions with the id provided.");
    
    answerObj.user = `${user.firstName} ${user.lastName}`;
    answerObj.date = (new Date ()).toUTCString();
    answerObj.questionId = new ObjectId(id);

    const databaseAnswer = await Answer.create(answerObj);
    question.answers.push(databaseAnswer._id);

    await question.save();

    res.status(201).json({ success: true });
}));

router.patch('/updateUsefulness', errorWrap((req, res) => updateUsefulness(req, res, Answer)));


// export default router;
module.exports = router;
