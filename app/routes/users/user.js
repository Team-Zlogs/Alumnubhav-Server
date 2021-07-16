const express = require("express");
const router = express.Router();
const userAuth = require("../../controller/auth/userAuth");

const userController = require("../../controller/users/user");

// //get all users
router.get("/all", userAuth, userController.getAllUsers);

//get user by email
router.get("/email", userAuth, userController.getUserByEmail);

//get user by id
router.get("/:id", userAuth, userController.getUserById);

//update user by id
router.patch("/update/:id", userAuth, userController.updateUserById);

//delete user by id
// router.delete("/delete/:id", userAuth, userController.deleteUserById);

module.exports = router;
