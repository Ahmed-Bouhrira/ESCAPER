const UserModel = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../../utils/errors.utils");

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  });
};
//console.log(process.env.TOKEN_SECRET);
module.exports.signUp = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  console.log("body, ", req.body);
  try {
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).json({ errors });
  }
};
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};
module.exports.logOut = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
