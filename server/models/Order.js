const { Schema, model } = require('mongoose');

const ListedProduct = new Schema({
    product: { 
        type: Object, 
        required: true 
    },
    quantity: { 
        type: Number, 
        default: 1 
    },
})

const Order = new Schema({
    userId: { 
        type: String, 
        required: true 
    },
    products: [
        {
            product: { 
                type: Object 
            },
            quantity: { 
                type: Number, 
                default: 1 
            }
        }
    ],
    payMethod: { 
        type: String, 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    address: { 
        type: Object, 
        required: true 
    },
    Confirmed: { 
        type: Boolean, 
        default: false 
    },
});

module.exports = model('Order', Order);
