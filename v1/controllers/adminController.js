const common = require("../../utils/common");
const statusCode = require("../../utils/statusCodes");
const messages = require("../../utils/messages");
const constants = require("../../utils/constants");
const sendRes = require("../../utils/response");
const { ValidationError } = require("../../middleware/errors/errors");
const adminService = require("../services/adminService");
const userService = require("../services/userService");
const postService = require("../services/postService");
const activityService = require("../services/activityService");
const subActivityService = require("../services/subActivityService");
const userProfileService = require("../services/userProfileService");
const userProfileKeyService = require("../services/userProfileKeyService");
const locationService = require("../services/locationService");
const User = require("../../models/User");
const UserProfile = require("../../models/UserProfile");
const moment = require("moment");
const Cms = require("../../models/Cms");

async function signin(req, res, next) {
  try {
    var sendObj = {};
    var admin = await adminService.search({
      email: req.body.email,
    });
    if (!admin) throw new ValidationError(messages.ADMIN_NOT_EXISTS);
    var loggedin = await common.comparePasswordHash(
      req.body.password,
      admin.password
    );
    if (!loggedin) throw new ValidationError(messages.ADMIN_NOT_EXISTS);
    var accesstoken = await common.jwtSign(admin);
    sendObj.user = admin;
    sendObj.accessToken = accesstoken;
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.USER_SIGNED_IN_SUCCESSFULLY,
      sendObj
    );
  } catch (error) {
    next(error);
  }
}

