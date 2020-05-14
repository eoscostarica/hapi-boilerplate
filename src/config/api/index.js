module.exports = {
  port: process.env.PORT || 9090,
  host: process.env.HOST_ADDRESS || '0.0.0.0',
  protocol: process.env.PROTOCOL || 'http',
  url: process.env.URL || 'http://0.0.0.0:9090/'
}
