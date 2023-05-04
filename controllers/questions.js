import express from 'express';
import { Question } from '../models/Question.js';
import { getDoc, sendError } from '../utils/jsonresponse.js';
import { errorWrap } from '../utils/errorHandling.js';

const router = express.Router();


router.post('/upload', errorWrap(async (req, res) => {
    const questionObj = {
        title: req.body.title,
        questionText: req.body.questionText
    }

    questionObj.dateAsked = (new Date ()).toUTCString();
    
    const user = req.user;
    questionObj.user = `${user.firstName} ${user.lastName}`;
    questionObj.userId = user._id;

    await Question.create(questionObj);

    res.status(201).json({ success: true });
}));


router.patch('/updateUsefulness', errorWrap((req, res) => updateUsefulness(req, res, Question)));



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

    return res.status(204).json();
}

export default router;