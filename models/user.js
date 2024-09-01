const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    usertype:{
        type: String
    },
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password :{
        type : String
    }
})

const user = mongoose.model('user' , userSchema );
module.exports = {user};