const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CmsModel = new Schema(
  {
    contactUs: {
      type: String,
      default: "",
    },
    legal: {
      type: String,
      default: "",
    },
    privacyPolicy: {
      type: String,
      default: "",
    },
    faq: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);
CmsModel.index({
  activityName: "text",
});
CmsModel.set("toJSON", {
  virtuals: true,
});

const Cms = mongoose.model("Cms", CmsModel);
module.exports = Cms;
