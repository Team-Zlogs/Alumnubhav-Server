const User = require('../../model/users/user');
const Admin = require('../../model/users/admin');
const bcrypt = require('bcrypt');
const jwttoken = require('../modules/jwt');

exports.getLoginPage = (req, res) => {
    res.send("login page");
}

// user login
exports.userLogin = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.find({ email: email })
        .exec()
        .then(doc => {
            //check if email is present
            if (doc.length < 1) {
                res.status(400).json({
                    message: "User not registered",
                    error: "Email cannot be found"
                });
            } else {
                //check password match
                bcrypt.compare(password, doc[0].password, (err, result) => {
                    if (err) {
                        res.status(500).json({
                            message: "Internal server error",
                            error: err
                        })
                    }
                    if (result === true) {
                        //create token
                        const role = "user";
                        const time = 60 * 60 * 10;
                        const jwt = new jwttoken();
                        const token = jwt.createToken(email, role, time);

                        //return response
                        res.status(200).json({
                            message: "success",
                            userId: doc[0]._id,
                            token: token
                                /*
                                refreshToken: refreshToken,
                                redirect: ""
                                */
                        })
                    } else {
                        res.status(400).json({
                            message: "Email and password combination doesn't match",
                            error: err
                        })
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "internal server error",
                error: err
            });
        })
}

// admin Login
exports.adminLogin = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    Admin.find({ email: email })
        .exec()
        .then(doc => {
            //check if email is present
            if (doc.length < 1) {
                res.status(400).json({
                    message: "You're not an admin",
                    error: "Email cannot be found"
                });
            } else {
                //check password match
                bcrypt.compare(password, doc[0].password, (err, result) => {
                    if (err) {
                        res.status(500).json({
                            message: "Internal server error",
                            error: err
                        })
                    }
                    if (result === true) {
                        //create token
                        const role = "admin";
                        const time = 60 * 60 * 10;
                        const jwt = new jwttoken();
                        const token = jwt.createToken(email, role, time);

                        //return response
                        res.status(200).json({
                            message: "success",
                            adminId: doc[0]._id,
                            token: token
                                /*
                                refreshToken: refreshToken,
                                redirect: ""
                                */
                        })
                    } else {
                        res.status(400).json({
                            message: "Email and password combination doesn't match",
                            error: err
                        })
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "internal server error",
                error: err
            });
        })
}