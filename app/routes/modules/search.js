const express = require("express");
const router = express.Router();

const checkUserAuth = require("../../controller/auth/userAuth");
const searchRoutes = require("../../controller/modules/search");

// search tags
router.get("/tag", checkUserAuth, searchRoutes.searchTech);

// search company
router.get("/company", checkUserAuth, searchRoutes.searchCompany);

module.exports = router;
