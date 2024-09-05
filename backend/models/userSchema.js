const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  githubURL: { type: String },
  instagramURl: { type: String },
  facebookURl: { type: String },
  twitterURl: { type: String },
  linkedInURl: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpire: {
    type: Date,
  },
});

// pre means before save as save metioned in quotes
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, bcrypt.genSalt(10));
});

//For comparing password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Generating JSON Web Token
userSchema.methods.generateJsonWebToken = function () {
  return (
    jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY),
    {
      expiresIn: process.removeListener.JWT_EXPIRES,
    }
  );
};

module.exports = mongoose.model("User", userSchema);
