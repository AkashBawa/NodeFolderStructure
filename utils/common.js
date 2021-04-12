var jwt = require("jsonwebtoken");
var config = require("config");
var bcrypt = require("bcryptjs");
const jwtSign = async (data) => {
  try {
    var accessToken = await jwt.sign(
      { _id: data._id },
      config.get("jwtsecret"),
      {
        expiresIn: config.get("jwtexpire"),
      }
    );
    return accessToken;
  } catch (error) {
    throw new Error(error);
  }
};

const comparePasswordHash = async (password, hash) => {
  try {
    var cmp = await bcrypt.compare(password, hash);
    return cmp;
  } catch (error) {
    throw new Error(error);
  }
};

const generatePasswordHash = async (password) => {
  try {
    var salt = await bcrypt.genSalt(10);
    var password = await bcrypt.hash(password, salt);
    return password;
  } catch (error) {
    throw new Error(error);
  }
};

const onlyUnique = (value, index, self) => {
  try {
    var data = self.indexOf(value) === index;
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
function calcCrow(coords1, coords2) {
  var R = 10000000;
  var dLat = toRad(coords2.lat - coords1.lat);
  var dLon = toRad(coords2.lng - coords1.lng);
  var lat1 = toRad(coords1.lat);
  var lat2 = toRad(coords2.lat);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  if (d < 10000000) return true;
  return false;
}

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}
module.exports = {
  jwtSign,
  comparePasswordHash,
  generatePasswordHash,
  onlyUnique,
  calcCrow,
  toRad,
};
