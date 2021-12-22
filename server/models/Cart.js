const { Schema, model } = require('mongoose');

const Cart = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        list: [
            {
                productId: { type: String },
                quantity: { type: Number, default: 1 },
            },
        ],
        total: { 
            type: Number, 
            required: true
        },
        confirm: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = model('Cart', Cart);
