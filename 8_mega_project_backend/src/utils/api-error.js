class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        error = [],    // there are different types of error(Google - error node and read the documentation).
        stack = "",    // --- Read it on google. --- 
    ){
        super(message);   // super() does is, it calls the parent class(i.e. class Error) constructor
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        // If no custom stack is provided, capture the stack trace
        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };