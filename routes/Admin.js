const express = require('express');
const controllers = require('../controllers/Admin');
const router = express.Router();
const multer  = require('multer');
const appError = require('../utils/appError');
const verifyToken = require('../middleware/verifyToken');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = file.originalname.split('.')[1];
      const filename = `product-${uniqueSuffix}.${ext}`;
      cb(null, filename);
    }
});
function fileFilter(req,file,cb){
    if(file.mimetype.split('/')[0]==='image')
        cb(null,true);
    else
        cb(appError.create('this file type is not supported'),false);
}
const upload = multer({ 
    storage: storage,
    fileFilter:fileFilter
 });

//login
router.post('/login',controllers.login)


//add product
router.post('/add',verifyToken,upload.single('photo'),controllers.Addproduct);


//delete product
router.post('/delete/:prodId',verifyToken,controllers.deleteProduct);


//get login page
router.get('/login',controllers.getLoginPage);


//get the dashboard
router.get('/dashboard',verifyToken,controllers.getDashboard);


//get add product page
router.get('/add',verifyToken,controllers.getAddProduct);



module.exports = router;