async function signup(req, res, next) {
  try {
    var sendObj = {};
    var exists = await adminService.search({
      email: req.body.email,
    });
    if (exists) throw new ValidationError(messages.EMAIL_EXISTS);
    var password = await common.generatePasswordHash(req.body.password);
    req.body.password = password;
    var admin = await adminService.create(req.body);
    var accesstoken = await common.jwtSign(admin);
    sendObj.user = admin;
    sendObj.accessToken = accesstoken;
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

async function resetPassword(req, res, next) {
  try {
    var user = await adminService.search({ _id: req.user._id });
    var password = await common.comparePasswordHash(
      req.body.password,
      user.password
    );
    if (!password) throw new ValidationError(messages.INCORRECT_PASSWORD);
    var newpassword = await common.generatePasswordHash(req.body.newpassword);
    var admin = await adminService.updateQuery(
      { _id: req.user._id },
      { password: newpassword }
    );
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.PASSWORD_UPDATED_SUCCESSFULLY,
      admin
    );
  } catch (error) {
    next(error);
  }
}

async function getUsers(req, res, next) {
  try {
    var users = await userService.getAllBySearch(req.query);
    sendRes(req, res, statusCode.SUCCESS, "", users);
  } catch (error) {
    next(error);
  }
}

async function singleUser(req, res, next) {
  try {
    var user = await userService.search({ _id: req.params.userid });
    sendRes(req, res, statusCode.SUCCESS, "", user);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    var existphone = await userService.search({
      _id: {
        $nin: [req.params.userid],
      },
      phoneNumber: req.body.phoneNumber,
      countryCode: req.body.countryCode,
    });
    if (existphone) throw new ValidationError(messages.PHONE_ALREADY_EXISTS);
    var existemail = await userService.search({
      _id: {
        $nin: [req.params.userid],
      },
      email: req.body.email,
    });
    if (existemail) throw new ValidationError(messages.EMAIL_EXISTS);
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
    var user = await userService.updateQuery(
      { _id: req.params.userid },
      req.body
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
async function deleteUser(req, res, next) {
  try {
    var user = await userService.updateQuery(
      { _id: req.params.userid },
      { isDeleted: true }
    );
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.USER_DELETED_SUCCESSFULLY,
      user
    );
  } catch (error) {
    next(error);
  }
}

async function activateDeactiveUser(req, res, next) {
  try {
    var user = await userService.updateQuery(
      { _id: req.params.userid },
      { isActive: req.body.isActive }
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
async function getDashboardData(req, res, next) {
  try {
    dashboard = {};
    var days = [];
    var count = [];
    if (req.query.filter == "month") {
      var pipeline = [
        {
          $match: {
            isDeleted: false,
            createdAt: {
              $gte: moment().startOf("month").toDate(),
              $lte: moment().endOf("month").toDate(),
            },
          },
        },
        {
          $group: {
            _id: {
              month: {
                $month: "$createdAt",
              },
            },
            createdAt: { $first: "$createdAt" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ];
      var userData = await User.aggregate(pipeline);
      for (let i = 0; i < userData.length; i++) {
        days.push(moment(userData[i].createdAt).format("MMMM"));
        count.push(userData[i].count);
      }
    } else {
      var pipeline = [
        {
          $match: {
            isDeleted: false,
            createdAt: {
              $gte: moment().startOf("isoweek").toDate(),
              $lte: moment().endOf("isoweek").toDate(),
            },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%d", date: "$createdAt" } },
            createdAt: { $first: "$createdAt" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ];
      var userData = await User.aggregate(pipeline);
      for (let i = 0; i < userData.length; i++) {
        days.push(moment(userData[i].createdAt).format("ddd"));
        count.push(userData[i].count);
      }
    }

    var newUsers = await User.aggregate([
      {
        $match: {
          isDeleted: false,
          createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        },
      },
    ]);
    var userCount = await userService.countDocument();
    dashboard.users = userCount;
    dashboard.newUsers = newUsers.length;
    dashboard.userGraph = { days, count };
    sendRes(req, res, statusCode.SUCCESS, "", dashboard);
  } catch (error) {
    next(error);
  }
}
async function getDashboardGraph(req, res, next) {
  try {
    var data = { days, count };
    sendRes(req, res, statusCode.SUCCESS, "", data);
  } catch (error) {
    next(error);
  }
}

async function addActivity(req, res, next) {
  try {
    var exist = await activityService.search({
      desc: req.body.desc,
    });
    if (exist) throw new ValidationError(messages.ACTIVITY_EXIST);
    var activity = await activityService.create(req.body);
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.ACTIVITY_ADDED_SUCCESSFULLY,
      activity
    );
  } catch (error) {
    next(error);
  }
}

async function deleteActivity(req, res, next) {
  try {
    var activity = await activityService.search({ _id: req.params.activityid });
    if (activity.subActivity.length) {
      throw new ValidationError(messages.CANT_DELETE_ACTIVITY);
    }
    var activity = await activityService.remove(req.params.activityid);
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.ACTIVITY_DELETED_SUCCESSFULLY,
      activity
    );
  } catch (error) {
    next(error);
  }
}

async function getActivities(req, res, next) {
  try {
    if (req.query.search)
      var activities = await activityService.getAllBySearch(req.query.search);
    else var activities = await activityService.getAll();
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.ACTIVITY_ADDED_SUCCESSFULLY,
      activities
    );
  } catch (error) {
    next(error);
  }
}

async function getSubActivities(req, res, next) {
  try {
    if (req.query.search)
      var subActivities = await subActivityService.getAllBySearch(
        req.query.search
      );
    else var subActivities = await subActivityService.getAll();
    sendRes(req, res, statusCode.SUCCESS, "", subActivities);
  } catch (error) {
    next(error);
  }
}

async function addSubActivity(req, res, next) {
  try {
    var exist = await subActivityService.search({
      subActivityName: req.body.subActivityName,
      isDeleted: false,
    });
    if (exist) throw new ValidationError(messages.SPORT_EXISTS);
    var subActivitydata = await subActivityService.create(req.body);
    var exist = await activityService.updateQuery(
      { _id: req.params.activityid },
      {
        $push: {
          subActivity: subActivitydata._id,
        },
      }
    );

    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.SPORT_ADDED_SUCCESSFULLY,
      subActivitydata
    );
  } catch (error) {
    next(error);
  }
}

async function singleSubActivity(req, res, next) {
  try {
    var subActivity = await subActivityService.search({
      _id: req.params.subactivityid,
    });
    sendRes(req, res, statusCode.SUCCESS, "", subActivity);
  } catch (error) {
    next(error);
  }
}

async function updateSubActivity(req, res, next) {
  try {
    var exist = await subActivityService.search({
      subActivityName: req.body.subActivityName,
    });

    if (exist) throw new ValidationError(messages.SPORT_EXISTS);
    var subActivity = await subActivityService.updateQuery(
      { _id: req.params.subactivityid },
      req.body
    );
    sendRes(req, res, statusCode.SUCCESS, "", subActivity);
  } catch (error) {
    next(error);
  }
}

async function deleteSubActivity(req, res, next) {
  try {
    var sport = await subActivityService.updateQuery(
      { _id: req.params.subactivityid },
      { isDeleted: true }
    );
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.SPORT_DELETED_SUCCESSFULLY,
      sport
    );
  } catch (error) {
    next(error);
  }
}

async function listProfileFields(req, res, next) {
  try {
    if (req.query.search)
      var fields = await userProfileService.getAllBySearch(req.query.search);
    else var fields = await userProfileService.getAll();

    sendRes(req, res, statusCode.SUCCESS, "", fields);
  } catch (error) {
    next(error);
  }
}

async function deleteUserProfile(req, res, next) {
  try {
    var field = await userProfileService.remove(req.params.profileid);
    sendRes(req, res, statusCode.SUCCESS, "", field);
  } catch (error) {
    next(error);
  }
}

async function addProfileField(req, res, next) {
  try {
    var exist = await userProfileService.search(req.body);
    if (exist) throw new ValidationError(messages.FIELD_ALREADY_EXIST);
    var userProfileKey = await userProfileService.create(req.body);
    var profile = await userService.updateQueryAll(
      {},
      {
        $push: {
          userProfile: userProfileKey._id,
        },
      }
    );

    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.USER_UPDATED_SUCCESSFULLY,
      userProfileKey
    );
  } catch (error) {
    next(error);
  }
}

async function getLocations(req, res, next) {
  try {
    if (req.query.search)
      var locations = await locationService.getAllBySearch(req.query.search);
    else var locations = await locationService.getAll();
    sendRes(req, res, statusCode.SUCCESS, "", locations);
  } catch (error) {
    next(error);
  }
}

async function singleLocation(req, res, next) {
  try {
    var location = await locationService.search({
      _id: req.params.locationid,
    });
    sendRes(req, res, statusCode.SUCCESS, "", location);
  } catch (error) {
    next(error);
  }
}
async function updateLocation(req, res, next) {
  try {
    var location = await locationService.updateQuery(
      { _id: req.params.locationid },
      req.body
    );
    sendRes(req, res, statusCode.SUCCESS, "", location);
  } catch (error) {
    next(error);
  }
}

async function addLocation(req, res, next) {
  try {
    var exist = await locationService.search({
      name: req.body.name,
      isDeleted: false,
    });
    if (exist) throw new ValidationError(messages.LOCATION_ALREADY_EXISTS);

    var existaddress = await locationService.search({
      geoAddress: req.body.geoAddress,
      isDeleted: false,
    });
    if (existaddress)
      throw new ValidationError(messages.LOCATION_ALREADY_EXISTS);

    var location = await locationService.create(req.body);
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.LOCATION_CREATED_SUCCESSFULLY,
      location
    );
  } catch (error) {
    next(error);
  }
}

async function deleteLocation(req, res, next) {
  try {
    var location = await locationService.remove(req.params.locationid);
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.LOCATION_DELETED_EXISTS,
      location
    );
  } catch (error) {
    next(error);
  }
}

async function updateCms(req, res, next) {
  try {
    var cms = await Cms.updateQuery({ _id: req.params.cmsid }, req.body);
    sendRes(req, res, statusCode.SUCCESS, messages.CMS_PAGES_UPDATED, cms);
  } catch (error) {
    next(error);
  }
}
async function getCms(req, res, next) {
  try {
    var cms = await Cms.getAll();
    sendRes(req, res, statusCode.SUCCESS, "", cms);
  } catch (error) {
    next(error);
  }
}

module.exports.signin = signin;
module.exports.signup = signup;
module.exports.resetPassword = resetPassword;

module.exports.getUsers = getUsers;

module.exports.getDashboardData = getDashboardData;
module.exports.getDashboardGraph = getDashboardGraph;

module.exports.singleUser = singleUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;

module.exports.activateDeactiveUser = activateDeactiveUser;
module.exports.addActivity = addActivity;
module.exports.getActivities = getActivities;
module.exports.deleteActivity = deleteActivity;

module.exports.addSubActivity = addSubActivity;
module.exports.updateSubActivity = updateSubActivity;

module.exports.getSubActivities = getSubActivities;
module.exports.singleSubActivity = singleSubActivity;
module.exports.deleteSubActivity = deleteSubActivity;

module.exports.listProfileFields = listProfileFields;
module.exports.addProfileField = addProfileField;
module.exports.deleteUserProfile = deleteUserProfile;

module.exports.getLocations = getLocations;
module.exports.singleLocation = singleLocation;
module.exports.updateLocation = updateLocation;

module.exports.addLocation = addLocation;
module.exports.deleteLocation = deleteLocation;

module.exports.updateCms = updateCms;
module.exports.getCms = getCms;
