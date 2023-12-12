const express = require("express");
const router = express.Router();

// import controllers
const { login, signup } = require("../controllers/Auth");

// api routes
router.post("/signup", signup);
router.post("/login", login);

// export
module.exports = router;