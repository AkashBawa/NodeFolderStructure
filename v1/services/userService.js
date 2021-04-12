const User = require("../../models/User");
const constants = require("../../utils/constants");
const mongoose = require("mongoose");
const moment = require("moment");
async function getAll(params) {
  try {
    let skip = parseInt(params.pageNo - 1) || constants.DEFAULT_SKIP;
    let limit = constants.DEFAULT_LIMIT;
    skip = skip * limit;
    let sortKey = params.sortKey || "createdAt";
    let sortType = params.sortType || 1;

    var userdata = await User.aggregate([
      { $match: { isDeleted: false } },
      {
        $lookup: {
          from: "interests",
          localField: "interest",
          foreignField: "_id",
          as: "interests",
        },
      },
      {
        $lookup: {
          from: "lookingfors",
          localField: "lookingFor",
          foreignField: "_id",
          as: "lookingFors",
        },
      },
      { $unwind: "$interests" },
      { $unwind: "$lookingFors" },
      { $sort: { [sortKey]: sortType } },
      {
        $facet: {
          metadata: [
            { $count: "total" },
            { $addFields: { pageNo: params.pageNo } },
          ],
          users: [{ $skip: skip }, { $limit: limit }], // add projection here wish you re-shape the docs
        },
      },
      { $unwind: "$metadata" },
    ]);
    return userdata;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateQueryAll({}, params) {
  try {
    var users = await User.updateMany({}, params);
    return users;
  } catch (error) {
    throw new Error(error);
  }
}
async function getGeoNear(params) {
  try {
    let skip = parseInt(params.pageNo - 1) || constants.DEFAULT_SKIP;
    let limit = constants.DEFAULT_LIMIT;
    skip = skip * limit;
    var latitude = params.latitude;
    var longitude = params.longitude;

    var sendobj = {
      isDeleted: false,
      _id: {
        $nin: [params.userid],
      },
      userLocation: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $minDistance: 0,
          $maxDistance: 10000,
        },
      },
    };
    if (params.gender) sendobj.gender = params.gender;
    if (params.country) sendobj.country = params.country;
    if (params.ageRange)
      sendobj.dob = {
        $lte: moment(new Date()).subtract(params.ageRange[0], "years").toDate(),
        $gte: moment(new Date()).subtract(params.ageRange[1], "years").toDate(),
      };

    if (params.lookingFor)
      sendobj.lookingFor = mongoose.Types.ObjectId(params.lookingFor);

    var users = await User.find(sendobj)
      .skip(skip)
      .limit(limit)
      .populate("lookingFor")
      .populate("interest");
    return users;
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllBySearch(params) {
  try {
    let skip = parseInt(params.pageNo - 1) || constants.DEFAULT_SKIP;
    let limit = constants.DEFAULT_LIMIT;
    skip = skip * limit;
    let sortKey = params.sortKey || "createdAt";
    let sortType = params.sortType || 1;

    var userdata = await User.aggregate([
      {
        $match: {
          isDeleted: false,
          $or: [
            { phoneNumber: { $regex: new RegExp(`^${params.search}`, "i") } },
            { email: { $regex: new RegExp(`^${params.search}`, "i") } },
            { name: { $regex: new RegExp(`^${params.search}`, "i") } },
            { address: { $regex: new RegExp(`^${params.search}`, "i") } },
          ],
        },
      },
      {
        $lookup: {
          from: "interests",
          localField: "interest",
          foreignField: "_id",
          as: "interests",
        },
      },
      {
        $lookup: {
          from: "lookingfors",
          localField: "lookingFor",
          foreignField: "_id",
          as: "lookingFors",
        },
      },
      { $sort: { [sortKey]: sortType } },
      {
        $facet: {
          metadata: [
            { $count: "total" },
            { $addFields: { pageNo: params.pageNo } },
          ],
          users: [{ $skip: skip }, { $limit: limit }],
        },
      },
      { $unwind: { path: "$metadata", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          users: 1,
          metadata: {
            $ifNull: ["$metadata", { $literal: { total: 0, pageNo: 0 } }],
          },
        },
      },
    ]);
    return userdata;
  } catch (error) {
    throw new Error(error);
  }
}
async function create(body) {
  try {
    var users = await User.create(body);
    return users;
  } catch (error) {
    throw new Error(error);
  }
}

async function countDocument() {
  try {
    var countUser = await User.countDocuments({ isDeleted: false });
    return countUser;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateQuery(key, params) {
  try {
    var user = await User.findOneAndUpdate(key, params, {
      new: true,
      returnOriginal: false,
      upsert: true,
    })
      .populate("interest")
      .populate("lookingFor")
      .exec();
    return user;
  } catch (error) {
    throw new Error(error);
  }
}
async function searchQuery(key, params) {
  try {
    var user = await User.findById(key, params)
      .populate("interest")
      .populate("lookingFor")
      .exec();
    return user;
  } catch (error) {
    throw new Error(error);
  }
}

async function search(body) {
  try {
    var user = await User.findOne(body)
      .populate("interest")
      .populate("lookingFor")
      .exec();
    return user;
  } catch (error) {
    throw new Error(error);
  }
}

async function get(id) {
  try {
    return await User.findById(id).populate("interest").exec();
  } catch (error) {
    throw new Error(error);
  }
}

async function remove(id) {
  try {
    var user = await User.findByIdAndDelete(id);
    return user;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports.getAll = getAll;
module.exports.updateQueryAll = updateQueryAll;
module.exports.getAllBySearch = getAllBySearch;
module.exports.get = get;
module.exports.create = create;
module.exports.search = search;
module.exports.updateQuery = updateQuery;
module.exports.searchQuery = searchQuery;
module.exports.countDocument = countDocument;
module.exports.remove = remove;
module.exports.getGeoNear = getGeoNear;
