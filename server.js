const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors')

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser({urlextended:true}))
app.use(cors({
    origin: process.env.REACT_APP_ADDRESS,
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))
app.use(morgan('short'));
app.use(methodOverride("_method"));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
require('./db/db');

const episodeControlla = require('./controllers/episodeController');
const authController = require('./controllers/authController');
const usersController = require('./controllers/userController');

app.use('/api/v1/episodes', episodeControlla);
app.use('/api/v1/auth', authController);
app.use('/api/v1/users', usersController);
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
const port = process.env.PORT || 9001
app.listen(port, ()=>{
    console.log("THE PORT IS OVER 9000!!!!!");
})