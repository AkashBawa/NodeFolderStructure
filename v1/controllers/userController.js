const common = require("../../utils/common");
const statusCode = require("../../utils/statusCodes");
const messages = require("../../utils/messages");
const constants = require("../../utils/constants");
const sendRes = require("../../utils/response");
const { ValidationError } = require("../../middleware/errors/errors");
const userService = require("../services/userService");
const otpService = require("../services/otpService");

async function sendOtpWithSignin(req, res, next) {
  try {
    var exists = await userService.search({
      phoneNumber: req.body.phoneNumber,
      countryCode: req.body.countryCode,
    });
    if (!exists) throw new ValidationError(messages.USER_NOT_EXISTS);
    if (!exists.isActive) throw new ValidationError(messages.USER_IS_BLOCKED);
    var code = await otpService.create(req.body);
    sendRes(req, res, statusCode.SUCCESS, messages.OTP_SEND_SUCCESSFULLY, code);
  } catch (error) {
    next(error);
  }
}

async function verifyOtpWithSignin(req, res, next) {
  try {
    var sendOtp = {};
    var otpdata = await otpService.search(req.body);
    if (!otpdata) throw new ValidationError(messages.INVALID_VERIFICATION_CODE);
    var isDeleted = await otpService.remove(otpdata._id);
    var userdata = await userService.search({
      phoneNumber: req.body.phoneNumber,
      countryCode: req.body.countryCode,
    });
    var accesstoken = await common.jwtSign(userdata);
    sendOtp.user = userdata;
    sendOtp.accessToken = accesstoken;
    if (isDeleted)
      sendRes(
        req,
        res,
        statusCode.SUCCESS,
        messages.OTP_VERIFIED_SUCCESSFULLY,
        sendOtp
      );
  } catch (error) {
    next(error);
  }
}

async function sendOtpWithSignup(req, res, next) {
  try {
    var exists = await userService.search({
      phoneNumber: req.body.phoneNumber,
      countryCode: req.body.countryCode,
    });
    if (exists) throw new ValidationError(messages.PHONE_ALREADY_EXISTS);
    var code = await otpService.create(req.body);
    sendRes(req, res, statusCode.SUCCESS, messages.OTP_SEND_SUCCESSFULLY, code);
  } catch (error) {
    next(error);
  }
}

async function addEmailWithSignup(req, res, next) {
  try {
    var exists = await userService.search({
      _id: {
        $nin: [req.user._id],
      },
      email: req.body.email,
    });
    if (exists) throw new ValidationError(messages.EMAIL_EXISTS);
    req.body.isEmailAdded = true;
    var userdata = await userService.updateQuery(
      { _id: req.user._id },
      req.body
    );
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.USER_UPDATED_SUCCESSFULLY,
      userdata
    );
  } catch (error) {
    next(error);
  }
}

async function addNameWithSignUp(req, res, next) {
  try {
    req.body.isNameAdded = true;
    var userdata = await userService.updateQuery(
      { _id: req.user._id },
      req.body
    );
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.USER_UPDATED_SUCCESSFULLY,
      userdata
    );
  } catch (error) {
    next(error);
  }
}

async function addStatusWithSignUp(req, res, next) {
  try {
    req.body.isStatusAdded = true;
    var userdata = await userService.updateQuery(
      { _id: req.user._id },
      req.body
    );
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.USER_UPDATED_SUCCESSFULLY,
      userdata
    );
  } catch (error) {
    next(error);
  }
}
async function addLookingForWithSignUp(req, res, next) {
  try {
    req.body.isLookingForAdded = true;
    var userdata = await userService.updateQuery(
      { _id: req.user._id },
      req.body
    );
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.USER_UPDATED_SUCCESSFULLY,
      userdata
    );
  } catch (error) {
    next(error);
  }
}

async function verifyOtpWithSignup(req, res, next) {
  try {
    var sendObj = {};
    var otpdata = await otpService.search(req.body);
    if (!otpdata) throw new ValidationError(messages.INVALID_VERIFICATION_CODE);
    var isDeleted = otpService.remove(otpdata._id);
    var usercreated = await userService.create({
      phoneNumber: otpdata.phoneNumber,
      countryCode: otpdata.countryCode,
      isPhoneVerified: true,
    });
    var accessToken = await common.jwtSign(usercreated);
    usercreated.accessToken = accessToken;
    sendObj.accessToken = accessToken;
    sendObj.user = usercreated;
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.OTP_VERIFIED_SUCCESSFULLY,
      sendObj
    );
  } catch (error) {
    next(error);
  }
}

async function socialLogin(req, res, next) {
  try {
    var sendObj = {};
    const emailUser = await userService.search({
      email: req.body.email,
      providerId: req.body.providerId,
    });
    if (emailUser) throw new ValidationError(messages.EMAIL_EXISTS);
    var usercreated = await userService.create(req.body);
    var accessToken = await common.jwtSign(usercreated);
    sendObj.accessToken = accessToken;
    sendObj.user = usercreated;
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.USER_REGISTER_SUCCESSFULLY,
      sendObj
    );
  } catch (error) {
    next(error);
  }
}

