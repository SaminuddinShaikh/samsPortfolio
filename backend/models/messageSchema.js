import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderName: {
    type: String,
    miniLength: [2, "Name must contain at least 2 characters!"],
  },
  subject: {
    type: String,
    miniLength: [2, "Subject must contain at least 2 characters"],
  },
  message: {
    type: String,
    miniLength: [2, "Message must contain at least 2 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("message", messageSchema);
