// auth, isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

// middlewares
// auth middleware
exports.auth = (req, res, next) => {
    try {
        // extract jwt token
        // 3 ways to fetch jwt token

        console.log("cookie" , req.cookies.token);
        console.log("body" , req.body.token);
        console.log("header" , req.header("Authorization"));

        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");

        // when token is not available 
        if(!token || token === undefined) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }

        // verify the token
        try {
            // jwt.verify(token, secretKey)
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // decode will have the payload defined in controllers/Auth.js
            console.log(decode);

            req.user = decode;
        } 
        catch(error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }

        next();
    } 
    catch(error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying the token"
        });
    }
}

// isStudent middleware
exports.isStudent = (req, res, next) => {
    try {
        if(req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Students"
            });
        }

        next();
    }
    catch {
        return res.status(500).json({
            success: false,
            message: "User role is not matching"
        });
    }
}

// isAdmin middleware
exports.isAdmin = (req, res, next) => {
    try {
        if(req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin"
            });
        }

        next();
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "User role is not matching"
        });
    }
}