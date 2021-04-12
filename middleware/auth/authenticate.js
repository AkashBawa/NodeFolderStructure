const jwt = require("jsonwebtoken");
const config = require("config");
const { noAuth } = require("../errors/errors");
const messages = require("../../utils/messages");

module.exports.checkUserAuth = async function (req, res, next) {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) throw new noAuth(messages.UNAUTHORIZED);
  try {
    const decoded = await jwt.verify(token, config.get("jwtsecret"));
    if (!decoded) throw new noAuth(messages.UNAUTHORIZED);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
