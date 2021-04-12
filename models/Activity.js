const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ActivityModel = new Schema(
  {
    activityName: {
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
    subActivity: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubActivity" }],
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);
ActivityModel.index({
  activityName: "text",
});
ActivityModel.set("toJSON", {
  virtuals: true,
});

const Activity = mongoose.model("Activity", ActivityModel);
module.exports = Activity;
