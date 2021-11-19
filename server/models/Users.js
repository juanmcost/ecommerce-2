const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const User = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        country: {
            type: String,
        },
        city: {
            type: String,
        },
        phone: {
            type: Number,
        },
        image: {
            type: String,
        },
        adress: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        status: {
            type: Boolean,
            default: true,
        },
        facebookId: {
            type: String,
            default: null,
        },
        googleId: { type: String, default: null },

        fullname: {
            type: String,
        },
    },
    { timestamps: true }
);

// Instance Method => check password
User.method({
    matchPassword: async function (password) {
        const res = await bcrypt.compareSync(password, this.password);
        return res;
    },
});

//Schema Hook => hash password
User.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    return next();
});

module.exports = model('User', User);
