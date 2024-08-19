require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const cors = require("cors");
const connectToMongo = require("./database/db");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middelwares/error");
const messageRouter = require("./routes/messageRouter");

const app = express();

app.use(
  cors({
    origin: [process.env.PORTFOLIO_URL, process.env, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentialsL: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

app.use("/api/v1/message", messageRouter);

connectToMongo();

app.use(errorMiddleware);

module.exports = app;
