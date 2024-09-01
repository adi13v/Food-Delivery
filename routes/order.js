const express = require("express");
const router = express.Router();
const {Restaurant,RestaurantDetail,Menu}  = require('../models/restaurant');

router.get("/:id" , async (req,res)=>{
    const id = req.params.id;
    try {
    const restaurantDetails = await RestaurantDetail.findOne({restaurantID:id});
    if(!restaurantDetails){
        res.redirect('')
    }
    res.render('order' , {restaurantDetails:restaurantDetails , id:id});

    } catch (error) {
        console.log("cant find the restaurant with given id");
    }
   
} )

module.exports = router;