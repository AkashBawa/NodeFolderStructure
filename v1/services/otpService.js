const Otp = require("../../models/Otp");
async function create(body) {
  try {
    var otpdata = await Otp.create(body);
    return otpdata;
  } catch (error) {
    throw new Error(error);
  }
}
async function search(body) {
  try {
    var otp = await Otp.findOne(body);
    return otp;
  } catch (error) {
    throw new Error(error);
  }
}

async function remove(id) {
  try {
    var isDeleted = await Otp.findByIdAndDelete(id);
    return isDeleted;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports.create = create;
module.exports.remove = remove;
module.exports.search = search;
