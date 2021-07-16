const Avatar = require('../../model/modules/avatar')
const mongoose = require('mongoose');

exports.getAllAvatars = async(req, res) => {
    res.send("getAllAvatars");
    await Avatar.find()
        .then(docs => {
            if (docs.length >= 1) {
                res.status(200).json({
                    message: "success",
                    Avatar: docs
                })
            } else {
                res.status(200).json({
                    message: "success",
                    Avatar: "no user available yet"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "some error occurred while fetching data",
                error: err
            })
        })
}
exports.getAvatarByUserId = async(req, res) => {
    res.send("getAvatarByUserId");
}

exports.postAvatarByUserId = async(req, res) => {
    res.send("postAvatarByUserId");
}

exports.deleteAvatarByUserId = async(req, res) => {
    res.send("deleteAvatarByUserId");
}