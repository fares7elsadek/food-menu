const Admin = require('../models/Admin');
const Product = require('../models/Product');
const appError = require('../utils/appError');
const fs = require('fs');
const asynWrapper = require('../middleware/asyncWrapper');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const axios = require('axios');
const { body,validationResult, Result} = require('express-validator');
const path = require('path');


//login
const login = asynWrapper(async (req,res,next)=>{
    const {username,password} = req.body;
    const err=validationResult(req);
    if(!err.isEmpty()){
        return res.render('admin/login',{message:"invalid request"})
    }
    const user = await Admin.findOne({username});
    if(!user){
        return res.render('admin/login',{message:"invalid username or password"})
    }
    if(password!=user.password){
        return res.render('admin/login',{message:"invalid username or password"})
    }
    const token = jwt.sign({username,id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'3d'});
    res.cookie('Token',token,{
        httpOnly:true,
        maxAge:72*60*60*1000
    });
    user.token=token;
    res.redirect('/admin/dashboard');
})



//Add product 
const Addproduct = asynWrapper(async (req,res,next)=>{
    const err=validationResult(req);
    const { name ,kind, price }=req.body;
    if(!err.isEmpty()){
        console.log("hello")
        const statusCode = 400;
        const message = err.array();
        const statusText = "FAIL";
        const error = appError.create(message,statusCode,statusText);
        return next(error);
    }
    let imagePath= path.join(__dirname, '..', 'uploads', req.file.filename);
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
    await cloudinary.uploader.upload(imagePath).then(result=>{
       imageUrl = cloudinary.url(result.public_id);
    });
    const product = new Product({
        name,
        kind,
        price,
        photo: imageUrl
    });
    await product.save();
    res.redirect('/admin/dashboard');
});



//delete Product
const deleteProduct = asynWrapper(async (req,res,next)=>{
    const id = req.params.prodId;
    const product = await Product.findByIdAndDelete(id);
    const imagePath = path.join(__dirname, '..', 'uploads', product.photo);
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log('File deleted successfully');
        }
    });
    res.redirect('/admin/dashboard');
});

const getLoginPage = asynWrapper(async (req,res,next)=>{
    res.render('admin/login');
})

const getDashboard = asynWrapper(async (req,res,next)=>{
    const food = await Product.find();
     res.render('admin/admin',{
        prods:food
     })
})

const getAddProduct = asynWrapper(async (req,res,next)=>{
     res.render('admin/addprod');
})

const getUpdateProduct = asynWrapper(async (req,res,next)=>{
    const prodId = req.params.prodId;
    const product = await Product.findById(prodId);
    res.render('admin/updateprod',{
        product:product
    });
})



module.exports={
    Addproduct,
    deleteProduct,
    getLoginPage,
    login,
    getDashboard,
    getAddProduct,
    getUpdateProduct
}
