const express = require('express');
const router = express.Router();
const forgotPasswordControllers = require('../../controller/entry/forgetPassword');
const forgotPasswordAuth = require('../../controller/auth/forgetPasswordAuth');

router.post('/otp', forgotPasswordControllers.sendOtp);

router.post('/verify', forgotPasswordControllers.verifyOtp);

router.post('/password/user', forgotPasswordAuth, forgotPasswordControllers.setNewUserPassword);

router.post('/password/admin', forgotPasswordAuth, forgotPasswordControllers.setNewAdminPassword);

module.exports = router;