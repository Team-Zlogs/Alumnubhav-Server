//dependencies
var express = require("express");
// var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var cors = require("cors");
var logger = require("morgan");
var dotenv = require("dotenv");
dotenv.config();

var app = express();

//middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(__dirname + './app/public/assets'))

//connect to database
const uri = process.env.DB_CONNECTION_STRING;
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log("connected to database");
  }
);

//require routes handlers
const registerRoutes = require("./app/routes/entry/register");
const loginRoutes = require("./app/routes/entry/login");
const userRoutes = require("./app/routes/users/user");
const forgetPasswordRoutes = require("./app/routes/entry/forgetPassword");
const searchRoutes = require("./app/routes/modules/search");
// const avatarRoutes = require("./app/routes/modules/avatar");

//routes
app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/user", userRoutes);
app.use("/api/forgotpassword", forgetPasswordRoutes);
app.use("/api/search", searchRoutes);
// app.use("/api/avatar", avatarRoutes);
// standard company name list route... - for auto-complete
// blog and resources route..
// model - only avatar with userId...
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log("app running on port:" + port);
});
