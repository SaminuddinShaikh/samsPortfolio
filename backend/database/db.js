const mongoose = require("mongoose");

const URI = process.env.MONGO_URL;

const connectToMongo = () => {
  mongoose
    .connect(URI, {
      dbName: "sam-port",
      // userNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then(console.log("connected to mongo"))
    .catch((err) => console.log(err));
};

module.exports = connectToMongo;
