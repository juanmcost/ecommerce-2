const { Schema, model } = require('mongoose');

const Order = new Schema({
    userId: { type: String, required: true },
    products: [
        {
            productId: { type: String, required: true },
            quantity: { type: Number, default: 1 },
        },
    ],
    payMethod: { type: String, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: 'Confirmed' },
});

module.exports = model('Order', Order);
