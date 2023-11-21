const Product = require('../models/Product');
const appError = require('../utils/appError');
const asyncWrapper = require('../middleware/asyncWrapper');



//get lunch
const getLunch = asyncWrapper(async (req,res,next)=>{
     const food = await Product.find({kind:"lunch"});
     res.render('menu/menu-food',{
        prods:food
     })
})




//get dinner
const getDinner = asyncWrapper(async (req,res,next)=>{
    const food = await Product.find({kind:"dinner"});
    res.render('menu/menu-food',{
        prods:food
    })
})



//get breakfast
const getBreakfast = asyncWrapper(async (req,res,next)=>{
    const food = await Product.find({kind:"breakfast"});
    res.render('menu/menu-food',{
        prods:food
    });
})

//get all products
const getall = asyncWrapper(async (req,res,next)=>{
    const food = await Product.find();
    res.render('menu/menu-food',{
        prods:food
    });
})

module.exports={
    getLunch,
    getDinner,
    getBreakfast,
    getall
}