const mongoose = require("mongoose");

const SignupSchema = mongoose.Schema({});

const Signup = mongoose.Model("Signup", SingupSchema);

module.exports.Signup = Signup;
