const Post = require("../../models/Post");
const constants = require("../../utils/constants");
const mongoose = require("mongoose");
async function create(body) {
  try {
    var posts = await Post.create(body);
    return posts;
  } catch (error) {
    throw new Error(error);
  }
}

async function searchAll(body) {
  try {
    var posts = await Post.find(body);
    return posts;
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllByActivity(params) {
  try {
    let skip = parseInt(params.pageNo - 1) || constants.DEFAULT_SKIP;
    let limit = constants.DEFAULT_LIMIT;
    skip = skip * limit;
    let sortKey = params.sortKey || "createdAt";
    let sortType = params.sortType || 1;
    var posts = await Post.aggregate([
      {
        $match: {
          isDeleted: false,
          activity: mongoose.Types.ObjectId(params.activity),
          $or: [
            { desc: { $regex: new RegExp(`^${params.search}`, "i") } },
            { location: { $regex: new RegExp(`^${params.search}`, "i") } },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
      { $sort: { [sortKey]: sortType } },
      {
        $facet: {
          metadata: [
            { $count: "total" },
            { $addFields: { pageNo: parseInt(params.pageNo) } },
          ],
          posts: [{ $skip: skip }, { $limit: limit }],
        },
      },
      { $unwind: { path: "$metadata", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          posts: 1,
          metadata: {
            $ifNull: ["$metadata", { $literal: { total: 0, pageNo: 0 } }],
          },
        },
      },
    ]);
    return posts;
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllByUser(params) {
  try {
    let skip = parseInt(params.pageNo - 1) || constants.DEFAULT_SKIP;
    let limit = constants.DEFAULT_LIMIT;
    skip = skip * limit;
    let sortKey = params.sortKey || "createdAt";
    let sortType = params.sortType || 1;
    var posts = await Post.aggregate([
      {
        $match: {
          isDeleted: false,
          user: mongoose.Types.ObjectId(params.user),
          $or: [
            { desc: { $regex: new RegExp(`^${params.search}`, "i") } },
            { location: { $regex: new RegExp(`^${params.search}`, "i") } },
          ],
        },
      },

      { $sort: { [sortKey]: sortType } },
      {
        $facet: {
          metadata: [
            { $count: "total" },
            { $addFields: { pageNo: parseInt(params.pageNo) } },
          ],
          posts: [{ $skip: skip }, { $limit: limit }],
        },
      },
      { $unwind: { path: "$metadata", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          posts: 1,
          metadata: {
            $ifNull: ["$metadata", { $literal: { total: 0, pageNo: 0 } }],
          },
        },
      },
    ]);
    return posts;
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
    var posts = await Post.aggregate([
      {
        $match: {
          isDeleted: false,
          $or: [
            { desc: { $regex: new RegExp(`^${params.search}`, "i") } },
            { location: { $regex: new RegExp(`^${params.search}`, "i") } },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $lookup: {
          from: "admins",
          localField: "user",
          foreignField: "_id",
          as: "admins",
        },
      },
      { $unwind: "$admins" },
      { $unwind: "$user" },

      { $sort: { [sortKey]: sortType } },
      {
        $facet: {
          metadata: [
            { $count: "total" },
            { $addFields: { pageNo: parseInt(params.pageNo) } },
          ],
          posts: [{ $skip: skip }, { $limit: limit }],
        },
      },
      { $unwind: { path: "$metadata", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          posts: 1,
          metadata: {
            $ifNull: ["$metadata", { $literal: { total: 0, pageNo: 0 } }],
          },
        },
      },
    ]);
    return posts;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateQuery(key, params) {
  try {
    var post = await Post.findOneAndUpdate(key, params, {
      new: true,
      returnOriginal: false,
      upsert: true,
    });
    return post;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateQueryAll({}, params) {
  try {
    var posts = await Post.updateMany({}, params);
    return posts;
  } catch (error) {
    throw new Error(error);
  }
}

async function searchQuery(key, params) {
  try {
    var post = await Post.findById(key, params);
    return post;
  } catch (error) {
    throw new Error(error);
  }
}

async function search(body) {
  try {
    var post = await Post.findOne(body);
    return post;
  } catch (error) {
    throw new Error(error);
  }
}

async function get(id) {
  try {
    var post = await Post.findById(id);
    return post;
  } catch (error) {
    throw new Error(error);
  }
}

async function remove(id) {
  try {
    var post = await Post.findByIdAndDelete(id);
    return post;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports.create = create;
module.exports.getAllByUser = getAllByUser;
module.exports.getAllByActivity = getAllByActivity;
module.exports.getAllBySearch = getAllBySearch;
module.exports.get = get;
module.exports.create = create;
module.exports.search = search;
module.exports.searchAll = searchAll;
module.exports.updateQuery = updateQuery;
module.exports.updateQueryAll = updateQueryAll;
module.exports.searchQuery = searchQuery;
module.exports.remove = remove;
