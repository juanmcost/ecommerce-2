const jwt = require('jsonwebtoken');

const sendEmail = require('../utils/email');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const stripe = require("stripe")(stripeSecretKey);

class OrderController {
    // Send confirmation email
    static async confirm(req, res) {
        try {
            const token = jwt.sign({ user: req.user[0]._id }, process.env.JWT_SECRET, { expiresIn: '10m' });

            const message = `
            Click on this link to make a cart verificacion!
            ${'http://localhost:3000'}/${req.user[0]._id}/myCart/confirm/${token}`;

            await sendEmail(req.user[0].email, 'Cart purchase verification', message);

            return res.send('An Email sent to your account please verify');
        } catch (error) {
            return res.status(400).send('An error occured');
        }
    }

    // Set Cart confirmation
    static async confirmCart(req, res) {
        try {
            const { user } = jwt.verify(req.params.token, process.env.JWT_SECRET);

            const cart = await Cart.findOneAndUpdate(
                { userId: user },
                { $set: { confirm: true } },
                { new: true }
            );

            return res.send(cart);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    // Create Order
    static async createOrder(req, res) {
        console.log("im creating order")
        try {
            const { products, payMethod, amount, address } = req.body; // products must be an array
            console.log(req.body);
            const newOrder = new Order({
                userId: req.user[0]._id || "619af0bb38788191f7d88446",
                products,
                payMethod,
                amount,
                address
            });
            const order = await newOrder.save();
            return res.status(201).json(order);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    //Return All User Orders

    static async returnOrders(req, res) {
        try {
            const orders = await Order.find({ userId: req.user[0]._id });
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}

module.exports = OrderController;
