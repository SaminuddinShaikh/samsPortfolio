const router = require("express").Router();
const messageCtrl = require("../controllers/messageController");

router.post("/send", messageCtrl.sendMessage);

module.exports = router;
