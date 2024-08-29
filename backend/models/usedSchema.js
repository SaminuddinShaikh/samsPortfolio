const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name Required!"],
  },
  email: {
    type: String,
    required: [true, "Email Required!"],
  },
  phone: {
    type: String,
    required: [true, "Name Number Required!"],
  },
  aboutMe: {
    type: String,
    required: [true, "About Me Field Is Required!"],
  },
  password: {
    type: String,
    required: [true, "Password Is Required"],
    minLength: [8, "Password must contain at least 8 characters!"],
    select: false,
  },
  avatar: {
    pubic_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  portfolioURL: {
    type: String,
    required: [true, "Portfolio URL Is Required!"],
  },
  githubURL: String,
  instagramURl: String,
  facebookURl: String,
  twitterURl: String,
  linkedInURl: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// pre means before save as save metioned in quotes

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, bcrypt.genSalt(10));
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
