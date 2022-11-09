const bcrypt = require("bcryptjs"); //For hashing of password
const jwt = require("jsonwebtoken"); //password verification

const userModel = require("../model/user"); //Database model(IMPORTATION OF MODULE)

//FNX TO HANDLE CREATING USER
exports.createUser = async function (req, res) {
  const newUser = req.body;
  try {
    const userExist = await userModel.findOne({ email: newUser.email });
    // checks if user exist
    if (userExist) {
      res.status(409).json({ success: false, message: "User already Exist" });
    } else {
      //if not, hash their password
      const hash = bcrypt.hashSync(newUser.password);
      newUser.password = hash;
      const user = await userModel.create(newUser);
      console.log("Created User Data", user);
      res
        .status(201)
        .json({ success: true, message: "User created successfully" });
    }
  } catch (error) {
    console.error(error.name);
    return res.status(404).json({ success: false, message: "User Not found" });
  }
};

exports.signIn = async function (req, res) {
  const user = req.body;
  try {
    //Checks if a user exist
    const userExist = await userModel.findOne({ email: user.email });
    if (userExist) {
      //Compares the user's password
      //findOne returns an object not array
      const isPasswordMatch = bcrypt.compareSync(
        user.password,
        userExist.password
      );
      //if password match
      if (isPasswordMatch === true) {
        const tokenPayload = {
          id: userExist._id,
          email: userExist.email,
        };

        //Generate auth token
        const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
          expiresIn: "2d",
        });
        return res.status(200).json({
          status: "success",
          msg: "user Logged in successfully",
          token,
        });
      }
      //Respond to the client
      else {
        return res
          .status(400)
          .json({ status: "failed", msg: "Password is incorrect" });
      }

      // Else respond to the client
    } else {
      //Responds to the client
      return res.status(404).json({ success: "false", msg: "User not Found" });
    }
  } catch (error) {
    //Respond to the client
    console.error(error.message);
    return res
      .status(500)
      .json({ status: "failed", msg: "Something went wrong", error });
  }
};

exports.updateUser = async function (req, res) {
  //gets the id from res.locals
  const userId = res.locals.id;
  //data from req body
  const dataToUpdate = req.body;
  try {
    //find and update the user's data
    const updatedData = await userModel.findByIdAndUpdate(
      userId,
      dataToUpdate,
      { new: true }
    );
    //checks if data was updated
    if (updatedData) {
      res.status(201).json({
        status: true,
        msg: "profile updated successfully",
        data: updatedData,
      });
    } else {
      res.status(500).json({
        status: false,
        msg: "Failed to update profile, please try again",
      });
    }
  } catch (error) {
    res.status(400).json({ status: false, msg: "Something went Wrong", error });
  }
};

exports.deleteUserById = async (req, res) => {
  //gets the user id from req.params
  const id = req.params.user_id;
  // console.log(req.params);
  // const query = req.query; // {search: john}
  // query.search;
  try {
    //find and delete the user
    const deletedUser = await userModel.findByIdAndDelete(id);
    //if deleted
    if (deletedUser) {
      //responds to the client
      res.status(200).json({
        status: true,
        msg: "User deleted successfully",
        data: deletedUser,
      });
    } else {
      //responds to the client
      res.status(404).json({ status: false, msg: "User not Found" });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "Something went Wrong",
      error,
    });
  }
};

exports.getUserById = async (req, res) => {
  const id = req.params.user_id;
  try {
    //find the user
    const user = await userModel.findById(id);
    //if found
    if (user) {
      //responds to the client
      res
        .status(200)
        .json({ status: true, msg: "User retrieved successfully", data: user });
    } else {
      //responds to the client
      res.status(404).json({ status: false, msg: "User not Found" });
    }
  } catch (error) {
    console.log(error);
    //responds to the client
    res.status(500).json({ status: false, msg: "Something went wrong" });
  }
};
