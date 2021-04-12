const Admin = require("../../models/Admin");

async function getAll() {
  try {
    var admin = await Admin.find();
    return admin;
  } catch (error) {
    throw new Error(error);
  }
}
async function create(body) {
  try {
    var admin = await Admin.create(body);
    return admin;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateQuery(key, params) {
  try {
    var admin = await Admin.findOneAndUpdate(key, params, {
      new: true,
      returnOriginal: false,
      upsert: true,
    });
    return admin;
  } catch (error) {
    throw new Error(error);
  }
}
async function searchQuery(key, params) {
  try {
    var admin = await Admin.findById(key, params);
    return admin;
  } catch (error) {
    throw new Error(error);
  }
}

async function search(body) {
  try {
    var admin = await Admin.findOne(body);
    return admin;
  } catch (error) {
    throw new Error(error);
  }
}

async function get(id) {
  try {
    var admin = await Admin.findById(id);
    return admin;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.search = search;
module.exports.updateQuery = updateQuery;
module.exports.searchQuery = searchQuery;
