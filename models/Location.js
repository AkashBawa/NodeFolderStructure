const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LocationModel = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    latlng: {
      type: { type: String, enum: "Circle", default: "Circle" },
      coordinates: { type: Object },
    },
    geoRadius: {
      type: Number,
      default: "",
    },
    geoAddress: {
      type: String,
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Location = mongoose.model("Location", LocationModel);
module.exports = Location;
