const catchAsyncErrors = require("../middelwares/catchAsyncErrors");
const ErrorHandler = require("../middelwares/error");
const Message = require("../models/messageSchema");

const messageCtrl = {
  sendMessage: catchAsyncErrors(async (req, res, next) => {
    const { senderName, subject, message } = req.body;

    if (!senderName || !subject || !message) {
      return next(new ErrorHandler("Please Fill the Details", 400));
    }

    // Save to the database (this triggers Mongoose validation)
    //   const data = new Message({senderName, subject, message});
    // await data.save();
    const data = await Message.create({ senderName, subject, message });
    res.status(200).json({
      success: true,
      message: "Message sent",
      data,
    });
  }),
};
module.exports = messageCtrl;
