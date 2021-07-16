const express = require('express');
const router = express.Router();

const loginRoutes = require('../../controller/entry/login');

//test route
router.get('/', loginRoutes.getLoginPage);

//login user
router.post('/user', loginRoutes.userLogin);

//login admin
router.post('/admin', loginRoutes.adminLogin);

module.exports = router;