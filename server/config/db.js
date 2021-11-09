const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const client = mongoose
    .connect(process.env.MONGO_HOST_AUX, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((e) => console.log('MongoDB Error: ' + e));

module.exports = client;
