const statusCode = require("../../utils/statusCodes");
const messages = require("../../utils/messages");
const sendRes = require("../../utils/response");
const lookingforService = require("../services/lookingforService");
const interestService = require("../services/interestService");
const { ValidationError } = require("../../middleware/errors/errors");
const Height = require("../../models/Height");

async function getInterests(req, res, next) {
  try {
    var interests = await interestService.getAll();
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.INTEREST_GET_SUCCESSFULLY,
      interests
    );
  } catch (error) {
    next(error);
  }
}

async function addInterest(req, res, next) {
  try {
    var exists = await interestService.search({ name: req.body.name });
    if (exists) throw new ValidationError(messages.INTEREST_ALREADY_EXISTS);
    var interest = await interestService.create(req.body);
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.INTEREST_CREATED_SUCCESSFULLY,
      interest
    );
  } catch (error) {
    next(error);
  }
}

async function addHeight(req, res, next) {
  try {
    var exists = await Height.findOne({ name: req.body.name });
    if (exists) throw new ValidationError(messages.HEIGHT_ALREADY_EXISTS);
    var height = await Height.create(req.body);
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.HEIGHT_ADDED_SUCCESSFULLY,
      height
    );
  } catch (error) {
    next(error);
  }
}

async function getHeights(req, res, next) {
  try {
    var heights = await Height.find({});
    sendRes(req, res, statusCode.SUCCESS, "", heights[0].labels);
  } catch (error) {
    next(error);
  }
}

async function getLookingFor(req, res, next) {
  try {
    var lookingFor = await lookingforService.getAll();
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.INTEREST_GET_SUCCESSFULLY,
      lookingFor
    );
  } catch (error) {
    next(error);
  }
}

async function addLookingFor(req, res, next) {
  try {
    var exists = await lookingforService.search({ name: req.body.name });
    if (exists) throw new ValidationError(messages.INTEREST_ALREADY_EXISTS);
    var lookingFor = await lookingforService.create(req.body);
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.INTEREST_CREATED_SUCCESSFULLY,
      lookingFor
    );
  } catch (error) {
    next(error);
  }
}

module.exports.getInterests = getInterests;
module.exports.addInterest = addInterest;
module.exports.addLookingFor = addLookingFor;
module.exports.getLookingFor = getLookingFor;
module.exports.addHeight = addHeight;
module.exports.getHeights = getHeights;
