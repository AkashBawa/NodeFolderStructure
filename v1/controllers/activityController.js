const statusCode = require("../../utils/statusCodes");
const messages = require("../../utils/messages");
const sendRes = require("../../utils/response");
const activityService = require("../services/activityService");

async function getActivities(req, res, next) {
  try {
    var activities = await activityService.getAll();
    sendRes(req, res, statusCode.SUCCESS, "", activities);
  } catch (error) {
    next(error);
  }
}

module.exports.getActivities = getActivities;
