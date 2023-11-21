const mongoose = require('mongoose'); 

const productShema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    kind:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    photo:{
        type:String,
    }
});


module.exports = mongoose.model('Product', productShema);