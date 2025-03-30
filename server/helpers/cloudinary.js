const multer = require("multer");


const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: 'deopvngbp',
  api_key: '399124617237869',
  api_secret: 'VIkQdUv_GVBpEm_imw2vFcOzOns',
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