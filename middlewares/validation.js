const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const ValidateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  } else {
    return helpers.error('string.uri');
  }
}

module.exports.validateClothing = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      'string.empty': 'The name field must be filled in',
      'string.min': 'the name field must have a minimum length of 2',
      'string.max': 'the name field has a maximum length of 30'
    }),
    url: Joi.string().required().custom(ValidateURL).messages({
      'string.empty': 'The "imageUrl" field must be filled in',
      'string.uri': 'the "imageUrl" field must be a valid url',
    })
  })
})

module.exports.validateUserInfo = celebrate({
  body: Joi.object.keys({
    name: Joi.string().required().min(2).max(30).messages({
      'string.empty': 'The name field must be filled in',
      'string.min': 'the name field must have a minimum length of 2',
      'string.max': 'the name field has a maximum length of 30'
    }),
    avatar: Joi.string().required().custom(ValidateURL).messages({
      'string.empty': 'The "imageUrl" field must be filled in',
      'string.uri': 'the "imageUrl" field must be a valid url',
    }),
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
})

module.exports.validateLogIn = celebrate({
  body: Joi.object.keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
})

module.exports.validateClothingAccess = celebrate({
  body: Joi.object.keys({
    id: Joi.string().required().hex().length(24)
  })
})

module.exports.validateUserAccess = celebrate({
  body: Joi.object.keys({
    id: Joi.string().required().hex().length(24)
  })
})

module.exports.validateId = celebrate({
  params: Joi.object.keys({
    Id: Joi.string().required().hex().length(24)
  })
})