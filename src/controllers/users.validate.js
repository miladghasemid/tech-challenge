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
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .custom((value, {req}) => (value === req.user.id))
    .withMessage("cannot change another user's info")
  ]



exports.create = [
  check('id')
  .exists()
  .withMessage('MISSING')
  .isDecimal()
  .withMessage('not a nubmer'),
  check('email')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isEmail()
    .withMessage('EMAIL_IS_NOT_VALID'),
    check('password')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isLength({
      min: 5
    })
    .withMessage('PASSWORD_TOO_SHORT_MIN_5'),
  check('name')
    .optional()
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
    check('username')
    .optional()
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    
]

exports.update = [
  check('id')
  .exists()
  .withMessage('MISSING')
  .isDecimal()
  .withMessage('not a nubmer')
  .custom((value, {req}) => (value === req.user.id))
  .withMessage("cannot change another user's info"),
  check('email')
    .optional()
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isEmail()
    .withMessage('EMAIL_IS_NOT_VALID'),
    check('password')
    .optional()
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isLength({
      min: 5
    })
    .withMessage('PASSWORD_TOO_SHORT_MIN_5'),
  check('name')
    .optional()
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
    check('username')
    .optional()
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
  
]

exports.destroy = [
  check('id')
  .exists()
  .withMessage('MISSING')
  .isDecimal()
  .withMessage('not a nubmer')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .custom((value, {req}) => (value === req.user.id))
  .withMessage("cannot delete another user's account")
]

exports.authenticate = [
  check('email')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .isEmail()
  .withMessage('EMAIL_IS_NOT_VALID'),
  check('password')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
]
