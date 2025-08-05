import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
    // Token form cookies.
    // Check token.
    // Collect data form token.

    // 1) Token form cookies.
    try {
        console.log(req.cookies);  // For debugging
        let token = req.cookies?.token      // let token = req.cookies.token || "" ;
        console.log('Token Found', token ? "Yes" : "No")

        // 2) Check token.
        if(!token){
            console.log("No token");
            return res.status(401).json({
                success: false,
                message: "Authentication failed"
            })
        }

        // 3) Collect data form token.
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded data : ", decoded);    // 'decoded' is the object.
        req.user = decoded;

        next();

    } catch (error) {
        console.log("Auth middleware failure.")
        return res.status.json({
            success: false,
            message: "Internal server error"
        })
    }
    // next();     // Here we are giving 2 time responce insted of 1 responce so use only one next(); at point no. 3)
};