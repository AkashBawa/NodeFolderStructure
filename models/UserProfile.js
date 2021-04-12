const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserProfileModel = new Schema({
  name: { type: String },
  label: { type: String },
});

UserProfileModel.index({
  label: "text",
  key: "text",
});
UserProfileModel.set("toJSON", {
  virtuals: true,
});

const UserProfile = mongoose.model("UserProfile", UserProfileModel);
module.exports = UserProfile;
