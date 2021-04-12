const Activity = require("../../models/Activity");

async function getAll() {
  try {
    var activity = await Activity.find({}).populate({
      path: "subActivity",
      match: { isDeleted: false },
    });
    return activity;
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllBySearch(search) {
  try {
    var activity = await Activity.find({
      $or: [{ activityName: { $regex: new RegExp(`^${search}`, "i") } }],
    })
      .populate({
        path: "subActivity",
        match: { isDeleted: false },
      })
      .exec();
    return activity;
  } catch (error) {
    throw new Error(error);
  }
}

async function create(body) {
  try {
    var activity = await Activity.create(body);
    return activity;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateQuery(key, params) {
  try {
    var activity = await Activity.findOneAndUpdate(key, params, {
      new: true,
      returnOriginal: false,
      upsert: true,
    });
    return activity;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateQueryAll({}, params) {
  try {
    var activities = await Activity.updateMany({}, params);
    return activities;
  } catch (error) {
    throw new Error(error);
  }
}

async function searchQuery(key, params) {
  try {
    var activity = await Activity.findById(key, params);
    return activity;
  } catch (error) {
    throw new Error(error);
  }
}

async function search(body) {
  try {
    var activity = await Activity.findOne(body);
    return activity;
  } catch (error) {
    throw new Error(error);
  }
}

async function get(id) {
  try {
    var activity = await Activity.findById(id);
    return activity;
  } catch (error) {
    throw new Error(error);
  }
}

async function remove(id) {
  try {
    var activity = await Activity.findByIdAndDelete(id);
    return activity;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports.getAll = getAll;
module.exports.getAllBySearch = getAllBySearch;
module.exports.get = get;
module.exports.create = create;
module.exports.search = search;
module.exports.updateQuery = updateQuery;
module.exports.updateQueryAll = updateQueryAll;
module.exports.searchQuery = searchQuery;
module.exports.remove = remove;
