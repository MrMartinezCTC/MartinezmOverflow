import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;


export const sendError = (res, status, message) => {
    res.status(status).json({
        isError: true,
        message
    })
}

export const validateId = async (id, Model) => {
    return ObjectId.isValid(id) && (!Model || (await Model.exists({ _id: id })));
}

export const getDoc = async (id, Model) => {
    if (!validateId(id)) return false;
    try {
        return await Model.findById(id);
    } catch (error) {
        return false;
    }
} 


export const forceSignIn = async (req, res, next) => {
    if (!req.user) return sendError(res, 401, 'Must be signed in to perform attempted action.');
    next();
}

export const sendCookie = (res, cookieName, cookieObj, expiresIn, maxAgeInSeconds) => {
    res.cookie(
        cookieName,
        jwt.sign(cookieObj, process.env.SECRET, { expiresIn }),
        {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: (new Date ()).getMilliseconds() + 1000 * maxAgeInSeconds
        }
    );
}

