const User = require('../../model/users/user')

exports.getAllUsers = async(req, res) => {
    await User.find()
        .select('-password -__v')
        .then(docs => {
            if (docs.length >= 1) {
                res.status(200).json({
                    message: "success",
                    Users: docs
                })
            } else {
                res.status(200).json({
                    message: "success",
                    Users: "no user available yet"
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

exports.getUserById = async(req, res) => {
    User.findById({
            _id: req.params.id
        }).select('-password -__v')
        .then(doc => {
            res.status(200).json({
                message: "success",
                User: doc
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "some error occurred while fetching data",
                error: err
            })
        })
}

exports.getUserByEmail = async(req, res) => {
    User.find({
            email: req.body.email
        }).select('-password -__v').exec()
        .then(doc => {
            res.status(200).json({
                message: "success",
                User: doc
            })
        }).catch(err => {
            res.status(500).json({
                message: "some error occurred while fetching data",
                error: err
            })
        })
}

exports.updateUserById = async(req, res) => {
    var updateOps = req.body;

    for (const ops in updateOps) {
        updateOps[ops.propName] = ops.value;
    }
    User.findByIdAndUpdate({ _id: req.params.id }, { $set: updateOps }, {new: true})
        .select('-password -__v')
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "success",
                doc: doc
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "some error occurred while updating data",
                error: err
            })
        })

}

// exports.deleteUserById = async(req, res) => {
//     User.findByIdAndDelete({
//         _id: req.params.id
//     }).then(result => {
//         res.status(200).json({
//             message: "success",
//             User: result
//         })
//     }).catch(err => {
//         res.status(500).json({
//             message: "some error occurred while deleting data",
//             error: err
//         })
//     })
// }