const { Schema, model } = require('mongoose');

const User = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
        },
        status: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = model('User', User);
