import { sendError } from "./jsonresponse.js";

export function errorWrap (func) {
    return async function (req, res) {
        try {
            await func (req, res);
        } catch (error) {
            if (error.name === 'ValidationError') {
                let errors = {};

                Object.keys(error.errors).forEach((key) => {
                    errors[key] = error.errors[key].message;
                });

                return sendError(res, 400, errors);
            }

            sendError(res, 500, 'Something terrible has happened.');
        }
    }
}


