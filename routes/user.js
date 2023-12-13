const express = require("express");
const router = express.Router();

// import controllers
const { login, signup } = require("../controllers/Auth");

// import middlewares
const { auth, isStudent, isAdmin } = require("../middlewares/auth");

// api routes
router.post("/signup", signup);
router.post("/login", login);

// testing protected route for single middleware
router.get("/test", auth, (req, res) => { 
    res.json({
        success: true,
        message: "Welcome to the protected route for TEST"
    });
})

// protected middleware routes
// router.method("path", all middles functions, callback function)
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for Students"
    });
});

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for Admin"
    });
})

// export
module.exports = router;