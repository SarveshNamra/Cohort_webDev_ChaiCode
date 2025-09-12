import {asyncHandler} from "../utils/async-handler.js"

const registerUser = asyncHandler(async (req, res) => {
    // 1. get user data 
    const {username, email, password, role} = req.body

    // validation

        // if(!email || !password){

        // }
        // if(password.length < 8){}
        
        // const isValidate = validateMe(password); // validateMe is method which will return true or false.
  
        registrationValidation(body)
})

export {registerUser}