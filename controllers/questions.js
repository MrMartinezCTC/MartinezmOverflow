import express from 'express';
import { validateQuestion, Question } from '../models/Question.js';
import { getDoc, sendError } from '../utils/jsonresponse.js';

const router = express.Router();


router.post('/upload', async (req, res) => {
    const { error } = validateQuestion(req.body);
    if (error) sendError(res, 400, error.details[0].message);
    
    const questionObj = { ... req.body };

    questionObj.dateAsked = (new Date ()).toUTCString();
    
    const user = req.user;
    questionObj.user = `${user.firstName} ${user.lastName}`;

    await Question.create(questionObj);

    res.status(201).json({ success: true });
});


router.patch('/updateUsefulness', (req, res) => updateUsefulness(req, res, Question));


export const updateUsefulness = async (req, res, Model) => {
    if (!req.user) return sendError(res, 401, 'Must be signed in to vote.');

    const doc = await getDoc(req.body.id, Model);
    if (!doc) return sendError(res, 400, 'Could not find document with provided id.');

    const change = req.body.add ? 1 : -1;
    doc.usefulness += change;
    
    await doc.save();

    return res.status(204).json({ success: true });
}


export default router;