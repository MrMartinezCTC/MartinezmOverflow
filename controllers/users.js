import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, validateUser } from '../models/User.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    let failMsg = '';
    
    // First Validate The Request
    const { error } = validateUser(req.body);
    if (error) failMsg = error.details[0].message;
    else {
        // Check if this user already exists
        const user = await User.findOne({ email: req.body.email });
        if (user) failMsg = 'The email provided is already in use.'
    }

    if (failMsg) return res.status(400).json({
        isError: true,
        msg: failMsg
    });

    const hash = await bcrypt.hash(req.body.password, 10);
    
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
    });
    await user.save();

    res.cookie(...setCookie(req.body.email));
    res.status(201).json(user);
});


router.post('/login', async (req, res) => {
    let failure = false;

    const user = await User.findOne({ email: req.body.email });
    if (!user) failure = true;
    else {
        const passIsCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!passIsCorrect) failure = true;
    }

    if (failure) return res.status(400).json({
        isError: true,
        msg: 'Invalid email/password'
    });

    res.cookie(...setCookie(req.body.email));
    res.status(200).json({
        success: true,
    });
});


router.get('/logout', (req, res) => {
    res.clearCookie('mrCookie');

    res.status(200).json({
        success: true
    });
});


function setCookie(email) {
    return [
        'mrCookie',
        jwt.sign({ email }, process.env.SECRET, { expiresIn: '30d' }),
        {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: (new Date ()).getMilliseconds() + 1000 * 86_400 * 30
        }
    ];
}

// module.exports = router;
export default router;
