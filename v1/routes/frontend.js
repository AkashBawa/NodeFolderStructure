const express = require("express");
const { userPic } = require("../services/fileUploadService");
const router = express.Router();

const {
  validateSendOtp,
  validateVerifyOtp,
  validateSignUpName,
  validateSignUpStatus,
  validateSignUpLooking,
  validateSocialLogin,
  validateSocialConnect,
  validateEmail,
  validateProfilePic,
  validateInterest,
  validateUpdateProfile,
  validateUserMatches,
  validateSendConnection,
} = require("../../middleware/validations/userValidations");

const {
  validateAddPost,
  validateActivityPost,
} = require("../../middleware/validations/postValidations");
const { checkUserAuth } = require("../../middleware/auth/authenticate");

const userController = require("../controllers/userController");
const commonController = require("../controllers/commonController");
const postController = require("../controllers/postController");
const activityController = require("../controllers/activityController");

router.post(
  "/user/signin/sendotp",
  validateSendOtp,
  userController.sendOtpWithSignin
);

router.post(
  "/user/signin/verifyotp",
  validateVerifyOtp,
  userController.verifyOtpWithSignin
);
router.post(
  "/user/signup/sendotp",
  validateSendOtp,
  userController.sendOtpWithSignup
);
router.post(
  "/user/signup/verifyotp",
  validateVerifyOtp,
  userController.verifyOtpWithSignup
);
router.post(
  "/user/signup/addemail",
  validateEmail,
  checkUserAuth,
  userController.addEmailWithSignup
);

router.post(
  "/user/signup/addname",
  validateSignUpName,
  checkUserAuth,
  userController.addNameWithSignUp
);
router.post(
  "/user/signup/addstatus",
  validateSignUpStatus,
  checkUserAuth,
  userController.addStatusWithSignUp
);

router.post(
  "/user/signup/addlookingfor",
  validateSignUpLooking,
  checkUserAuth,
  userController.addLookingForWithSignUp
);

router.post(
  "/user/signup/picupload",
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
  userController.profilePicUpload
);

router.post(
  "/user/signup/addinterest",
  validateInterest,
  checkUserAuth,
  userController.addInterest
);
router.post(
  "/user/sociallogin",
  validateSocialLogin,
  userController.socialLogin
);

router.post(
  "/user/signup/socialconnect",
  validateSocialConnect,
  checkUserAuth,
  userController.socialConnect
);

router.post(
  "/user/matches",
  validateUserMatches,
  checkUserAuth,
  userController.getUserMatches
);
router.post(
  "/user/sendconnection",
  validateSendConnection,
  checkUserAuth,
  userController.addUserConnection
);

router.get(
  "/user/getconnections",
  checkUserAuth,
  userController.getUserConnections
);

router.get("/user/getProfile", checkUserAuth, userController.getProfile);
router.post("/user/updateProfile", checkUserAuth, userController.updateProfile);

router.get("/interest", commonController.getInterests);
router.get("/lookingfor", commonController.getLookingFor);
router.get("/height", commonController.getHeights);

router.get("/activities/all", checkUserAuth, activityController.getActivities);

router.get("/user/post/all", checkUserAuth, postController.getUserPosts);
router.post(
  "/user/activity/post",
  validateActivityPost,
  checkUserAuth,
  postController.getActivityPosts
);

router.post(
  "/post/add",
  validateAddPost,
  checkUserAuth,
  postController.createPost
);

router.post("/post/update/:postid", checkUserAuth, postController.updatePost);
router.delete("/post/delete/:postid", checkUserAuth, postController.deletePost);

module.exports = router;
