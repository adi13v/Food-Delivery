const express = require('express');
const router = express.Router();
const {Restaurant,RestaurantDetail}  = require('../models/restaurant');

router.get("/" , async(req,res)=>{
    res.render('form');
})

router.post("/" , async(req,res)=>{
    console.log(req.body);
    
    const newRestaurant = new Restaurant(
        {
            title : req.body.title,
            imageURL : req.body.imageURL,
            speciality : req.body.speciality,
            priceRange : req.body.priceRange
        }
    );
       const savedRestaurant = newRestaurant.save()
       .then( rest=>{
              const id = rest._id;

              console.log(id);

                const menuarr = [ {
                    foodImage : req.body.foodImage,
                    foodName:req.body.foodName,
                    foodDescription:req.body.foodDescription,
                    foodPrice : req.body.foodPrice
                }]

              const newRestaurantDetail = new RestaurantDetail({
                restaurantID : id,
                photo: req.body.coverimageURL,
                name:req.body.title,
                specialities:req.body.speciality,
                menu : menuarr
              })    
              return newRestaurantDetail.save(); 
       }
       )
       .then(()=>{
         res.status(201);
         res.redirect('/');
       }
       )
       .catch(err=>
        console.log(err)
       )
       
        
}   
)

router.get('/:id' , async(req,res)=>{
    const id = req.params.id;
    res.render('addmenu' , {id:id} );
})

router.put('/:id' , async (req,res)=>{
  const id = req.params.id;
  
  
  const temp = await RestaurantDetail.findOne({restaurantID:id});
  temp.menu.push(req.body)
  const newMenu = await RestaurantDetail.findOneAndUpdate({restaurantID:id} , {menu : temp.menu});
  
  res.redirect(`/order/${id}`)
    
  
  
})
module.exports = router;