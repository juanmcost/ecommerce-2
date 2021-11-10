const Product = require('../models/Products');
const data = require('../data.json');

module.exports = () => {
    const seedDB = async () => {
        await Product.deleteMany({});
        await Product.insertMany(data);
    };
    seedDB().then(() => {
        console.log('seed complete');
    });
};
