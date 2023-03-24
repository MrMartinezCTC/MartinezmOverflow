const express = require('express');
const router = express.Router();

router.post('/upload', async (req, res) => {
    res.status(200).json('not set up');
});

module.exports = router;


