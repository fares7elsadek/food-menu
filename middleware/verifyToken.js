const jwt = require('jsonwebtoken');
const appError = require('../utils/appError');


const verifytoken = (req,res,next)=>{
    const authHeader =req.cookies['Token'];
    if(!authHeader){
        return res.render('error',{message:"not authoriazed"});
    }
    const token = authHeader;
    try{
        const curruser= jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=curruser;
        next();
    }catch(err){
        return res.render('error',{message:"not authoriazed"});
    }
}

module.exports=verifytoken;