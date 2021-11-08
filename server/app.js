const express = require('express');

const app = express();

const PORT = 8080;

app.get('/', (req, res, next) => {
    res.json('HOLA    ');
});

app.listen(PORT, () => {
    console.log('app conectada en http://localhost:8080');
});
