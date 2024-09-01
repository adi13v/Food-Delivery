const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    foodImage:{
        type:String
    },
    foodName:{
        type:String
    },
    foodDescription:{
        type:String
    },
    foodPrice:{
        type:Number
    },
})
const restaurantDetailSchema = new mongoose.Schema({
    restaurantID:{
        type:String
    },
    photo:{
        type:String
    },
    name:{
        type:String
    },
    specialities:{
        type:String
    },
    menu : [menuSchema]
})

const restaurantSchema = new mongoose.Schema({
    
    imageURL:{
        type:String
    },
    priceRange :{
        type:Number
    },
    speciality:{
        type: String
    },
    title:{
        type : String,
        required: true
    }
})

const Restaurant = mongoose.model('Restaurant' , restaurantSchema);
const RestaurantDetail = mongoose.model('RestaurantDetail' , restaurantDetailSchema)
const Menu = mongoose.model('Menu' , menuSchema)
module.exports = {Restaurant,RestaurantDetail , Menu};