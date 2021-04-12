const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OtpModel = new Schema(
  {
    otpCode: {
      type: String,
      default: "1234",
    },
    email: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    countryCode: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
const Otp = mongoose.model("Otp", OtpModel);
module.exports = Otp;
