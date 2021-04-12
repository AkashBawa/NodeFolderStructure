const Interest = require("../../models/Interest");

async function getAll() {
  try {
    var interests = await Interest.find({});
    return interests;
  } catch (error) {
    throw new Error(error);
  }
}
async function create(body) {
  try {
    var interests = await Interest.create(body);
    return interests;
  } catch (error) {
    throw new Error(error);
  }
}

async function search(body) {
  try {
    var interest = await Interest.findOne(body);
    return interest;
  } catch (error) {
    throw new Error(error);
  }
}

async function get(id) {
  try {
    var interest = await Interest.findById(id);
    return interest;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.search = search;
