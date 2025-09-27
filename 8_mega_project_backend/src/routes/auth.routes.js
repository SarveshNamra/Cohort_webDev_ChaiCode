import { Router } from "express";
import {registerUser, verifiEmail, resendVerificationEmail} from "../controllers/auth.controllers.js";
import {validate} from "../middleware/validator.middleware.js";
import { userRegistrationValidator } from "../validators/index.js";

const router = Router();

router.route("/register").post(userRegistrationValidator(), validate, registerUser);  
// We exicuted this -> userRegistrationValidator() forcefull and it returns/creates an array in body which is work of express behind the seens.
// And the returned arrays value will be pass on to the validate
// It take all the things in req (request) like code in file validators -> index.js

/* Why we use "userRegistrationValidator()" this because, there is no use of next() in validators -> index.js
so we dont have any excution method to go to next (as every middleware has it next()). Want is that our req must never stop.
We just want this -> userRegistrationValidator() method to be exicuted when user comes to route "/register".

karneko to ham validate file may kar sakate the like registrationCheck, loginCheck ka middleware by using next().
Par ye alag syntax bhi to samaj aana chaheye to isleya likha.
This type of code writing is called factory pattern.
*/

// Email verification routes
router.route("/verify/:unHashedToken").get(verifiEmail);
router.route("/resend-verification").post(resendVerificationEmail);

export default router;