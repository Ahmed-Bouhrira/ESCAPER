const UserModel = require("../Models/user.model");
// to verify each time if the id's are existing in our database
const ObjectID = require("mongoose").Types.ObjectId;


module.exports.getAllUsers = async (req, res) => {
  // select() to select all the propyoritise except password
  const users = await UserModel.find().select('-password');
  res.status(200).json(users);
};

module.exports.userInfo = (req,res) => {
  console.log(req.params);
  // the function is valid will test if the id existe on the data base if not it will exit the function
  if(!ObjectID.isValid(req.params.id)){ 
    return res.status(400).send('Id unknown : ' + req.params.id)
  }else{
    UserModel.findById(req.params.id,(err,data)=>{
      if (!err){
        res.send(data)
      }else{
        console.error
      }
    }).select('-password');
  }
}
