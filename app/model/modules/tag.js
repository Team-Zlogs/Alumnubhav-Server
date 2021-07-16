const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tag: String,
},
{ timestamps: true });

module.exports = mongoose.model('tag', tagSchema);