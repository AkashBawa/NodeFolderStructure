const multer = require("multer");
const userUpload = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/user");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const userPic = multer({ storage: userUpload });
module.exports.userPic = userPic;
