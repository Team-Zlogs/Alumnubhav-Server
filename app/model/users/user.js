const mongoose = require("mongoose");

let jobDetails = {
  jobTitle: String,
  ctc: Number,
  startDate: String,
  endDate: String,
};

const userSchema = mongoose.Schema(
  {
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
    avatar: String,
    uniqueId: String,
    jobRole: String,
    company: String,
    blogs: [
      {
        title: String,
        desc: String,
        fileUrl: String,
        likes: String,
        sharable: [
          {
            link: String,
          },
        ],
      },
    ],
    currInfo: jobDetails,
    history: [jobDetails],
    social: {
      linkedin: String,
      facebook: String,
      email: String,
      whatsapp: Number,
      portfolio: String,
    },
    technology: [
      {
        tag: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
