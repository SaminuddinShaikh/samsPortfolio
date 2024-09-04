const catchAsyncErrors = require("../middelwares/catchAsyncErrors");
const ErrorHandler = require("../middelwares/error");
const User = require("../models/userSchema");
const cloudinary = require("cloudinary").v2;

const userCtrl = {
  register: catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler("Avatar And Resume Are Required!", 400));
    }

    const { avatar, resume } = req.files;

    const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(avatar.tempFilePath, { folder: "AVATARS" });

    if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
      console.error("Cloudinary Error:", cloudinaryResponseForAvatar.error || "Unknown Cloudinary Error");
    }

    const cloudinaryResponseForResume = await cloudinary.uploader.upload(resume.tempFilePath, { folder: "MY_RESUME" });

    if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
      console.error("Cloudinary Error:", cloudinaryResponseForResume.error || "Unknown Cloudinary Error");
    }

    const { fullName, email, phone, aboutMe, password, portfolioURL, githubURL, instagramURl, facebookURl, twitterURl, linkedInURl } = req.body;

    const user = await User.create({
      fullName,
      email,
      phone,
      aboutMe,
      password,
      portfolioURL,
      githubURL,
      instagramURl,
      facebookURl,
      twitterURl,
      linkedInURl,
      avatar: {
        public_id: cloudinaryResponseForAvatar.public_id,
        url: cloudinaryResponseForAvatar.secure_url,
      },
      resume: {
        public_id: cloudinaryResponseForResume.public_id,
        url: cloudinaryResponseForResume.secure_url,
      },
    });

    res.status(200).json({
      success: true,
      message: "User Registered",
    });
  }),
};

module.exports = userCtrl;