async function addInterest(req, res, next) {
  try {
    req.body.isProfileCompleted = true;
    var user = await userService.updateQuery(
      { _id: req.user._id },
      {
        $set: req.body,
      }
    );
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.USER_UPDATED_SUCCESSFULLY,
      user
    );
  } catch (error) {
    next(error);
  }
}

async function getProfile(req, res, next) {
  var user = await userService.searchQuery({ _id: req.user._id });
  sendRes(
    req,
    res,
    statusCode.SUCCESS,
    messages.PROFILE_GET_SUCCESSFULLY,
    user
  );
}

async function getUserMatches(req, res, next) {
  let update = {
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    userLocation: {
      type: "Point",
      coordinates: [req.body.longitude, req.body.latitude],
    },
  };

  var updated = await userService.updateQuery({ _id: req.user._id }, update);
  req.body.userid = req.user._id;
  req.body.pageNo = req.query.pageNo;
  if (updated) var user = await userService.getGeoNear(req.body);

  sendRes(
    req,
    res,
    statusCode.SUCCESS,
    messages.PROFILE_GET_SUCCESSFULLY,
    user
  );
}

async function updateProfile(req, res, next) {
  // if (req.files.gallaryProfilePic) {
  //   req.body.gallaryProfilePic = [];
  //   for (const x in req.files.gallaryProfilePic) {
  //     var images = `${constants.FILE_PATH.USER}/${req.files.gallaryProfilePic[x].filename}`;
  //     req.body.gallaryProfilePic.push(images);
  //   }
  //   req.body.isProfilePicAdded = true;
  // }
  // if (req.files.baseProfilePic) {
  //   var image = `${constants.FILE_PATH.USER}/${req.files.baseProfilePic[0].filename}`;
  //   req.body.baseProfilePic = image;
  //   req.body.isProfilePicAdded = true;
  // }
  var user = await userService.updateQuery({ _id: req.user._id }, req.body);
  sendRes(
    req,
    res,
    statusCode.SUCCESS,
    messages.PROFILE_UPDATED_SUCCESSFULLY,
    user
  );
}

async function socialConnect(req, res, next) {
  try {
    var user = await userService.updateQuery(req.user._id, {
      $push: {
        socialConnect: {
          socialType: req.body.socialType,
          socialId: req.body.socialId,
        },
      },
    });
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.USER_UPDATED_SUCCESSFULLY,
      user
    );
  } catch (error) {
    next(error);
  }
}

async function profilePicUpload(req, res, next) {
  try {
    if (req.files.gallaryProfilePic) {
      req.body.gallaryProfilePic = [];
      for (const x in req.files.gallaryProfilePic) {
        var images = `${constants.FILE_PATH.USER}/${req.files.gallaryProfilePic[x].filename}`;
        req.body.gallaryProfilePic.push(images);
      }
      req.body.isProfilePicAdded = true;
    }
    if (req.files.baseProfilePic) {
      var image = `${constants.FILE_PATH.USER}/${req.files.baseProfilePic[0].filename}`;
      req.body.baseProfilePic = image;
      req.body.isProfilePicAdded = true;
    }
    var userupdated = await userService.updateQuery(
      { _id: req.user._id },
      {
        $set: req.body,
      }
    );

    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.USER_UPDATED_SUCCESSFULLY,
      userupdated
    );
  } catch (error) {
    next(error);
  }
}
async function addUserConnection(req, res, next) {
  try {
    var connection = req.body.connection;
    var connexist = await userService.search({
      _id: req.user._id,
      connections: {
        $nin: [connection],
      },
    });
    if (connexist) throw new ValidationError(messages.CONNECTION_EXIST_ALREADY);
    var user = await userService.updateQuery(req.user._id, {
      $push: {
        connections: connection,
      },
    });
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.CONNECTED_SENT_SUCCESSFULLY,
      user
    );
  } catch (error) {
    next(error);
  }
}

async function getUserConnections(req, res, next) {
  try {
    var user = await userService.sendRes(
      req,
      res,
      statusCode.SUCCESS,
      "",
      user
    );
  } catch (error) {
    next(error);
  }
}

module.exports.sendOtpWithSignin = sendOtpWithSignin;
module.exports.verifyOtpWithSignin = verifyOtpWithSignin;
module.exports.sendOtpWithSignup = sendOtpWithSignup;
module.exports.verifyOtpWithSignup = verifyOtpWithSignup;
module.exports.addEmailWithSignup = addEmailWithSignup;
module.exports.addNameWithSignUp = addNameWithSignUp;
module.exports.addStatusWithSignUp = addStatusWithSignUp;
module.exports.addLookingForWithSignUp = addLookingForWithSignUp;
module.exports.profilePicUpload = profilePicUpload;
module.exports.socialLogin = socialLogin;
module.exports.socialConnect = socialConnect;
module.exports.addInterest = addInterest;
module.exports.getProfile = getProfile;
module.exports.updateProfile = updateProfile;
module.exports.getUserMatches = getUserMatches;
module.exports.addUserConnection = addUserConnection;
module.exports.getUserConnections = getUserConnections;
