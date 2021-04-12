const joi = require("joi");
const { ValidationError } = require("../errors/errors");
const { onlyUnique } = require("../../utils/common");
const moment = require("moment");

const validateSignUp = async (req, res, next) => {
  try {
    let schema = joi.object().keys({
      phoneNumber: joi.number().required(),
      countryCode: joi.string().required(),
      email: joi.string().required(),
      name: joi.string().required(),
      dob: joi.date().required(),
      gender: joi.number().required(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
      throw new ValidationError(error.details ? error.details[0].message : "");
    }
    next();
  } catch (error) {
    next(error);
  }
};

const validateSendOtp = async (req, res, next) => {
  try {
    let schema = joi.object().keys({
      countryCode: joi.string().required(),
      phoneNumber: joi.number().required(),
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

const validateVerifyOtp = async (req, res, next) => {
  try {
    let schema = joi.object().keys({
      countryCode: joi.string().required(),
      phoneNumber: joi.number().required(),
      otpCode: joi.number().required(),
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
const validateUserMatches = async (req, res, next) => {
  try {
    let schema = joi.object().keys({
      latitude: joi.number().required(),
      longitude: joi.number().required(),
      gender: joi.number().optional(),
      country: joi.string().optional(),
      lookingFor: joi.string().optional(),
      ageRange: joi.array().optional(),
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

const validateEmail = async (req, res, next) => {
  try {
    let schema = joi.object().keys({
      email: joi
        .string()
        .email({ tlds: { allow: false } })
        .required(),
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

const validateSignUpName = async (req, res, next) => {
  try {
    req.body.dob = moment(req.body.dob, "DD-MM-YYYY").format("MM-DD-YYYY");
    let schema = joi.object().keys({
      name: joi.string().required(),
      dob: joi
        .date()
        .max("now")
        .message("The date of birth must be valid")
        .required(),
      gender: joi.number().required(),
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

const validateSignUpStatus = async (req, res, next) => {
  try {
    let schema = joi.object().keys({
      status: joi.number().required(),
      country: joi.string().required(),
      pets: joi.boolean().required(),
      kids: joi.boolean().required(),
      address: joi.string().required(),
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

const validateSignUpLooking = async (req, res, next) => {
  try {
    let schema = joi.object().keys({
      lookingFor: joi.string().required(),
      education: joi.number().required(),
      profession: joi.string().required(),
      aboutMe: joi.string().required(),
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
    let schema = joi.object().keys({
      email: joi
        .string()
        .email({ tlds: { allow: false } })
        .required(),
      password: joi.string().required(),
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

const validateSocialLogin = async (req, res, next) => {
  try {
    let schema = joi.object().keys({
      provider: joi.string().required(),
      providerId: joi.string().required(),
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

const validateSocialConnect = async (req, res, next) => {
  try {
    let schema = joi.object().keys({
      socialType: joi.number().required(),
      socialId: joi.string().required(),
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

const validateProfilePic = async (req, res, next) => {
  try {
    let schema = joi.object().keys({
      baseProfilePic: joi.string().required(),
      gallaryProfilePic: joi.string().required(),
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
const validateUpdateProfile = async (req, res, next) => {
  try {
    let schema = joi.object().keys({
      baseProfilePic: joi.string().required(),
      gallaryProfilePic: joi.string().required(),
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

const validateInterest = async (req, res, next) => {
  try {
    var unique = req.body.interest.filter(onlyUnique);
    req.body.interest = unique;
    let schema = joi.object().keys({
      interest: joi.array().required(),
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

const validateSendConnection = async (req, res, next) => {
  try {
    let schema = joi.object().keys({
      connection: joi.string().required(),
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
  validateSignUpName,
  validateSignUpStatus,
  validateSignUpLooking,
  validateSignin,
  validateSendOtp,
  validateVerifyOtp,
  validateSocialLogin,
  validateSocialConnect,
  validateEmail,
  validateProfilePic,
  validateUpdateProfile,
  validateInterest,
  validateUserMatches,
  validateSendConnection,
};
