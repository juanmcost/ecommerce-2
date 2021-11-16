const Cart = require('../models/Cart');

class CartController {
    // Create Cart
    static async createCart(req, res) {
        const { products } = req.body; // products must be an array
        try {
            const cart = new Cart({
                userId: req.user[0]._id,
                products,
            });
            const savedCart = await cart.save();
            return res.status(201).json(savedCart);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    // Get User Cart
    static async userCart(req, res) {
        try {
            const cart = await Cart.findOne({ userId: req.params.id });
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // Get All Carts
    static async allCarts(req, res) {
        try {
            const allCarts = await Cart.find();
            res.status(200).json(allCarts);
        } catch (error) {
            res.status(500).json(err);
        }
    }

    // Update Cart
    static async updateCart(req, res) {
        const { products } = req.body;
        try {
            const cart = await Cart.findByIdAndUpdate(
                req.params.id,
                {
                    $set: { products: products },
                },
                { new: true }
            );
            return res.status(201).json(cart);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    // Delete Cart
    static async deleteCart(req, res) {
        try {
            const deleted = await Cart.findByIdAndDelete(req.params.id);
            return res.status(204).json(deleted);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}

module.exports = CartController;
