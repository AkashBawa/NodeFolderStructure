const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    index: true,
    default: "",
  },

  phoneNumber: {
    type: String,
    index: true,
  },
  countryCode: {
    type: String,
    index: true,
  },
  providerId: { type: String, index: true, default: "" },
  provider: {
    type: String,
    enum: ["GOOGLE", "TWITTER", "LINKDIN", "FACEBOOK", "DEFAULT", "APPLE"],
    default: "DEFAULT",
  },
  isSocialLogin: { type: Boolean, default: false },
  gender: {
    type: Number,
    enum: [0, 1, 2],
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  pets: {
    type: Boolean,
    default: false,
  },
  kids: {
    type: Boolean,
    default: false,
  },
  exercise: {
    type: String,
    default: "",
  },
  drinking: {
    type: Boolean,
    default: false,
  },
  smoking: {
    type: Boolean,
    default: false,
  },
  politics: {
    type: String,
    default: "",
  },
  starSign: {
    type: String,
    default: "",
  },
  religion: {
    type: String,
    default: "",
  },
  height: {
    type: String,
    default: "",
  },
  status: {
    type: Number,
    enum: [0, 1, 2, 3],
    default: "",
  },
  gallaryProfilePic: [
    {
      type: String,
      default: "",
    },
  ],
  baseProfilePic: {
    type: String,
    default: "",
  },

  address: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  education: {
    type: Number,
    enum: [0, 1, 2],
    default: "",
  },
  profession: {
    type: String,
    default: "",
  },
  userLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: { type: [Number], default: [0, 0] },
  },
  latitude: { type: Number, default: 0 },
  longitude: { type: Number, default: 0 },
  socialConnect: [
    {
      socialType: {
        type: Number,
        enum: [0, 1, 2],
        default: "",
      },
      socialId: { type: String },
    },
  ],
  socialConnectId: {
    type: String,
    default: "",
  },

  lookingFor: [{ type: mongoose.Schema.Types.ObjectId, ref: "LookingFor" }],
  interest: [{ type: mongoose.Schema.Types.ObjectId, ref: "Interest" }],
  userProfile: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserProfile" }],
  connections: [],
  aboutMe: {
    type: String,
    default: "",
  },
  dob: {
    type: Date,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  isEmailAdded: { type: Boolean, default: false },
  isNameAdded: { type: Boolean, default: false },
  isStatusAdded: { type: Boolean, default: false },
  isLookingForAdded: { type: Boolean, default: false },
  isProfilePicAdded: { type: Boolean, default: false },
  isProfileCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

UserModel.index({
  name: "text",
  email: "text",
  phoneNumber: "text",
  address: "text",
  interest: "text",
});

UserModel.set("toJSON", {
  virtuals: true,
});
UserModel.index({ userLocation: "2dsphere" });
const User = mongoose.model("User", UserModel);
module.exports = User;
