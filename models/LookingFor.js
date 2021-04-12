const mongoose = require("mongoose");

const lookingForModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

lookingForModel.set("toJSON", {
  virtuals: true,
});

const lookingFor = mongoose.model("LookingFor", lookingForModel);
module.exports = lookingFor;
