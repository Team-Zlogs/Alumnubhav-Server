const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: {
        type: String,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: {
        type: String,
        required: true,
    },
    blogs:[{
        title: String,
        desc: String,
        fileUrl: String,
        likes: String,
        sharable:[{
            link: String,
        }]
    }],
    currInfo:{
        jobTitle: String,
        ctc: Number,
        startDate: String,
        endDate: String,
    },
    history:[{
        jobTitle: String,
        ctc: Number,
        startDate: String,
        endDate: String,
    }],
    social:{
        linkedin: String,
        facebook: String,
        email: String,
        whatsapp: Number,
        portfolio: String,
    }
});

module.exports = mongoose.model('user', userSchema);