require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const removeTrailingSlash = require("./middleware/removeTrailingSlash");
const webRoutes = require("./routes/web");

const app = express();

// app.use(removeTrailingSlash);
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "frontend")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", webRoutes);
module.exports = app;