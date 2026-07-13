module.exports = (req, res, next) => {
    if (req.path.length > 1 && req.path.endsWith("/")) {
        return res.redirect(301, req.path.slice(0, -1));
    };
    next();
};
