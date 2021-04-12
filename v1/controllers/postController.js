const statusCode = require("../../utils/statusCodes");
const messages = require("../../utils/messages");
const sendRes = require("../../utils/response");
const { ValidationError } = require("../../middleware/errors/errors");
const postService = require("../services/postService");
const mongoose = require("mongoose");

async function getPosts(req, res, next) {
  try {
    var posts = await postService.getAllBySearch(req.query);
    sendRes(req, res, statusCode.SUCCESS, "", posts);
  } catch (error) {
    next(error);
  }
}

async function getUserPosts(req, res, next) {
  try {
    req.query.user = req.user._id;
    var posts = await postService.getAllByUser(req.query);
    sendRes(req, res, statusCode.SUCCESS, "", posts);
  } catch (error) {
    next(error);
  }
}

async function createPost(req, res, next) {
  try {
    var exist = await postService.search({
      desc: req.body.desc,
    });
    req.body.user = req.user._id;
    req.body.location = {
      type: "Point",
      coordinates: [req.body.longitude, req.body.latitude],
    };
    if (exist) throw new ValidationError(messages.POST_EXIST_ALREADY);
    var post = await postService.create(req.body);
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.POST_ADDED_SUCCESSFULLY,
      post
    );
  } catch (error) {
    next(error);
  }
}

async function updatePost(req, res, next) {
  try {
    var post = await postService.updateQuery({ _id: req.body._id }, req.body);
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.POST_UPDATED_SUCCESSFULLY,
      post
    );
  } catch (error) {
    next(error);
  }
}

async function getActivityPosts(req, res, next) {
  try {
    req.query.activity = req.body.activity;
    var posts = await postService.getAllByActivity(req.query);
    sendRes(req, res, statusCode.SUCCESS, "", posts);
  } catch (error) {
    next(error);
  }
}

async function deletePost(req, res, next) {
  try {
    var post = await postService.remove(req.params.postid);
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.POST_DELETED_SUCCESSFULLY,
      post
    );
  } catch (error) {
    next(error);
  }
}
module.exports.getPosts = getPosts;
module.exports.getActivityPosts = getActivityPosts;
module.exports.getUserPosts = getUserPosts;
module.exports.createPost = createPost;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;
