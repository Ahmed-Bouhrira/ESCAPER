const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
//const passport = require('passport');
//var authRouter = require("./routes/authentication");
const blogs = require("./routes/blogs");
const users = require("./routes/user.routes");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");

var app = express();
// const expressSession = require('express-session')({
//   secret: 'secret',
//   resave: false,
//   saveUninitialized: false
// });
// const initializePassport = require('./passport-config')
// initializePassport(passport, email => {
//   return users.find(user => user.email === email)
// })

app.use(cors());
require("dotenv").config();
const mongoose = require("mongoose");
//protect our data we remove the name of our database and password and we change it with process ... inside .env

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected");
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});
//routes
app.use("/api/blog", blogs);
app.use("/api/user", users);


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app.listen(3000, () => {
  console.log("app listening at http://localhost:3000");
});
module.exports = app;
