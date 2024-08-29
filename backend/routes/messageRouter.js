const router = require("express").Router();
const messageCtrl = require("../controllers/messageController");

router.post("/send", messageCtrl.sendMessage);
router.get("/getall", messageCtrl.getAllMessages);

module.exports = router;
