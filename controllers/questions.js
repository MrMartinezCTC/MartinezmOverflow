import express from 'express';
import { Question } from '../models/Question.js';
import { Answer } from '../models/Answer.js';
import { forceSignIn, getDoc, sendError } from '../utils/jsonresponse.js';
import { errorWrap } from '../utils/errorHandling.js';
import { questionPageClients } from '../app.js';

const router = express.Router();

router.use(forceSignIn);


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


router.get('/userIsLeaving', (req, res) => {
    const { viewCookie } = req.cookies;
    if (!viewCookie) return res.json({ message: "don't care." });

    const minutesPassed = Date.now() - viewCookie.timeIn * 1000 * 60;
    if (minutesPassed > 2) return res.json({ message: "don't care." });

    clearTimeout(questionPageClients[viewCookie.clientId]);
    delete questionPageClients[viewCookie.clientId];

    res.clearCookie('mrCookie');
    res.status(200).json({ success: true });
});


router.patch('/updateAccepted', errorWrap(async (req, res) => {
    const answer = await getDoc(req.body.id, Answer);
    if (!answer) return sendError(res, 400, 'Could not find answer with provided id.');
    
    if (typeof req.body.boolVal !== 'boolean') return sendError(res, 400, 'boolVal value must be a boolean');

    const question = await Question.findById(answer.questionId);

    const previousAcceptedAnswer = await Answer.findOne({ questionId: answer.questionId, accepted: true });

    if (previousAcceptedAnswer && previousAcceptedAnswer !== answer) {
        previousAcceptedAnswer.accepted = false;
        await previousAcceptedAnswer.save();
    } 

    question.accepted = req.body.boolVal;
    answer.accepted = req.body.boolVal;
    
    await answer.save();
    await question.save();
    
    return res.status(204).json();
}));


router.patch('/updateUsefulness', errorWrap((req, res) => updateUsefulness(req, res, Question)));

export const updateUsefulness = async (req, res, Model) => {

    const doc = await getDoc(req.body.id, Model);
    if (!doc) return sendError(res, 400, 'Could not find document with provided id.');

    if (typeof req.body.boolVal !== 'boolean') return sendError(res, 400, 'boolVal value must be a boolean');

    const typeOfVote = ['down', 'up'];
    const voteInd = req.body.boolVal * 1;

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