const Cms = require("../../models/Cms");

async function getAll() {
  try {
    var cms = await Cms.find({});
    return cms;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateQuery(key, params) {
  try {
    var cms = await Cms.findOneAndUpdate(key, params, {
      new: true,
      returnOriginal: false,
      upsert: true,
    });
    return cms;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports.getAll = getAll;
module.exports.updateQuery = updateQuery;
