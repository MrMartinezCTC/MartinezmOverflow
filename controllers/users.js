const express = require('express');
const { User, validateUser } = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
    // First Validate The Request
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message);
    }

    // Check if this user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json('That user already exists!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });
        await user.save();
        res.send(user);
    }
});

module.exports = router;