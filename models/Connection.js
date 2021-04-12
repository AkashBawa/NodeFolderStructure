const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ConnectionModel = new Schema(
  {
    status: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Connection = mongoose.model("Connection", ConnectionModel);
module.exports = Connection;
