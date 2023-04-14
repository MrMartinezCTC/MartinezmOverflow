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

    return await Model.findById(id);
} 
