const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwttoken = require("../modules/jwt");

const Admin = require("../../model/users/admin");
const User = require("../../model/users/user");

exports.getRegisterPage = (req, res) => {
  res.send("register page test");
};

//user registration
exports.userRegister = (req, res) => {
  var availabilityFlag = false;

  //check if the user already exists
  User.find({ email: req.body.email })
    .exec()
    .then((doc) => {
      if (doc.length < 1) {
        //new entry
        availabilityFlag = true;
        //if the email is available to used as new user, then create new user
        if (availabilityFlag === true) {
          //hash the password received from request body
          bcrypt.hash(req.body.password, 10, (err, result) => {
            if (err) {
              //send error response if error occurs while hashing password
              res.status(500).json({
                message: "error occurred while storing the user password",
                error: "internal server error",
              });
            } else {
              //create new user with hashed password
              const userPassword = result;
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: userPassword,
              });
              const email = req.body.email;
              const role = "user";
              const time = 60 * 60 * 10;
              const jwt = new jwttoken();
              const token = jwt.createToken(email, role, time);
              //save new user in the collection "users"
              user
                .save()
                .then((doc) => {
                  // try {
                  //     Notifier.successfulUserRegistration(req.body.email)
                  // } catch (err) {
                  //     throw err
                  // }
                  res.status(200).json({
                    message: "success",
                    userId: doc._id,
                    token: token,
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({
                    message: "some error occurred while storing new user",
                    error: "internal server error",
                  });
                });
            }
          });
        }
      } else {
        res.status(400).json({
          message:
            "this email already exists, try logging in with this email or try another email and register",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "some error occurred while checking the records",
        error: "internal server error" + err,
      });
    });
};

//admin registration
exports.adminRegister = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, result) => {
    if (err) {
      //send error response if error occurs while hashing password
      res.status(500).json({
        message: "error occurred while storing the admin password",
        error: "internal server error",
      });
    } else {
      //create new admin with hashed password
      const adminPassword = result;
      const admin = new Admin({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: adminPassword,
      });
      //save new user in the collection "admins"
      admin
        .save()
        .then((doc) => {
          // try {
          //     Notifier.successfulAdminRegistration(req.body.email)
          // } catch (err) {
          //     throw err
          // }
          res.status(200).json({
            message: "success",
            admin: doc,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: "some error occurred while storing new admin",
            error: "internal server error",
          });
        });
    }
  });

  //check if the user already exists
};

// user Profile Setup
exports.userProfileSetup = async (req, res) => {
  const {
    _id,
    username,
    companyName,
    jobRole,
    technology,
    avatar,
  } = await req.body;
  console.log(technology);
  let obj = {
    name: username,
    company: companyName,
    jobRole,
    technology,
    avatar,
    updatedAt: Date.now(),
  };
  await User.findByIdAndUpdate(_id, obj, {
    new: true,
  })
    .then(async (doc) => {
      // await User.findByIdAndUpdate(
      //   _id,
      //   {
      //     technology
      //   },
      //   { new: true }
      // )
      // .then(doc=>{
      //   res.status(200).json({
      //     message: "success",
      //     doc: doc,
      //   });
      // })
      // .catch((err) => {
      //   console.log(err);
      //   res.status(500).json({
      //     message: "some error occurred while storing new admin",
      //     error: "internal server error",
      //   });
      // });
      res.status(200).json({
        message: "success",
        doc: doc,
      });
      
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "some error occurred while storing update value",
        error: "internal server error",
      });
    });
  // User.findByIdAndUpdate()

  //check if the user already exists
};
