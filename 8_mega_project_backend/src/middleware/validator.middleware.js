import {validationResult} from "express-validator";
import {ApiError} from "../utils/api-error.js";

export const validator = (req, res, next) => {
    const errors = validationResult(req);    // ---- whats the datatype of errors, is it array ? ----

    if(errors.isEmpty()){
        return next();
    }

    // * * * * ---  need to understantd this below code ---  * * * *
    const extractedError = [];
    errors.array().map((err) => 
        extractedError.push({
            [err.path]: err.msg,
        }),
    );

    throw new ApiError(422, "Recieved data in not valid", extractedError);

};