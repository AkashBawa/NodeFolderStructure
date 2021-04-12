const LookingFor = require("../../models/LookingFor");

async function getAll() {
  try {
    var lookingfor = await LookingFor.find({});
    return lookingfor;
  } catch (error) {
    throw new Error(error);
  }
}
async function create(body) {
  try {
    var lookingfor = await LookingFor.create(body);
    return lookingfor;
  } catch (error) {
    throw new Error(error);
  }
}

async function search(body) {
  try {
    var lookingfor = await LookingFor.findOne(body);
    return lookingfor;
  } catch (error) {
    throw new Error(error);
  }
}

async function get(id) {
  try {
    var lookingfor = await LookingFor.findById(id);
    return lookingfor;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.search = search;
