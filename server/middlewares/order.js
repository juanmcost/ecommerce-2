const Cart = require('../models/Cart');

const checkStatusOrder = async (req, res, next) => {
    if (req.isAuthenticated()) {
        const cart = await Cart.find({ userId: req.user[0]._id });
        return cart.confirm === true
            ? next()
            : res.status(401).json('This cart is not authorized, please verify your email');
    }
    return res.status(401).json('Unauthorized');
};

module.exports = { checkStatusOrder };
