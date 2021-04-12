const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostModel = new Schema(
  {
    activity: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
    subActivity: { type: mongoose.Schema.Types.ObjectId, ref: "SubActivity" },
    desc: {
      type: String,
    },
    date: { type: Date, default: "" },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: { type: [Number], default: [0, 0] },
    },
    agePreference: {
      type: Array,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    gender: {
      type: Number,
      enum: [0, 1],
    },
    noOfPeople: {
      type: Number,
    },
    visibility: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    isActive: {
      type: String,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);
PostModel.index({
  postDesc: "text",
});
PostModel.set("toJSON", {
  virtuals: true,
});

const Post = mongoose.model("Post", PostModel);
module.exports = Post;
