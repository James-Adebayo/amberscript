// const express = require('express');
// const path = require("path");
// // require('dotenv').config();

// const app = express();
// const port = 3000;

// app.use(express.static(path.join(__dirname, "frontend")));

// const verified = false;

// const routes = {
//     "/": "index.html",
//     "/auth": "auth/index.html",
//     "/tasks": "tasks/",
//     "/wallet": "wallet/index.html"
// }

// app.use((req, res, next) => {
//     if (req.path.length > 1 && req.path.endsWith("/")) {
//         return res.redirect(301, req.path.slice(0, -1));
//     }
//     next();
// });

// app.get("/", protectedRoute, (req, res) => {
//     const file = routes[req.path];

//     if (file) {
//         res.sendFile(path.join(__dirname, "frontend", file));
//     } else {
//         res.status(400).sendFile(__dirname, "frontend", "404.html");
//     }
// });

// function protectedRoute(req, res, next) {
//     if (!verified) {
//         return res.redirect('/auth');
//     }
//     next();
// }

// module.exports = app;

// app.listen(port, () => console.log(`Server running at http://localhost:${port}`));







