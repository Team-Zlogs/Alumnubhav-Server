const express = require('express');
const router = express.Router();

const registerRoutes = require('../../controller/entry/register');

//test route
router.get('/', registerRoutes.getRegisterPage);

//register user
router.post('/user', registerRoutes.userRegister);

//register admin
router.post('/admin', registerRoutes.adminRegister);

//user setup profile
router.post('/setupProfile', registerRoutes.userProfileSetup);

module.exports = router;