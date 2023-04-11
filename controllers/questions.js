const express = require('express');
const { validateQuestion, Question } = require('../models/Question');
const router = express.Router();

router.post('/upload', async (req, res) => {
    const { error } = validateQuestion(req.body);
    if (error) res.status(400).json({
        isError: true,
        msg: error.details[0].message
    })
    
    const questionObj = { ... req.body };

    questionObj.dateAsked = (new Date ()).toUTCString();
    
    const user = req.user;
    questionObj.user = `${user.firstName} ${user.lastName}`;

    await Question.create(questionObj);


    res.status(200).json({
        success: true
    });
});

module.exports = router;


