const mongoose = require("mongoose");

const InterestModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});
InterestModel.set("toJSON", {
  virtuals: true,
});

const Interest = mongoose.model("Interest", InterestModel);
module.exports = Interest;
