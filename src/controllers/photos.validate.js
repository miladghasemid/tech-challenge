const validator = require('validator')
const { check } = require('express-validator')



exports.index= [
    check('albumId')
    .exists()
    .withMessage('MISSING')
    .isDecimal()
    .withMessage('not a nubmer')
]

exports.show = [
    check('id')
    .exists()
    .withMessage('MISSING')
    .isDecimal()
    .withMessage('not a nubmer')
  ]



exports.create = [
    check('albumId')
    .exists()
    .withMessage('MISSING')
    .isDecimal()
    .withMessage('not a nubmer'),
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
    .withMessage('IS_EMPTY'),
    check('url')
    .exists()
    .withMessage('MISSING')
    .isURL()
    .withMessage('is not a url')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
    check('thumbnailUrl')
    .optional()
    .exists()
    .withMessage('MISSING')
    .isURL()
    .withMessage('is not a url')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    
]
