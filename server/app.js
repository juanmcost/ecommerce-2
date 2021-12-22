const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
const volleyball = require('volleyball');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const router = require('./routes/');
const client = require('./config/db');

require('./config/passport-fb');
require('./config/passport-google');
require('./config/passport-local');

const app = express();

app.use(
    cors({
        origin: '*',
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(volleyball);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 3600 * 24 * 60 * 60 * 365,
        },
    })
);

app.use(express.static(__dirname + './public'));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', router);

client.then(() => {
    app.listen(process.env.PORT || 8080, () => {
        console.log('Backend server is running on http://localhost:8080');
    });
});
