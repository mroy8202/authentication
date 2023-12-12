const express = require("express");
const app = express();
const dbConnect = require("./config/database");
const user = require("./routes/user");

require("dotenv").config();
const port = process.env.PORT || 4000;
app.use(express.json());

// connect database
dbConnect();

// mount route
app.use("/api/v1", user);

app.listen(port, () => {
    console.log(`APP IS RUNNING ON PORT ${port}`);
});