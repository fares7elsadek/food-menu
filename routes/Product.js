const express = require('express');
const controllers = require('../controllers/Product');
const router = express.Router();






//get all products
router.get('/',controllers.getall);


//get lunch food
router.get('/lunch',controllers.getLunch);




//get breakfast food
router.get('/breakfast',controllers.getBreakfast);


//get dinner food
router.get('/dinner',controllers.getDinner);







module.exports = router;