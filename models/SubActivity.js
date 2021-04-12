const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SubActivityModel = new Schema(
  {
    subActivityName: {
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
SubActivityModel.index({
  subActivityName: "text",
});
SubActivityModel.set("toJSON", {
  virtuals: true,
});

const SubActivity = mongoose.model("SubActivity", SubActivityModel);
module.exports = SubActivity;
