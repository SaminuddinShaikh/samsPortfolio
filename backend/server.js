const app = require("./app");
const cloudinary = require("cloudinary");

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`sam-port backend listening at http://localhost:${port}`);
});
