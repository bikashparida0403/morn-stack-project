const multer = require("multer");


const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: '',
  api_key: '',
  api_secret: '',
  secure: true,
});


const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };