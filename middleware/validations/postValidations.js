const { ValidationError } = require("../errors/errors");
const joi = require("joi");
const moment = require("moment");
const validateAddPost = async (req, res, next) => {
  req.body.date = moment(req.body.date, "DD-MM-YYYY").format("MM-DD-YYYY");
  try {
    let schema = joi.object().keys({
      desc: joi.string().required(),
      activity: joi.string().required(),
      subActivity: joi.string().optional(),
      date: joi.date().required(),
      noOfPeople: joi.number().required(),
      gender: joi.number().required(),
      address: joi.string().required(),
      agePreference: joi.array().required(),
      longitude: joi.number().required(),
      latitude: joi.number().required(),
      visibility: joi.number().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      throw new ValidationError(error.details ? error.details[0].message : "");
    }
    next();
  } catch (error) {
    next(error);
  }
};

const validateActivityPost = async (req, res, next) => {
  try {
    let schema = joi.object().keys({
      activity: joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      throw new ValidationError(error.details ? error.details[0].message : "");
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateAddPost,
  validateActivityPost,
};
