const { Schema, model } = require('mongoose');

const Cart = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        products: [
            {
                productId: { type: String },
                quantity: { type: Number, default: 1 },
            },
        ],
        confirm: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// axios.post('', {item: [{productId: 3123, quantity: 2},{},{}]})
module.exports = model('Cart', Cart);
