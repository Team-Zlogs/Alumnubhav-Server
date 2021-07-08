//dependencies
var express = require('express');
// var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var logger = require('morgan');
var dotenv = require('dotenv');
dotenv.config();

var app = express(); 

//middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//connect to database
const uri = process.env.DB_CONNECTION_STRING;
mongoose.connect(
    uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }, () => {
        console.log("connected to database");
    })

//require routes handlers
// const loginRoutes = require('./app/routes/entry/login');
// const registerRoutes = require('./app/routes/entry/register');

//routes
// app.use('/api/login', loginRoutes);
// app.use('/api/register', registerRoutes);


app.listen(9000, () => {
    console.log("app running on port:" + 9000);
});