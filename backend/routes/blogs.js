const { error } = require('console');
var express = require('express');
var router = express.Router();
const   {Blogs} =require("../db/Models/blogs.models")


router.post("/add",(req,res)=>{
  Blogs.create(req.body)
    .then((res)=>{
      res.send(result);
      res.end();
    })
    .catch((error)=>{
      res.send(error)
    });
});
router.delete("/api/delete/blogs/:id",(req,res)=>{
  Blogs.deleteOne({_id: req.params._id},(error,docs) =>{
    res.send(docs);
    res.end()
  });
});
module.exports = router;
