module.exports = {
  port: process.env.IPFS_PORT || 5001,
  host: process.env.IPFS_HOST || 'localhost',
  protocol: process.env.IPFS_PROTOCOL || 'http',
  url: process.env.IPFS_URL || ''
}
