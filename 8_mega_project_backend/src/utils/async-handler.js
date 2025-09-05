// asyncHandler is the solution repetative try-catch

const asyncHandler = (reguestHandler) => {
    return (req, res, next) => {
        Promise
            .resolve(reguestHandler(req,res,next))
            .catch((err) => next(err))
    }
}

export { asyncHandler }