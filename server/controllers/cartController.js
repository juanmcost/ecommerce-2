const Cart = require('../models/Cart');
const Product = require('../models/Products');

class CartController {
    // Create Cart
    static async createCart(req, res) {
        const { list, userId, total } = req.body; // products must be an array
        try {
            const cart = new Cart({
                userId,
                list,
                total
            });
            console.log("im saving this:", cart);
            const savedCart = await cart.save();
            return res.status(201).json(savedCart);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    // Get User Cart
    static async userCart(req, res) {
        try {
            console.log("im in")
            const cart = await Cart.findOne({ userId: req.params.id });
            console.log("cart:",cart)
            
            if (cart !== null) {
                let realCart = {list: [], total: cart.total}
                for (let i = 0; i < cart.list.length; i++) {
                    const cartItem = cart.list[i]  
                    const realItem = await Product.findById(cartItem.productId)  //change id to real product
                    realCart.list.push({product: realItem, quantity: cartItem.quantity});
                    console.log("im pushing!!", realCart)
                }
                console.log("ill send this:", realCart)
                return res.status(200).json({...realCart});
            }
            else return res.json(null);

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
        const { newCart } = req.body;
        try {
            let dbCart = {list: [], total: newCart.total};
            newCart.list.map((cartItem) =>{
                dbCart.list.push({productId: cartItem.product._id, quantity: cartItem.quantity})
            })
            const cart = await Cart.findOneAndUpdate(
                { userId: req.params.id },
                {
                    $set: {...dbCart}
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
            const deleted = await Cart.findOneAndDelete({ userId: req.params.id });
            return res.status(204).json(deleted);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}

module.exports = CartController;
