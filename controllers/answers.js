const express = require('express');
const { validateAnswer, Answer } = require('../models/Answer');
const { sendError } = require('../utils/jsonresponse');
const { Question } = require('../models/Question');
const router = express.Router();

router.post('/upload', async (req, res) => {
    const { error } = validateAnswer(req.body);
    if (error) res.status(400).json({
        isError: true,
        msg: error.details[0].message
    })
    
    const answerObj = { ... req.body };

    const user = req.user, id = req.body.id;
    
    if (!user) return sendError(res, 401, "Must be logged in to answer a question.");
    if (!id) return sendError(res, 400, "Must supply a question id to answer a question.");
    if(!(await Question.exists({ _id: id }))) return sendError(res, 400, "The question id supplied does not exist.");

    
    answerObj.user = `${user.firstName} ${user.lastName}`;
    answerObj.dateAsked = (new Date ()).toUTCString();
    answerObj.questionId = id;

    await Answer.create(answerObj);

    res.status(200).json({
        success: true
    });
});

module.exports = router;

