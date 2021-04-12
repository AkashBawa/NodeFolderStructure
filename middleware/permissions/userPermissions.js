const messages = require("../../utils/messages");
const userService = require("../../v1/services/userService");
const { noAuth } = require("../errors/errors");

function checkUserRole(userType) {
  return (req, res, next) => {
    userService.findOne({ email });
    if (req.body.userType !== userType) throw new noAuth(messages.UNAUTHORIZED);
    next();
  };
}
module.exports.checkUserRole = checkUserRole;
