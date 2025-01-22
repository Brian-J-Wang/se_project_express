const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

const validateWeather = (value, helpers) => {
  if (value === "") {
    return helpers.error('string.empty');
  }
  const validValues = ["hot", "warm", "cold"];
  if (validValues.includes(value)) {
    return value;
  }
  return helpers.error('string.invalid');
}

module.exports.validateClothing = celebrate({
  headers: Joi.object().keys({
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      'string.empty': 'The name field must be filled in',
      'string.min': 'the name field must have a minimum length of 2',
      'string.max': 'the name field has a maximum length of 30'
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The "imageUrl" field must be filled in',
      'string.uri': 'the "imageUrl" field must be a valid url',
    }),
    weather: Joi.string().required().custom(validateWeather).messages({
      'string.empty': 'The weather field must be selected',
      'string.invalid': "Invalid value for weather"
    })
  })
})

module.exports.validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      'string.empty': 'The name field must be filled in',
      'string.min': 'the name field must have a minimum length of 2',
      'string.max': 'the name field has a maximum length of 30'
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The imageUrl field must be filled in',
      'string.uri': 'the imageUrl field must be a valid url',
    }),
    email: Joi.string().required().email().messages({
      'string.empty': "The email field must be filled in",
      'string.email': "the email field must be a vaild email"
    }),
    password: Joi.string().required().messages({
      'string.empty': "The password field must be filled im"
    })
  })
})

module.exports.validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      'string.empty': 'The name field must be filled in',
      'string.min': 'the name field must have a minimum length of 2',
      'string.max': 'the name field has a maximum length of 30'
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The imageUrl field must be filled in',
      'string.uri': 'the imageUrl field must be a valid url',
    }),
  })
})

module.exports.validateLogIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.empty': "The email field must be filled in",
      'string.email': "the email field must be a vaild email"
    }),
    password: Joi.string().required().messages({
      'string.empty': "The password field must be filled im"
    })
  })
})

module.exports.validateClothingAccess = celebrate({
  body: Joi.object().keys({
    id: Joi.string().required().hex().length(24)
  })
})

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().required().hex().length(24)
  })
})