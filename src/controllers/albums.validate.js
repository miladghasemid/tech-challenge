const validator = require('validator')
const { check } = require('express-validator')



exports.index= [
    
]

exports.show = [
    check('id')
    .exists()
    .withMessage('MISSING')
    .isDecimal()
    .withMessage('not a nubmer')
  ]



exports.create = [
    check('id')
    .exists()
    .withMessage('MISSING')
    .isDecimal()
    .withMessage('not a nubmer'),
    check('title')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    
]
