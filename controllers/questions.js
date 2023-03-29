const express = require('express');
const { validateQuestion } = require('../models/Question');
const router = express.Router();

router.post('/upload', async (req, res) => {
    const { error } = validateQuestion(req.body);
    if (error) res.status(400).json({
        isError: true,
        msg: error.details[0].message
    })
    
    const questionObj = { ... req.body };

    questionObj.dateAsked = (new Date ()).toUTCString();


    // res.status(200).json('not set up');
});

module.exports = router;


