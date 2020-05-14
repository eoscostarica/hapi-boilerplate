const jwt = require('jsonwebtoken')
const { jwtConfig } = require('config')

const sign = data =>
  jwt.sign(data, jwtConfig.privateKey, { algorithm: jwtConfig.algorithm })
const decoded = token =>
  jwt.verify(token.replace('Bearer ', ''), jwtConfig.publicKey)

module.exports = {
  sign,
  decoded
}
