const mongoose = require("mongoose");

const HeightModel = new mongoose.Schema({
  labels: {
    type: Array,
    default: "",
  },
});
HeightModel.set("toJSON", {
  virtuals: true,
});

const Height = mongoose.model("Height", HeightModel);
module.exports = Height;
