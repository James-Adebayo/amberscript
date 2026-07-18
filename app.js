if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const port = process.env.PORT;
const removeTrailingSlash = require("./middleware/removeTrailingSlash");
const webRoutes = require("./routes/web");

const app = express();
// app.use(removeTrailingSlash);
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), "frontend")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", webRoutes);


module.exports = app;

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))