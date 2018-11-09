const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser({urlextended:true}))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))
app.use(morgan('short'));
app.use(methodOverride("_method"));
app.use(session({
    secret: 'iwatchmylittlepony',
    resave: false,
    saveUninitialized: false
}))
require('./db/db');

const episodeControlla = require('./controllers/episodeController');
const authController = require('./controllers/authController');
const usersController = require('./controllers/userController');

app.use('/episodes', episodeControlla);
app.use('/auth', authController);
app.use('/users', usersController);

app.listen(9001, ()=>{
    console.log("THE PORT IS OVER 9000!!!!!");
})