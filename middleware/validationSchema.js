const { body,validationResult} = require('express-validator');

const productValidation = ()=>{
    return [
        body('name').notEmpty(),
        body('price').notEmpty(),
        body('kind').notEmpty(),
    ];
};

module.exports = productValidation;