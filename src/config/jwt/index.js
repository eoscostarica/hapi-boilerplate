module.exports = {
  privateKey: process.env.JWT_PRIVATE_KEY || 'secret',
  publicKey: process.env.JWT_PUBLIC_KEY || 'secret',
  algorithm: process.env.JWT_ALGORITHM || 'RS512'
}
