const { Schema, model } = require('mongoose');

const Product = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        img: {
            type: Array,
            required: true,
        },
        category: {
            type: Array,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        color: {
            type: String,
        },
    },
    { timestamps: true } // createAt updateAt
);

module.exports = model('Product', Product);
