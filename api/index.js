console.log("INDEX: File loaded");

module.exports = (req, res) => {
    console.log("INDEX: Function invoked");
    res.status(200).send("Index.js is working");
};
