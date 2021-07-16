const express = require("express");
const router = express.Router();

const avatarRoutes = require("../../controller/modules/avatar");

//test route
router.get("/", avatarRoutes.getAllAvatars);

//get all user avatar
router.get("/all", avatarRoutes.getAllAvatars);

//get user avatar by userId
router.get("/:id", avatarRoutes.getAvatarByUserId);

//post user avatar - id = userId
router.post("/post/:id", avatarRoutes.postAvatarByUserId);

//delete user avatar - id = userId
router.post("/delete/:id", avatarRoutes.deleteAvatarByUserId);

module.exports = router;
