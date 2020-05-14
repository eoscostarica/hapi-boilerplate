const { handleLogin, loginValidation } = require('./login')

const routes = [
  {
    method: 'POST',
    path: '/api/auth/login',
    handler: handleLogin,
    options: {
      validate: loginValidation,
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/api/status',
    handler: async () => {
      return '*ok*'
    },
    options: {
      auth: false
    }
  }
]

module.exports = routes
