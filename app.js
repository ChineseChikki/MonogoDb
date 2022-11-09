// modules for working
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
//loads data from env variable
require("dotenv").config();
const port = 8000;
// bad guys middleware for parse
app.use(express.json()); //json on post man
app.use(express.urlencoded({ extended: true })); // www.urlencoded on postman

// CONNECT THE MONGO DB ONLINE
// mongoose.connect(process.env.MONGODB_URL, function (err) {
//   if (err) {
//     console.error("Failed to connect", err);
//   } else {
//     console.log("connected");
//   }
// });
// CONNECTION URL ON LOCALHOST (OFFLINE)
mongoose.connect("mongodb://localhost:27017/Chikki", function (err) {
  if (err) {
    console.error("Failed to connect", err);
  } else {
    console.log("connected");
  }
});
//imports user route from routes folder
app.use("/auth", userRouter);
// app.use(userRouter);

app.listen(port);
// app.listen(8000);
