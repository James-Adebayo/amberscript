console.log("1: Before require");

try {
    const app = require("../app");
    console.log("2: After require");

    module.exports = app;
} catch (err) {
    console.error("Require failed:");
    console.error(err);

    module.exports = (req, res) => {
        res.status(500).json({
            message: err.message,
            stack: err.stack
        });
    };
}