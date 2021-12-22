const Product = require('../models/Products');
const User = require('../models/Users');
const data = require('../data.json');

module.exports = () => {
    const seedDB = async () => {
        await User.deleteMany({});
        await Product.insertMany(data);
    };
    seedDB().then(() => {
        console.log('seed complete');
    });
};
