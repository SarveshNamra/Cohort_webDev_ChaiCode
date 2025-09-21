import {body} from "express-validator"

const userRegistrationValidator = () => {
    return[
        body('email')
            .trim()
            .notEmpty().withMessage("Email is required")  // If this notEmpty() successfully nahi huaa to ham withMessage() thorw karange.
            .isEmail().withMessage("Email is invalid"),
        body("username")
            .trim()
            .notEmpty().withMessage("Username is required")
            .isLength({min: 3}).withMessage("Username should be at least 3 char")
            .isLength({max: 13}).withMessage("Username cannot exceed 13 char"),
        body("password")
            .trim()
            .notEmpty().withMessage("Password is required")
            .isLength({min: 8}).withMessage("Password should be at least 8 char")
            .isLength({max: 16}).withMessage("Password cannot exceed 16 char"),
        // body("confirmPassword")
        //     .trim()
        //     .notEmpty().withMessage("Confirm Password is required")
        //     .custom((value,{req}) => {
        //         if(value !== req.body.password){
        //             throw new Error("Your password and confirm password doesn't match")
        //         }
        //         return true;
        //     })
        //     .withMessage("Your password and confirm password doesn't match"),
        body("role")
            .optional()
            .isIn(AvailableUserRole).withMessage("Invalid role"),
    ];
};

const userLoginValidator = () => {
    return [
        body("email")
            .isEmail().withMessage("Email is not valid"),
        body("password")
            .notEmpty().withMessage("Password cannot be empty"),
    ];
};
export { userRegistrationValidator, userLoginValidator };