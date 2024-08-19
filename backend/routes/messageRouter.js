const router = require("express").Router();
const sendMessageCtrl = require("../controllers/messageController");

router.post("/send", sendMessageCtrl);

module.exports = router;
