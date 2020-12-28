const router = require("express").Router();
const authController = require("../db/Controllers/auth.controller");
const userController = require("../db/Controllers/user.controller");
const error = require("../utils/errors.utils");
// authentication
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logOut);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
module.exports = router;
