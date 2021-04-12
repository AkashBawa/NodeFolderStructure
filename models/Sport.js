const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SportModel = new Schema(
  {
    sportName: {
      type: String,
    },
    image: {
      type: String,
    },
    isActive: {
      type: String,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);
SportModel.index({
  sportName: "text",
});
SportModel.set("toJSON", {
  virtuals: true,
});

const Sport = mongoose.model("Sport", SportModel);
module.exports = Sport;
