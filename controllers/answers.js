import express from 'express';
import { validateAnswer, Answer } from '../models/Answer.js';
import { sendError, validateId } from '../utils/jsonresponse.js';
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
    if (!id) return sendError(res, 400, "Must supply a question id to answer a question.");
    if (!validateId(id)) return sendError(res, 400, "The question id supplied does not exist.");
    
    answerObj.user = `${user.firstName} ${user.lastName}`;
    answerObj.date = (new Date ()).toUTCString();
    answerObj.questionId = new ObjectId(id);

    await Answer.create(answerObj);

    res.status(200).json({
        success: true
    });
});

router.patch('/updateUsefulness', (req, res) => updateUsefulness(req, res, Answer));


export default router;
