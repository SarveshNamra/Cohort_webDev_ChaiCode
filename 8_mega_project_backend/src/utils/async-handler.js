// ---- asyncHandler is the solution repetative try-catch  ----

const asyncHandler = (reguestHandler) => {
    return function(req, res, next){     // return is high-order function
        /*  - If requestHandler is an async function, it returns a Promise.
            - If it’s not a Promise, Promise.resolve(...) will wrap it in one anyway, making this universal. */
        
        Promise.resolve(reguestHandler(req, res, next))    // Promise also there
            .catch(function(err){
                next(err)
            })
    }
}

export { asyncHandler }