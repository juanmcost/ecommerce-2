const authorization = (req, res, next) => {
    if (req.isAuthenticated()) return next();

    return res.status(401).send('## Login required ##');
};

module.exports = authorization;
