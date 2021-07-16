const User = require('../../model/users/user');
const Admin = require('../../model/users/admin');
const Otp = require('../../model/modules/otp');
const bcrypt = require('bcrypt');
const jwtToken = require('../modules/jwt');
const Notifier = require('../modules/notifier');

function createRandomPassword() {
    return Math.floor(Math.random() * 100000)
}

exports.sendOtp = async(req, res) => {
    let randomNumber = createRandomPassword();
    let userId = 0;
    if (req.body.role === "user") {
        await User.findOne({ email: req.body.email })
            .then(doc => {
                userId = doc._id
            })
            .catch(err => {
                res.status(500).json({
                    message: "some error occurred while finding user",
                    error: err
                });
            })
    } else if (req.body.role === "admin") {
        await Admin.findOne({ email: req.body.email })
            .then(doc => {
                userId = doc._id
            })
            .catch(err => {
                res.status(500).json({
                    message: "some error occurred while finding user",
                    error: err
                });
            })
    }
    let otp = new Otp({
        otp: randomNumber,
        role: req.body.role,
        email: req.body.email,
        userId: userId
    })

    // console.log(otp);

    otp.save()
        .then(doc => {
            let object = {
                userId: userId,
                otp: randomNumber
            }
            try {
                Notifier.requestOtp(object, req.body.email)
            } catch (err) {
                throw err
            }
            res.status(200).json({
                message: "success",
                otp: doc
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "some error occurred while saving otp",
                error: err
            });
        })
}

exports.verifyOtp = async(req, res) => {
    await Otp.findOne({ otp: req.body.otp })
        .then(doc => {
            if (doc != null) {
                Otp.findByIdAndDelete({ _id: doc._id })
                    .then(doc => {
                        const jwt = new jwtToken();
                        let token = jwt.createForgotPasswordToken(doc.email, doc.userId, doc.role, 60 * 60 * 10);
                        res.status(200).json({
                            message: "success",
                            token: token
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                res.status(401).json({
                    message: "something went wrong, either OTP expired or Invalid OTP was sent",
                    doc: doc
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "some error occurred while finding otp",
                error: err
            });
        })
}

exports.setNewUserPassword = async(req, res) => {
    await bcrypt.hash(req.body.password, 10, (err, result) => {
        if (err) {
            res.status(500).json({
                message: "some error occurred while storing data"
            })
        }
        if (result) {
            User.findOneAndUpdate({ email: req.body.email }, { password: result })
                .then(doc => {
                    try {
                        Notifier.successfulPasswordReset(req.body.email);
                    } catch (err) {
                        throw err
                    }
                    res.status(200).json({
                        message: "successfully password reset",
                        doc: doc
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        message: "some error occurred while updating data"
                    })
                })
        }
    })
}

exports.setNewAdminPassword = async(req, res) => {
    await bcrypt.hash(req.body.password, 10, (err, result) => {
        if (err) {
            res.status(500).json({
                message: "some error occurred while storing data"
            })
        }
        if (result) {
            Admin.findOneAndUpdate({ email: req.body.email }, { password: result })
                .then(doc => {
                    try {
                        Notifier.successfulPasswordReset(req.body.email);
                    } catch (err) {
                        throw err
                    }
                    res.status(200).json({
                        message: "successfully password reset",
                        doc: doc
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        message: "some error occurred while updating data"
                    })
                })
        }
    })
}