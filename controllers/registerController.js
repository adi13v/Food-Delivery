const {user} = require('../models/user') 
const bcrypt = require('bcrypt');
const registerNewUser =  async(req ,res)=>{
    const salt =  await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(req.body.password , salt);
  const newUser = new user({
    usertype : req.body.usertype,
    name:req.body.name,
    email:req.body.email,
    password : hashedPass
  })
  console.log(newUser);
  try {
    await newUser.save();
     
    console.log("Succesfully Added A New User");
    res.status(200).redirect(`/?message=${req.body.name}`);
    

  } catch (error) {
    console.log("Coudlnt Add User " + error);
  }
 
}


module.exports = {registerNewUser}