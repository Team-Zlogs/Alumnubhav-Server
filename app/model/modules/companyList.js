const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    company: String,
},
{ timestamps: true });

module.exports = mongoose.model('company', companySchema);