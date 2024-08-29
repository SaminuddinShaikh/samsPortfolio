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
  getAllMessages: catchAsyncErrors(async (req, res, next) => {
    const messages = await Message.find();
    res.status(200).json({
      success: true,
      messages,
    });
  }),
  deleteMessage: catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const message = await Message.findById(id);
    if (!message) {
      return next(new ErrorHandler("Message Already Deleted!", 400));
    }
    await message.deleteOne();
    res.status(200).json({
      success: true,
      message: "Message Deleted",
    });
  }),
};
module.exports = messageCtrl;
