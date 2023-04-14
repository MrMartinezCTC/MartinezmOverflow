import express from 'express';
import { validateAnswer, Answer } from '../models/Answer.js';
import { getDoc, sendError, validateId } from '../utils/jsonresponse.js';
import { Question } from '../models/Question.js';
import { updateUsefulness } from './questions.js';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;


const router = express.Router();

router.post('/upload', async (req, res) => {
    const answerObj = { content: req.body.content }
    
    const { error } = validateAnswer(answerObj);
    if (error) return sendError(res, 400, error.details[0].message);

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

    res.status(200).json({
        success: true
    });
});

router.patch('/updateUsefulness', (req, res) => updateUsefulness(req, res, Answer));


export default router;
