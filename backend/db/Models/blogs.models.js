const { strict } = require("assert");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const BlogsSchema = new Schema({
  title:{ type:String },
  image:{ type:String},
  Body: { type:String}
});

 const Blogs = mongoose.model("blog",BlogsSchema);
 module.exports.Blogs =Blogs;