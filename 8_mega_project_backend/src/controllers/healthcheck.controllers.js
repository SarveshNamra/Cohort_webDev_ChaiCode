import {ApiResponse} from "../utils/api-response.js"

const healthCheck = async (req, res) => {    // Ye req, res hame miltay hai jab healthCheck router may jata hai.
                                            // Yani ke jab ye method exicute hoga tab router uskay ander appneap ye req, res methods dal dega
    try {
        await console.log("logic to connect DB");

        res.status(200).json(
        new ApiResponse(200, {message: "Server is running"})
        );
    } catch (error) {
        
    }
};

export { healthCheck };