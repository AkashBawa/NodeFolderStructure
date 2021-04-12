const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserProfileKeyModel = new Schema({
  key: { type: String },
  label: { type: String },
});

UserProfileKeyModel.set("toJSON", {
  virtuals: true,
});

const UserProfileKey = mongoose.model("UserProfileKey", UserProfileKeyModel);
module.exports = UserProfileKey;
