const mongoose = require('mongoose');

const avatarSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    avatar: String,
},
{ timestamps: true });

module.exports = mongoose.model('avatar', avatarSchema);