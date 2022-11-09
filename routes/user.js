const router = require("express").Router();

const userController = require("../controllers/user");
const authMiddleware = require("../middleWares/authorization");
const isUserExist = require("../middleWares/isUserExist");

router.post("/signup", userController.createUser); //Creates User Route

router.post("/login", userController.signIn); //Creates Login Route

router.put("/update", authMiddleware, isUserExist, userController.updateUser); //Creates Update Route

router.delete(
  "/user/:user_id",
  authMiddleware,
  isUserExist,
  userController.deleteUserById
); //Deletes a user from DB by admin(a person authorized to do so)

router.delete(
  "/user/:user_id/book/:bookId",
  authMiddleware,
  isUserExist,
  userController.deleteUserById
); //Deletes a user from DB by admin(an person authorized to do so)

router.get(
  "/user/:user_id",
  authMiddleware,
  isUserExist,
  userController.getUserById
); //Gets a single user from DB

module.exports = router;
