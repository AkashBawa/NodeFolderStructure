const { check, validationResult } = require("express-validator");
const joi = require("joi");
const { ValidationError } = require("../errors/errors");

const validateAddLocation = async (req, res, next) => {
  try {
    let schema = joi.object().keys({
      name: joi.string().required(),
      latlng: joi.object().required(),
      geoRadius: joi.number().required(),
      geoAddress: joi.string().required(),
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

const validateSignin = async (req, res, next) => {
  try {
    await check("email", "Invalid email address").isEmail().run(req);
    await check("password", "Password is required").notEmpty().run(req);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw new ValidationError(result);
    }
    next();
  } catch (error) {
    next(error);
  }
};
const validateResetPassword = async (req, res, next) => {
  try {
    await check("password", "Password is required").notEmpty().run(req);
    await check("newpassword", "New Password is required").notEmpty().run(req);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw new ValidationError(result);
    }
    next();
  } catch (error) {
    next(error);
  }
};

const validateActiveDeactive = async (req, res, next) => {
  try {
    await check("isActive", "isActive is required").notEmpty().run(req);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw new ValidationError(result);
    }
    next();
  } catch (error) {
    next(error);
  }
};

const validateUpdateUser = async (req, res, next) => {
  try {
    await check("name", "Name is required").notEmpty().run(req);
    await check("email", "Email is required").notEmpty().run(req);
    await check("address", "Address is required").notEmpty().run(req);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw new ValidationError(result);
    }
    next();
  } catch (error) {
    next(error);
  }
};
const validateAddActivity = async (req, res, next) => {
  try {
    await check("activityName", "Activity Name is required")
      .notEmpty()
      .run(req);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw new ValidationError(result);
    }
    next();
  } catch (error) {
    next(error);
  }
};
const validateAddSubActivity = async (req, res, next) => {
  try {
    await check("subActivityName", "Sub Activity Name is required")
      .notEmpty()
      .run(req);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw new ValidationError(result);
    }
    next();
  } catch (error) {
    next(error);
  }
};

const validateAddPost = async (req, res, next) => {
  try {
    let schema = joi.object().keys({
      desc: joi.string().required(),
      activity: joi.string().required(),
      subActivity: joi.string().required(),
      date: joi.date().required(),
      noOfPeople: joi.number().required(),
      user: joi.string().required(),
      location: joi.string().required(),
      gender: joi.boolean().required(),
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

const validateUpdateCms = () => {
  try {
    let schema = joi.object().keys({
      contactUs: joi.string().optional(),
      legal: joi.string().optional(),
      privacyPolicy: joi.string().optional(),
      faq: joi.string().optional(),
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
  validateResetPassword,
  validateSignin,
  validateActiveDeactive,
  validateAddActivity,
  validateAddSubActivity,
  validateUpdateUser,
  validateAddPost,
  validateAddLocation,
  validateUpdateCms,
};
