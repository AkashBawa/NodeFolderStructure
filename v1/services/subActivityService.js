const SubActivity = require("../../models/SubActivity");

async function getAll() {
  try {
    var subActivities = await SubActivity.find({ isDeleted: false });
    return subActivities;
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllBySearch(search) {
  try {
    var subActivities = await SubActivity.find({
      $or: [{ sportName: { $regex: new RegExp(`^${search}`, "i") } }],
    }).exec();
    return subActivities;
  } catch (error) {
    throw new Error(error);
  }
}

async function create(body) {
  try {
    var subActivity = await SubActivity.create(body);
    return subActivity;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateQuery(key, params) {
  try {
    var subActivity = await SubActivity.findOneAndUpdate(key, params, {
      new: true,
      returnOriginal: false,
      upsert: true,
    });
    return subActivity;
  } catch (error) {
    throw new Error(error);
  }
}

async function searchQuery(key, params) {
  try {
    var subActivity = await SubActivity.findById(key, params);
    return subActivity;
  } catch (error) {
    throw new Error(error);
  }
}

async function search(body) {
  try {
    var subActivity = await SubActivity.findOne(body);
    return subActivity;
  } catch (error) {
    throw new Error(error);
  }
}

async function get(id) {
  try {
    var subActivity = await SubActivity.findById(id);
    return subActivity;
  } catch (error) {
    throw new Error(error);
  }
}
async function remove(id) {
  try {
    var subActivity = await SubActivity.findByIdAndDelete(id);
    return subActivity;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports.getAll = getAll;
module.exports.getAllBySearch = getAllBySearch;
module.exports.get = get;
module.exports.create = create;
module.exports.search = search;
module.exports.remove = remove;
module.exports.updateQuery = updateQuery;
module.exports.searchQuery = searchQuery;
