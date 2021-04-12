const UserProfileKey = require("../../models/UserProfileKey");

async function getAll() {
  try {
    var users = await UserProfileKey.find({});
    return users;
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllBySearch(search) {
  try {
    var users = await UserProfileKey.find({ $text: { $search: search } })
      .populate("interest")
      .exec();
    return users;
  } catch (error) {
    throw new Error(error);
  }
}
async function create(body) {
  try {
    var users = await UserProfileKey.create(body);
    return users;
  } catch (error) {
    throw new Error(error);
  }
}

async function countDocument() {
  try {
    var countUser = await UserProfileKey.countDocuments({});
    return countUser;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateQuery(key, params) {
  try {
    var user = await UserProfileKey.findOneAndUpdate(key, params, {
      new: true,
      returnOriginal: false,
      upsert: true,
    })
      .populate("interest")
      .exec();
    return user;
  } catch (error) {
    throw new Error(error);
  }
}
async function searchQuery(key, params) {
  try {
    var user = await UserProfileKey.findById(key, params)
      .populate("interest")
      .exec();
    return user;
  } catch (error) {
    throw new Error(error);
  }
}

async function search(body) {
  try {
    var user = await UserProfileKey.findOne(body);
    return user;
  } catch (error) {
    throw new Error(error);
  }
}

async function get(id) {
  try {
    return await UserProfileKey.findById(id);
  } catch (error) {
    throw new Error(error);
  }
}

async function remove(id) {
  try {
    var user = await UserProfileKey.findByIdAndDelete(id);
    return user;
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
module.exports.searchQuery = searchQuery;
module.exports.countDocument = countDocument;
module.exports.remove = remove;
