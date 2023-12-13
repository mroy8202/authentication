const express = require("express");
const app = express();
const dbConnect = require("./config/database");
const user = require("./routes/user");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());

// connect database
dbConnect();

// mount route
app.use("/api/v1", user);

app.listen(port, () => {
    console.log(`APP IS RUNNING ON PORT ${port}`);
});