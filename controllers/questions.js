import express from 'express';
import { validateQuestion, Question } from '../models/Question.js';
import { getDoc, sendError } from '../utils/jsonresponse.js';

const router = express.Router();


router.post('/upload', async (req, res) => {
    const questionObj = {
        title: req.body.title,
        questionText: req.body.questionText
    }
    
    const { error } = validateQuestion(questionObj);
    if (error) return sendError(res, 400, error.details[0].message);

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

    if (typeof req.body.add !== 'boolean') return sendError(res, 400, 'add value must be a boolean');

    const typeOfVote = ['down', 'up'];
    const voteInd = req.body.add * 1;

    if (doc[`${typeOfVote[voteInd]}Votes`].indexOf(req.user._id) > -1) {
        return sendError(res, 400, `You have already ${typeOfVote[voteInd]}voted this.`);
    }

    const indOfOppositeVote = doc[`${typeOfVote[Math.abs(voteInd - 1)]}Votes`].indexOf(req.user._id)
    if (indOfOppositeVote > -1) doc[`${typeOfVote[Math.abs(voteInd - 1)]}Votes`].splice(indOfOppositeVote, 1);
    else doc[`${typeOfVote[voteInd]}Votes`].push(req.user._id);

    doc.usefulness += voteInd * 2 - 1;
    
    await doc.save();

    return res.status(204).json({ success: true });
}

export default router;