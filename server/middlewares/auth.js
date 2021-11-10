const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.status(401).send('## Login is required ##');
};

const checkAuthAndAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user[0].isAdmin) return next();
    return res.status(401).send('User is not an admin');
};

const checkAuthAndAuthorization = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user[0]._id === req.params.id || req.user[0].isAdmin) {
            return next();
        }
    }
    return res.status(401).send('You are not allowed to do that!');
};

module.exports = { checkAuth, checkAuthAndAdmin, checkAuthAndAuthorization };
