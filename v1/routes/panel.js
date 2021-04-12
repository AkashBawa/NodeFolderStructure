const express = require("express");
const {
  validateSignin,
  validateActiveDeactive,
  validateAddActivity,
  validateAddSubActivity,
  validateResetPassword,
  validateAddLocation,
  validateUpdateCms,
} = require("../../middleware/validations/adminValidations");
const {
  validateAddPost,
} = require("../../middleware/validations/postValidations");

const { checkUserAuth } = require("../../middleware/auth/authenticate");
const router = express.Router();
const adminController = require("../controllers/adminController");
const postController = require("../controllers/postController");
const commonController = require("../controllers/commonController");
const { userPic } = require("../services/fileUploadService");

router.post("/signin", validateSignin, adminController.signin);
router.post("/signup", adminController.signup);
router.post(
  "/resetPassword",
  validateResetPassword,
  checkUserAuth,
  adminController.resetPassword
);

router.get("/dashboardData", checkUserAuth, adminController.getDashboardData);

router.get("/user/all", checkUserAuth, adminController.getUsers);
router.get("/user/:userid", checkUserAuth, adminController.singleUser);
router.post(
  "/user/activedeactive/:userid",
  validateActiveDeactive,
  checkUserAuth,
  adminController.activateDeactiveUser
);
router.post(
  "/user/update/:userid",
  checkUserAuth,
  userPic.fields([
    {
      name: "baseProfilePic",
      maxCount: 1,
    },
    {
      name: "gallaryProfilePic",
      maxCount: 3,
    },
  ]),

  adminController.updateUser
);
router.delete(
  "/user/delete/:userid",
  checkUserAuth,
  adminController.deleteUser
);

router.post(
  "/activity/add",
  validateAddActivity,
  checkUserAuth,
  adminController.addActivity
);

router.delete(
  "/activity/delete/:activityid",
  checkUserAuth,
  adminController.deleteActivity
);
router.get("/activity/all", checkUserAuth, adminController.getActivities);

router.post(
  "/subActivity/add/:activityid",
  validateAddSubActivity,
  checkUserAuth,
  adminController.addSubActivity
);
router.get("/subActivity/all", checkUserAuth, adminController.getSubActivities);
router.get(
  "/subActivity/:subactivityid",
  checkUserAuth,
  adminController.singleSubActivity
);
router.post(
  "/subActivity/update/:subactivityid",
  checkUserAuth,
  adminController.updateSubActivity
);
router.delete(
  "/subActivity/delete/:subactivityid",
  checkUserAuth,
  adminController.deleteSubActivity
);

router.get("/post/all", checkUserAuth, postController.getPosts);
router.post(
  "/post/add",
  validateAddPost,
  checkUserAuth,
  postController.createPost
);

router.post("/post/update/:postid", checkUserAuth, postController.updatePost);
router.delete("/post/delete/:postid", checkUserAuth, postController.deletePost);

router.post("/addInterest", checkUserAuth, commonController.addInterest);
router.post("/addLookingFor", checkUserAuth, commonController.addLookingFor);

router.get(
  "/listProfileFields",
  checkUserAuth,
  adminController.listProfileFields
);

router.delete(
  "/profileField/:profileid",
  checkUserAuth,
  adminController.deleteUserProfile
);

router.post("/addProfileField", checkUserAuth, adminController.addProfileField);

router.post(
  "/addLocation",
  validateAddLocation,
  checkUserAuth,
  adminController.addLocation
);
router.get("/getLocation", checkUserAuth, adminController.getLocations);
router.delete(
  "/deleteLocation/:locationid",
  checkUserAuth,
  adminController.deleteLocation
);
router.get(
  "/getLocation/:locationid",
  checkUserAuth,
  adminController.singleLocation
);
router.post(
  "/getLocation/:locationid",
  validateAddLocation,
  checkUserAuth,
  adminController.updateLocation
);

router.post(
  "/cms/update/:cmsid",
  validateUpdateCms,
  checkUserAuth,
  adminController.updateCms
);

router.get("/cms/all", checkUserAuth, adminController.getCms);

module.exports = router;
