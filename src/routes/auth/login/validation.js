const Joi = require('@hapi/joi')

module.exports = {
  payload: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
}
