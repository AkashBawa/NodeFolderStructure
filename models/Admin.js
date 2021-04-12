const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Schema = mongoose.Schema;
const AdminModel = new Schema(
  {
    isApprovedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      index: true,
    },
    password: {
      type: String,
      index: true,
    },
    phoneNumber: {
      type: String,
    },
    streetName: {
      type: String,
      default: null,
    },
    countryCode: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    zipCode: {
      type: String,
      default: null,
    },
    state: { type: String, default: null },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "NO_PREFRENCE", null],
      default: null,
    },
    access: [
      {
        module: { type: String, default: null },
        moduleCode: { type: Number, default: 0 },
        read: { type: Boolean, default: false },
        write: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        filter: { type: Boolean, default: false },
        sort: { type: Boolean, default: false },
        setStatus: { type: Boolean, default: false },
      },
    ],
    role: {
      type: String,
      enum: ["ADMIN"],
    },
    accessToken: {
      type: String,
      index: true,
      default: null,
    },
    resetToken: { type: String, default: null },
    resetTokenDate: { type: Date, default: null },
    isApproved: {
      type: Boolean,
      default: null,
    },

    isApprovedAt: {
      type: Date,
      default: null,
    },
    isBlocked: {
      type: Boolean,
      default: false,
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
AdminModel.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret, options) {
    delete ret.password;
    delete ret.__v;
  },
});
AdminModel.plugin(autoIncrement.plugin, {
  model: "Admin",
  field: "businessId",
  startAt: 1000,
  incrementBy: 1,
});
const Admin = mongoose.model("Admin", AdminModel);
module.exports = Admin;
