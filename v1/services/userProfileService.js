const UserProfile = require("../../models/UserProfile");

async function getAll() {
  try {
    var users = await UserProfile.find({});
    return users;
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllBySearch(search) {
  try {
    var users = await UserProfile.find({
      $or: [
        { label: { $regex: new RegExp(`^${search}`, "i") } },
        { key: { $regex: new RegExp(`^${search}`, "i") } },
      ],
    });
    return users;
  } catch (error) {
    throw new Error(error);
  }
}
async function create(body) {
  try {
    var users = await UserProfile.create(body);
    return users;
  } catch (error) {
    throw new Error(error);
  }
}

async function countDocument() {
  try {
    var countUser = await UserProfile.countDocuments({});
    return countUser;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateQuery(key, params) {
  try {
    var user = await UserProfile.findOneAndUpdate(key, params, {
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
    var user = await UserProfile.findById(key, params)
      .populate("interest")
      .exec();
    return user;
  } catch (error) {
    throw new Error(error);
  }
}

async function search(body) {
  try {
    var user = await UserProfile.findOne(body).populate("interest").exec();
    return user;
  } catch (error) {
    throw new Error(error);
  }
}

async function get(id) {
  try {
    return await UserProfile.findById(id).populate("interest").exec();
  } catch (error) {
    throw new Error(error);
  }
}

async function remove(id) {
  try {
    var user = await UserProfile.findByIdAndDelete(id);
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
