// import { sendError } from "./jsonresponse.js";
const { sendError } = require("./jsonresponse.js");

// export function errorWrap (func) {
module.exports.errorWrap = function (func) {
    return async function (req, res, next) {
        try {
            await func (req, res, next);
        } catch (error) {
            if (error.name === 'ValidationError') {
                let errors = {};

                Object.keys(error.errors).forEach((key) => {
                    errors[key] = error.errors[key].message;
                });

                return sendError(res, 400, errors);
            }

            sendError(res, 500, 'Something terrible has happened.');
            console.log(error);
        }
    }
}


