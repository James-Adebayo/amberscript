console.log("1: Starting app.js");

require("dotenv").config();
console.log("2: dotenv loaded");

const express = require("express");
console.log("3: express loaded");

const path = require("path");
console.log("4: path loaded");

const cookieParser = require("cookie-parser");
console.log("5: cookie-parser loaded");

const removeTrailingSlash = require("./middleware/removeTrailingSlash");
console.log("6: removeTrailingSlash loaded");

// Commented out for isolation
// const webRoutes = require("./routes/web");
// console.log("7: webRoutes loaded");

const app = express();
console.log("8: Express app created");

// app.use(removeTrailingSlash);

app.use(cookieParser());
console.log("9: cookie-parser middleware registered");

// Temporarily comment this out too if it still crashes.
// app.use(express.static(path.join(process.cwd(), "frontend")));
// console.log("10: static middleware registered");

app.use(express.json());
console.log("11: json middleware registered");

app.use(express.urlencoded({ extended: true }));
console.log("12: urlencoded middleware registered");

// app.use("/", webRoutes);

app.get("/", (req, res) => {
    console.log("13: GET / reached");
    res.send("Server works");
});

console.log("14: Exporting app");

module.exports = app;