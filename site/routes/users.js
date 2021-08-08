const express = require("express");
const passport = require("passport");

const router = express.Router();

const usersControllers = require("../controllers/users");
const isAuth = require("../middleware/is-auth");

router.get("/", usersControllers.getUsers);

router.post("/sign-up", usersControllers.postSignUp);

router.post(
  "/sign-in",
  passport.authenticate("local", {
    session: false,
  }),
  usersControllers.postSignIn
);
router.get("/get-user",isAuth,usersControllers.getCurrentUser)

module.exports = router;
