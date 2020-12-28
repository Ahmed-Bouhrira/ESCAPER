const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator"); // we check if the email is valid

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 40,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 40,
    trim: true
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail],
    lowercase: true,
    unique: true,
    trim: true
  },
  phoneNumber: Number,
  password: {
    type: String,
    required: true,
    max: 500, // we fix a longest length for password for crypting it
    minLength: 6
  }
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
