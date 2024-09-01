const {user} = require('../models/user') 
const bcrypt = require('bcrypt');

const loginUser = async (req,res)=>{
   
    const password = req.body.password;
    const knocker = await user.findOne({email:req.body.email})
    
     
    if(knocker==null) {
        res.render('login' , {message: "INVALID ID TRY AGAIN"})
        return ;
    }
try {

    if(await bcrypt.compare(password , knocker.password)){
        console.log("KNOCKER WAS OUR GUY");
        res.status(200).redirect(`/?message=${knocker.name}`);
    }
    else{
        res.render('login' , {message: "Wrong Password"})
        console.log("INVALID PASSOWRD"); 
    }

} 
catch (error) {
    console.log("Something Wrong With LOGIN");
}
    

}

module.exports = {
    loginUser
}