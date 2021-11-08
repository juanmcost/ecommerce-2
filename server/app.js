const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const router = require('./routes/');
const setupController = require('./controllers/seedController');
const client = require('./config/db');
dotenv.config();

const app = express();

app.use('/api', router);
app.get('/', (req, res, next) => {
    res.json('HOLA');
});

client.then(() => {
    //setupController();
    app.listen(process.env.PORT || 8080, () => {
        console.log('app conectada en http://localhost:8080');
    });
});
