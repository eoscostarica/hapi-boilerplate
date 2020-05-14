const Boom = require('@hapi/boom')
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('http-status-codes')

const { jwtUtils } = require('utils')
const {
  authApi: { LOGIN }
} = require('api')

const {
  constants: {}
} = require('config')

const handleLogin = async (
  { payload: { username, password } },
  { context: { hasuraClient } }
) => {
  try {
    const { user } = await hasuraClient.request(LOGIN, { username, password })

    if (!user.length) {
      return Boom.unauthorized()
    }

    const userData = user[0]

    const tokenData = {
      ...userData,
      'https://hasura.io/jwt/claims': {
        'X-Hasura-Allowed-Roles': [userData.role],
        'X-Hasura-Default-Role': userData.role,
        'X-Hasura-User-Id': userData.id.toString()
      }
    }

    return {
      token: `Bearer ${jwtUtils.sign(tokenData)}`
    }
  } catch (error) {
    return Boom.boomify(error, { statusCode: INTERNAL_SERVER_ERROR })
  }
}

module.exports = handleLogin
