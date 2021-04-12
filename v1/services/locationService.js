const Location = require("../../models/Location");

async function getAll() {
  try {
    var locations = await Location.find({});
    return locations;
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllBySearch(search) {
    try {
      var locations = await Location.find({
        $or: [{ name: { $regex: new RegExp(`^${search}`, "i") } }],
      }).exec();
      return locations;
    } catch (error) {
      throw new Error(error);
    }
  }
async function create(body) {
  try {
    var location = await Location.create(body);
    return location;
  } catch (error) {
    throw new Error(error);
  }
}

async function search(body) {
  try {
    var location = await Location.findOne(body);
    return location;
  } catch (error) {
    throw new Error(error);
  }
}

async function get(id) {
  try {
    var location = await Location.findById(id);
    return location;
  } catch (error) {
    throw new Error(error);
  }
}

async function remove(id) {
  try {
    var location = await Location.findByIdAndDelete(id);
    return location;
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
